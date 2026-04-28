# 🍽️ Kantin Digital — Sistem Pemesanan Kantin Sekolah

> Proyek lomba coding · GoFood versi sekolah · Delivery ke kelas · QRIS Payment

---

## 📁 Struktur File

```
kantin-digital/
│
├── index.html          # 🔐 Login siswa & penjual
├── order.html          # 🛒 Pilih menu & checkout
├── payment.html        # 💳 QRIS + konfirmasi bayar
├── tracking.html       # 📍 Status pesanan real-time
├── admin.html          # 🍳 Dashboard penjual
│
├── assets/
│   └── qris.png        # ← Upload gambar QRIS AllPay kamu di sini!
│
├── css/
│   └── style.css       # Design system lengkap
│
├── js/
│   └── firebase.js     # Firebase + data menu + helper functions
│
└── config/
    └── firebase-config.js  # ← ISI CONFIG FIREBASE KAMU DI SINI!
```

---

## 🚀 SETUP (5 Langkah)

### 1. Buat Project Firebase
1. Buka https://console.firebase.google.com
2. Klik **"Create a project"**
3. Beri nama: `kantin-digital`
4. Aktifkan **Google Analytics** (opsional)
5. Klik Continue → selesai

### 2. Setup Firestore Database
1. Di sidebar kiri, klik **Firestore Database**
2. Klik **Create database**
3. Pilih **Start in test mode** (untuk development)
4. Pilih lokasi: `asia-southeast1` (Singapore)
5. Klik Enable

### 3. Ambil Config Firebase
1. Klik ⚙️ **Project settings** (gear icon)
2. Scroll ke bawah → **Your apps**
3. Klik ikon **Web (`</>`)**
4. Daftarkan app: beri nama `kantin-digital-web`
5. Copy **firebaseConfig** yang muncul

### 4. Isi Config
Buka `config/firebase-config.js`, ganti semua `"GANTI_DENGAN_..."`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "kantin-digital-xxx.firebaseapp.com",
  projectId: "kantin-digital-xxx",
  storageBucket: "kantin-digital-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 5. Upload QRIS
- Taruh gambar QRIS AllPay kamu di folder `assets/`
- Beri nama file: `qris.png`
- (Jika tidak ada, sistem otomatis pakai QR placeholder)

---

## 🌐 Deploy ke Internet (GRATIS)

### Opsi A: Firebase Hosting (Recommended)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Init di folder project
firebase init hosting

# Deploy!
firebase deploy
```

### Opsi B: Netlify (Drag & Drop)
1. Buka https://netlify.com
2. Login / daftar gratis
3. Drag & drop folder `kantin-digital/` ke dashboard
4. ✅ Langsung online dengan URL!

### Opsi C: Vercel
1. Buka https://vercel.com
2. Connect GitHub repository
3. Auto-deploy setiap push!

---

## 🔐 Login Admin
- **Username:** `admin`
- **Password:** `kantin123`

> Ganti di `js/firebase.js` bagian `ADMIN_CREDENTIALS`

---

## 🍱 Edit Menu Makanan
Buka `js/firebase.js`, cari `MENU_ITEMS`:

```javascript
export const MENU_ITEMS = [
  {
    id: "m1",
    nama: "Nasi Goreng Spesial",
    harga: 8000,
    kategori: "Makanan",  // Makanan / Minuman / Snack
    emoji: "🍗",
    img: "URL_GAMBAR_MAKANAN",
  },
  // Tambah menu baru di sini...
];
```

---

## 📱 Flow Lengkap

```
[index.html]  Login siswa (nama + kelas) atau admin (user + pass)
     ↓
[order.html]  Pilih menu, atur jumlah, checkout + eco mode
     ↓
Firebase      Order dibuat dengan status: waiting_payment
     ↓
[payment.html] Scan QRIS, transfer, klik "Sudah Bayar"
     ↓
Firebase      Status berubah ke: paid
     ↓
[tracking.html] Siswa pantau status real-time
     ↕ (real-time sync)
[admin.html]  Admin lihat order → klik Proses → Kirim → Selesai
```

---

## ✨ Fitur Unggulan

| Fitur | Keterangan |
|-------|------------|
| 🔄 Real-time update | Firebase Firestore onSnapshot |
| 💳 QRIS Payment | Integrasi QRIS AllPay statis |
| 🌱 Eco Mode | Diskon Rp 500 bawa tempat sendiri |
| 📊 Statistik | Omzet + jumlah order otomatis |
| 🎉 Confetti | Animasi saat order selesai |
| 📍 Delivery tracking | Status dari dapur ke kelas |
| 🔐 Role-based auth | Siswa vs Admin terpisah |
| 📱 Mobile-first | Responsive semua ukuran layar |

---


1. **Demo live** — deploy ke Netlify/Firebase sebelum presentasi
2. **Persiapkan skenario** — 1 siswa order + 1 admin di HP berbeda, tunjukkan real-time sync
3. **Ceritakan konsep** — antrian kantin = masalah nyata siswa
4. **Eco feature** — nilai tambah sustainability / lingkungan
5. **Statistik omzet** — tunjukkan value untuk penjual
