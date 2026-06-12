'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const particleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = particleRef.current
    if (!container) return
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div')
      const size = Math.random() * 4 + 2
      p.className = 'particle'
      p.style.cssText = `
        left:${Math.random() * 100}%;
        width:${size}px; height:${size}px;
        animation-duration:${Math.random() * 18 + 14}s;
        animation-delay:${Math.random() * 20}s;
        opacity:${Math.random() * 0.25 + 0.08};
      `
      container.appendChild(p)
    }
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a1612 0%, #0f1f18 60%, #1b4332 100%)' }}
    >
      {/* Particles */}
      <div ref={particleRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

      {/* Decorative glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#2d6a4f]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#d4a017]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 flex items-center gap-12 flex-col md:flex-row">
        {/* Content */}
        <div className="flex-1 max-w-xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 bg-slate-100 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-6 opacity-0 animate-fade-up"
          >
            ✨ ICT Pembelajaran PAI 1 — Semester VI
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 opacity-0 animate-fade-up delay-1">
            Media Pembelajaran<br />
            <span className="gradient-text">Tata Cara Sholat</span>
          </h1>

          <p className="font-amiri text-2xl text-[#d4a017] text-center opacity-0 animate-fade-up delay-2 mb-1">
            الصَّلاةُ عِمَادُ الدِّينِ
          </p>
          <p className="text-sm text-slate-500 italic text-center opacity-0 animate-fade-up delay-2 mb-6">
            "Sholat adalah tiang agama" — HR. Baihaqi
          </p>

          <p className="text-slate-600 leading-relaxed mb-8 opacity-0 animate-fade-up delay-3">
            Media pembelajaran interaktif berbasis ICT yang dilengkapi materi komprehensif,
            aktivitas interaktif, dan evaluasi dengan umpan balik otomatis.
          </p>

          <div className="flex gap-3 flex-wrap mb-10 opacity-0 animate-fade-up delay-4">
            <button
              id="btn-mulai-belajar"
              onClick={() => scrollTo('#tujuan')}
              className="px-7 py-3.5 bg-gold rounded-full font-bold text-white text-sm hover:shadow-[0_8px_24px_rgba(212,160,23,0.45)] hover:-translate-y-0.5 transition-all"
            >
              🚀 Mulai Belajar
            </button>
            <button
              id="btn-lihat-petunjuk"
              onClick={() => scrollTo('#petunjuk')}
              className="px-7 py-3.5 border border-slate-300 rounded-full font-semibold text-sm text-slate-800 hover:bg-slate-100 hover:border-[#52b788] transition-all"
            >
              📋 Petunjuk
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 p-5 bg-white shadow-sm border border-slate-200 rounded-2xl w-fit opacity-0 animate-fade-up delay-5">
            {[['5', 'Topik Materi'], ['3', 'Tujuan Belajar'], ['5', 'Soal Evaluasi']].map(([num, label], i) => (
              <div key={i} className="flex items-center gap-5">
                {i > 0 && <div className="w-px h-8 bg-[rgba(82,183,136,0.2)]" />}
                <div className="text-center">
                  <div className="text-2xl font-black text-[#d4a017] leading-none">{num}</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mosque Illustration */}
        <div className="hidden md:flex flex-col items-center flex-shrink-0 relative w-72 h-72">
          <div className="anim-moon absolute top-2 right-6 text-4xl drop-shadow-[0_0_12px_rgba(212,160,23,0.7)]">🌙</div>

          <div className="mt-12 flex flex-col items-center">
            {/* Dome */}
            <div
              className="w-28 h-16 rounded-t-full relative"
              style={{ background: 'linear-gradient(135deg, #d4a017, #f0c040)', boxShadow: '0 0 32px rgba(212,160,23,0.35)' }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-6 bg-[#f0c040] rounded-full" />
            </div>

            {/* Base + Minarets */}
            <div className="relative flex justify-center">
              <div
                className="absolute -left-9 bottom-0 w-6 h-24 rounded-t-lg"
                style={{ background: 'linear-gradient(135deg, #2d6a4f, #1b4332)', border: '1px solid rgba(82,183,136,0.3)' }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-full h-3 bg-[#d4a017] rounded-t-full" />
              </div>
              <div
                className="w-44 h-24 rounded-t-xl relative"
                style={{ background: 'linear-gradient(135deg, #2d6a4f, #1b4332)', border: '1px solid rgba(82,183,136,0.3)', boxShadow: '0 0 32px rgba(45,106,79,0.4)' }}
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-14 bg-[rgba(212,160,23,0.15)] border border-[rgba(212,160,23,0.3)] rounded-t-full" />
              </div>
              <div
                className="absolute -right-9 bottom-0 w-6 h-24 rounded-t-lg"
                style={{ background: 'linear-gradient(135deg, #2d6a4f, #1b4332)', border: '1px solid rgba(82,183,136,0.3)' }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-full h-3 bg-[#d4a017] rounded-t-full" />
              </div>
            </div>
          </div>

          {/* Ground glow */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-3 bg-[#2d6a4f]/40 blur-xl rounded-full" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <p className="text-xs text-slate-500 font-medium">Scroll ke bawah</p>
        <div className="w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-[#52b788] rounded-full" style={{ animation: 'float 1.5s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  )
}
