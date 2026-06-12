'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function MateriTambahan() {
  const [materials, setMaterials] = useState<any[]>([])

  useEffect(() => {
    const fetchMaterials = async () => {
      const { data } = await supabase.from('materials').select('*').order('created_at', { ascending: true })
      if (data) setMaterials(data)
    }
    fetchMaterials()
  }, [])

  if (materials.length === 0) return null

  return (
    <section id="materi-tambahan" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-4">
            Perpustakaan Kelas
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
            Materi Pembelajaran Tambahan
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Akses berbagai bahan ajar, presentasi, dan video pembelajaran yang telah diunggah oleh pengajar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map(m => (
            <a key={m.id} href={m.content_url} target="_blank" rel="noopener noreferrer" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 ${
                m.type === 'video' ? 'bg-rose-100 text-rose-500' :
                m.type === 'link' ? 'bg-blue-100 text-blue-500' :
                'bg-amber-100 text-amber-500'
              }`}>
                {m.type === 'video' ? '▶️' : m.type === 'link' ? '🔗' : '📄'}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">{m.title}</h3>
              <p className="text-sm text-slate-500">{m.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
