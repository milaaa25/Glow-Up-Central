# GLOW Up Central - Backend (Bagian Mila)

Backend untuk fitur **Tim**, **FAQ**, dan **Kontak** menggunakan Node.js + Express + MySQL (XAMPP).

## Struktur Folder

```
backend-mila/
├── config/
│   └── db.js              # Koneksi ke database MySQL
├── controllers/
│   ├── teamController.js   # Logic untuk Tim
│   ├── faqController.js    # Logic untuk FAQ
│   └── contactController.js # Logic untuk Kontak
├── routes/
│   ├── teamRoutes.js
│   ├── faqRoutes.js
│   └── contactRoutes.js
├── server.js               # Entry point
├── package.json
└── .env.example
```

## Cara Install & Jalankan

### 1. Install dependencies
```bash
npm install
```

### 2. Setup file `.env`
Copy `.env.example` jadi `.env`, sesuaikan kalau perlu (default sudah pas untuk XAMPP):
```bash
cp .env.example .env
```

### 3. Pastikan XAMPP MySQL sudah jalan
Buka XAMPP Control Panel → klik **Start** di baris MySQL, dan pastikan database `glow_up_central` sudah diimport.

### 4. Jalankan server
```bash
npm run dev
```
Server jalan di `http://localhost:5000`

## Daftar Endpoint API

### Tim (`/api/team`)
| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/team` | Ambil semua anggota tim |
| GET | `/api/team/:id` | Ambil 1 anggota tim |
| POST | `/api/team` | Tambah anggota tim baru |
| PUT | `/api/team/:id` | Update anggota tim |
| DELETE | `/api/team/:id` | Hapus anggota tim |

**Contoh body POST/PUT:**
```json
{
  "name": "Mila",
  "role": "Branding & Konten",
  "photo": "/images/o2.jpg",
  "email": "mila@example.com",
  "city": "Yogyakarta",
  "pages": "Home · Tentang · Tim"
}
```

### FAQ (`/api/faq`)
| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/faq` | Ambil semua FAQ |
| GET | `/api/faq/:id` | Ambil 1 FAQ |
| POST | `/api/faq` | Tambah FAQ baru |
| PUT | `/api/faq/:id` | Update FAQ |
| DELETE | `/api/faq/:id` | Hapus FAQ |

**Contoh body POST/PUT:**
```json
{
  "questions": "Apakah produk GLOW aman untuk kulit sensitif?",
  "answer": "Ya, semua produk sudah melalui seleksi ketat."
}
```

### Kontak (`/api/contact`)
| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/api/contact` | Submit pesan dari form kontak |
| GET | `/api/contact` | Lihat semua pesan (admin) |
| DELETE | `/api/contact/:id` | Hapus pesan |

**Contoh body POST** (sesuai field di `Kontak.jsx`):
```json
{
  "nama": "Naswa Jamila",
  "email": "naswa@example.com",
  "subjek": "Pertanyaan Produk",
  "pesan": "Halo, saya ingin bertanya tentang produk skincare untuk kulit kering."
}
```

> Validasi otomatis: nama & email wajib diisi, email harus format valid, subjek harus salah satu dari `Pertanyaan Produk`, `Pemesanan`, `Keluhan`, `Kerja Sama`, `Lainnya`, dan pesan minimal 20 karakter — ini sesuai validasi yang ada di `Kontak.jsx`.

## Cara Tes API

Bisa pakai **Postman**, **Thunder Client** (extension VS Code), atau langsung dari browser untuk endpoint GET.

Contoh tes cepat di terminal:
```bash
curl http://localhost:5000/api/team
curl http://localhost:5000/api/faq
```

## Cara Connect ke Frontend React

Di kode React (misalnya `Tim.jsx`, `Kontak.jsx`), ganti pemanggilan API jadi:
```js
axios.get('http://localhost:5000/api/team')
```

Pastikan backend (port 5000) dan frontend (biasanya port 5173 untuk Vite) jalan bersamaan.
