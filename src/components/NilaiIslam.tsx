'use client'
import { useEffect, useRef } from 'react'

export default function NilaiIslam() {
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
    <section id="nilai-islam" className="py-24" style={{ background: 'var(--bg-mid)' }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full border border-slate-300 bg-slate-100 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-4">
            ☪️ Nilai Islam
          </span>
          <h2 className="text-3xl font-extrabold mb-3">Nilai Keislaman & Keteladanan</h2>
          <p className="text-slate-600">Menghayati makna sholat dari Al-Quran, Hadits, dan kisah teladan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Hadits */}
          <div className="reveal bg-white shadow-sm border border-slate-200 rounded-2xl p-7 hover:-translate-y-1 hover:border-[#52b788] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300">
            <div className="text-3xl mb-4">📜</div>
            <h3 className="font-bold mb-4">Hadits Keutamaan Sholat</h3>
            <p className="font-amiri text-[#d4a017] text-base text-center leading-loose mb-3 block">
              الصَّلَاةُ عِمَادُ الدِّينِ، فَمَنْ أَقَامَهَا فَقَدْ أَقَامَ الدِّينَ، وَمَنْ تَرَكَهَا فَقَدْ هَدَمَ الدِّينَ
            </p>
            <p className="text-sm text-slate-600 italic leading-relaxed mb-2">
              "Sholat adalah tiang agama. Barangsiapa mendirikannya, ia telah menegakkan agama. Barangsiapa meninggalkannya, ia telah merobohkan agama."
            </p>
            <p className="text-xs text-[#d4a017] font-bold">— HR. Baihaqi</p>
          </div>

          {/* Keteladanan */}
          <div className="reveal bg-white shadow-sm border border-slate-200 rounded-2xl p-7 hover:-translate-y-1 hover:border-[#52b788] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300" style={{ transitionDelay: '80ms' }}>
            <div className="text-3xl mb-4">⭐</div>
            <h3 className="font-bold mb-4">Keteladanan Rasulullah SAW</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Rasulullah SAW tidak pernah meninggalkan sholat meski dalam kondisi sakit sekalipun. Beliau bersabda bahwa{' '}
              <strong className="text-slate-800">hal pertama yang akan dihisab</strong> pada hari kiamat adalah amalan sholat seseorang.
            </p>
            <div className="flex flex-wrap gap-2">
              {['✅ Istiqomah', '✅ Tepat Waktu', '✅ Khusyu\'', '✅ Penuh Penghayatan'].map((v) => (
                <span key={v} className="px-3 py-1 rounded-full border border-slate-300 bg-slate-100 text-xs font-semibold text-emerald-500">{v}</span>
              ))}
            </div>
          </div>

          {/* Hikmah */}
          <div className="reveal bg-white shadow-sm border border-slate-200 rounded-2xl p-7 hover:-translate-y-1 hover:border-[#52b788] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300" style={{ transitionDelay: '160ms' }}>
            <div className="text-3xl mb-4">💎</div>
            <h3 className="font-bold mb-4">Hikmah Mendirikan Sholat</h3>
            <div className="space-y-3">
              {[
                ['🧹', 'Mencegah dari perbuatan keji dan mungkar (QS. Al-Ankabut: 45)'],
                ['🧘', 'Menenangkan jiwa dan mengurangi stres'],
                ['🤝', 'Mempererat ukhuwah Islamiyah dalam jamaah'],
                ['⏰', 'Melatih kedisiplinan dan manajemen waktu'],
                ['🙌', 'Bentuk syukur dan pengakuan kebesaran Allah SWT'],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="flex-shrink-0">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quran Banner */}
        <div className="reveal p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(27,67,50,0.4), rgba(212,160,23,0.1))', border: '1px solid rgba(212,160,23,0.25)' }}>
          <p className="font-amiri text-[#f0c040] text-2xl leading-loose mb-3">
            وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ
          </p>
          <p className="text-sm text-slate-600 italic mb-2">
            "Dan dirikanlah sholat, tunaikanlah zakat, dan ruku'lah beserta orang-orang yang ruku'."
          </p>
          <p className="text-sm text-[#d4a017] font-bold">QS. Al-Baqarah: 43</p>
        </div>
      </div>
    </section>
  )
}
