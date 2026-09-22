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
