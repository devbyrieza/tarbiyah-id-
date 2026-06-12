'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

const questions = [
  {
    id: 1,
    text: 'Berapa rakaat sholat Dzuhur?',
    options: ['2 rakaat', '3 rakaat', '4 rakaat', '5 rakaat'],
    correct: 2,
    explanation: 'Sholat Dzuhur terdiri dari 4 rakaat, dikerjakan setelah matahari condong hingga menjelang Ashar.',
  },
  {
    id: 2,
    text: 'Bacaan tasbih yang dibaca ketika sujud adalah...?',
    options: ['Subhana Rabbiyal Azhim', "Subhana Rabbiyal A'la", "Sami'allahu liman hamidah", 'Allahu Akbar'],
    correct: 1,
    explanation: "Bacaan saat sujud adalah \"Subhana Rabbiyal A'la\" dibaca minimal 3x. (Rabbiyal Azhim adalah bacaan ruku')",
  },
  {
    id: 3,
    text: "Gerakan bangkit berdiri setelah ruku' dalam sholat disebut...?",
    options: ['Sujud', "I'tidal", 'Tasyahud', 'Iftirasy'],
    correct: 1,
    explanation: "I'tidal adalah gerakan berdiri kembali tegak setelah ruku', sambil membaca Sami'allahu liman hamidah.",
  },
  {
    id: 4,
    text: 'Manakah yang termasuk hal yang MEMBATALKAN sholat?',
    options: ['Batuk tidak sengaja', 'Bergerak sedikit', 'Berbicara dengan sengaja', 'Bersin'],
    correct: 2,
    explanation: 'Berbicara dengan sengaja (bukan bagian bacaan sholat) membatalkan sholat, meski hanya satu kata.',
  },
  {
    id: 5,
    text: 'Berapa jumlah rakaat sholat Maghrib?',
    options: ['2 rakaat', '3 rakaat', '4 rakaat', '1 rakaat'],
    correct: 1,
    explanation: 'Sholat Maghrib terdiri dari 3 rakaat, dikerjakan setelah matahari terbenam.',
  },
]

type Phase = 'quiz' | 'saving' | 'result'

