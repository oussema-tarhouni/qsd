// @ts-nocheck
export function initShell(){

// Play/Pause
const playBtn = document.querySelector('.play-btn');
const ytCard = document.getElementById('ytCard');
const ytFrame = document.getElementById('ytFrame');
const YOUTUBE_ID = 'jfKfPfyJRdk';
let playing = false;
playBtn.addEventListener('click', () => {
  playing = !playing;
  if (playing) {
    ytFrame.src = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&controls=1&loop=1&playlist=${YOUTUBE_ID}&modestbranding=1`;
    ytCard.classList.add('visible');
    playBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="white"><rect x="1" y="1" width="3.5" height="10" rx="1"/><rect x="7.5" y="1" width="3.5" height="10" rx="1"/></svg>`;
  } else {
    ytFrame.src = ''; ytCard.classList.remove('visible');
    playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="white"><path d="M4 2.5l10 5.5-10 5.5z"/></svg>`;
  }
});

// Share
document.getElementById('shareBtn').addEventListener('click', async () => {
  const btn = document.getElementById('shareBtn');
  if (navigator.share) { try { await navigator.share({ title: 'Asouva', url: location.href }); } catch {} }
  else { await navigator.clipboard.writeText(location.href); btn.style.color = 'var(--accent)'; setTimeout(() => btn.style.color = '', 1500); }
});

// Theme
document.getElementById('themeBtn').addEventListener('click', () => {
  const h = document.documentElement;
  h.setAttribute('data-theme', h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Model pills
document.querySelectorAll('.model-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.model-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});

// Auth
let isLoggedIn = false;
const chatLoginOverlay = document.getElementById('chatLoginOverlay');
window.loginWith = function(provider) { isLoggedIn = true; chatLoginOverlay.classList.remove('visible'); };
document.getElementById('loginCancel').addEventListener('click', closeDrawer);

// Chat drawer
const chatDrawer = document.getElementById('chatDrawer');
const chatToggle = document.getElementById('chatToggleBtn');
const drawerClose = document.getElementById('drawerClose');
function openDrawer() {
  chatDrawer.classList.add('open'); chatToggle.classList.add('open'); document.body.classList.add('drawer-open');
  if (!isLoggedIn) chatLoginOverlay.classList.add('visible');
  else { chatLoginOverlay.classList.remove('visible'); setTimeout(() => document.getElementById('chatInput').focus(), 360); }
}
function closeDrawer() {
  chatDrawer.classList.remove('open'); chatToggle.classList.remove('open');
  document.body.classList.remove('drawer-open'); chatLoginOverlay.classList.remove('visible');
}
chatToggle.addEventListener('click', () => chatDrawer.classList.contains('open') ? closeDrawer() : openDrawer());
drawerClose.addEventListener('click', closeDrawer);

// AI Chat
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const typingBubble = document.getElementById('typingBubble');
const history = [];
function timeNow() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

function addMessage(role, text) {
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  const label = role === 'user' ? 'You' : 'Asouva';
  div.innerHTML = `
    <div class="msg-sender-row"><span class="msg-sender">${label}</span></div>
    <div class="msg-bubble">${text.replace(/\n/g,'<br>')}</div>
    <span class="msg-time">${timeNow()}</span>`;
  chatMessages.insertBefore(div, typingBubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

let currentSection = '', currentArticle = '';
const sectionMap = { 'hero-section':'Top Stories','featured-section':"Editor's Picks",'ai-section':'AI Intelligence','markets-section':'Markets & Economy','world-section':'World News','science-section':'Science & Health' };
function updateContext() {
  const sections = document.querySelectorAll('.hero-section,.featured-section,.ai-section,.markets-section,.world-section,.science-section');
  const midY = window.scrollY + window.innerHeight / 2;
  sections.forEach(s => {
    if (midY >= s.offsetTop && midY <= s.offsetTop + s.offsetHeight) {
      const cls = Array.from(s.classList).find(c => sectionMap[c]);
      if (cls && sectionMap[cls] !== currentSection) { currentSection = sectionMap[cls]; const ctx = document.getElementById('agentContext'); if (ctx) ctx.textContent = `Asking about: ${currentSection}`; }
    }
  });
}
window.addEventListener('scroll', updateContext, { passive: true });
setTimeout(updateContext, 500);

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = ''; chatInput.style.height = 'auto';
  addMessage('user', text); history.push({ role: 'user', content: text });
  typingBubble.classList.add('visible'); chatMessages.scrollTop = chatMessages.scrollHeight;
  const model = document.querySelector('.model-pill.active')?.dataset.model || 'claude';
  let ctxNote = ''; if (currentSection) ctxNote += ` User is browsing "${currentSection}".`; if (currentArticle) ctxNote += ` Article in focus: "${currentArticle}".`;
  const system = `You are Asouva AI, a sharp news assistant embedded in Asouva.com. Help users understand current events. Be concise and direct.${ctxNote}`;
  try {
    let reply = '';
    if (model === 'claude') {
      const res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, system, messages: history }) });
      const data = await res.json();
      reply = data.content?.[0]?.text || 'No response.';
    }
    history.push({ role: 'assistant', content: reply });
    typingBubble.classList.remove('visible'); addMessage('agent', reply);
  } catch { typingBubble.classList.remove('visible'); addMessage('agent', 'Something went wrong. Please try again.'); }
}
chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
chatInput.addEventListener('input', () => { chatInput.style.height = 'auto'; chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px'; });

// Navbar
window.addEventListener('scroll', () => document.getElementById('asouvaNav').classList.toggle('scrolled', window.scrollY > 10));
const nbMenuBtn = document.getElementById('nbMenuBtn');
const nbDrawer = document.getElementById('nbDrawer');
const nbDrawerClose = document.getElementById('nbDrawerClose');
const nbBackdrop = document.getElementById('nbBackdrop');
window.closeMenu=()=>closeDrawerMenu();
function openDrawerMenu() { nbMenuBtn.classList.add('open'); nbDrawer.classList.add('open'); nbBackdrop.classList.add('open'); document.body.style.overflowY = 'hidden'; }
function closeDrawerMenu() { nbMenuBtn.classList.remove('open'); nbDrawer.classList.remove('open'); nbBackdrop.classList.remove('open'); document.body.style.overflowY = ''; }
nbMenuBtn.addEventListener('click', () => nbDrawer.classList.contains('open') ? closeDrawerMenu() : openDrawerMenu());
nbDrawerClose.addEventListener('click', closeDrawerMenu);
nbBackdrop.addEventListener('click', closeDrawerMenu);

const nbMoreTrigger = document.getElementById('nbMoreTrigger');
const nbMega = document.getElementById('nbMega');
if (nbMoreTrigger && nbMega) {
  nbMoreTrigger.addEventListener('mouseenter', () => nbMega.classList.add('open'));
  document.addEventListener('mouseover', e => { if (!nbMoreTrigger.contains(e.target) && !nbMega.contains(e.target)) nbMega.classList.remove('open'); });
}


// Urgent rotator
const urgentItems = document.querySelectorAll('.urgent-item');
let urgentIndex = 0;
function rotateUrgent() {
  const current = urgentItems[urgentIndex];
  current.classList.remove('active'); current.classList.add('exit');
  setTimeout(() => { current.classList.remove('exit'); urgentIndex = (urgentIndex + 1) % urgentItems.length; urgentItems[urgentIndex].classList.add('active'); }, 400);
}
setInterval(rotateUrgent, 4000);

// Voice
const micBtn = document.getElementById('micBtn');
let recognition = null, isRecording = false;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR(); recognition.continuous = false; recognition.interimResults = true; recognition.lang = 'en-US';
  recognition.onresult = (e) => { document.getElementById('chatInput').value = Array.from(e.results).map(r => r[0].transcript).join(''); };
  recognition.onend = () => { isRecording = false; micBtn.classList.remove('recording'); };
  micBtn.addEventListener('click', () => { if (isRecording) { recognition.stop(); } else { recognition.start(); isRecording = true; micBtn.classList.add('recording'); } });
} else { micBtn.style.opacity = '.3'; micBtn.style.cursor = 'not-allowed'; }

// Auth modal
// Open/close/view switching is owned by AppComponent (loginOpen / authView signals).
// window.openPageLogin, closePageLogin, showSignIn and showRegister are defined there,
// so this file must not toggle the modal's classes directly.
window.togglePwd = function(inputId, btn) { const inp = document.getElementById(inputId); inp.type = inp.type === 'password' ? 'text' : 'password'; btn.style.color = inp.type === 'text' ? 'var(--accent)' : ''; };

// Auto sign-in popup: open through Angular so the signal stays in sync and the panel can be closed.
setTimeout(() => { if (!isLoggedIn) window.openPageLogin?.(); }, 15000);

}
