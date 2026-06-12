'use client'
import { useEffect, useState } from 'react'
import { supabase, Material, Quiz } from '@/lib/supabase'
import Link from 'next/link'
import { Library, Inbox, Video, FileText, ClipboardList } from 'lucide-react'

export default function MateriTambahan() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      const [mRes, qRes] = await Promise.all([
        supabase.from('materials').select('*').order('created_at', { ascending: false }),
        supabase.from('quizzes').select('*').order('created_at', { ascending: false })
      ])
      if (mRes.data) setMaterials(mRes.data)
      if (qRes.data) setQuizzes(qRes.data)
      setLoading(false)
    }
    fetchAll()
  }, [])

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-xs font-bold text-teal-600 uppercase tracking-wider mb-4">
            <Library className="w-3.5 h-3.5" /> Perpustakaan Kelas
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Materi dari Pengajar</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Kumpulan artikel, video, dan kuis tambahan yang disiapkan khusus untuk kelas ini.</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Memuat materi...</p>
          </div>
        ) : (
          <>
            {materials.length === 0 && quizzes.length === 0 && (
              <div className="text-center py-20 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
                <div className="flex justify-center mb-4 text-slate-300">
                  <Inbox className="w-12 h-12" />
                </div>
                <p className="text-slate-500 font-medium">Belum ada materi tambahan dari pengajar.</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Render Articles & Videos */}
              {materials.map(m => (
                <Link key={m.id} href={`/materi/${m.id}`} className="group block bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-teal-400 hover:shadow-xl hover:shadow-teal-600/10 transition-all hover:-translate-y-1">
                  <div className="p-8">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm ${
                      m.type === 'video' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      {m.type === 'video' ? <Video className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                    </div>
                    <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">{m.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                      {m.type === 'video' ? m.description : (m.content_url ? 'Materi berupa lampiran file untuk diunduh/dibaca.' : 'Materi teks bacaan.')}
                    </p>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                      <span>{new Date(m.created_at).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'})}</span>
                      <span className="text-teal-600 group-hover:translate-x-1 transition-transform">Baca selengkapnya →</span>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Render Quizzes */}
              {quizzes.map(q => (
                <Link key={q.id} href={`/kuis/${q.id}`} className="group block bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 transition-all hover:-translate-y-1">
                  <div className="p-8">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm bg-amber-50 text-amber-600 border border-amber-100">
                      <ClipboardList className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{q.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{q.description}</p>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                      <span>{q.questions.length} Soal</span>
                      <span className="text-amber-600 group-hover:translate-x-1 transition-transform">Mulai Kuis →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