export default function Evaluasi() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null))
  const [revealed, setRevealed] = useState<boolean[]>(Array(5).fill(false))
  const [phase, setPhase] = useState<Phase>('quiz')
  const [studentName, setStudentName] = useState('')
  const [saving, setSaving] = useState(false)
  const [savedOk, setSavedOk] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const q = questions[current]
  const answered = answers[current] !== null

  const handleAnswer = (idx: number) => {
    if (revealed[current]) return
    const newAnswers = [...answers]
    const newRevealed = [...revealed]
    newAnswers[current] = idx
    newRevealed[current] = true
    setAnswers(newAnswers)
    setRevealed(newRevealed)
  }

  const score = answers.reduce<number>((acc, a, i) => {
    return acc + (a === questions[i].correct ? 1 : 0)
  }, 0)

  const handleSubmit = async () => {
    if (!studentName.trim()) return alert('Masukkan nama kamu terlebih dahulu!')
    setSaving(true)
    try {
      const pct = Math.round((score / 5) * 100)
      const answerMap: Record<number, boolean> = {}
      answers.forEach((a, i) => { answerMap[i + 1] = a === questions[i].correct })

      await supabase.from('quiz_results').insert({
        student_name: studentName.trim(),
        score,
        total: 5,
        percentage: pct,
        answers: answerMap,
      })
      setSavedOk(true)
    } catch {
      // Supabase belum dikonfigurasi — tetap tampilkan hasil
    } finally {
      setSaving(false)
      setPhase('result')
    }
  }

  const retry = () => {
    setCurrent(0)
    setAnswers(Array(5).fill(null))
    setRevealed(Array(5).fill(false))
    setPhase('quiz')
    setStudentName('')
    setSavedOk(false)
  }

  const resultInfo = () => {
    if (score === 5) return { emoji: '🏆', title: 'Sempurna!', msg: 'Luar biasa! Kamu menjawab semua soal dengan benar. Pemahaman tentang tata cara sholat sangat baik! Terus pertahankan dan amalkan.', color: 'text-[#d4a017]' }
    if (score >= 4) return { emoji: '🎉', title: 'Sangat Bagus!', msg: 'Hampir sempurna! Pelajari kembali soal yang belum tepat untuk menyempurnakan pemahamanmu.', color: 'text-emerald-600' }
    if (score >= 3) return { emoji: '👍', title: 'Cukup Bagus!', msg: 'Kamu cukup memahami materi. Baca ulang materi dan coba kerjakan evaluasi sekali lagi.', color: 'text-emerald-600' }
    return { emoji: '📚', title: 'Perlu Belajar Lagi', msg: 'Jangan menyerah! Pelajari kembali materi tata cara sholat, lalu coba lagi. Semangat!', color: 'text-slate-600' }
  }

  return (
    <section id="evaluasi" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full border border-slate-300 bg-slate-100 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-4">
            📝 Evaluasi
          </span>
          <h2 className="text-3xl font-extrabold mb-3">Soal Evaluasi</h2>
          <p className="text-slate-600">Jawab 5 pertanyaan berikut. Umpan balik akan tampil otomatis setelah kamu memilih!</p>
        </div>

        <div className="reveal max-w-2xl mx-auto">
          {/* QUIZ PHASE */}
          {phase === 'quiz' && (
            <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="px-8 py-5 border-b border-slate-200 bg-white">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-slate-600">Soal {current + 1} dari 5</span>
                  <span className="text-sm font-bold text-[#d4a017]">Skor: {score}</span>
                </div>
                <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${((current + 1) / 5) * 100}%`, background: 'linear-gradient(135deg, #d4a017, #f0c040)' }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="px-8 py-7">
                <div className="inline-block px-3 py-0.5 rounded-full border border-[rgba(212,160,23,0.25)] bg-[rgba(212,160,23,0.08)] text-xs font-bold text-[#d4a017] uppercase tracking-wider mb-4">
                  Pertanyaan {current + 1}
                </div>
                <p className="text-xl font-bold text-slate-800 mb-6 leading-snug">{q.text}</p>

                <div className="space-y-3 mb-6">
                  {q.options.map((opt, i) => {
                    const letter = ['a', 'b', 'c', 'd'][i]
                    let cls = 'border-slate-200 text-slate-600 hover:border-[#52b788] hover:text-slate-800 hover:bg-slate-50 cursor-pointer'
                    if (revealed[current]) {
                      if (i === q.correct) cls = 'border-emerald-500 bg-emerald-50 text-emerald-600 font-bold'
                      else if (i === answers[current] && i !== q.correct) cls = 'border-rose-500 bg-rose-50 text-rose-600'
                      else cls = 'border-[rgba(82,183,136,0.08)] text-slate-500 cursor-default opacity-60'
                    }
                    return (
                      <button
                        key={i}
                        id={`q${current + 1}-opt-${letter}`}
                        disabled={revealed[current]}
                        onClick={() => handleAnswer(i)}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${cls}`}
                      >
                        <span className="font-bold mr-2">{letter}.</span> {opt}
                      </button>
                    )
                  })}
                </div>

                {/* Feedback */}
                {revealed[current] && (
                  <div className={`px-4 py-3 rounded-xl text-sm font-semibold border mb-4 ${answers[current] === q.correct ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
                    {answers[current] === q.correct ? '✅' : '❌'} {q.explanation}
                  </div>
                )}
              </div>

              {/* Nav */}
              <div className="px-8 pb-7 flex justify-between gap-3">
                <button
                  disabled={current === 0}
                  onClick={() => setCurrent(c => c - 1)}
                  className="px-6 py-3 border border-slate-300 rounded-full font-semibold text-sm text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Sebelumnya
                </button>

                {current < 4 ? (
                  <button
                    onClick={() => setCurrent(c => c + 1)}
                    className="px-6 py-3 bg-gold rounded-full font-bold text-sm text-white hover:shadow-[0_4px_16px_rgba(212,160,23,0.45)] hover:-translate-y-0.5 transition-all"
                  >
                    Selanjutnya →
                  </button>
                ) : (
                  <button
                    onClick={() => setPhase('saving')}
                    className="px-6 py-3 bg-gold rounded-full font-bold text-sm text-white hover:shadow-[0_4px_16px_rgba(212,160,23,0.45)] hover:-translate-y-0.5 transition-all"
                  >
                    🏁 Lihat Hasil
                  </button>
                )}
              </div>
            </div>
          )}

          {/* SAVING PHASE — input nama */}
          {phase === 'saving' && (
            <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-2xl font-extrabold mb-2">Hampir selesai!</h3>
              <p className="text-slate-600 text-sm mb-6">Masukkan namamu untuk menyimpan hasil evaluasi</p>
              <input
                id="student-name-input"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Nama lengkap kamu..."
                className="w-full px-5 py-4 bg-white shadow-sm border border-slate-300 rounded-xl text-slate-800 text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#52b788] mb-4 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <button
                id="btn-simpan-hasil"
                onClick={handleSubmit}
                disabled={saving || !studentName.trim()}
                className="w-full py-4 bg-gold rounded-xl font-bold text-white hover:shadow-[0_4px_16px_rgba(212,160,23,0.45)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {saving ? '⏳ Menyimpan...' : '✅ Simpan & Lihat Hasil'}
              </button>
            </div>
          )}

          {/* RESULT PHASE */}
          {phase === 'result' && (() => {
            const { emoji, title, msg, color } = resultInfo()
            return (
              <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-10 text-center">
                <div className="text-6xl mb-4">{emoji}</div>
                <h3 className={`text-3xl font-extrabold mb-3 ${color}`}>{title}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-6xl font-black text-[#d4a017]">{score}</span>
                  <span className="text-3xl font-bold text-slate-500">/5</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-sm mx-auto">{msg}</p>

                {savedOk && (
                  <div className="mb-4 px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg text-xs text-emerald-600 font-semibold">
                    ✅ Hasil berhasil disimpan ke database!
                  </div>
                )}

                {/* Breakdown */}
                <div className="text-left bg-slate-50 border border-[rgba(82,183,136,0.1)] rounded-xl p-5 mb-6 space-y-2">
                  {questions.map((q, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span>{answers[i] === q.correct ? '✅' : '❌'}</span>
                      <span className="text-slate-600">Soal {i + 1}: {answers[i] === q.correct ? <span className="text-emerald-600 font-semibold">Benar</span> : <span className="text-rose-600 font-semibold">Belum Tepat</span>}</span>
                    </div>
                  ))}
                </div>

                <button
                  id="btn-coba-lagi"
                  onClick={retry}
                  className="px-8 py-3 bg-gold rounded-full font-bold text-white hover:shadow-[0_4px_16px_rgba(212,160,23,0.45)] hover:-translate-y-0.5 transition-all"
                >
                  🔄 Coba Lagi
                </button>
              </div>
            )
          })()}
        </div>
      </div>
    </section>
  )
}
