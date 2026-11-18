import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CATEGORIES, IMAGES, PAGES } from '../categories';
import { ARTICLES } from '../articles';

export const imgFor = (id: string, i = 0) =>
  IMAGES[([...id].reduce((a, c) => a + c.charCodeAt(0), 0) + i) % IMAGES.length] + '?w=800&q=80';

const PATTERNS = ['{t}: what leaders and analysts are saying', 'Inside the latest {t} developments', '{t} under pressure as new data emerges',
  'Explainer: why {t} matters this week', 'Experts weigh in on the next phase of {t}', '{t}: five things to know', 'How {t} could change next year', 'Analysis: the story behind {t}'];

@Component({ selector: 'app-category', standalone: true, imports: [NgFor, NgIf, RouterLink],
  templateUrl: './category.component.html', styleUrl: './category.component.css' })
export class CategoryComponent {
  private route = inject(ActivatedRoute);
  cat = toSignal(this.route.paramMap.pipe(map(p => this.build(p.get('slug') || this.route.snapshot.data['slug'] || ''))));

  build(slug: string) {
    const c = CATEGORIES.find(x => x.slug === slug) ||
      { slug, title: slug.replace(/-/g, ' ').replace(/\b\w/g, m => m.toUpperCase()), desc: 'Coverage and latest stories.', topics: [] as string[], info: false };
    const real = ARTICLES.filter(a => slug === 'latest' || a.tags.includes(slug)).map(a => ({ ...a, img: imgFor(a.id), link: ['/article', a.id], topic: a.source }));
    const sample = !c.info && !real.length;
    const topics = c.topics.length ? c.topics : [c.title];
    const list = sample ? PATTERNS.map((p, i) => ({ id: slug + i, title: p.replace('{t}', topics[i % topics.length]), topic: topics[i % topics.length],
      date: 'Sample', source: '', url: '', summary: '', tags: [], img: imgFor(slug, i * 3), link: null as any })) : real;
    return { ...c, sample, paragraphs: PAGES[slug] || [], lead: list[0], articles: list.slice(1) };
  }
}
