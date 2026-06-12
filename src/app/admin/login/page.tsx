'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BookOpenCheck, GraduationCap } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'admin@pai.edu' && password === 'admin123') {
      localStorage.setItem('pai_admin_token', 'admin-full-2026')
      router.push('/admin')
    } else {
      alert('Email atau password salah!')
    }
  }

  const handleGuest = () => {
    localStorage.setItem('pai_admin_token', 'dosen-guest-2026')
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-teal-100 rounded-full blur-3xl opacity-50 anim-float"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-100 rounded-full blur-3xl opacity-50 anim-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl text-white shadow-xl shadow-teal-500/20 mb-6 hover:scale-105 transition-transform">
            <BookOpenCheck className="w-10 h-10" />
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Login Pengajar</h1>
          <p className="text-slate-600">Masuk untuk mengelola materi Tarbiyah.id</p>
        </div>

        <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-[2.5rem] p-8 md:p-10 mb-8 relative">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@pai.edu"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-600/20 hover:-translate-y-0.5"
            >
              Masuk
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-slate-100">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center relative overflow-hidden">
              <div className="absolute -top-3 -right-3 text-amber-500 opacity-10">
                <GraduationCap className="w-32 h-32" />
              </div>
              <p className="text-xs text-amber-700 mb-3 font-black uppercase tracking-wider">Khusus Bapak/Ibu Dosen</p>
              <button
                onClick={handleGuest}
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 font-black text-lg rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Masuk 1-Klik (Guest)
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-center text-slate-500 text-sm">
          <Link href="/" className="hover:text-teal-600 font-medium transition-colors">← Kembali ke Beranda</Link>
        </p>
      </div>
    </div>
  )
}
