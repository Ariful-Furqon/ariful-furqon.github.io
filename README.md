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

## CV

Tidak ada berkas `cv.pdf` terpisah: halaman ini **adalah** CV-nya. Tombol
"Cetak / Unduh CV" di header memanggil dialog cetak browser (pilih *Save as PDF*),
dan blok `@media print` di `style.css` mengatur tata letaknya — daftar publikasi
dibuka penuh, navigasi/tombol disembunyikan, dan warna dipaksa kembali ke
palet terang agar terbaca di kertas. Jadi CV tidak pernah basi: cukup perbarui
halaman, CV ikut terbarui.

## Gambar

- Badge tautan profil di `img/` dipakai pada ukuran 36x36 px, jadi sisi
  terpanjangnya dibatasi 72 px (cukup untuk layar 2x). Setelah menambah logo
  baru, jalankan `python tools/optimize-images.py --write`.
- Avatar hero dilayani lewat `<picture>`: `img/avatar.webp` dengan
  `img/avatar.jpg` sebagai cadangan, keduanya 296 px (2x dari 148 px).
  Pemotongan lingkaran dikerjakan CSS (`object-fit: cover`), jadi rasio aslinya
  dibiarkan utuh.
- `img/Photograph.jpeg` ukuran penuh sengaja dipertahankan: berkas itu dipakai
  sebagai `og:image`/`twitter:image` dan tidak pernah diunduh pengunjung biasa.
  Kalau fotonya diganti, perbarui berkas ini **dan** buat ulang kedua avatar.
