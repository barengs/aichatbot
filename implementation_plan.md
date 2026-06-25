# Rencana Implementasi & Daftar Kerja: AI Chatbot Pertanian SMK

## Fase 1: Setup & Inisialisasi Proyek
- [ ] Instalasi Laravel 11.
- [ ] Konfigurasi Database PostgreSQL.
- [ ] Instalasi Ekstensi `pgvector` di PostgreSQL.
- [ ] Instalasi package pendukung:
  - `halilcosdu/laravel-pgvector`
  - Laravel Horizon & Redis
  - `php-open-source-saver/jwt-auth` (untuk API Auth JWT)
  - `spatie/laravel-permission` (untuk Manajemen Role & User)
- [ ] Instalasi EchoLabs Prism untuk orkestrasi LLM.
- [ ] Setup Frontend Terpisah (React + Vite, Tailwind CSS, Shadcn UI).

## Fase 2: Struktur Database & Model
- [ ] Publish Migration Spatie (Role & Permission).
- [ ] Buat Migration Master Data (`agri_categories`, `system_settings`).
- [ ] Buat Migration Users.
- [ ] Buat Migration Chat (`chat_sessions`, `messages`, `message_feedbacks`).
- [ ] Buat Migration Knowledge Base (`documents`, `document_chunks`).
- [ ] Buat Model Eloquent dan relasi.
- [ ] Buat Seeder Master Data.

## Fase 3: Integrasi Core AI & RAG
- [ ] Konfigurasi OpenAI API Key.
- [ ] Buat Job ekstraksi PDF ke teks.
- [ ] Buat Job Text Chunking.
- [ ] Buat Service Generate Embeddings (`text-embedding-3-small`).
- [ ] Integrasi Prism untuk prompt builder & LLM call (`gpt-4o-mini`).
- [ ] Implementasi Vector Similarity Search dengan `pgvector`.

## Fase 4: Modul Backend (API & Controller)
- [ ] **Modul Admin:** CRUD User, Setting AI Prompt & Parameter.
- [ ] **Modul Guru:** Upload Dokumen, Manajemen KB, Analitik, Monitoring Chat.
- [ ] **Modul Siswa:** Init Session, Kirim Pesan, Simpan Log, Feedback, Export Chat.

## Fase 5: Modul Frontend (React + Vite REST API)
- [ ] Setup Layout & API Auth Integration.
- [ ] **UI Siswa:** Chat Interface real-time, Sidebar Riwayat, Prompt Starter.
- [ ] **UI Guru:** Upload Dokumen, Dashboard Analitik, Log Chat.
- [ ] **UI Admin:** Manajemen Pengguna, Konfigurasi AI.

## Fase 6: Optimasi & Deployment
- [ ] Konfigurasi Laravel Horizon (Queue Worker).
- [ ] Test RAG Accuracy & Prompt Injection.
- [ ] Setup VPS Ubuntu Linux (Nginx, Supervisor, PostgreSQL).
