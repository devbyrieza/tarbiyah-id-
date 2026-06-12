'use client'
import { useEffect, useRef } from 'react'

const steps = [
  { num: '01', icon: '🎯', title: 'Baca Tujuan', desc: 'Mulailah dengan membaca tujuan pembelajaran agar kamu tahu kompetensi apa yang akan dicapai' },
  { num: '02', icon: '📖', title: 'Pelajari Materi', desc: 'Baca dan pahami setiap materi. Klik tab untuk berpindah antar topik yang berbeda' },
  { num: '03', icon: '🎮', title: 'Coba Interaktif', desc: 'Ikuti aktivitas mencocokkan untuk mengetes pemahaman awal kamu secara menyenangkan' },
  { num: '04', icon: '📝', title: 'Kerjakan Evaluasi', desc: 'Jawab 5 soal evaluasi dan dapatkan umpan balik otomatis beserta skor akhirmu' },
]

export default function Petunjuk() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="petunjuk" className="py-24" style={{ background: 'var(--bg-mid)' }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full border border-slate-300 bg-slate-100 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-4">
            📋 Panduan
          </span>
          <h2 className="text-3xl font-extrabold mb-3">Petunjuk Penggunaan</h2>
          <p className="text-slate-600">Ikuti langkah-langkah berikut untuk menggunakan media pembelajaran ini secara optimal</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className="reveal group bg-white shadow-sm border border-slate-200 rounded-2xl p-7 text-center hover:-translate-y-1 hover:border-[#52b788] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="text-5xl font-black text-[rgba(82,183,136,0.12)] leading-none mb-3">{s.num}</div>
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              icon: '👩‍🏫',
              title: 'Untuk Guru',
              desc: 'Bagikan link website ini kepada siswa. Media dapat diakses melalui browser di perangkat apapun — laptop, tablet, maupun smartphone.',
            },
            {
              icon: '👨‍🎓',
              title: 'Untuk Siswa',
              desc: 'Pelajari materi secara berurutan dari atas ke bawah. Kerjakan evaluasi setelah memahami semua materi untuk hasil terbaik.',
            },
          ].map((note, i) => (
            <div key={i} className="flex items-start gap-4 p-6 bg-[rgba(82,183,136,0.06)] border border-slate-300 rounded-2xl">
              <span className="text-3xl flex-shrink-0">{note.icon}</span>
              <div>
                <strong className="block text-slate-800 mb-1">{note.title}</strong>
                <p className="text-sm text-slate-600 leading-relaxed">{note.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
