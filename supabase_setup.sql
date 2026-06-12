-- 1. Buat tabel untuk menyimpan data materi
CREATE TABLE public.materials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN ('video', 'document', 'link')),
    content_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Matikan Row Level Security (RLS) sementara agar mudah diakses tanpa login rumit
ALTER TABLE public.materials DISABLE ROW LEVEL SECURITY;

-- 3. Buat Storage Bucket untuk menyimpan file PDF/Video
INSERT INTO storage.buckets (id, name, public) 
VALUES ('learning-files', 'learning-files', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Izinkan akses publik ke bucket tersebut
CREATE POLICY "Public Access" 
ON storage.objects FOR ALL 
USING (bucket_id = 'learning-files');
