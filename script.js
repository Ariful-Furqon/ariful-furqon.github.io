document.getElementById('year').textContent = new Date().getFullYear();

const pubList = document.getElementById('pub-list');
const pubToggle = document.getElementById('pub-toggle');

if (pubList && pubToggle) {
  pubToggle.addEventListener('click', () => {
    const collapsed = pubList.classList.toggle('collapsed');
    pubToggle.setAttribute('aria-expanded', String(!collapsed));
    pubToggle.textContent = collapsed ? 'Tampilkan semua 52 publikasi ▾' : 'Tampilkan lebih sedikit ▴';
  });
}
