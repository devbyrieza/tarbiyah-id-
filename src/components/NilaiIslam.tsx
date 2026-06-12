'use client'
import { useEffect, useRef } from 'react'
import { MoonStar, BookOpenText, ShieldCheck, Bird, Hourglass } from 'lucide-react'

export default function NilaiIslam() {
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
    <section className="py-24 bg-slate-50 border-t border-slate-200" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-xs font-bold text-teal-600 uppercase tracking-wider mb-4">
            <MoonStar className="w-3.5 h-3.5" /> Nilai Keislaman
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Nilai-Nilai Ajaran Islam</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Pendidikan Agama Islam bukan sekadar hafalan, melainkan pedoman hidup untuk meraih kebahagiaan di dunia dan akhirat.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center reveal">
          <div className="order-2 md:order-1 bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-400 to-emerald-600"></div>
            <div className="text-5xl text-teal-100 mb-6 font-serif">"</div>
            <p className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed mb-8 italic">
              Bacalah apa yang telah diwahyukan kepadamu, yaitu Al Kitab (Al Quran) dan dirikanlah shalat. Sesungguhnya shalat itu mencegah dari (perbuatan-perbuatan) keji dan mungkar.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 text-slate-600">
                <BookOpenText className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-900">QS. Al-Ankabut</p>
                <p className="text-sm text-slate-500">Ayat 45</p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Benteng Diri</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Pemahaman agama yang baik akan menjadi perisai dari perbuatan buruk dalam kehidupan sehari-hari.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 text-amber-600">
                <Bird className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Ketenangan Jiwa</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Menjadi momen jeda dari hiruk-pikuk duniawi untuk berkomunikasi dengan Sang Pencipta.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600">
                <Hourglass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Disiplin Waktu</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Melatih umat Islam untuk selalu tepat waktu dan teratur dalam menjalani keseharian.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
