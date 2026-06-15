'use client'
import { useEffect, useState } from 'react'
import { supabase, Material, Quiz } from '@/lib/supabase'
import Link from 'next/link'
import { BookOpenCheck, Video, FileText, ClipboardList } from 'lucide-react'

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

  const ppts = materials.filter(m => m.type === 'article')
  const makalahs = materials.filter(m => m.type === 'document')
  const videos = materials.filter(m => m.type === 'video')

  return (
    <section id="materi" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
        
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Memuat bahan ajar...</p>
          </div>
        ) : (
          <>
            {/* Section: Bahan Tayang (PPT) */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <BookOpenCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bahan Tayang (PPT)</h2>
                  <p className="text-slate-500 font-medium mt-1">Materi presentasi untuk dipelajari.</p>
                </div>
              </div>
              {ppts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ppts.map(m => (
                    <Link key={m.id} href={`/materi/${m.id}`} className="group block bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-blue-400 hover:shadow-xl hover:shadow-blue-600/10 transition-all hover:-translate-y-1">
                      <div className="p-8">
                        <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{m.title}</h3>
                        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">Berisi lampiran materi presentasi (PPT/PDF).</p>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                          <span>{new Date(m.created_at).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'})}</span>
                          <span className="text-blue-600 group-hover:translate-x-1 transition-transform">Lihat Tayangan →</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-white border border-slate-200 border-dashed rounded-3xl text-center text-slate-500 font-medium">
                  Belum ada bahan tayang PPT.
                </div>
              )}
            </div>

            {/* Section: Modul & Makalah */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Modul & Makalah</h2>
                  <p className="text-slate-500 font-medium mt-1">Bahan bacaan teks dan dokumen PDF/Word.</p>
                </div>
              </div>
              {makalahs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {makalahs.map(m => (
                    <Link key={m.id} href={`/materi/${m.id}`} className="group block bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-purple-400 hover:shadow-xl hover:shadow-purple-600/10 transition-all hover:-translate-y-1">
                      <div className="p-8">
                        <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">{m.title}</h3>
                        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">Berisi lampiran modul / makalah pembelajaran.</p>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                          <span>{new Date(m.created_at).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'})}</span>
                          <span className="text-purple-600 group-hover:translate-x-1 transition-transform">Baca Modul →</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-white border border-slate-200 border-dashed rounded-3xl text-center text-slate-500 font-medium">
                  Belum ada modul atau makalah.
                </div>
              )}
            </div>

            {/* Section: Video Pembelajaran */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tayangan Video</h2>
                  <p className="text-slate-500 font-medium mt-1">Video edukatif untuk mempermudah pemahaman.</p>
                </div>
              </div>
              {videos.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.map(m => (
                    <Link key={m.id} href={`/materi/${m.id}`} className="group block bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-pink-400 hover:shadow-xl hover:shadow-pink-600/10 transition-all hover:-translate-y-1">
                      <div className="p-8">
                        <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">{m.title}</h3>
                        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">Tayangan video pembelajaran interaktif.</p>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                          <span>{new Date(m.created_at).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'})}</span>
                          <span className="text-pink-600 group-hover:translate-x-1 transition-transform">Tonton Video →</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-white border border-slate-200 border-dashed rounded-3xl text-center text-slate-500 font-medium">
                  Belum ada tayangan video.
                </div>
              )}
            </div>

            {/* Section: Evaluasi Kuis */}
            <div id="evaluasi">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Evaluasi (Kuis)</h2>
                  <p className="text-slate-500 font-medium mt-1">Uji pemahamanmu setelah mempelajari materi.</p>
                </div>
              </div>
              {quizzes.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {quizzes.map(q => (
                    <Link key={q.id} href={`/kuis/${q.id}`} className="group block bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 transition-all hover:-translate-y-1">
                      <div className="p-8">
                        <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{q.title}</h3>
                        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{q.description || 'Kuis interaktif'}</p>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                          <span>{q.questions?.length > 0 ? `${q.questions.length} Soal` : 'File Lampiran'}</span>
                          <span className="text-amber-600 group-hover:translate-x-1 transition-transform">Mulai Kuis →</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-white border border-slate-200 border-dashed rounded-3xl text-center text-slate-500 font-medium">
                  Belum ada kuis yang diterbitkan.
                </div>
              )}
            </div>

          </>
        )}
      </div>
    </section>
  )
}
