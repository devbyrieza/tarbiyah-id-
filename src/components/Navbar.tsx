'use client'
import Link from 'next/link'
import { useState } from 'react'
import { BookOpenCheck, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed w-full z-50">
      {/* Top Announcement Bar untuk Dosen */}
      <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 text-xs md:text-sm font-bold text-center py-2.5 px-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 shadow-sm relative z-50">
        <span className="flex items-center gap-2">
          <span>🎓</span> Khusus Dosen Penilai: Coba akses Simulasi Panel Admin PAI
        </span>
        <Link href="/admin/login" className="bg-slate-900 text-amber-400 px-4 py-1 rounded-full text-xs hover:bg-slate-800 transition-all shadow-md flex items-center gap-1">
          Masuk 1-Klik (Guest) &rarr;
        </Link>
      </div>
      
      {/* Navbar Utama */}
      <nav className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm relative z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-xl text-slate-800 tracking-tight block leading-tight">Tarbiyah.id</span>
            <span className="text-xs font-semibold text-teal-600 tracking-widest uppercase">E-Learning PAI</span>
          </div>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/#petunjuk" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Petunjuk</Link>
          <Link href="/#materi" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Materi</Link>
          <Link href="/#evaluasi" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Evaluasi</Link>
          <Link href="/forum" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Forum Diskusi</Link>
          <Link href="/admin/login" className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-all border border-slate-200">
            Masuk Pengajar
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-4">
          <Link href="/#petunjuk" onClick={() => setIsOpen(false)} className="block text-sm font-semibold text-slate-600">Petunjuk</Link>
          <Link href="/#materi" onClick={() => setIsOpen(false)} className="block text-sm font-semibold text-slate-600">Materi</Link>
          <Link href="/#evaluasi" onClick={() => setIsOpen(false)} className="block text-sm font-semibold text-slate-600">Evaluasi</Link>
          <Link href="/forum" onClick={() => setIsOpen(false)} className="block text-sm font-semibold text-slate-600">Forum Diskusi</Link>
          <Link href="/admin/login" onClick={() => setIsOpen(false)} className="block text-sm font-semibold text-teal-600">Masuk Pengajar</Link>
        </div>
        )}
      </nav>
    </div>
  )
}
