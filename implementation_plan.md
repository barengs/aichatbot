# Rencana Implementasi & Daftar Kerja: AI Chatbot Pertanian SMK

## Fase 1: Setup & Inisialisasi Proyek
- [x] Instalasi Laravel 11.
- [x] Konfigurasi Database MySQL.
- [x] Instalasi package pendukung:
  - [x] `halilcosdu/laravel-pgvector`
  - [x] Laravel Horizon & Redis
  - [x] `php-open-source-saver/jwt-auth` (untuk API Auth JWT)
  - [x] `spatie/laravel-permission` (untuk Manajemen Role & User)
- [x] Setup Pinecone API Keys untuk Vector Store.
- [x] Instalasi EchoLabs Prism untuk orkestrasi LLM.
- [x] Setup Frontend (React + Vite, Tailwind CSS, Shadcn UI) di dalam folder `resources/`.

## Fase 2: Struktur Database & Model
- [x] Publish Migration Spatie (Role & Permission).
- [x] Buat Migration Master Data (`agri_categories`, `system_settings`).
- [x] Buat Migration Users.
- [x] Buat Migration Chat (`chat_sessions`, `messages`, `message_feedbacks`).
- [x] Buat Migration Knowledge Base (`documents`, `document_chunks`).
- [x] Buat Model Eloquent dan relasi.
- [x] Buat Seeder Master Data.

## Fase 3: Integrasi Core AI & RAG
- [x] Konfigurasi OpenAI API Key.
- [x] Buat Job ekstraksi PDF ke teks.
- [x] Buat Job Text Chunking.
- [x] Buat Service Generate Embeddings (`text-embedding-3-small`).
- [x] Integrasi Prism untuk prompt builder & LLM call (`gpt-4o-mini`).
- [x] Implementasi Vector Similarity Search dengan Pinecone (via EchoLabs Prism).

## Fase 4: Modul Backend (API & Controller)
- [x] **Modul Admin:** CRUD User, Setting AI Prompt & Parameter.
- [x] **Modul Guru:** Upload Dokumen, Manajemen KB, Analitik, Monitoring Chat.
- [x] **Modul Siswa:** Init Session, Kirim Pesan, Simpan Log, Feedback, Export Chat.

## Fase 5: Modul Frontend (React + Vite REST API)
- [ ] Setup Layout & API Auth Integration.
- [ ] **UI Siswa:** Chat Interface real-time, Sidebar Riwayat, Prompt Starter.
- [ ] **UI Guru:** Upload Dokumen, Dashboard Analitik, Log Chat.
- [ ] **UI Admin:** Manajemen Pengguna, Konfigurasi AI.

## Fase 6: Optimasi & Deployment
- [ ] Konfigurasi Laravel Horizon (Queue Worker).
- [ ] Test RAG Accuracy & Prompt Injection.
- [ ] Setup VPS Ubuntu Linux (Nginx, Supervisor, MySQL).
