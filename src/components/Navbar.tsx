'use client'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Petunjuk', href: '#petunjuk' },
  { label: 'Tujuan', href: '#tujuan' },
  { label: 'Materi', href: '#materi' },
  { label: 'Interaktif', href: '#interaktif' },
  { label: 'Nilai Islam', href: '#nilai-islam' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-50/90 backdrop-blur-xl border-b border-slate-200 py-3'
          : 'py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <button onClick={() => handleNav('#hero')} className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl">🕌</span>
          <span className="font-extrabold text-lg text-slate-800">
            PAI <span className="text-[#d4a017]">Interaktif</span>
          </span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNav(item.href)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleNav('#evaluasi')}
              className="ml-2 px-5 py-2 bg-gold rounded-full text-sm font-bold text-white transition-all hover:shadow-[0_4px_16px_rgba(212,160,23,0.45)] hover:-translate-y-0.5"
            >
              Evaluasi
            </button>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          id="hamburger-btn"
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-[#eaf4ee] transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#eaf4ee] transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#eaf4ee] transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-50/97 backdrop-blur-xl border-t border-slate-200 px-6 py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#evaluasi')}
            className="mt-2 px-5 py-3 bg-gold rounded-xl text-sm font-bold text-white text-center"
          >
            📝 Evaluasi
          </button>
        </div>
      )}
    </nav>
  )
}
