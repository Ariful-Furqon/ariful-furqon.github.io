# ariful-furqon.github.io

Personal academic website for Muhammad Ariful Furqon — Dosen (Asisten Ahli) Program Studi Informatika, Universitas Jember, dan Kandidat Doktor (PhD) di Japan Advanced Institute of Science and Technology (JAIST).

## Struktur

- `index.html` — halaman Bahasa Indonesia, sekaligus **sumber kebenaran** untuk semua bahasa.
- `en/index.html`, `ja/index.html` — hasil generate, **jangan diedit manual**.
- `i18n.json` — seluruh string terjemahan (teks bertanda `data-i18n`, metadata head, dan JSON-LD).
- `tools/build.py` — generator halaman EN/JA.

## Cara memperbarui isi situs

1. Edit `index.html` (versi Indonesia). Teks yang perlu diterjemahkan ditandai `data-i18n="<key>"`.
2. Tambahkan/ubah nilai key tersebut untuk `id`, `en`, dan `ja` di `i18n.json`.
3. Jalankan generator, lalu commit ketiga halaman sekaligus:

```sh
python tools/build.py
```

Generator akan berhenti dengan pesan error jika ada key yang belum diterjemahkan,
atau jika markup yang diharapkan di `index.html` tidak ditemukan.
