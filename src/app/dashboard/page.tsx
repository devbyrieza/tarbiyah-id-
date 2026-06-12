'use client'
import { useEffect, useState } from 'react'
import { supabase, QuizResult } from '@/lib/supabase'
import Link from 'next/link'

export default function DashboardPage() {
  const [results, setResults] = useState<QuizResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchResults = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setResults(data || [])
    } catch (e) {
      setError('Gagal memuat data. Pastikan Supabase sudah dikonfigurasi.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchResults() }, [])

  const avg = results.length ? Math.round(results.reduce((a, r) => a + r.score, 0) / results.length * 20) : 0
  const perfect = results.filter(r => r.score === 5).length

  return (
    <div className="min-h-screen bg-[#0a1612] text-[#eaf4ee] p-8 font-jakarta">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <div>
              <h1 className="text-2xl font-extrabold">Dashboard Guru</h1>
              <p className="text-sm text-[#5a8870]">Hasil Evaluasi Siswa — Tata Cara Sholat</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchResults} className="px-4 py-2 border border-[rgba(82,183,136,0.3)] rounded-xl text-sm font-semibold text-[#52b788] hover:bg-[rgba(82,183,136,0.1)] transition-colors">
              🔄 Refresh
            </button>
            <Link href="/" className="px-4 py-2 bg-gold rounded-xl text-sm font-bold text-[#0a1612] hover:shadow-[0_4px_12px_rgba(212,160,23,0.4)] transition-all">
              ← Kembali ke Materi
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Siswa', value: results.length, icon: '👨‍🎓' },
            { label: 'Rata-rata Nilai', value: avg, icon: '📈', suffix: '' },
            { label: 'Nilai Sempurna', value: perfect, icon: '🏆' },
            { label: 'Soal Dijawab', value: results.length * 5, icon: '📝' },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.04] border border-[rgba(82,183,136,0.15)] rounded-2xl p-5 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl font-black text-[#d4a017]">{s.value}{s.suffix}</div>
              <div className="text-xs text-[#5a8870] font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white/[0.04] border border-[rgba(82,183,136,0.15)] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[rgba(82,183,136,0.15)] bg-[#0f1f18] flex items-center justify-between">
            <h2 className="font-bold">Daftar Hasil Siswa</h2>
            <span className="text-xs text-[#5a8870]">{results.length} entri</span>
          </div>

          {loading && (
            <div className="py-16 text-center">
              <div className="anim-spin inline-block w-8 h-8 border-2 border-[#52b788] border-t-transparent rounded-full mb-3" />
              <p className="text-[#5a8870] text-sm">Memuat data...</p>
            </div>
          )}

          {error && !loading && (
            <div className="py-12 text-center">
              <p className="text-red-400 text-sm mb-2">{error}</p>
              <p className="text-[#5a8870] text-xs">Konfigurasi Supabase di .env.local terlebih dahulu</p>
            </div>
          )}

          {!loading && !error && results.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-[#5a8870] text-sm">Belum ada siswa yang mengerjakan evaluasi</p>
            </div>
          )}

          {!loading && !error && results.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(82,183,136,0.1)] text-[#5a8870] text-xs uppercase tracking-wider">
                    <th className="text-left px-6 py-3">#</th>
                    <th className="text-left px-6 py-3">Nama Siswa</th>
                    <th className="text-center px-6 py-3">Skor</th>
                    <th className="text-center px-6 py-3">Nilai</th>
                    <th className="text-center px-6 py-3">Status</th>
                    <th className="text-left px-6 py-3">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => {
                    const nilai = r.percentage ?? Math.round((r.score / r.total) * 100)
                    const passed = r.score >= 3
                    return (
                      <tr key={r.id} className="border-b border-[rgba(82,183,136,0.07)] hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 text-[#5a8870]">{i + 1}</td>
                        <td className="px-6 py-4 font-semibold text-[#eaf4ee]">{r.student_name}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-[#d4a017]">{r.score}</span>
                          <span className="text-[#5a8870]">/{r.total}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`font-bold ${nilai >= 80 ? 'text-green-400' : nilai >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {nilai}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${passed ? 'bg-green-400/15 text-green-400' : 'bg-red-400/15 text-red-400'}`}>
                            {passed ? 'Lulus' : 'Remedi'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#5a8870] text-xs">
                          {r.created_at ? new Date(r.created_at).toLocaleString('id-ID') : '-'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
