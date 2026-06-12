'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [materials, setMaterials] = useState<any[]>([])
  
  // Form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('document')
  const [file, setFile] = useState<File | null>(null)
  const [linkUrl, setLinkUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  // Fetch materials once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchMaterials()
    }
  }, [isAuthenticated])

  const fetchMaterials = async () => {
    const { data, error } = await supabase.from('materials').select('*').order('created_at', { ascending: false })
    if (data) setMaterials(data)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple hardcoded password for the prototype
    if (password === 'admin123') {
      setIsAuthenticated(true)
    } else {
      alert('Password salah!')
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      let content_url = linkUrl

      // If uploading a file
      if (type !== 'link' && file) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('learning-files')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('learning-files')
          .getPublicUrl(filePath)
          
        content_url = publicUrl
      }

      if (!content_url) {
        throw new Error('URL atau File tidak boleh kosong')
      }

      // Save to database
      const { error: dbError } = await supabase.from('materials').insert([
        { title, description, type, content_url }
      ])

      if (dbError) throw dbError

      alert('Berhasil mengunggah materi!')
      // Reset form
      setTitle('')
      setDescription('')
      setFile(null)
      setLinkUrl('')
      fetchMaterials()
      
    } catch (error: any) {
      alert('Gagal: ' + error.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string, url: string) => {
    if (!confirm('Hapus materi ini?')) return

    // Delete from DB
    await supabase.from('materials').delete().eq('id', id)
    
    // Optionally delete from storage if it's a file
    if (url.includes('supabase.co')) {
      const fileName = url.split('/').pop()
      if (fileName) {
        await supabase.storage.from('learning-files').remove([fileName])
      }
    }
    
    fetchMaterials()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">Admin Login</h1>
          <input 
            type="password" 
            placeholder="Masukkan Password" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 mb-4 focus:outline-none focus:border-emerald-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600">Masuk</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Pengajar</h1>
          <a href="/" className="text-emerald-600 font-semibold hover:underline">Kembali ke Website</a>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Upload Materi Baru</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Judul Materi</label>
              <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:border-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Deskripsi Singkat</label>
              <textarea required value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:border-emerald-500 focus:outline-none" rows={2} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Tipe Materi</label>
              <select value={type} onChange={e => setType(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none">
                <option value="document">Dokumen (PDF / PPT / Word)</option>
                <option value="video">Video Upload (MP4)</option>
                <option value="link">Link Eksternal (YouTube / Web)</option>
              </select>
            </div>

            {type === 'link' ? (
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">URL / Link</label>
                <input required type="url" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-2 border rounded-lg focus:outline-none" />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Pilih File</label>
                <input required type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-sm" accept={type === 'video' ? 'video/*' : '.pdf,.ppt,.pptx,.doc,.docx'} />
              </div>
            )}

            <button disabled={isUploading} type="submit" className="px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 disabled:opacity-50">
              {isUploading ? 'Sedang Mengunggah...' : 'Upload Materi'}
            </button>
          </form>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4">Daftar Materi yang Diupload</h2>
        <div className="grid gap-4">
          {materials.map(m => (
            <div key={m.id} className="bg-white p-5 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
              <div>
                <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded mb-2 uppercase">{m.type}</span>
                <h3 className="font-bold text-slate-800">{m.title}</h3>
                <p className="text-sm text-slate-500">{m.description}</p>
                <a href={m.content_url} target="_blank" className="text-sm text-blue-500 hover:underline mt-1 inline-block">Buka File/Link</a>
              </div>
              <button onClick={() => handleDelete(m.id, m.content_url)} className="text-rose-500 hover:text-rose-700 font-semibold text-sm px-4 py-2 bg-rose-50 rounded-lg">
                Hapus
              </button>
            </div>
          ))}
          {materials.length === 0 && <p className="text-slate-500 italic">Belum ada materi yang diupload.</p>}
        </div>
      </div>
    </div>
  )
}
