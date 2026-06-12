'use client'
import { useState, useRef, useEffect } from 'react'
import { fireConfetti, playCorrect, playWrong, playWin } from '@/lib/utils'
import { supabase, LeaderboardEntry } from '@/lib/supabase'
import { ClipboardList, GraduationCap, Trophy, Star, BookOpen, Lightbulb, RefreshCw, Rocket, Medal } from 'lucide-react'

const questions = [
  { text: 'Apa rukun Islam yang pertama?', options: ['Membaca Syahadat', 'Mendirikan Sholat', 'Membayar Zakat', 'Puasa Ramadhan'], correct: 0 },
  { text: 'Kitab suci yang diturunkan kepada Nabi Muhammad SAW adalah...', options: ['Taurat', 'Zabur', 'Al-Quran', 'Injil'], correct: 2 },
  { text: 'Malaikat yang bertugas menyampaikan wahyu adalah...', options: ['Malaikat Mikail', 'Malaikat Jibril', 'Malaikat Israfil', 'Malaikat Izrail'], correct: 1 },
  { text: 'Puasa wajib bagi umat Islam dilaksanakan pada bulan...', options: ['Syawal', 'Rajab', 'Ramadhan', 'Muharram'], correct: 2 },
  { text: 'Nabi yang mendapat gelar Khatamul Anbiya (Penutup Para Nabi) adalah...', options: ['Nabi Musa AS', 'Nabi Isa AS', 'Nabi Ibrahim AS', 'Nabi Muhammad SAW'], correct: 3 }
]

