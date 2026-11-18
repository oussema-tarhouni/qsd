// @ts-nocheck
export function initHero(){
// Hero slider
const slides = [
  { img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80', tag: 'Artificial Intelligence', title: 'OpenAI Unveils GPT-5: The Most Powerful Language Model Ever Built', author: 'Sarah Mitchell', time: '2 hours ago' },
  { img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80', tag: 'Markets', title: 'S&P 500 Surges Past 6,000 as Fed Signals Historic Rate Pause', author: 'James Chen', time: '45 min ago' },
  { img: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&q=80', tag: 'World', title: 'Middle East Crisis: Iran Launches Strategic Missile Strikes on Israel', author: 'Nadia Rahimi', time: '1 hour ago' },
  { img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80', tag: 'Technology', title: 'Apple Vision Pro 2 Redefines Spatial Computing with Neural Display', author: 'David Park', time: '3 hours ago' },
  { img: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200&q=80', tag: 'Space', title: 'SpaceX Starship Completes First Crewed Lunar Orbit — A Historic Milestone', author: 'Amina Osei', time: '5 hours ago' },
];
let heroIndex = 0;
const heroImg = document.getElementById('heroImg');
const heroTag = document.getElementById('heroTag');
const heroTitle = document.getElementById('heroTitle');
const heroAuthor = document.getElementById('heroAuthor');
const heroTime = document.getElementById('heroTime');
const dotsEl = document.getElementById('heroDots');

slides.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'hero-dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goSlide(i));
  dotsEl.appendChild(d);
});

function goSlide(i) {
  heroIndex = i;
  const s = slides[i];
  heroImg.style.opacity = '0';
  setTimeout(() => {
    heroImg.src = s.img; heroTag.textContent = s.tag;
    heroTitle.textContent = s.title; heroAuthor.textContent = s.author; heroTime.textContent = s.time;
    heroImg.style.opacity = '1';
  }, 200);
  document.querySelectorAll('.hero-dot').forEach((d, j) => d.classList.toggle('active', j === i));
}
heroImg.style.transition = 'opacity .25s ease';
const __t = setInterval(() => goSlide((heroIndex + 1) % slides.length), 3000);


return () => clearInterval(__t);
}
