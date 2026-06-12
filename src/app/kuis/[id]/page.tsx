'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase, Quiz } from '@/lib/supabase'
import Link from 'next/link'
import { fireConfetti, playCorrect, playWrong, playWin } from '@/lib/utils'
import { ArrowLeft, ArrowRight, Trophy, Star, BookOpen } from 'lucide-react'

export default function KuisPage() {
  const { id } = useParams<{ id: string }>()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<(number | null)[]>([])
  const [answered, setAnswered] = useState<boolean[]>([])
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('quizzes').select('*').eq('id', id).single()
      if (data) {
        setQuiz(data)
        setSelected(new Array(data.questions.length).fill(null))
        setAnswered(new Array(data.questions.length).fill(false))
      }
      setLoading(false)
    }
    fetch()
  }, [id])

  const choose = (optIndex: number) => {
    if (answered[current]) return
    const newSelected = [...selected]
    const newAnswered = [...answered]
    newSelected[current] = optIndex
    newAnswered[current] = true
    setSelected(newSelected)
    setAnswered(newAnswered)
    if (quiz && optIndex === quiz.questions[current].correct) {
      playCorrect()
      setScore(s => s + 1)
    } else {
      playWrong()
    }
  }

  const next = () => {
    if (!quiz) return
    if (current < quiz.questions.length - 1) {
      setCurrent(c => c + 1)
    } else {
      setDone(true)
      setTimeout(() => {
        playWin()
        fireConfetti()
      }, 300)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
    </div>
  )

  if (!quiz) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-sm max-w-sm w-full">
        <p className="text-slate-600 mb-6">Kuis tidak ditemukan.</p>
        <Link href="/" className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold">Kembali</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-slate-500 hover:text-teal-600 font-bold text-sm transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
          <div className="px-4 py-1.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
            Kuis Tambahan
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
          <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50 text-center">
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">{quiz.title}</h1>
            {quiz.questions.length > 0 && <p className="text-slate-500 text-sm">Kuis Interaktif Pilihan Ganda</p>}
          </div>

          {quiz.questions.length === 0 && quiz.description.startsWith('http') ? (
            <div className="p-8 md:p-12 text-center bg-white">
              <div className="flex justify-center mb-6 text-blue-500">
                <BookOpen className="w-20 h-20" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Dokumen Soal Ujian / Kuis</h2>
              <p className="text-slate-500 mb-8 max-w-lg mx-auto">Pengajar telah melampirkan file dokumen yang berisi soal-soal untuk kuis ini. Silakan buka atau unduh file tersebut untuk mulai mengerjakan.</p>
              
              <a href={quiz.description} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md mb-8">
                Buka File Soal Kuis <ArrowRight className="w-4 h-4" />
              </a>

              {quiz.description.toLowerCase().includes('.pdf') && (
                <div className="aspect-[1/1.4] w-full max-w-3xl mx-auto bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 mt-4">
                  <iframe src={quiz.description} className="w-full h-full" />
                </div>
              )}
            </div>
          ) : !done ? (
            <div>
              <div className="px-8 py-4 border-b border-slate-100 bg-white flex justify-between items-center">
                <span className="text-sm font-bold text-slate-500">Soal {current + 1} / {quiz.questions.length}</span>
                <span className="text-sm font-bold text-amber-500">Benar: {score}</span>
              </div>
              <div className="h-1.5 bg-slate-100 w-full">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500" 
                  style={{ width: `${(current / quiz.questions.length) * 100}%` }}
                />
              </div>

              <div className="p-8 md:p-10 bg-white">
                <h2 className="text-xl font-bold text-slate-900 mb-8 leading-relaxed">
                  {quiz.questions[current].text}
                </h2>
                <div className="space-y-3">
                  {quiz.questions[current].options.map((opt, i) => {
                    let cls = 'border-slate-200 text-slate-600 hover:border-amber-400 hover:bg-amber-50/50 bg-white cursor-pointer'
                    
                    if (answered[current]) {
                      if (i === quiz.questions[current].correct) {
                        cls = 'border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm'
                      } else if (selected[current] === i) {
                        cls = 'border-rose-400 bg-rose-50 text-rose-700 shadow-sm'
                      } else {
                        cls = 'border-slate-100 text-slate-400 bg-slate-50/50 cursor-not-allowed'
                      }
                    }

                    return (
                      <button
                        key={i}
                        disabled={answered[current]}
                        onClick={() => choose(i)}
                        className={`w-full text-left px-5 py-4 border rounded-xl font-medium transition-all ${cls}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${answered[current] && i === quiz.questions[current].correct ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            {['A','B','C','D'][i]}
                          </span>
                          {opt}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {answered[current] && (
                  <div className="mt-8 pt-6 border-t border-slate-100 text-right anim-fade-in">
                    <button onClick={next} className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all shadow-md flex items-center gap-2 ml-auto">
                      {current === quiz.questions.length - 1 ? 'Selesai Kuis' : <>Lanjut Soal Berikutnya <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white">
              <div className="flex justify-center mb-6 text-amber-500 anim-bounce">
                {score === quiz.questions.length ? <Trophy className="w-20 h-20" /> : score > quiz.questions.length / 2 ? <Star className="w-20 h-20" /> : <BookOpen className="w-20 h-20 text-slate-400" />}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Kuis Selesai!</h2>
              <p className="text-slate-500 mb-8">Kamu telah menyelesaikan semua soal.</p>
              
              <div className="inline-block p-8 bg-amber-50 border border-amber-200 rounded-3xl mb-8 shadow-sm">
                <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-2">Total Skor</p>
                <div className="flex items-end justify-center gap-2">
                  <span className="text-6xl font-black text-amber-500 leading-none">{Math.round((score / quiz.questions.length) * 100)}</span>
                  <span className="text-xl text-amber-700/50 font-bold mb-1">/100</span>
                </div>
                <p className="text-sm text-amber-600 mt-4 font-medium">({score} benar dari {quiz.questions.length} soal)</p>
              </div>

              <div>
                <Link href="/" className="inline-block px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all border border-slate-200">
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
