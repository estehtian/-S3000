# Somay & Esteh Tian — Futuristic 3000

Website katalog dan pemesanan statis untuk GitHub Pages. Dibuat dengan HTML, CSS, dan JavaScript tanpa proses build.

## Jalankan lokal
Buka `index.html`, atau jalankan server lokal dari root:

```bash
python -m http.server 8000
```

Lalu buka http://localhost:8000.

## Pengaturan sebelum publikasi
1. Edit `assets/js/config.js` dan isi `whatsappNumber` dengan nomor bisnis format internasional, tanpa `+`, spasi, atau angka 0 awal. Nomor belum diisi secara default.
2. Periksa dan sesuaikan harga, deskripsi, serta stok contoh di `assets/js/products.js`.
3. Ganti informasi kontak/alamat contoh dengan informasi bisnis yang sudah terverifikasi.
4. Tambahkan foto produk ke folder `assets/images/somay/` dan `assets/images/esteh/`, lalu masukkan path-nya pada katalog.

## Fitur
- Halaman beranda, menu, kategori Somay dan Esteh, paket, promo, galeri, tentang, kontak, lokasi, FAQ, dan blog.
- Pencarian/filter katalog, keranjang yang disimpan di localStorage, dan ringkasan checkout WhatsApp.
- Admin katalog lokal untuk tambah/edit/hapus serta ekspor/impor data JSON.
- Tata letak responsif dan dukungan prefers-reduced-motion.

## Batasan dan keamanan
- Admin demo hanya menyimpan data di localStorage browser/perangkat yang sedang dipakai. Tidak ada autentikasi dan data tidak dibagikan antarperangkat. Jangan gunakan halaman ini untuk data sensitif atau operasional multi-admin.
- Checkout hanya membuat pesan WhatsApp; pesanan, pembayaran, dan perubahan stok tidak dicatat di server.
- Untuk produksi, gunakan backend/database, autentikasi admin, validasi harga/stok di server, dan kebijakan akses yang sesuai. Jangan menaruh secret/service-role key di JavaScript publik.

## Struktur proyek
- `index.html` — beranda.
- `pages/` — halaman publik.
- `assets/css/` — stylesheet utama dan animasi.
- `assets/js/` — konfigurasi, katalog, dan interaksi storefront.
- `assets/images/` — logo dan aset visual.
- `admin/` — pengelolaan katalog demo lokal.
- `data/` — contoh katalog JSON.
- `docs/` — panduan publikasi dan admin.
- `supabase/` — rancangan skema/policy, belum terhubung ke aplikasi.

## GitHub Pages
Repository Settings → Pages → Deploy from a branch → pilih branch yang digunakan dan folder `/(root)`. Setelah workflow/deployment selesai, buka URL Pages repository.
