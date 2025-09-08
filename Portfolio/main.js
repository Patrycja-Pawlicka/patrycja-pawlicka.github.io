// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Set active nav link on scroll
const sections = ['#home', '#about', '#contact'].map(s => document.querySelector(s));
const linkMap = {};
document.querySelectorAll('nav a[href^="#"]').forEach(a => {
  linkMap[a.getAttribute('href')] = a;
});

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = '#' + entry.target.id;
    if (entry.isIntersecting) {
      // remove old active
      Object.values(linkMap).forEach(l => l.classList.remove('active'));
      // set new active
      if (linkMap[id]) linkMap[id].classList.add('active');
    }
  });
}, { threshold: 0.6 });

sections.forEach(s => s && sectionObserver.observe(s));

// Add shadow to nav when scrolling
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Reveal-on-scroll for content blocks
const revealTargets = document.querySelectorAll('.two-column, #contact');
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target); // reveal once
    }
  });
}, { threshold: 0.2 });

revealTargets.forEach(el => revealObserver.observe(el));

// Typewriter effect on hero heading
(function typeWriter() {
  const h1 = document.querySelector('.hero-content h1');
  if (!h1) return;
  const full = h1.textContent.trim();
  let i = 0;
  h1.textContent = '';
  const tick = () => {
    h1.textContent += full.charAt(i);
    i++;
    if (i < full.length) setTimeout(tick, 60);
  };
  tick();
})();

// Pause background video when tab is hidden (saves CPU/battery)
const bgVideo = document.getElementById('bg-video');
document.addEventListener('visibilitychange', () => {
  if (!bgVideo) return;
  if (document.hidden) bgVideo.pause();
  else bgVideo.play().catch(() => {});
});

// Back-to-top button logic
const backBtn = document.getElementById('backToTop');
const toggleBackBtn = () => {
  if (window.scrollY > 600) backBtn.classList.add('show');
  else backBtn.classList.remove('show');
};
window.addEventListener('scroll', toggleBackBtn);
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
toggleBackBtn();
