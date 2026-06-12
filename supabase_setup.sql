-- ================================================================
-- PAI INTERAKTIF - Database Schema Update
-- Jalankan ini di Supabase SQL Editor
-- ================================================================

-- 1. Drop tabel lama jika ada
DROP TABLE IF EXISTS public.materials CASCADE;
DROP TABLE IF EXISTS public.quizzes CASCADE;
DROP TABLE IF EXISTS public.forum_posts CASCADE;
DROP TABLE IF EXISTS public.forum_replies CASCADE;
DROP TABLE IF EXISTS public.leaderboard CASCADE;

-- 2. Tabel Materi (Artikel, Video, Kuis, Dokumen)
CREATE TABLE public.materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('article', 'video', 'quiz', 'document')),
  content_url TEXT,          -- URL file atau video YouTube
  content_text TEXT,         -- Untuk konten artikel/teks panjang
  thumbnail_url TEXT,        -- Gambar thumbnail opsional
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.materials DISABLE ROW LEVEL SECURITY;

-- 3. Tabel Kuis (dengan soal-soal di dalamnya dalam format JSON)
CREATE TABLE public.quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  questions JSONB NOT NULL DEFAULT '[]',  -- Array soal + pilihan + jawaban
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.quizzes DISABLE ROW LEVEL SECURITY;

-- 4. Tabel Forum Diskusi - Postingan
CREATE TABLE public.forum_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'Anonim',
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.forum_posts DISABLE ROW LEVEL SECURITY;

-- 5. Tabel Forum Diskusi - Balasan
CREATE TABLE public.forum_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'Anonim',
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.forum_replies DISABLE ROW LEVEL SECURITY;

-- 6. Storage Bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('learning-files', 'learning-files', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access learning-files"
ON storage.objects FOR ALL
USING (bucket_id = 'learning-files')
WITH CHECK (bucket_id = 'learning-files');

-- 7. Tabel Leaderboard
CREATE TABLE public.leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.leaderboard DISABLE ROW LEVEL SECURITY;

-- 8. Seed data contoh (bisa dihapus nanti)
INSERT INTO public.materials (title, description, type, content_url) VALUES
  ('Video Pembelajaran Tata Cara Sholat', 'Video lengkap tata cara sholat wajib dari niat hingga salam', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
  ('Panduan Lengkap Wudhu', 'Artikel tentang syarat, rukun, dan sunnah wudhu', 'article', NULL);

UPDATE public.materials SET content_text = '## Pengertian Wudhu

Wudhu adalah salah satu cara menyucikan diri dari hadats kecil yang wajib dilakukan sebelum melaksanakan sholat. Wudhu menjadi syarat sahnya sholat.

## Rukun Wudhu

1. **Niat** - Berniat dalam hati untuk berwudhu
2. **Membasuh Wajah** - Dari dahi hingga dagu, dari telinga ke telinga
3. **Membasuh Kedua Tangan** - Dari ujung jari hingga siku
4. **Mengusap Sebagian Kepala** - Minimal sepertiga bagian kepala
5. **Membasuh Kedua Kaki** - Dari ujung jari hingga mata kaki
6. **Tertib** - Dilakukan secara berurutan

## Sunnah Wudhu

- Membaca basmalah
- Menggosok gigi (bersiwak)
- Berkumur
- Memasukkan air ke hidung
- Membasuh tiga kali setiap anggota wudhu' WHERE type = 'article';
