# Aplikasi Chatbot AI Pertanian (Khusus SMK)

## Deskripsi Sistem
Sebuah platform chatbot edukasi berbasis Artificial Intelligence (AI) yang dikhususkan untuk menjawab, mengedukasi, dan memecahkan masalah di bidang pertanian. Sistem ini diimplementasikan menggunakan arsitektur pemisahan Backend API dan Frontend SPA dengan framework Laravel, React, dan library AI Prism, dirancang khusus untuk ekosistem Sekolah Menengah Kejuruan (SMK).

## 1. Daftar Fitur Aplikasi Komprehensif

### A. Modul Siswa (End-User)
- **Chat Interface Real-time**: Antarmuka obrolan yang interaktif dengan indikator typing, mirip dengan ChatGPT.
- **Manajemen Sesi Chat**: Kemampuan membuat obrolan baru (New Chat), menyimpan riwayat obrolan, dan mengganti nama sesi obrolan secara otomatis.
- **Prompt Starter (Rekomendasi Pertanyaan)**: Tombol cepat untuk pertanyaan umum (misal: "Cara atasi hama wereng", "Pemupukan hidroponik").
- **Export Chat**: Fitur untuk mengunduh riwayat obrolan menjadi PDF/Teks sebagai catatan belajar.
- **Feedback System**: Memberikan thumbs up atau thumbs down pada jawaban AI untuk bahan evaluasi guru.

### B. Modul Guru / Validator (Moderator)
- **Dashboard Analitik**: Melihat metrik penggunaan AI oleh siswa (topik paling banyak dicari, tren penyakit tanaman yang sering ditanyakan).
- **Knowledge Base Management (Manajemen Basis Pengetahuan)**:
  - Unggah dokumen (PDF modul sekolah, buku teks pertanian, jurnal).
  - Input artikel/teks manual.
  - Sistem akan otomatis memecah dokumen (chunking) dan mengubahnya menjadi vektor untuk referensi AI.
- **Monitoring Obrolan**: Melihat log pertanyaan siswa dan jawaban AI (untuk memastikan AI tidak berhalusinasi/keluar konteks).
- **Review Feedback**: Melihat jawaban AI yang diberi thumbs down oleh siswa dan melakukan koreksi pada basis pengetahuan.

### C. Modul Administrator
- **Manajemen Pengguna (CRUD)**: Mengelola data Admin, Guru, dan Siswa.
- **Manajemen Hak Akses**: Konfigurasi Role & Permission.
- **AI System Configuration**: 
  - Mengatur System Prompt utama (contoh: "Kamu adalah asisten guru pertanian SMK...").
  - Mengganti kunci API LLM.
  - Mengatur parameter AI (Temperature, Max Tokens).

## 2. Proses Bisnis (Business Process)

### A. Alur Ingesti Pengetahuan (Knowledge Ingestion Flow) - Oleh Guru
1. Guru mengunggah PDF Modul Pertanian ke sistem.
2. Sistem (Laravel Job/Queue) mengekstraksi teks dari PDF.
3. Teks dipotong menjadi bagian-bagian kecil (Chunking, misal per 500 kata).
4. Sistem memanggil OpenAI Embeddings API untuk mengubah teks menjadi angka vektor.
5. Vektor disimpan ke tabel `document_chunks` di database PostgreSQL (menggunakan pgvector).

### B. Alur Percakapan RAG (Retrieval-Augmented Generation) - Oleh Siswa
1. Siswa mengetik pertanyaan: "Bagaimana cara mengatasi busuk akar pada tanaman cabai?"
2. Sistem mengubah pertanyaan siswa menjadi vektor (Embedding).
3. Sistem melakukan pencarian kemiripan vektor (Vector Similarity Search) di PostgreSQL untuk mencari 3-5 referensi teks yang paling relevan dari dokumen yang diunggah guru.
4. Sistem menggunakan Prism untuk merakit prompt:
   - **System Prompt**: "Jawab hanya berdasarkan referensi berikut..."
   - **Konteks**: [Teks referensi dari database]
   - **User Prompt**: "Bagaimana cara mengatasi busuk akar..."
5. Prism mengirim permintaan ke LLM (OpenAI gpt-4o-mini).
6. LLM mengembalikan jawaban pertanian yang akurat.
7. Jawaban ditampilkan ke antarmuka siswa dan disimpan di riwayat log.

## 3. Struktur Data dan Master Data (Database Schema)
Sistem menggunakan PostgreSQL dengan tipe data relasional dan vektor.

### A. Master Data
- `roles` (id, name) -> Data: Admin, Guru, Siswa
- `permissions` (id, name)
- `agri_categories` (id, name, description) -> Data: Agribisnis Tanaman Pangan, Hortikultura, Perkebunan, Peternakan.
- `system_settings` (key, value) -> Data: active_llm_model, system_prompt, api_key.

### B. Tabel Pengguna & Akses
- `users`: id (UUID), name, email, nisn_nip (String, nullable), password, role_id.

### C. Tabel Transaksional Chatbot
- `chat_sessions`: id (UUID), user_id (FK), title (String), created_at, updated_at.
- `messages`: id (UUID), chat_session_id (FK), role (Enum: 'user', 'assistant', 'system'), content (Text), tokens_used (Integer), created_at.
- `message_feedbacks`: id (UUID), message_id (FK), rating (Enum: 'up', 'down'), student_note (Text), created_at.

### D. Tabel Basis Pengetahuan (Knowledge Base / RAG)
- `documents`: id (UUID), title (String), agri_category_id (FK), file_path (String), uploaded_by (FK: user_id), status (Enum: 'processing', 'completed', 'failed').
- `document_chunks`: id (UUID), document_id (FK), content (Text), embedding (VECTOR(1536)) -> Tipe data khusus pgvector.

## 4. Daftar Teknologi (Tech Stack)
Arsitektur ini dirancang agar kuat, efisien biaya, dan mudah dirawat.

### A. Backend & Core AI
- **Framework**: Laravel 11 (PHP 8.2+)
- **AI Integration**: Prism (oleh EchoLabs) untuk orkestrasi LLM (membangun sistem prompt, chat memory, dan parsing response).
- **LLM Provider**: OpenAI API (Model: gpt-4o-mini untuk teks/chat, text-embedding-3-small untuk pembuatan vektor).
- **Authentication**: JWT (`php-open-source-saver/jwt-auth`).
- **Role Management**: Spatie Laravel Permission.

### B. Database & Search
- **Main Database**: PostgreSQL 15+
- **Vector Engine**: pgvector (Ekstensi PostgreSQL) untuk menyimpan vektor.
- **ORM**: Laravel Eloquent (dipadukan dengan `halilcosdu/laravel-pgvector`).

### C. Frontend (Antarmuka Pengguna)
- **Pendekatan**: REST API Terpisah.
- **Framework**: ReactJS (TypeScript) via Vite.
- **Styling**: Tailwind CSS + Shadcn UI.

### D. Server & Infrastruktur
- **OS Server**: Ubuntu Linux 22.04 / 24.04 LTS (VPS).
- **Web Server**: Nginx.
- **Queue Worker**: Laravel Horizon (berjalan dengan Redis) sangat penting untuk memproses unggahan PDF (chunking dan embedding) di latar belakang.
- **Cache & Session**: Redis.
