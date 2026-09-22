document.getElementById('year').textContent = new Date().getFullYear();

// Language is decided by the page itself (/, /en/, /ja/ are separate documents),
// so the switcher in the nav is a set of plain links — nothing to do here.

const pubList = document.getElementById('pub-list');
const pubToggle = document.getElementById('pub-toggle');

if (pubList && pubToggle) {
  pubToggle.addEventListener('click', () => {
    const collapsed = pubList.classList.toggle('collapsed');
    pubToggle.setAttribute('aria-expanded', String(!collapsed));
    pubToggle.textContent = collapsed ? pubToggle.dataset.show : pubToggle.dataset.hide;
  });
}

// "Print / Download CV": the page's print stylesheet *is* the CV layout,
// so the browser's print dialog (Save as PDF) is all that is needed.
const cvPrint = document.getElementById('cv-print');
if (cvPrint) {
  cvPrint.addEventListener('click', () => window.print());
}

// Highlight the nav link for the section currently on screen.
const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
if (navLinks.length && 'IntersectionObserver' in window) {
  const linkFor = new Map();
  const sections = [];
  navLinks.forEach((a) => {
    const section = document.getElementById(a.getAttribute('href').slice(1));
    if (section) {
      linkFor.set(section, a);
      sections.push(section);
    }
  });

  const visible = new Set();
  const setCurrent = () => {
    // Several sections can be on screen at once; the topmost one wins.
    const current = sections.find((s) => visible.has(s));
    navLinks.forEach((a) => {
      const on = current && linkFor.get(current) === a;
      a.classList.toggle('is-current', !!on);
      if (on) {
        a.setAttribute('aria-current', 'true');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        visible.add(e.target);
      } else {
        visible.delete(e.target);
      }
    });
    setCurrent();
  }, { rootMargin: '-64px 0px -55% 0px' });
  sections.forEach((s) => observer.observe(s));
}

// Dark / light theme toggle (initial value is set inline in <head> to avoid a flash)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
  // The theme itself is applied in <head>; sync the button's pressed state here.
  themeToggle.setAttribute('aria-pressed', String(isDark()));
  themeToggle.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
}
