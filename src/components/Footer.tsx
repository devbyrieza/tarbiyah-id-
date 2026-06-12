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
