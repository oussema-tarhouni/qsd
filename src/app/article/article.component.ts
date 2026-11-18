import { Component, ElementRef, HostListener, OnDestroy, ViewChild, computed, effect, inject, signal, untracked } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ARTICLES } from '../articles';
import { imgFor } from '../category/category.component';

/** Point this at your backend. Expected: POST { question, article, history } -> { answer: string } */
const ASK_ENDPOINT = '/api/ask';

/** Expected: POST { article } -> { title, description, sections: [{ key, text }] (introduction, hypotheses, methods, results, discussion, in that order), conclusion } */
const BRIEF_ENDPOINT = '/api/brief';

interface Msg { role: 'user' | 'ai'; text: string; error?: boolean; }
interface Section { key: string; text: string; }

const SECTION_META: Record<string, { label: string; hint: string; color: string; ink: string }> = {
  introduction: { label: 'Introduction', hint: 'Background and earlier findings', color: '#f28b92', ink: '#3a0d10' },
  hypotheses:   { label: 'Hypotheses',   hint: 'What the story set out to test or claim', color: '#3aa510', ink: '#ffffff' },
  methods:      { label: 'Methods',      hint: 'Who was involved, and how it was done', color: '#f58220', ink: '#2e1500' },
  results:      { label: 'Results',      hint: 'What was found, and how solid it is', color: '#4f81bd', ink: '#ffffff' },
  discussion:   { label: 'Discussion',   hint: 'What it means, its limits, what comes next', color: '#f5e11a', ink: '#2b2600' },
};
interface Brief { title: string; description: string; sections: Section[]; conclusion: string; }

const NETWORKS = [
  { id: 'x', name: 'X' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'whatsapp', name: 'WhatsApp' },
  { id: 'telegram', name: 'Telegram' },
  { id: 'reddit', name: 'Reddit' },
  { id: 'email', name: 'Email' },
];

@Component({ selector: 'app-article', standalone: true, imports: [NgFor, NgIf, RouterLink],
  templateUrl: './article.component.html', styleUrl: './article.component.css' })
export class ArticleComponent implements OnDestroy {
  private route = inject(ActivatedRoute);

  view = toSignal(this.route.paramMap.pipe(map(p => {
    const a = ARTICLES.find(x => x.id === p.get('id'));
    if (!a) return null;
    const related = ARTICLES.filter(x => x.id !== a.id && x.tags.some(t => a.tags.includes(t))).slice(0, 4);
    return { a, img: imgFor(a.id).replace('w=800', 'w=1200'), related, tag: a.tags[0] };
  })));

  // Page dynamics
  progress = signal(0);      // 0..1 reading progress
  shift = signal(0);         // hero parallax offset in px
  showDock = signal(false);  // floating "Ask AI" pill

  // Copy link
  copied = signal(false);

  // AI brief (title / description / conclusion)
  brief = signal<Brief | null>(null);
  briefLoading = signal(false);
  private briefCache = new Map<string, Brief>();
  meta = (key: string) => SECTION_META[key] ?? { label: this.label(key), hint: '', color: '#888', ink: '#fff' };
  readMinutes = computed(() => {
    const b = this.brief();
    if (!b) return 0;
    const words = [b.description, b.conclusion, ...b.sections.map(x => x.text)].join(' ').split(/\s+/).length;
    return Math.max(1, Math.round(words / 210));
  });

  constructor() {
    effect(() => {
      const v = this.view();
      if (v) untracked(() => this.loadBrief(v.a));
    });
  }

  async loadBrief(a: { id: string; title: string; summary: string; source: string; url: string; date: string }, force = false) {
    if (!force && this.briefCache.has(a.id)) { this.brief.set(this.briefCache.get(a.id)!); return; }
    this.brief.set(null);
    this.briefLoading.set(true);
    try {
      const res = await fetch(BRIEF_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: { title: a.title, summary: a.summary, source: a.source, url: a.url, date: a.date } }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const b = (await res.json()) as Brief;
      if (!b?.title || !b?.description || !b?.conclusion || !Array.isArray(b.sections) || !b.sections.length) throw new Error('bad shape');
      this.briefCache.set(a.id, b);
      if (this.view()?.a.id === a.id) this.brief.set(b);
    } catch {
      /* falls back to the original title/summary in the template */
    } finally {
      if (this.view()?.a.id === a.id) this.briefLoading.set(false);
    }
  }

