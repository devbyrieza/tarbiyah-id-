'use client'
import { useState, useRef, useEffect } from 'react'
import { GraduationCap, Sparkles, HeartHandshake, AlertTriangle, Library } from 'lucide-react'

export default function Materi() {
  const [activeTab, setActiveTab] = useState(0)
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

  const tabs = ['Pengertian', 'Syarat', 'Rukun', 'Batal']
  
  const content = [
    {
      title: 'Aqidah Islam',
      desc: 'Aqidah secara bahasa berarti ikatan. Secara istilah, aqidah adalah keyakinan yang kuat dan teguh di dalam hati terhadap rukun iman yang enam.',
      icon: <GraduationCap className="w-full h-full" strokeWidth={1.5} />
    },
    {
      title: 'Akhlak Terpuji',
      desc: '1. Jujur dalam perkataan dan perbuatan\n2. Amanah dan dapat dipercaya\n3. Hormat kepada orang tua dan guru\n4. Kasih sayang terhadap sesama\n5. Sabar dan syukur',
      icon: <Sparkles className="w-full h-full" strokeWidth={1.5} />
    },
    {
      title: 'Fiqih Ibadah',
      desc: '1. Niat\n2. Berdiri bagi yang mampu\n3. Takbiratul Ihram\n4. Membaca Al-Fatihah\n5. Ruku\' dengan tuma\'ninah\n6. I\'tidal\n7. Sujud\n8. Duduk di antara dua sujud\n9. Duduk Tasyahud Akhir\n10. Membaca Tasyahud Akhir\n11. Membaca Sholawat\n12. Salam pertama\n13. Tertib',
      icon: <HeartHandshake className="w-full h-full" strokeWidth={1.5} />
    },
    {
      title: 'Hal yang Membatalkan',
      desc: '1. Berbicara dengan sengaja\n2. Bergerak berturut-turut tiga kali\n3. Berhadats (kentut, buang air)\n4. Terkena najis\n5. Terbuka aurat secara sengaja\n6. Makan dan minum\n7. Tertawa terbahak-bahak\n8. Murtad',
      icon: <AlertTriangle className="w-full h-full" strokeWidth={1.5} />
    }
  ]

  return (
    <section id="materi" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-xs font-bold text-teal-600 uppercase tracking-wider mb-4">
            <Library className="w-3.5 h-3.5" /> Materi Utama
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Materi Dasar Pendidikan Agama Islam</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Pelajari dengan saksama dasar-dasar ajaran Islam yang wajib diketahui oleh setiap muslim.</p>
        </div>

        <div className="bg-white shadow-xl shadow-slate-200/50 rounded-[2.5rem] border border-slate-100 overflow-hidden reveal">
          {/* Tab Headers */}
          <div className="flex overflow-x-auto border-b border-slate-100 no-scrollbar">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex-1 py-6 px-6 text-sm md:text-base font-bold whitespace-nowrap transition-all border-b-2 ${
                  activeTab === i
                    ? 'border-teal-600 text-teal-600 bg-teal-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
            {/* Background Icon */}
            <div className="absolute -right-10 -bottom-10 text-[15rem] opacity-5 pointer-events-none transition-all duration-500">
              {content[activeTab].icon}
            </div>

            <div className="relative z-10 anim-fade-in" key={activeTab}>
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-4xl mb-6 shadow-sm border border-teal-100">
                {content[activeTab].icon}
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-6">{content[activeTab].title}</h3>
              <div className="prose prose-lg prose-slate prose-p:leading-relaxed prose-li:my-2 max-w-none text-slate-600">
                {content[activeTab].desc.split('\n').map((line, i) => (
                  <p key={i} className={line.match(/^\d+\./) ? 'flex gap-3 font-medium' : 'font-medium'}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
