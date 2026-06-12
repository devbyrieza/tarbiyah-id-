'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GraduationCap, BookOpenCheck, ArrowRight } from 'lucide-react'

export default function Footer() {
  const router = useRouter()

  const loginAsLecturer = () => {
    localStorage.setItem('pai_admin_token', 'dosen-guest-2026')
    router.push('/admin')
  }

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Banner Khusus Dosen - SANGAT DIBUAT MENONJOL */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-3xl p-1 relative overflow-hidden mb-16 shadow-2xl shadow-orange-500/30 transform hover:-translate-y-2 transition-all duration-300">
          {/* Efek mengkilap animasi */}
          <div className="absolute inset-0 bg-white/20 w-[200%] h-full skew-x-[-45deg] -ml-[100%] animate-[shine_3s_infinite]"></div>
          
          <div className="bg-slate-900 rounded-[1.4rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/50 anim-bounce">
                <GraduationCap className="w-10 h-10" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-black tracking-widest uppercase rounded-full mb-3 border border-amber-500/30">Khusus Dosen Penilai</span>
                <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400 mb-2">Simulasi Panel Admin</h3>
                <p className="text-slate-300 text-sm md:text-base max-w-lg leading-relaxed font-medium">
                  Bapak/Ibu Dosen dapat mencoba mengunggah materi, membuat kuis, dan membalas forum siswa tanpa perlu melakukan registrasi.
                </p>
              </div>
            </div>
            <button 
              onClick={loginAsLecturer}
              className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-900 font-black text-lg rounded-xl transition-all shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:shadow-[0_0_50px_rgba(245,158,11,0.8)] hover:scale-105 flex-shrink-0 flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <span>Masuk 1-Klik (Guest)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                <BookOpenCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight block leading-tight">Tarbiyah.id</span>
                <span className="text-xs font-semibold text-teal-400 tracking-widest uppercase">E-Learning PAI</span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm mb-6">
              Platform edukasi interaktif untuk mempelajari Pendidikan Agama Islam secara komprehensif, mudah, dan menyenangkan.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Navigasi</h4>
            <ul className="space-y-4">
              <li><Link href="/#petunjuk" className="text-slate-400 hover:text-teal-400 transition-colors text-sm font-medium">Petunjuk Penggunaan</Link></li>
              <li><Link href="/#materi" className="text-slate-400 hover:text-teal-400 transition-colors text-sm font-medium">Materi Pembelajaran</Link></li>
              <li><Link href="/#evaluasi" className="text-slate-400 hover:text-teal-400 transition-colors text-sm font-medium">Kuis Evaluasi</Link></li>
              <li><Link href="/forum" className="text-slate-400 hover:text-teal-400 transition-colors text-sm font-medium">Forum Diskusi</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Kontak</h4>
            <ul className="space-y-4">
              <li className="text-slate-400 text-sm font-medium">Email: support@pai-interaktif.edu</li>
              <li className="text-slate-400 text-sm font-medium">Tugas UAS - Universitas Al-Andalus</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm font-medium flex flex-col md:flex-row items-center justify-between">
          <p>© 2026 Tarbiyah.id. Dibuat oleh Fikri.</p>
          <p className="mt-2 md:mt-0">Platform Pembelajaran PAI Modern & Interaktif</p>
        </div>
      </div>
    </footer>
  )
}
