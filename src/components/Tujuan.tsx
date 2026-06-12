'use client'
import { useEffect, useRef } from 'react'

const tujuan = [
  {
    num: '01',
    title: 'Memahami Konsep Dasar Sholat',
    desc: 'Peserta didik dapat menjelaskan pengertian, hukum, dan kedudukan sholat dalam Islam dengan tepat berdasarkan dalil Al-Quran dan Hadits',
    tags: ['Kognitif C2', 'Pemahaman'],
  },
  {
    num: '02',
    title: 'Menguasai Syarat dan Rukun Sholat',
    desc: 'Peserta didik dapat menyebutkan syarat wajib, syarat sah, dan 13 rukun sholat secara lengkap dan terurut dengan benar',
    tags: ['Kognitif C1', 'Hafalan'],
  },
  {
    num: '03',
    title: 'Mempraktikkan Tata Cara Sholat',
    desc: 'Peserta didik dapat mempraktikkan tata cara sholat fardhu dengan benar sesuai tuntunan Rasulullah SAW meliputi gerakan dan bacaan',
    tags: ['Psikomotorik', 'Praktik'],
  },
]

export default function Tujuan() {
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
    <section id="tujuan" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full border border-slate-300 bg-slate-100 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-4">
            🎯 Tujuan
          </span>
          <h2 className="text-3xl font-extrabold mb-3">Tujuan Pembelajaran</h2>
          <p className="text-slate-600">Setelah mempelajari media ini, peserta didik diharapkan mampu:</p>
        </div>

        <div className="flex flex-col gap-5">
          {tujuan.map((t, i) => (
            <div
              key={i}
              className="reveal flex items-start gap-6 bg-white shadow-sm border border-slate-200 rounded-2xl p-7 hover:border-[#52b788] hover:translate-x-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Badge */}
              <div className="flex-shrink-0 w-16 h-16 relative flex items-center justify-center">
                <div className="anim-ring absolute inset-0 border-2 border-[#d4a017] rounded-full opacity-50" />
                <span className="text-2xl font-black text-[#d4a017] relative z-10">{t.num}</span>
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-800 mb-2">{t.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{t.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full border border-slate-300 bg-slate-100 text-xs font-semibold text-emerald-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
