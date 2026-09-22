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

// Dark / light theme toggle (initial value is set inline in <head> to avoid a flash)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
}
