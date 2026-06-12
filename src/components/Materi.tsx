'use client'
import { useState, useEffect, useRef } from 'react'

const tabs = [
  { id: 'pengertian', label: '📚 Pengertian' },
  { id: 'syarat', label: '✅ Syarat' },
  { id: 'rukun', label: '🕌 Rukun' },
  { id: 'tatacara', label: '📋 Tata Cara' },
  { id: 'batal', label: '❌ Yang Membatalkan' },
]

function PengertianTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-emerald-600 font-bold text-lg mb-3">📚 Pengertian Sholat</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Sholat secara bahasa berasal dari kata <em>shalla</em> yang berarti <strong className="text-slate-800">doa</strong>. Secara istilah, sholat adalah{' '}
          <strong className="text-slate-800">ibadah yang terdiri dari ucapan dan perbuatan tertentu</strong> yang dimulai dengan takbiratul ihram dan diakhiri dengan salam.
        </p>
        <div className="p-5 rounded-xl border border-[rgba(212,160,23,0.25)] bg-[rgba(212,160,23,0.07)] text-center">
          <p className="font-amiri text-[#f0c040] text-xl leading-loose mb-2">
            إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا
          </p>
          <p className="text-slate-600 text-sm italic">"Sesungguhnya sholat itu adalah fardhu yang ditentukan waktunya atas orang-orang yang beriman."</p>
          <p className="text-[#d4a017] text-xs font-bold mt-1">QS. An-Nisa: 103</p>
        </div>
      </div>
      <div>
        <h3 className="text-emerald-600 font-bold text-lg mb-3">⚖️ Hukum Sholat</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { badge: 'Fardhu Ain', color: 'red', desc: "Sholat 5 waktu wajib dikerjakan oleh setiap Muslim yang baligh dan berakal. Meninggalkannya adalah dosa besar." },
            { badge: "Sunnah Mu'akkadah", color: 'yellow', desc: "Sholat sunnah seperti Tahajud, Dhuha, Rawatib sangat dianjurkan sebagai pelengkap sholat fardhu." },
          ].map((h) => (
            <div key={h.badge} className={`p-5 rounded-xl border ${h.color === 'red' ? 'border-red-500/20 bg-red-500/5' : 'border-yellow-500/20 bg-yellow-500/5'}`}>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${h.color === 'red' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'} mb-2 inline-block`}>{h.badge}</span>
              <p className="text-sm text-slate-600">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-emerald-600 font-bold text-lg mb-3">⏰ Waktu Sholat 5 Waktu</h3>
        <div className="rounded-xl overflow-hidden border border-slate-200">
          {[
            ['🌅 Subuh', 'Fajar — Terbit matahari', '2'],
            ['☀️ Dzuhur', 'Matahari condong — Ashar', '4'],
            ['🌤️ Ashar', 'Bayangan = benda — Maghrib', '4'],
            ['🌆 Maghrib', 'Terbenam matahari — Isya', '3'],
            ['🌙 Isya', 'Hilangnya syafaq — Fajar', '4'],
          ].map(([name, time, rakaat], i) => (
            <div key={i} className={`grid grid-cols-3 gap-4 px-5 py-3 text-sm ${i % 2 === 0 ? 'bg-white/[0.02]' : ''} border-b border-[rgba(82,183,136,0.1)] last:border-0`}>
              <span className="text-slate-800 font-medium">{name}</span>
              <span className="text-slate-600">{time}</span>
              <span className="text-[#d4a017] font-bold text-center">{rakaat} rakaat</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SyaratTab() {
  return (
    <div className="space-y-6">
      {[
        {
          title: '✅ Syarat Wajib Sholat',
          desc: 'Seseorang diwajibkan sholat apabila memenuhi syarat:',
          items: [['🌙', 'Islam', 'Hanya Muslim yang wajib mendirikan sholat'], ['🔞', 'Baligh', 'Sudah dewasa (mimpi basah / haid)'], ['🧠', 'Berakal', 'Tidak gila atau hilang kesadaran'], ['🩸', 'Suci Haid/Nifas', 'Perempuan yang haid/nifas tidak wajib'], ['📢', 'Sampai Dakwah', 'Telah mengetahui kewajiban sholat']],
        },
        {
          title: '✅ Syarat Sah Sholat',
          desc: 'Agar sholat dinyatakan sah:',
          items: [['💧', 'Berwudhu', 'Suci dari hadats kecil dan besar'], ['🧹', 'Suci dari Najis', 'Badan, pakaian, dan tempat sholat'], ['👘', 'Menutup Aurat', 'Laki-laki: pusar–lutut; Perempuan: seluruh tubuh kecuali wajah & telapak'], ['🕋', 'Menghadap Kiblat', 'Menghadap Ka\'bah di Mekkah'], ['⏰', 'Masuk Waktu', 'Dikerjakan pada waktu yang ditentukan'], ['📚', 'Tahu Tata Cara', 'Mengetahui cara sholat yang benar']],
        },
      ].map((sec) => (
        <div key={sec.title}>
          <h3 className="text-emerald-600 font-bold text-lg mb-2">{sec.title}</h3>
          <p className="text-slate-600 text-sm mb-4">{sec.desc}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sec.items.map(([icon, name, desc]) => (
              <div key={name} className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-[#52b788] transition-colors">
                <span className="text-xl flex-shrink-0">{icon}</span>
                <div>
                  <h4 className="font-semibold text-sm text-slate-800 mb-0.5">{name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function RukunTab() {
  const rukun = ['Niat','Takbiratul Ihram','Berdiri (bagi yang mampu)','Membaca Al-Fatihah','Ruku\'','Thuma\'ninah saat Ruku\'','I\'tidal','Thuma\'ninah saat I\'tidal','Sujud (2x per rakaat)','Thuma\'ninah saat Sujud','Duduk di antara 2 Sujud','Tasyahud Akhir & Tahiyat','Salam']
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-emerald-600 font-bold text-lg mb-2">🕌 13 Rukun Sholat</h3>
        <p className="text-slate-600 text-sm mb-4">Meninggalkan salah satunya menyebabkan sholat <strong className="text-rose-600">tidak sah</strong>.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {rukun.map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-[#d4a017] hover:bg-[rgba(212,160,23,0.05)] transition-all">
              <span className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-xs font-black text-white flex-shrink-0">{i + 1}</span>
              <span className="text-sm text-slate-600 leading-tight">{r}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 bg-[rgba(82,183,136,0.06)] border border-slate-300 rounded-xl">
        <span className="text-xl">💡</span>
        <p className="text-sm text-slate-600"><strong className="text-slate-800">Thuma'ninah</strong> artinya diam/tenang sejenak pada setiap gerakan sholat hingga semua anggota badan stabil di posisinya.</p>
      </div>
    </div>
  )
}

function TataCaraTab() {
  const steps = [
    ['🤲', 'Berdiri & Niat', 'Berdiri tegak menghadap kiblat, berniat dalam hati sesuai sholat yang dikerjakan', 'Niat cukup dalam hati'],
    ['🙌', 'Takbiratul Ihram', 'Mengangkat kedua tangan sejajar telinga atau bahu sambil mengucapkan takbir', 'اللَّهُ أَكْبَرُ — Allahu Akbar'],
    ['📖', 'Doa Iftitah & Al-Fatihah', 'Membaca doa iftitah (sunnah), kemudian wajib membaca Al-Fatihah, lalu surat/ayat pilihan', 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ...'],
    ['🙇', "Ruku'", 'Membungkukkan badan hingga punggung lurus sejajar, tangan di lutut, membaca tasbih 3x', "سُبْحَانَ رَبِّيَ الْعَظِيمِ (3x)"],
    ['🧍', "I'tidal", "Bangkit berdiri kembali tegak dari ruku' sambil mengangkat tangan", "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ — Rabbana lakal hamd"],
    ['🙏', 'Sujud', '7 anggota badan menyentuh lantai: dahi+hidung, 2 telapak tangan, 2 lutut, 2 ujung kaki', "سُبْحَانَ رَبِّيَ الْأَعْلَى (3x)"],
    ['🪑', 'Duduk antara 2 Sujud', 'Duduk iftirasy antara dua sujud', "رَبِّ اغْفِرْ لِي وَارْحَمْنِي..."],
    ['🤝', 'Tasyahud & Salam', 'Membaca tasyahud akhir dan shalawat, kemudian salam ke kanan dan kiri', "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ"],
  ]
  return (
    <div>
      <h3 className="text-emerald-600 font-bold text-lg mb-5">📋 Tata Cara Sholat Step by Step</h3>
      <div className="space-y-0">
        {steps.map(([icon, title, desc, bacaan], i) => (
          <div key={i} className="flex gap-4 pb-6 relative">
            {i < steps.length - 1 && <div className="tl-line" />}
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 z-10" style={{ background: 'linear-gradient(135deg,#2d6a4f,#1b4332)', border: '1px solid rgba(82,183,136,0.3)' }}>
              {icon}
            </div>
            <div className="flex-1 pt-1">
              <h4 className="font-bold text-slate-800 text-sm mb-1">{i + 1}. {title}</h4>
              <p className="text-xs text-slate-600 mb-2 leading-relaxed">{desc}</p>
              <div className="inline-block px-3 py-1.5 rounded-lg border border-[rgba(212,160,23,0.2)] bg-[rgba(212,160,23,0.07)] font-amiri text-[#f0c040] text-sm">
                {bacaan}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BatalTab() {
  const items = [
    ['💬', 'Berbicara dengan Sengaja', 'Mengucapkan kata-kata yang bukan bagian dari bacaan sholat, meski satu kata'],
    ['💨', 'Hadats (Kecil/Besar)', 'Buang angin, buang air, atau hal lain yang membatalkan wudhu'],
    ['🔄', 'Berpaling dari Kiblat', 'Mengalihkan seluruh badan dari arah kiblat tanpa uzur'],
    ['🍔', 'Makan dan Minum', 'Memasukkan makanan atau minuman ke dalam mulut secara sengaja'],
    ['😂', 'Tertawa Terbahak-bahak', 'Tertawa hingga terdengar suaranya oleh orang sekitar'],
    ['🚫', 'Meninggalkan Rukun', 'Tidak melakukan salah satu dari 13 rukun sholat tanpa uzur'],
  ]
  return (
    <div>
      <h3 className="text-emerald-600 font-bold text-lg mb-2">❌ Hal yang Membatalkan Sholat</h3>
      <p className="text-slate-600 text-sm mb-5">Sholat dinyatakan batal dan harus diulang jika terjadi hal berikut:</p>
      <div className="space-y-3">
        {items.map(([icon, title, desc]) => (
          <div key={title} className="flex items-center gap-4 p-4 bg-red-500/[0.04] border border-red-500/15 rounded-xl hover:border-rose-200 transition-colors">
            <span className="text-2xl flex-shrink-0">{icon}</span>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-slate-800 mb-0.5">{title}</h4>
              <p className="text-xs text-slate-500">{desc}</p>
            </div>
            <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-xs font-bold">Batal</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const panelMap: Record<string, React.ReactNode> = {
  pengertian: <PengertianTab />,
  syarat: <SyaratTab />,
  rukun: <RukunTab />,
  tatacara: <TataCaraTab />,
  batal: <BatalTab />,
}

export default function Materi() {
  const [active, setActive] = useState('pengertian')
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
    <section id="materi" className="py-24" style={{ background: 'var(--bg-mid)' }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full border border-slate-300 bg-slate-100 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-4">
            📖 Materi
          </span>
          <h2 className="text-3xl font-extrabold mb-3">Materi Inti</h2>
          <p className="text-slate-600">Pilih topik di bawah untuk memulai membaca materi</p>
        </div>

        <div className="reveal bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
          {/* Tab buttons */}
          <div className="flex border-b border-slate-200 bg-white overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex-shrink-0 px-5 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                  active === tab.id
                    ? 'text-[#d4a017] border-[#d4a017]'
                    : 'text-slate-500 border-transparent hover:text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="p-8">
            {panelMap[active]}
          </div>
        </div>
      </div>
    </section>
  )
}
