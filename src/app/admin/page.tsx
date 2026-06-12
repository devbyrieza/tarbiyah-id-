'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, Material, Quiz } from '@/lib/supabase'
import { BookOpenCheck, LogOut, BarChart2, FileText, Video, ClipboardList, MessageCircle, Globe, Hand, Pin, PlayCircle, FolderUp, GraduationCap } from 'lucide-react'

type Tab = 'overview' | 'articles' | 'videos' | 'quizzes' | 'forum'

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('overview')
  const [isGuest, setIsGuest] = useState(false)
  const [materials, setMaterials] = useState<Material[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ articles: 0, videos: 0, quizzes: 0, forum: 0 })

  useEffect(() => {
    const token = localStorage.getItem('pai_admin_token')
    if (!token) { router.push('/admin/login'); return }
    setIsGuest(token === 'dosen-guest-2026')
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    const [mRes, qRes, fRes] = await Promise.all([
      supabase.from('materials').select('*').order('created_at', { ascending: false }),
      supabase.from('quizzes').select('*').order('created_at', { ascending: false }),
      supabase.from('forum_posts').select('id', { count: 'exact' })
    ])
    if (mRes.data) setMaterials(mRes.data)
    if (qRes.data) setQuizzes(qRes.data)
    const articles = (mRes.data || []).filter(m => m.type === 'article').length
    const videos = (mRes.data || []).filter(m => m.type === 'video').length
    setStats({ articles, videos, quizzes: qRes.data?.length || 0, forum: fRes.count || 0 })
    setLoading(false)
  }

  const logout = () => { localStorage.removeItem('pai_admin_token'); router.push('/admin/login') }
  
  const deleteMaterial = async (id: string) => {
    if (isGuest) { alert('Akses Tamu tidak dapat menghapus materi.'); return; }
    if (!confirm('Hapus materi ini?')) return
    await supabase.from('materials').delete().eq('id', id)
    fetchAll()
  }
  
  const deleteQuiz = async (id: string) => {
    if (isGuest) { alert('Akses Tamu tidak dapat menghapus kuis.'); return; }
    if (!confirm('Hapus kuis ini?')) return
    await supabase.from('quizzes').delete().eq('id', id)
    fetchAll()
  }

  const navItems: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Ringkasan', icon: <BarChart2 className="w-5 h-5" /> },
    { key: 'articles', label: 'Artikel', icon: <FileText className="w-5 h-5" /> },
    { key: 'videos', label: 'Video', icon: <Video className="w-5 h-5" /> },
    { key: 'quizzes', label: 'Kuis', icon: <ClipboardList className="w-5 h-5" /> },
    { key: 'forum', label: 'Forum', icon: <MessageCircle className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar / Topbar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-4 md:p-6 border-b border-slate-200 flex justify-between items-center md:block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-sm">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-slate-900 font-bold text-sm leading-tight">Tarbiyah.id</h1>
              <p className="text-teal-600 text-xs font-semibold">{isGuest ? 'Akses Tamu' : 'Admin Penuh'}</p>
            </div>
          </div>
          <button onClick={logout} className="md:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100">
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
        <nav className="flex md:flex-col overflow-x-auto p-4 gap-2 space-y-0 md:space-y-1 no-scrollbar">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3 rounded-xl text-sm font-semibold transition-all ${
                tab === item.key
                  ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="hidden md:block p-4 border-t border-slate-200 space-y-2 mt-auto">
          <a href="/" target="_blank" className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent">
            <Globe className="w-4 h-4" /> Lihat Website
          </a>
          <a href="/forum" target="_blank" className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent">
            <MessageCircle className="w-4 h-4" /> Buka Forum
          </a>
          <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-all">
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {tab === 'overview' && <OverviewTab stats={stats} loading={loading} />}
          {tab === 'articles' && <ArticlesTab materials={materials.filter(m=>m.type==='article')} onDelete={deleteMaterial} onRefresh={fetchAll} isGuest={isGuest} />}
          {tab === 'videos' && <VideosTab materials={materials.filter(m=>m.type==='video')} onDelete={deleteMaterial} onRefresh={fetchAll} isGuest={isGuest} />}
          {tab === 'quizzes' && <QuizzesTab quizzes={quizzes} onDelete={deleteQuiz} onRefresh={fetchAll} isGuest={isGuest} />}
          {tab === 'forum' && <ForumAdminTab />}
        </div>
      </main>
    </div>
  )
}

/* ── Overview ─────────────────────────────────────────────── */
function OverviewTab({ stats, loading }: { stats: any, loading: boolean }) {
  const cards = [
    { label: 'Artikel', value: stats.articles, icon: <FileText className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Video', value: stats.videos, icon: <Video className="w-6 h-6" />, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50', border: 'border-purple-100' },
    { label: 'Kuis', value: stats.quizzes, icon: <ClipboardList className="w-6 h-6" />, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Diskusi Forum', value: stats.forum, icon: <MessageCircle className="w-6 h-6" />, color: 'from-teal-500 to-emerald-500', bg: 'bg-teal-50', border: 'border-teal-100' },
  ]
  return (
    <div className="anim-fade-in">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight flex items-center gap-2">
        Selamat Datang, Fikri! <Hand className="w-6 h-6 text-amber-500" />
      </h2>
      <p className="text-slate-500 mb-8 font-medium">Kelola semua konten pembelajaran dari sini.</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map(c => (
          <div key={c.label} className={`bg-white border ${c.border} shadow-sm hover:shadow-md transition-shadow rounded-3xl p-6`}>
            <div className={`w-12 h-12 bg-gradient-to-br ${c.color} shadow-sm rounded-xl flex items-center justify-center text-white mb-4`}>{c.icon}</div>
            <p className="text-4xl font-extrabold text-slate-900 mb-1">{loading ? '...' : c.value}</p>
            <p className="text-slate-500 text-sm font-semibold">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Aktivitas Terbaru (Dummy Data) */}
        <div className="xl:col-span-2 bg-white border border-slate-200 shadow-sm rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-500" /> Aktivitas Sistem Terbaru
            </h3>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Sistem Aktif
            </span>
          </div>
          
          <div className="space-y-6">
            {[
              { icon: <MessageCircle className="w-4 h-4 text-teal-600" />, bg: 'bg-teal-50', text: 'Budi Santoso membalas diskusi di forum "Hukum Tajwid"', time: '10 menit yang lalu' },
              { icon: <ClipboardList className="w-4 h-4 text-amber-600" />, bg: 'bg-amber-50', text: 'Siti Aminah menyelesaikan "Kuis Bab 1: Rukun Islam" (Skor: 100)', time: '1 jam yang lalu' },
              { icon: <FileText className="w-4 h-4 text-blue-600" />, bg: 'bg-blue-50', text: 'Materi baru "Sejarah Kebudayaan Islam" berhasil diterbitkan', time: '3 jam yang lalu' },
              { icon: <Video className="w-4 h-4 text-purple-600" />, bg: 'bg-purple-50', text: 'Video pembelajaran "Tata Cara Tayammum" ditambahkan', time: 'Kemarin, 14:30' },
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full ${act.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  {act.icon}
                </div>
                <div>
                  <p className="text-slate-700 text-sm font-medium">{act.text}</p>
                  <p className="text-slate-400 text-xs mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panduan Singkat */}
        <div className="xl:col-span-1 bg-white border border-slate-200 shadow-sm rounded-3xl p-8">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Pin className="w-5 h-5 text-rose-500" /> Panduan Singkat
          </h3>
          <div className="space-y-5 text-sm text-slate-600 font-medium">
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5"><FileText className="w-3.5 h-3.5" /></span>
              <p>Gunakan menu <strong className="text-slate-900">Artikel</strong> untuk merilis materi teks lengkap.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5"><Video className="w-3.5 h-3.5" /></span>
              <p>Gunakan menu <strong className="text-slate-900">Video</strong> untuk embed link YouTube PAI.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5"><ClipboardList className="w-3.5 h-3.5" /></span>
              <p>Gunakan menu <strong className="text-slate-900">Kuis</strong> untuk merancang soal ujian.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5"><MessageCircle className="w-3.5 h-3.5" /></span>
              <p>Gunakan menu <strong className="text-slate-900">Forum</strong> untuk membimbing siswa.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Articles ─────────────────────────────────────────────── */
function ArticlesTab({ materials, onDelete, onRefresh, isGuest }: { materials: Material[], onDelete: (id:string)=>void, onRefresh: ()=>void, isGuest: boolean }) {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploadType, setUploadType] = useState<'markdown' | 'file'>('markdown')
  const [saving, setSaving] = useState(false)

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    let content_url = null
    let content_text = content

    if (uploadType === 'file' && file) {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('learning-files').upload(path, file)
      if (!error) {
        const { data } = supabase.storage.from('learning-files').getPublicUrl(path)
        content_url = data.publicUrl
        content_text = '' // no markdown if file is uploaded
      }
    }

    await supabase.from('materials').insert([{ title, description: '', type: 'article', content_text, content_url }])
    setTitle(''); setContent(''); setFile(null); setShowForm(false)
    onRefresh(); setSaving(false)
  }

  return (
    <div className="anim-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-500" /> Manajemen Artikel
        </h2>
        <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm">
          {showForm ? '✕ Batal' : '+ Tulis Artikel Baru'}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={save} className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 mb-8 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Judul Artikel</label>
            <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Contoh: Rukun Islam Lengkap" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all" />
          </div>
          
          <div className="flex gap-4">
            <button type="button" onClick={() => setUploadType('markdown')} className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border transition-all ${uploadType==='markdown' ? 'bg-teal-50 border-teal-200 text-teal-600 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}><FileText className="w-4 h-4" /> Tulis Manual (Teks)</button>
            <button type="button" onClick={() => setUploadType('file')} className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border transition-all ${uploadType==='file' ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}><FolderUp className="w-4 h-4" /> Upload File Materi (PDF/Word)</button>
          </div>

          <div>
            {uploadType === 'markdown' ? (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Isi Artikel (Markdown)</label>
                <textarea required={uploadType === 'markdown'} value={content} onChange={e=>setContent(e.target.value)} placeholder="Tulis konten dengan format Markdown..." rows={12} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-mono focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all resize-none leading-relaxed" />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Pilih File Materi</label>
                <input required={uploadType === 'file'} type="file" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:bg-blue-50 file:text-blue-600 file:text-sm file:font-bold hover:file:bg-blue-100 transition-all" />
              </div>
            )}
          </div>
          
          <button disabled={saving} type="submit" className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-md disabled:opacity-50 transition-all w-full sm:w-auto mt-4">
            {saving ? 'Menyimpan...' : '✓ Publikasikan Artikel'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {materials.map(m => (
          <div key={m.id} className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-teal-400 transition-colors">
            <div>
              <h3 className="text-slate-900 font-bold text-lg mb-1">{m.title}</h3>
              <p className="text-slate-500 text-sm mb-3">
                {m.content_url ? '📄 Berisi Lampiran File Materi' : '📝 Artikel Teks (Manual)'}
              </p>
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg">
                {new Date(m.created_at).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
              </span>
            </div>
            {!isGuest && (
              <button onClick={() => onDelete(m.id)} className="px-5 py-2.5 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 rounded-xl text-sm font-semibold transition-all flex-shrink-0">
                Hapus
              </button>
            )}
          </div>
        ))}
        {materials.length === 0 && (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl border-dashed">
            <div className="flex justify-center mb-4 text-slate-300">
              <FileText className="w-12 h-12" />
            </div>
            <p className="text-slate-500 font-medium">Belum ada artikel. Klik tombol di atas untuk menulis!</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Videos ─────────────────────────────────────────────── */
function VideosTab({ materials, onDelete, onRefresh, isGuest }: { materials: Material[], onDelete: (id:string)=>void, onRefresh: ()=>void, isGuest: boolean }) {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploadType, setUploadType] = useState<'youtube' | 'file'>('youtube')
  const [saving, setSaving] = useState(false)

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    let content_url = url

    if (uploadType === 'file' && file) {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('learning-files').upload(path, file)
      if (!error) {
        const { data } = supabase.storage.from('learning-files').getPublicUrl(path)
        content_url = data.publicUrl
      }
    }

    if (uploadType === 'youtube' && url.includes('watch?v=')) {
      const videoId = url.split('watch?v=')[1].split('&')[0]
      content_url = `https://www.youtube.com/embed/${videoId}`
    } else if (uploadType === 'youtube' && url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0]
      content_url = `https://www.youtube.com/embed/${videoId}`
    }

    await supabase.from('materials').insert([{ title, description, type: 'video', content_url }])
    setTitle(''); setDescription(''); setUrl(''); setFile(null); setShowForm(false)
    onRefresh(); setSaving(false)
  }

  return (
    <div className="anim-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Video className="w-6 h-6 text-purple-500" /> Manajemen Video
        </h2>
        <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm">
          {showForm ? '✕ Batal' : '+ Tambah Video'}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={save} className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 mb-8 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Judul Video</label>
            <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Judul Video" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi Singkat</label>
            <input required value={description} onChange={e=>setDescription(e.target.value)} placeholder="Deskripsi singkat" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all" />
          </div>
          
          <div className="flex gap-4">
            <button type="button" onClick={() => setUploadType('youtube')} className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border transition-all ${uploadType==='youtube' ? 'bg-red-50 border-red-200 text-red-600 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}><PlayCircle className="w-4 h-4" /> Link YouTube</button>
            <button type="button" onClick={() => setUploadType('file')} className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border transition-all ${uploadType==='file' ? 'bg-purple-50 border-purple-200 text-purple-600 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}><FolderUp className="w-4 h-4" /> Upload File Video</button>
          </div>

          <div>
            {uploadType === 'youtube'
              ? <input required value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all" />
              : <input required type="file" accept="video/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:bg-purple-50 file:text-purple-600 file:text-sm file:font-bold hover:file:bg-purple-100 transition-all" />
            }
          </div>
          
          <button disabled={saving} type="submit" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm shadow-md disabled:opacity-50 transition-all w-full sm:w-auto mt-4">
            {saving ? 'Mengunggah...' : '✓ Simpan Video'}
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {materials.map(m => (
          <div key={m.id} className="bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden hover:border-purple-300 transition-all group">
            {m.content_url?.includes('youtube.com/embed') && (
              <div className="aspect-video bg-slate-900 w-full relative">
                <iframe src={m.content_url} className="w-full h-full absolute inset-0" allowFullScreen title={m.title} />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-slate-900 font-bold text-lg leading-tight">{m.title}</h3>
                {!isGuest && (
                  <button onClick={() => onDelete(m.id)} className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 rounded-lg text-xs font-bold transition-all flex-shrink-0">
                    Hapus
                  </button>
                )}
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{m.description}</p>
            </div>
          </div>
        ))}
        {materials.length === 0 && (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl border-dashed col-span-2">
            <div className="flex justify-center mb-4 text-slate-300">
              <Video className="w-12 h-12" />
            </div>
            <p className="text-slate-500 font-medium">Belum ada video. Klik tombol di atas untuk menambahkan!</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Quiz Builder ─────────────────────────────────────────── */
function QuizzesTab({ quizzes, onDelete, onRefresh, isGuest }: { quizzes: Quiz[], onDelete: (id:string)=>void, onRefresh: ()=>void, isGuest: boolean }) {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState<{ text: string; options: string[]; correct: number }[]>([])
  const [saving, setSaving] = useState(false)

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', '', '', ''], correct: 0 }])
  }

  const updateQuestion = (qi: number, field: string, value: any) => {
    const updated = [...questions]
    if (field === 'text') updated[qi].text = value
    else if (field === 'correct') updated[qi].correct = Number(value)
    setQuestions(updated)
  }

  const updateOption = (qi: number, oi: number, value: string) => {
    const updated = [...questions]
    updated[qi].options[oi] = value
    setQuestions(updated)
  }

  const removeQuestion = (qi: number) => {
    setQuestions(questions.filter((_, i) => i !== qi))
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    if (questions.length === 0) { alert('Tambahkan minimal 1 soal!'); return }
    setSaving(true)
    await supabase.from('quizzes').insert([{ title, description, questions }])
    setTitle(''); setDescription(''); setQuestions([]); setShowForm(false)
    onRefresh(); setSaving(false)
  }

  return (
    <div className="anim-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-amber-500" /> Quiz Builder
        </h2>
        <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-all shadow-sm">
          {showForm ? '✕ Batal' : '+ Buat Kuis Baru'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={save} className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 mb-8 space-y-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Judul Kuis</label>
              <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Contoh: Kuis Bab 1 - Sholat" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi / Petunjuk</label>
              <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Petunjuk pengerjaan kuis..." className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Soal-soal ({questions.length})</h3>
              <button type="button" onClick={addQuestion} className="px-4 py-2 bg-amber-50 text-amber-600 border border-amber-200 font-bold text-xs rounded-xl hover:bg-amber-100 transition-all">+ Tambah Soal</button>
            </div>
            
            {questions.map((q, qi) => (
              <div key={qi} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0">{qi+1}</span>
                  <div className="flex-1 space-y-4">
                    <input
                      required
                      value={q.text}
                      onChange={e => updateQuestion(qi, 'text', e.target.value)}
                      placeholder={`Teks pertanyaan...`}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                    />
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      {q.options.map((opt, oi) => (
                        <div key={oi} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all ${q.correct === oi ? 'bg-emerald-50 border-emerald-300 shadow-sm' : 'bg-white border-slate-200'}`}>
                          <span className={`text-xs font-black flex-shrink-0 ${q.correct === oi ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {['A','B','C','D'][oi]}
                          </span>
                          <input
                            required
                            value={opt}
                            onChange={e => updateOption(qi, oi, e.target.value)}
                            placeholder={`Pilihan ${['A','B','C','D'][oi]}`}
                            className="flex-1 bg-transparent text-sm text-slate-800 focus:outline-none min-w-0 font-medium"
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3">
                        <label className="text-xs text-slate-600 font-bold">Kunci Jawaban:</label>
                        <select value={q.correct} onChange={e => updateQuestion(qi, 'correct', e.target.value)} className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-xs font-bold focus:outline-none cursor-pointer">
                          <option value={0}>Pilihan A</option>
                          <option value={1}>Pilihan B</option>
                          <option value={2}>Pilihan C</option>
                          <option value={3}>Pilihan D</option>
                        </select>
                      </div>
                      <button type="button" onClick={() => removeQuestion(qi)} className="text-rose-600 hover:text-rose-700 text-xs font-bold">Hapus Soal</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {questions.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <p className="text-slate-500 text-sm font-medium">Belum ada soal. Klik "Tambah Soal" untuk mulai!</p>
              </div>
            )}
          </div>

          <button disabled={saving} type="submit" className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl text-sm shadow-md disabled:opacity-50 transition-all mt-6">
            {saving ? 'Menyimpan...' : `✓ Simpan Kuis (${questions.length} soal)`}
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map(q => (
          <div key={q.id} className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 group hover:border-amber-300 transition-colors">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-amber-500 flex-shrink-0">
                <ClipboardList className="w-6 h-6" />
              </div>
              {!isGuest && (
                <button onClick={() => onDelete(q.id)} className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 rounded-lg text-xs font-bold transition-all flex-shrink-0">
                  Hapus
                </button>
              )}
            </div>
            <h3 className="text-slate-900 font-bold text-lg leading-tight mb-2">{q.title}</h3>
            <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">{q.description}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="px-3 py-1 bg-amber-50 text-amber-600 font-bold rounded-lg">{q.questions.length} soal</span>
              <span className="text-slate-400 font-medium">{new Date(q.created_at).toLocaleDateString('id-ID', {day:'numeric', month:'short'})}</span>
            </div>
          </div>
        ))}
        {quizzes.length === 0 && (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl border-dashed col-span-3">
            <div className="flex justify-center mb-4 text-slate-300">
              <ClipboardList className="w-12 h-12" />
            </div>
            <p className="text-slate-500 font-medium">Belum ada kuis. Klik tombol di atas untuk membuat kuis baru!</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Forum Admin View ─────────────────────────────────────── */
function ForumAdminTab() {
  const [posts, setPosts] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [replies, setReplies] = useState<any[]>([])
  const [replyText, setReplyText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchPosts() }, [])

  const fetchPosts = async () => {
    setLoading(true)
    const { data } = await supabase.from('forum_posts').select('*, forum_replies(count)').order('created_at', { ascending: false })
    if (data) setPosts(data)
    setLoading(false)
  }

  const openPost = async (post: any) => {
    setSelected(post)
    const { data } = await supabase.from('forum_replies').select('*').eq('post_id', post.id).order('created_at', { ascending: true })
    if (data) setReplies(data)
  }

  const reply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selected || !replyText.trim()) return
    await supabase.from('forum_replies').insert([{ post_id: selected.id, body: replyText, author_name: 'Pengajar (Fikri)', is_admin: true }])
    setReplyText('')
    openPost(selected)
  }

  if (selected) return (
    <div className="anim-fade-in max-w-3xl">
      <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 mb-8 transition-colors">
        ← Kembali ke Daftar Forum
      </button>
      
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-sm">
            {selected.author_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">{selected.author_name}</p>
            <p className="text-xs text-slate-500">{new Date(selected.created_at).toLocaleString('id-ID')}</p>
          </div>
        </div>
        <h3 className="text-slate-900 font-extrabold text-xl mb-3">{selected.title}</h3>
        <p className="text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">{selected.body}</p>
      </div>

      <div className="space-y-4 mb-8 pl-4 md:pl-12 border-l-2 border-slate-100">
        <h4 className="font-bold text-slate-900 text-sm mb-4">Balasan ({replies.length})</h4>
        {replies.map(r => (
          <div key={r.id} className={`p-6 rounded-2xl border shadow-sm ${r.is_admin ? 'bg-teal-50 border-teal-200' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${r.is_admin ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {r.is_admin ? <GraduationCap className="w-4 h-4" /> : r.author_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className={`text-sm font-bold ${r.is_admin ? 'text-teal-700' : 'text-slate-900'}`}>{r.author_name}</p>
                <p className="text-xs text-slate-500">{new Date(r.created_at).toLocaleString('id-ID')}</p>
              </div>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>

      <form onSubmit={reply} className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 md:pl-12">
        <p className="text-sm font-bold text-teal-600 mb-3 flex items-center gap-2">
          <MessageCircle className="w-4 h-4" /> Balas sebagai Pengajar
        </p>
        <textarea required value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="Tulis balasan untuk membantu siswa..." rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all resize-none mb-4" />
        <button type="submit" className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-md transition-all">
          Kirim Balasan
        </button>
      </form>
    </div>
  )

  return (
    <div className="anim-fade-in max-w-4xl">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-8 tracking-tight flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-teal-500" /> Diskusi Forum Siswa
      </h2>
      {loading ? (
        <div className="text-center py-10">
          <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm font-medium">Memuat diskusi...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(p => (
            <button key={p.id} onClick={() => openPost(p)} className="w-full text-left bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md shadow-sm rounded-3xl p-6 transition-all group">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-slate-900 font-bold text-lg group-hover:text-teal-600 transition-colors">{p.title}</h3>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold flex-shrink-0 flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" /> {p.forum_replies?.[0]?.count || 0}
                </span>
              </div>
              <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4">{p.body}</p>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-xs">
                  {p.author_name.charAt(0).toUpperCase()}
                </div>
                <p className="text-slate-500 text-xs font-medium">{p.author_name} • {new Date(p.created_at).toLocaleDateString('id-ID', {day:'numeric', month:'long'})}</p>
              </div>
            </button>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl border-dashed">
              <div className="flex justify-center mb-4 text-slate-300">
                <MessageCircle className="w-12 h-12" />
              </div>
              <p className="text-slate-500 font-medium">Belum ada diskusi dari siswa.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