  // Sharing
  networks = NETWORKS;
  canNative = typeof navigator !== 'undefined' && !!(navigator as any).share;
  toast = signal('');

  private flash(msg: string) {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(''), 3200);
  }

  async share(id: string) {
    const v = this.view();
    if (!v) return;
    const url = location.href;
    const text = this.brief()?.title ?? v.a.title;
    const u = encodeURIComponent(url), t = encodeURIComponent(text);

    if (id === 'native' || id === 'instagram') {
      // Instagram has no web share URL, so use the device share sheet, or copy the link.
      if (this.canNative) {
        try { await (navigator as any).share({ title: text, text, url }); } catch { /* cancelled */ }
        return;
      }
      if (id === 'instagram') {
        await navigator.clipboard?.writeText(url);
        this.flash('Link copied. Paste it into Instagram.');
      }
      return;
    }

    const links: Record<string, string> = {
      x: `https://x.com/intent/post?text=${t}&url=${u}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      whatsapp: `https://wa.me/?text=${t}%20${u}`,
      telegram: `https://t.me/share/url?url=${u}&text=${t}`,
      reddit: `https://www.reddit.com/submit?url=${u}&title=${t}`,
      email: `mailto:?subject=${t}&body=${u}`,
    };
    const href = links[id];
    if (!href) return;
    if (id === 'email') location.href = href;
    else window.open(href, '_blank', 'noopener,width=620,height=560');
  }

  // AI overlay
  askOpen = signal(false);
  loading = signal(false);
  messages = signal<Msg[]>([]);
  hasChat = computed(() => this.messages().length > 0);

  suggestions = computed(() => {
    const v = this.view();
    if (!v) return [];
    return [
      'Explain this in simple terms',
      'Why does this matter?',
      'What happens next?',
      `Who is affected by this?`,
    ];
  });

  @ViewChild('field') field?: ElementRef<HTMLTextAreaElement>;
  @ViewChild('thread') thread?: ElementRef<HTMLElement>;

  copy() {
    navigator.clipboard?.writeText(location.href);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1800);
  }

  label = (t: string) => t.replace(/-/g, ' ').replace(/\b\w/g, m => m.toUpperCase());

  @HostListener('window:scroll')
  onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? Math.min(1, y / max) : 0);
    this.shift.set(Math.min(y * 0.25, 160));
    this.showDock.set(y > 360);
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.askOpen()) { this.closeAsk(); return; }
    const t = e.target as HTMLElement;
    const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
    if (e.key === '/' && !typing && !this.askOpen() && this.view()) {
      e.preventDefault();
      this.openAsk();
    }
  }

  openAsk(question?: string) {
    this.askOpen.set(true);
    document.body.style.overflow = 'hidden';
    if (question) this.ask(question);
    else setTimeout(() => this.field?.nativeElement.focus(), 50);
  }

  closeAsk() {
    this.askOpen.set(false);
    document.body.style.overflow = '';
  }

  reset() {
    this.messages.set([]);
    setTimeout(() => this.field?.nativeElement.focus(), 0);
  }

  onEnter(e: Event, el: HTMLTextAreaElement) {
    if ((e as KeyboardEvent).shiftKey) return;
    e.preventDefault();
    const q = el.value;
    el.value = '';
    el.style.height = '';
    this.ask(q);
  }

  grow(el: HTMLTextAreaElement) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }

  async ask(raw: string) {
    const q = raw.trim();
    const v = this.view();
    if (!q || !v || this.loading()) return;

    const history = this.messages();
    this.messages.set([...history, { role: 'user', text: q }]);
    this.loading.set(true);
    this.toBottom();

    try {
      const res = await fetch(ASK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          article: { title: v.a.title, summary: v.a.summary, source: v.a.source, url: v.a.url, date: v.a.date },
          history: history.map(m => ({ role: m.role, text: m.text })),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      this.messages.update(m => [...m, { role: 'ai', text: data.answer ?? 'No answer returned.' }]);
    } catch {
      this.messages.update(m => [...m, {
        role: 'ai', error: true,
        text: `The AI service isn't reachable right now. Here's what the brief says: ${v.a.summary}`,
      }]);
    } finally {
      this.loading.set(false);
      this.toBottom();
    }
  }

  private toBottom() {
    setTimeout(() => {
      const el = this.thread?.nativeElement;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, 30);
  }

  ngOnDestroy() { document.body.style.overflow = ''; }
}
