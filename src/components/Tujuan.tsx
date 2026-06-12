'use client'
import { useEffect, useRef } from 'react'
import { Target } from 'lucide-react'

export default function Tujuan() {
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

  return (
    <section className="py-24 bg-teal-600 relative overflow-hidden" ref={ref}>
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[20px] border-white"></div>
        <div className="absolute top-1/2 right-[-10%] w-64 h-64 rounded-full border-[15px] border-white"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center reveal">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-teal-400 bg-teal-500 text-xs font-bold text-white uppercase tracking-wider mb-6">
          <Target className="w-3.5 h-3.5" /> Kompetensi Inti
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
          Tujuan Pembelajaran
        </h2>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-xl text-left">
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-white text-teal-600 flex items-center justify-center font-bold flex-shrink-0 mt-1">1</div>
              <p className="text-white text-lg font-medium leading-relaxed">Siswa dapat <strong className="text-amber-300">menjelaskan pengertian</strong> ajaran Islam dan dasar hukumnya dengan benar.</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-white text-teal-600 flex items-center justify-center font-bold flex-shrink-0 mt-1">2</div>
              <p className="text-white text-lg font-medium leading-relaxed">Siswa mampu <strong className="text-amber-300">mengidentifikasi syarat dan rukun</strong> ajaran Islam dalam kehidupan sehari-hari.</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-white text-teal-600 flex items-center justify-center font-bold flex-shrink-0 mt-1">3</div>
              <p className="text-white text-lg font-medium leading-relaxed">Siswa dapat <strong className="text-amber-300">mempraktikkan gerakan dan bacaan</strong> ibadah dengan baik, benar, dan penuh kesadaran.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
