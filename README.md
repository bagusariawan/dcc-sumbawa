# ⚡ Portofolio Electrical Engineer & Web Database Developer

Website portofolio interaktif dan modern yang dirancang khusus untuk **Electrical Engineer** yang menjembatani perangkat keras kelistrikan (sensor, mikrokontroler ESP32/STM32, PLC) dengan sistem database terpusat dan antarmuka dashboard web monitoring real-time.

---

## 🚀 Cara Menjalankan Website (Sangat Mudah!)

Website ini dirancang dengan konsep **Zero-Dependency** (tidak memerlukan Node.js, npm, atau instalasi server rumit apa pun):

1. Buka folder `FORTOFOLIO` di komputer Anda.
2. **Klik dua kali (double-click)** pada file `index.html`.
3. Website akan langsung terbuka di browser (Google Chrome, Microsoft Edge, Mozilla Firefox, dsb.) secara sempurna!

> *Opsional*: Jika Anda menggunakan VS Code atau Antigravity, Anda juga bisa klik kanan `index.html` lalu pilih **"Open with Live Server"**.

---

## 🛠️ Fitur Unggulan & Animasi

1. **Background Partikel & Sirkuit Listrik Interaktif (`js/canvas-bg.js`)**:
   - Menghasilkan node-node kelistrikan yang mengambang dan terhubung dengan garis kilat cyan.
   - Merespons pergerakan kursor mouse dengan koneksi dinamis dan percikan elektron (*sparks*).
2. **Widget Simulasi Live "Sensor to Database" (`#live-simulator`)**:
   - Memperagakan secara visual keahlian utama Anda: pembacaan sensor listrik (tegangan, arus beban, daya aktif, frekuensi, power factor).
   - Dilengkapi grafik gelombang tegangan real-time (**Chart.js**).
   - Tombol **"Trigger & Catat Log"** dan **"Mulai Auto-Streaming"** yang memicu animasi transmisi paket data (*Sensor ➔ ESP32 ➔ REST API ➔ Database Table*) dan menambahkan baris data baru ke tabel log secara langsung!
3. **Efek Pengetikan Teks Dinamis (*Typewriter*)**:
   - Menampilkan peran Anda bergantian di bagian Hero (*Electrical Engineer*, *IoT & Web Telemetry Developer*, *Sensor-to-Database Specialist*, dll.).
4. **Galeri Proyek dengan Filter Kategori & Modal Popup**:
   - Filter instan: Semua, IoT & Web Monitoring, Database Logging, Otomasi & SCADA.
   - Modal detail menampilkan diagram alur arsitektur sistem (*Hardware to Database*), poin keunggulan, dan tag teknologi.
5. **Dark / Light Mode Toggle**:
   - Mode cyber dark futuristik dengan aksen neon cyan dan amber, serta opsi mode terang yang bersih.
6. **Form Kontak Terintegrasi WhatsApp**:
   - Pengunjung dapat mengisi nama dan pesan yang secara otomatis diformat dan diteruskan ke WhatsApp Anda.

---

## ✏️ Cara Menyesuaikan Data Pribadi Anda

Semua data teks, profil, keahlian, dan proyek dipisahkan secara rapi di dalam file **`js/data.js`**:

1. Buka file `js/data.js` menggunakan text editor apa saja (Notepad, VS Code, dll.).
2. Ubah bagian yang diinginkan:
   - **`personal.name`**: Nama lengkap Anda.
   - **`personal.whatsapp`**: Nomor WhatsApp aktif (contoh: `6281234567890` tanpa tanda `+`).
   - **`personal.email`**: Alamat email Anda.
   - **`personal.linkedin`** & **`personal.github`**: Tautan profil Anda.
   - **`skills`**: Tambahkan atau ubah persentase kemahiran dan nama keahlian Anda.
   - **`projects`**: Tambahkan judul, gambar, deskripsi, dan alur arsitektur proyek nyata Anda.
3. Simpan file (`Ctrl + S`), lalu refresh browser Anda (`F5`). Semua perubahan akan langsung muncul!

---

## 🌐 Cara Mempublikasikan Website Secara Online (Gratis)

### Opsi 1: GitHub Pages (Paling Direkomendasikan)
1. Buat repository baru di [GitHub](https://github.com) dengan nama misalnya `portofolio`.
2. Upload semua file dari folder ini (`index.html`, folder `css`, `js`, dll.).
3. Buka menu **Settings** di repository GitHub ➔ pilih tab **Pages**.
4. Pada bagian *Branch*, pilih `main` / `root` lalu klik **Save**.
5. Website Anda akan aktif secara publik di alamat: `https://username.github.io/portofolio/`

### Opsi 2: Vercel / Netlify (Cukup Drag & Drop)
1. Buka situs [Netlify Drop](https://app.netlify.com/drop) atau [Vercel](https://vercel.com).
2. Tarik dan lepas (*drag & drop*) seluruh folder `FORTOFOLIO` ke halaman tersebut.
3. Dalam beberapa detik, Anda akan mendapatkan link website gratis yang bisa langsung dibagikan di CV atau profil LinkedIn Anda!
