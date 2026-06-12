'use client'
import { useEffect, useRef } from 'react'
import { BookOpen, Gamepad2, FileSignature } from 'lucide-react'

export default function Petunjuk() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = ref.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const steps = [
    { icon: <BookOpen className="w-8 h-8 text-teal-600" />, title: 'Pahami Materi', desc: 'Baca panduan dan tonton video materi PAI dengan saksama.' },
    { icon: <Gamepad2 className="w-8 h-8 text-teal-600" />, title: 'Mainkan Game', desc: 'Uji daya ingatmu dengan menyusun konsep dasar Islam secara interaktif.' },
    { icon: <FileSignature className="w-8 h-8 text-teal-600" />, title: 'Ikuti Evaluasi', desc: 'Kerjakan kuis di akhir sesi untuk melihat seberapa jauh pemahamanmu.' }
  ]

  return (
    <section id="petunjuk" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Petunjuk Penggunaan</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Ikuti tiga langkah sederhana ini untuk mendapatkan pengalaman belajar yang maksimal.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="reveal bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm border border-slate-100">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
