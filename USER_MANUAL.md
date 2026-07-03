# Buku Panduan Pengguna (User Manual) - Tanya AI

Tanya AI adalah chatbot berbasis kecerdasan buatan yang dirancang khusus untuk pendidikan pertanian, memberikan solusi presisi untuk penanganan hama, strategi budidaya, dan pertanyaan agrikultur lainnya.

---

## 1. Panduan Untuk Pengguna (Siswa / Guru)

### A. Memulai Percakapan (Chat)
1. Setelah login, navigasikan ke menu **Tanya AI** atau **Chat**.
2. Anda akan melihat halaman selamat datang dengan beberapa saran pertanyaan (contoh: *Atasi Hama Wereng*, *Nutrisi Hidroponik*). Klik salah satu untuk mulai otomatis, atau ketik pertanyaan Anda pada kolom input di bagian bawah layar.
3. Klik tombol **Kirim (Send)** berlogo pesawat kertas.
4. AI akan merespons pertanyaan Anda dalam beberapa detik. Percakapan ini dibatasi hanya untuk topik pertanian.

### B. Mengirim Lampiran
1. Klik ikon **Penjepit Kertas (Paperclip)** di sebelah kolom input.
2. Pilih file atau gambar yang relevan dengan pertanyaan Anda (misalnya foto daun yang terserang penyakit).
3. Ketik konteks/pertanyaan Anda, lalu kirim.

### C. Memberikan Feedback (Masukan)
Setiap jawaban AI dilengkapi dengan tombol penilaian di sudut pesan:
- Klik **👍 (Thumbs Up)** jika jawaban akurat dan membantu.
- Klik **👎 (Thumbs Down)** jika jawaban keliru atau tidak relevan. Sebuah jendela pop-up akan muncul; Anda dapat menuliskan alasan mengapa jawaban tersebut salah, lalu klik **Kirim Feedback**.

### D. Melihat Riwayat Percakapan
1. Navigasikan ke menu **Riwayat Chat**.
2. Anda akan melihat daftar semua percakapan sebelumnya. Klik salah satu untuk membuka dan melanjutkan obrolan tersebut.

---

## 2. Panduan Untuk Administrator

Sebagai Admin, Anda memiliki akses ke menu khusus untuk memantau kinerja bot dan mengatur konfigurasi AI.

### A. Dashboard Analitik
Masuk ke menu **Analytics** untuk memantau indikator kinerja utama (KPI) secara *real-time*:
- **Total Chat Hari Ini:** Menampilkan jumlah interaksi antara siswa dan AI dalam 24 jam terakhir.
- **Penggunaan Token AI:** Memantau berapa banyak token (konsumsi API) yang telah dihabiskan. Ini berguna untuk memperkirakan biaya operasional dan memutuskan apakah butuh *upgrade* model AI.
- **Tabel Monitoring:** Melihat aktivitas percakapan terbaru dari para siswa beserta konteksnya.
- **Alerts Perlu Perhatian:** Menampilkan log *feedback negatif* (Thumbs Down) yang dikirimkan oleh siswa beserta komentar alasan kesalahannya, agar Admin dapat mengevaluasi akurasi prompt sistem AI.

### B. Pengaturan AI (AI Settings)
Masuk ke menu **Pengaturan AI** untuk mengubah perilaku bot:
1. **Model Utama (Default Model):** Pilih model dasar yang digunakan (contoh: `gemini-3.5-flash`).
2. **System Prompt:** Bagian terpenting untuk mengatur batasan bot. Anda dapat menginstruksikan bot di sini agar *hanya* menjawab seputar topik pertanian dan menolak topik di luar itu.
3. **Max Tokens & Temperature:** Sesuaikan kepanjangan maksimal balasan (Max Tokens) dan tingkat kreativitas/variasi jawaban (Temperature).
4. **API Key:** Pastikan API Key Google Gemini (Prism) Anda aktif.

---

## 3. Catatan Teknis (Troubleshooting)

- **AI Gagal Menjawab / Error Jaringan:** Pastikan perangkat Anda terhubung internet, dan API Key yang tersimpan di `.env` (atau di pengaturan) masih memiliki limit kuota yang valid.
- **Sertifikat SSL Error (cURL error 60):** Jika Anda menjalankan ini di *localhost* Windows, pastikan PHP Anda telah dikonfigurasi dengan file `cacert.pem` yang valid di `php.ini`. (Ini sudah dinonaktifkan via `verify => false` pada mode *development*).
