# 📄 PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Proyek:** Website Profil & Informasi Publik GPIB Jemaat Hosiana Jakarta
**Domain:** `gpibhosianajakarta.org`
**Status:** Perencanaan (Planning)
**Tanggal:** Agustus 2026

---

## 1. Ringkasan Eksekutif (Executive Summary)
Proyek ini bertujuan untuk membangun situs web publik (Front-end) untuk GPIB Jemaat Hosiana Jakarta yang menyajikan informasi krusial jemaat (jadwal, warta, profil, pengumuman). Untuk efisiensi pengembangan dan performa maksimal, sistem ini menggunakan **Payload CMS** yang terintegrasi secara *native* di dalam kerangka kerja Next.js. Pendekatan *fullstack* ini memungkinkan pengelolaan konten dan penyajian *website* berjalan dalam satu ekosistem yang terpadu.

## 2. Arsitektur Teknologi (Tech Stack)
*   **Front-end & Backend (Fullstack):** Next.js (App Router) terintegrasi dengan Payload CMS.
*   **UI Components:** Shadcn UI (komponen modular) dengan fungsionalitas murni tanpa animasi berat.
*   **Database & Storage:** PostgreSQL (Supabase) & Cloudflare R2 (Penyimpanan PDF Warta/Tata Ibadah via *Payload S3 Plugin*).
*   **Infrastruktur & Deployment:** VPS Docker (Satu eksternal network dengan aplikasi portal), Cloudflare Tunnel (Zero Trust), terintegrasi dengan *pipeline* CI/CD GitHub Actions.

## 3. Panduan Desain (UI/UX Guidelines)
*   **Prinsip Utama:** *Mobile-first* (Sangat responsif untuk HP) dan mudah diakses oleh berbagai kalangan usia jemaat. Fokus utama adalah pada penyampaian informasi yang cepat, terstruktur, dan akurat.
*   **Aesthetic "Simple & Informative":** Desain yang minimalis, fungsional, dan rapi. Mengutamakan hierarki visual yang jelas, tipografi yang tegas untuk kemudahan membaca (*readability*), pemanfaatan ruang kosong (*whitespace*) yang lega, serta meminimalkan efek transisi atau bayangan yang berlebihan.
*   **Branding Visual:** Implementasi antarmuka akan sejalan dengan identitas visual gereja. Menggunakan palet profesional (latar belakang bersih, teks gelap dengan kontras tinggi untuk aksesibilitas, serta aksen warna korporat/gereja pada elemen tombol dan tautan).

---

## 4. Ruang Lingkup Fitur (Feature Requirements)

### 4.1. Halaman Utama (Hero Section)
*   **Front-end:** Penampil gambar gedung gereja dalam bentuk *Image Carousel*. Ditutupi (*overlay*) oleh lapisan gelap gradasi tipis, teks sambutan statis yang lugas dan mudah dibaca, serta tombol CTA (*Call to Action*) utama yang menonjol secara visual.
*   **Back-end (Payload CMS):** Koleksi (*Collection*) atau *Globals* untuk mengunggah gambar *carousel*, mengubah teks sambutan, dan mengatur status aktif.

### 4.2. Jadwal Ibadah
*   **Front-end:** Menampilkan jadwal ibadah Hari Minggu dan Kategorial dalam bentuk daftar atau kartu informasi yang rapi (waktu, lokasi, pelayan firman).
*   **Back-end (Payload CMS):** Modul koleksi CRUD untuk jadwal ibadah.

### 4.3. Arsip Dokumen (Tata Ibadah & Warta Jemaat)
*   **Front-end:** Halaman/komponen tabel fungsional untuk mengunduh PDF Tata Ibadah dan Warta Jemaat. Wajib memiliki fitur *Historical Backtrack* (penomoran halaman / *pagination* dan filter/pencarian arsip lama).
*   **Back-end (Payload CMS):** Modul unggah *media* (PDF). *File* otomatis masuk ke Cloudflare R2 menggunakan *plugin storage* dan URL-nya tersimpan di *database*.

### 4.4. Profil Gereja
*   **Front-end:** Menampilkan Visi & Misi, Sejarah GPIB & Hosiana, Pemahaman Iman, Susunan PHMJ, serta susunan Unit Missioner / Pelkat dengan tata letak artikel yang nyaman dibaca (*reader-friendly*).
*   **Back-end (Payload CMS):** Modul *Rich Text Editor* (Lexical) untuk memperbarui konten teks profil tanpa harus *hardcode*.

### 4.5. Headline Pengumuman
*   **Front-end:** Papan pengumuman (*notice board*) atau *banner* statis di halaman utama untuk informasi mendesak/terkini. 
*   **Back-end (Payload CMS):** Modul koleksi pengumuman dengan parameter "Tanggal Berakhir" (*Expiry Date*) agar pengumuman otomatis hilang dari *website* setelah tanggal terlewati.

### 4.6. Tema GPIB
*   **Front-end:** Menampilkan blok informasi khusus dengan tipografi tebal untuk Tema Tahunan, Jangka Panjang, dan Jangka Pendek.
*   **Back-end (Payload CMS):** Pengaturan *Globals* untuk teks sederhana guna mengubah tema.

### 4.7. Informasi Finansial & Kontak
*   **Front-end:** Bagian *Footer* terstruktur yang menampilkan Informasi Rekening Gereja, Alamat, Peta tertanam (*embedded map*), dan Tautan Media Sosial.
*   **Back-end (Payload CMS):** Konfigurasi *Globals* berbasis *Key-Value* untuk memperbarui nomor rekening atau tautan media sosial.

---

## 5. Rencana Eksekusi (Roadmap / Next Steps)

**Fase 1: Inisialisasi Next.js & Payload CMS**
1.  Membuat proyek Next.js baru yang terintegrasi dengan Payload CMS versi 3.
2.  Menghubungkan Payload CMS dengan *database* PostgreSQL di Supabase.
3.  Mengonfigurasi *Payload S3 Plugin* agar terhubung dengan *bucket* Cloudflare R2 untuk penyimpanan berkas *media* (PDF & Gambar).

**Fase 2: Pembuatan Skema Data (Collections & Globals)**
1.  Mendefinisikan *Collections* di Payload untuk: `JadwalIbadah`, `DokumenGereja`, `Pengumuman`, dan `HeroCarousel`.
2.  Mendefinisikan *Globals* di Payload untuk pengaturan situs tunggal: `TemaGereja`, `ProfilGereja`, dan `GeneralSettings`.
3.  Menyiapkan akun admin awal untuk staf tata usaha guna menguji proses *input* data di panel CMS.

**Fase 3: Pengembangan Frontend (UI/UX)**
1.  Menginisialisasi Shadcn UI dan integrasi Tailwind CSS.
2.  Membangun tata letak halaman dan komponen statis dengan desain "Simple & Informative", berfokus pada aksesibilitas dan kejelasan.
3.  Mengkonsumsi data dari Payload CMS menggunakan *Local API* milik Payload untuk dirender di React Server Components (RSC) Next.js.

**Fase 4: Deployment Infrastruktur**
1.  Membuat `Dockerfile` *multi-stage* untuk aplikasi Next.js/Payload.
2.  Memasukkan kontainer aplikasi tersebut ke jaringan Docker di VPS.
3.  Mengatur rute `gpibhosianajakarta.org` di Cloudflare Zero Trust ke *port* kontainer yang baru berjalan.