export default function Evaluasi() {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [name, setName] = useState('')
  const [selected, setSelected] = useState<number | null>(null)
  const [isWrong, setIsWrong] = useState(false)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const fetchLeaderboard = async () => {
    const { data } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(5)
    if (data) setLeaderboard(data)
  }

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) setStarted(true)
  }

  const handleAnswer = (idx: number) => {
    setSelected(idx)
    const correct = idx === questions[current].correct

    if (correct) {
      playCorrect()
      setIsWrong(false)
      setTimeout(async () => {
        const newScore = score + 20
        setScore(newScore)
        if (current < questions.length - 1) {
          setCurrent(current + 1)
          setSelected(null)
        } else {
          setShowResult(true)
          await supabase.from('leaderboard').insert([{ student_name: name, score: newScore }])
          await fetchLeaderboard()
          setTimeout(() => {
            playWin()
            fireConfetti()
          }, 300)
        }
      }, 1000)
    } else {
      playWrong()
      setIsWrong(true)
      setTimeout(() => {
        setIsWrong(false)
        setSelected(null)
      }, 800)
    }
  }

  const handleRestart = () => {
    setStarted(false)
    setCurrent(0)
    setScore(0)
    setShowResult(false)
    setName('')
    setSelected(null)
  }

  return (
    <section id="evaluasi" className="py-24 bg-white border-t border-slate-200" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-xs font-bold text-amber-600 uppercase tracking-wider mb-4">
            <ClipboardList className="w-3.5 h-3.5" /> Evaluasi Akhir
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Kuis Pemahaman</h2>
          <p className="text-slate-600">Uji seberapa jauh kamu memahami materi yang telah dipelajari.</p>
        </div>

        {started && !showResult && (
          <div className="reveal max-w-3xl mx-auto">
            <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-[2rem] overflow-hidden">
              {/* Progress */}
              <div className="px-8 py-5 border-b border-slate-100 bg-slate-50">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-slate-600">Soal {current + 1} dari {questions.length}</span>
                  <span className="text-sm font-bold text-amber-500">Skor: {score}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                    style={{ width: `${((current) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="p-8 md:p-10">
                <div className={`transition-all duration-300 ${isWrong ? 'anim-shake' : ''}`}>
                  <p className="text-xl font-bold text-slate-800 mb-6 leading-snug">{questions[current].text}</p>
                  
                  <div className="space-y-3">
                    {questions[current].options.map((opt, i) => {
                      let cls = 'border-slate-200 text-slate-600 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50/30 cursor-pointer bg-white'
                      
                      if (selected === i) {
                        if (i === questions[current].correct) {
                          cls = 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-sm'
                        } else {
                          cls = 'border-rose-500 bg-rose-50 text-rose-600 shadow-sm'
                        }
                      } else if (selected !== null && i === questions[current].correct) {
                        cls = 'border-emerald-300 bg-emerald-50/50 text-emerald-600'
                      }

                      return (
                        <button
                          key={i}
                          disabled={selected !== null}
                          onClick={() => handleAnswer(i)}
                          className={`w-full text-left px-5 py-4 border rounded-xl font-medium transition-all ${cls} disabled:cursor-default`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {['A','B','C','D'][i]}
                            </span>
                            {opt}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-xs text-slate-500 mt-6 font-medium">
              * Umpan balik otomatis: Jika salah, kotak akan bergetar dan berbunyi, kamu bisa mencoba lagi.
            </p>
          </div>
        )}

        {/* Start Screen */}
        {!started && !showResult && (
          <div className="reveal max-w-md mx-auto">
            <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-[2rem] p-10 text-center">
              <div className="flex justify-center mb-6 text-slate-800 anim-float">
                <GraduationCap className="w-16 h-16" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Siap untuk mulai?</h3>
              <p className="text-sm text-slate-500 mb-8">Masukkan nama kamu untuk memulai evaluasi dan menyimpan skormu.</p>
              
              <form onSubmit={handleStart}>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 mb-4 transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-500/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Rocket className="w-5 h-5" /> Mulai Kuis
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Result Screen & Leaderboard */}
        {showResult && (
          <div className="reveal flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-[2.5rem] p-10 text-center">
              <div className="flex justify-center mb-6 text-amber-500 anim-bounce">
                {score === 100 ? <Trophy className="w-16 h-16" /> : score >= 80 ? <Star className="w-16 h-16" /> : <BookOpen className="w-16 h-16 text-slate-400" />}
              </div>
              <p className="text-slate-500 font-medium mb-1">Hasil Evaluasi:</p>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-8">{name}</h3>
              
              <div className="flex items-end justify-center gap-2 mb-8">
                <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 leading-none">
                  {score}
                </span>
                <span className="text-2xl text-slate-400 font-bold mb-1">/100</span>
              </div>

              <div className="text-left bg-teal-50 border border-teal-100 rounded-xl p-5 mb-6 space-y-2">
                <p className="text-sm text-teal-800 font-medium flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span>
                  {score === 100 ? 'Sempurna! Kamu telah menguasai materi Pendidikan Agama Islam dengan sangat baik.' 
                   : score >= 80 ? 'Sangat bagus! Pemahamanmu sudah kuat, tinggal sedikit lagi untuk sempurna.'
                   : 'Cukup baik. Namun disarankan untuk mengulang kembali materi yang belum dipahami.'}
                  </span>
                </p>
              </div>

              <button
                onClick={handleRestart}
                className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" /> Ulangi Evaluasi
              </button>
            </div>

            {/* Leaderboard Panel */}
            <div className="flex-1 bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-6">
                <Medal className="w-8 h-8 text-amber-500" />
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Papan Peringkat</h3>
              </div>
              
              {leaderboard.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">Memuat peringkat...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leaderboard.map((entry, idx) => (
                    <div key={entry.id} className={`flex items-center justify-between p-4 rounded-xl border ${idx === 0 ? 'bg-amber-50 border-amber-200' : idx === 1 ? 'bg-slate-50 border-slate-200' : idx === 2 ? 'bg-orange-50 border-orange-200' : 'bg-white border-slate-100'}`}>
                      <div className="flex items-center gap-4">
                        <span className={`text-lg font-black ${idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-slate-400' : idx === 2 ? 'text-orange-500' : 'text-slate-400'}`}>
                          #{idx + 1}
                        </span>
                        <div>
                          <p className={`font-bold ${entry.student_name === name ? 'text-teal-600' : 'text-slate-700'}`}>{entry.student_name}</p>
                          <p className="text-xs text-slate-500">{new Date(entry.created_at).toLocaleDateString('id-ID')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-slate-800">{entry.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
