# ⛪ Website Profil & Informasi Publik GPIB Jemaat Hosiana Jakarta

Situs web profil & informasi publik untuk **GPIB Jemaat Hosiana Jakarta** (`gpibhosianajakarta.org`). Dibangun dengan arsitektur modern fullstack menggunakan **Next.js (App Router)** terintegrasi secara *native* dengan **Payload CMS v3**, database **PostgreSQL (Supabase)**, dan penyimpanan media **Cloudflare R2** (via S3 Storage Plugin).

---

## 🚀 Fitur Utama

- **Panel Admin CMS Terintegrasi (/admin):** Pengelolaan konten fleksibel & aman berbasis Payload CMS v3.
- **Hero Carousel:** Banner dinamis dengan urutan, gambar sambutan, dan status aktif.
- **Jadwal Ibadah:** Manajemen jadwal ibadah hari Minggu dan kategorial (waktu, lokasi, pelayan firman).
- **Arsip Dokumen (Tata Ibadah & Warta Jemaat):** Unggah PDF langsung ke Cloudflare R2 dengan riwayat tanggal & kategori.
- **Headline Pengumuman:** Pengumuman terkini dengan filter tanggal berakhir (*expiry date*).
- **Profil Gereja:** Pengelolaan Visi & Misi, Sejarah, Pemahaman Iman, PHMJ, dan Pelkat menggunakan *Lexical Rich Text Editor*.
- **Tema GPIB:** Pengaturan tema tahunan, jangka panjang, dan jangka pendek.
- **Pengaturan Umum & Kontak:** Rekening bank/QRIS, alamat, Google Maps embed, dan tautan media sosial.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/)
- **CMS:** [Payload CMS v3](https://payloadcms.com/)
- **Database:** [PostgreSQL (Supabase)](https://supabase.com/) dengan `@payloadcms/db-postgres`
- **Media Storage:** [Cloudflare R2](https://www.cloudflare.com/products/r2/) dengan `@payloadcms/storage-s3`
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Rich Text:** Lexical Editor (`@payloadcms/richtext-lexical`)

---

## 📁 Struktur Proyek

```
profil-gereja/
├── src/
│   ├── app/
│   │   ├── (app)/                  # Frontend Next.js Public Pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   └── (payload)/              # Payload CMS Admin & API Routes
│   │       ├── admin/              # /admin UI
│   │       └── api/                # REST & GraphQL endpoints
│   ├── collections/                # Payload Collections
│   │   ├── Users.ts                # Auth collection
│   │   ├── Media.ts                # Upload collection (Cloudflare R2)
│   │   ├── JadwalIbadah.ts         # Worship schedules
│   │   ├── DokumenGereja.ts        # Warta & Tata Ibadah PDFs
│   │   ├── Pengumuman.ts           # Announcements
│   │   └── HeroCarousel.ts         # Homepage banners
│   ├── globals/                    # Payload Singletons (Globals)
│   │   ├── ProfilGereja.ts         # Church profile & vision/mission
│   │   ├── TemaGereja.ts           # Yearly themes
│   │   └── GeneralSettings.ts      # Church contact & financial info
│   ├── migrations/                 # PostgreSQL Database Migrations
│   ├── payload.config.ts           # Payload CMS configuration
│   └── payload-types.ts            # Auto-generated TypeScript types
├── .env.example                    # Template environment variables
├── package.json
└── tsconfig.json
```

---

## ⚙️ Persyaratan Sistem

- **Node.js:** `>= 18.x` (Direkomendasikan Node.js 20+)
- **npm** atau **pnpm**
- Akun **Supabase** (PostgreSQL Database)
- Akun **Cloudflare** (R2 Bucket)

---

## 📦 Panduan Instalasi & Menjalankan

### 1. Clone Repository
```bash
git clone https://github.com/reubenjanuardi/profil-gereja.git
cd profil-gereja
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` ke `.env`:
```bash
cp .env.example .env
```
Sesuaikan nilai variabel di dalam file `.env`:
```env
# Database Supabase (Format Pooler: postgres.<PROJECT_REF>:<PASSWORD>@<HOST>:<PORT>/postgres)
DATABASE_URI=postgresql://postgres.dwmmwwsbbeddzmazbycr:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
DB_SCHEMA=profil

# Payload CMS Secret Key
PAYLOAD_SECRET=your-secure-secret-key-at-least-32-characters

# Cloudflare R2 Storage (S3 Compatible)
S3_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=your-r2-access-key-id
S3_SECRET_ACCESS_KEY=your-r2-secret-access-key
S3_BUCKET=gereja-media
S3_REGION=auto

# Server URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 4. Jalankan Migrasi Database
```bash
npm run migrate
```

### 5. Jalankan Server Development
```bash
npm run dev
```

Akses aplikasi melalui browser:
- **Website Publik:** [http://localhost:3000](http://localhost:3000)
- **Panel Admin CMS:** [http://localhost:3000/admin](http://localhost:3000/admin) *(Buat akun admin pertama saat akses awal)*

---

## 📜 Script Tersedia

| Script | Keterangan |
| --- | --- |
| `npm run dev` | Menjalankan Next.js + Payload CMS dalam mode development |
| `npm run build` | Melakukan build produksi aplikasi |
| `npm run start` | Menjalankan build produksi |
| `npm run migrate` | Menjalankan migrasi database Payload ke PostgreSQL |
| `npm run migrate:create` | Membuat file migrasi baru berdasarkan perubahan skema |
| `npm run migrate:down` | Rollback migrasi database terakhir |
| `npm run generate:types` | Menghasilkan file definisi `payload-types.ts` |
| `npm run generate:importmap` | Memperbarui peta impor untuk Admin Panel |

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
