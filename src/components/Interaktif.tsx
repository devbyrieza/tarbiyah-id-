'use client'
import { useState, useEffect, useRef } from 'react'

type CardId = 1 | 2 | 3 | 4 | 5

const leftItems: { id: CardId; label: string }[] = [
  { id: 1, label: '🙌 Takbiratul Ihram' },
  { id: 2, label: "🙇 Ruku'" },
  { id: 3, label: "🧍 I'tidal" },
  { id: 4, label: '🙏 Sujud' },
  { id: 5, label: '🪑 Duduk antara Sujud' },
]

const rightItems: { id: CardId; label: string }[] = [
  { id: 3, label: "Sami'allahu liman hamidah" },
  { id: 5, label: 'Rabbighfirli warhamni' },
  { id: 1, label: 'Allahu Akbar' },
  { id: 4, label: "Subhana Rabbiyal A'la" },
  { id: 2, label: 'Subhana Rabbiyal Azhim' },
]

export default function Interaktif() {
  const [selectedLeft, setSelectedLeft] = useState<CardId | null>(null)
  const [selectedRight, setSelectedRight] = useState<CardId | null>(null)
  const [matched, setMatched] = useState<Set<CardId>>(new Set())
  const [wrongFlash, setWrongFlash] = useState<{ left?: CardId; right?: CardId } | null>(null)
  const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' | '' }>({ msg: '', type: '' })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      if (selectedLeft === selectedRight) {
        const newMatched = new Set(matched)
        newMatched.add(selectedLeft)
        setMatched(newMatched)
        setSelectedLeft(null)
        setSelectedRight(null)
        const remaining = 5 - newMatched.size
        if (remaining === 0) {
          setFeedback({ msg: '🎉 Luar biasa! Semua pasangan benar! Kamu siap mengerjakan evaluasi!', type: 'success' })
        } else {
          setFeedback({ msg: `✅ Benar! ${remaining} pasangan tersisa.`, type: 'success' })
        }
      } else {
        setWrongFlash({ left: selectedLeft, right: selectedRight })
        setFeedback({ msg: '❌ Belum tepat, coba lagi!', type: 'error' })
        setTimeout(() => {
          setWrongFlash(null)
          setSelectedLeft(null)
          setSelectedRight(null)
          setFeedback({ msg: '', type: '' })
        }, 900)
      }
    }
  }, [selectedLeft, selectedRight])

  const reset = () => {
    setSelectedLeft(null)
    setSelectedRight(null)
    setMatched(new Set())
    setWrongFlash(null)
    setFeedback({ msg: '', type: '' })
  }

  const getLeftClass = (id: CardId) => {
    if (matched.has(id)) return 'border-[#52b788] bg-slate-100 text-emerald-600 cursor-default'
    if (wrongFlash?.left === id) return 'border-rose-500 bg-rose-50 text-rose-600 anim-shake'
    if (selectedLeft === id) return 'border-[#d4a017] bg-[rgba(212,160,23,0.1)] text-[#d4a017] shadow-[0_0_12px_rgba(212,160,23,0.2)]'
    return 'border-slate-200 text-slate-600 hover:border-[#52b788] hover:text-slate-800 hover:scale-[1.02] cursor-pointer'
  }

  const getRightClass = (id: CardId) => {
    if (matched.has(id)) return 'border-[#52b788] bg-slate-100 text-emerald-600 cursor-default'
    if (wrongFlash?.right === id) return 'border-rose-500 bg-rose-50 text-rose-600 anim-shake'
    if (selectedRight === id) return 'border-[#d4a017] bg-[rgba(212,160,23,0.1)] text-[#d4a017] shadow-[0_0_12px_rgba(212,160,23,0.2)]'
    return 'border-slate-200 text-slate-600 hover:border-[#52b788] hover:text-slate-800 hover:scale-[1.02] cursor-pointer'
  }

  return (
    <section id="interaktif" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full border border-slate-300 bg-slate-100 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-4">
            🎮 Interaktif
          </span>
          <h2 className="text-3xl font-extrabold mb-3">Media Interaktif</h2>
          <p className="text-slate-600">Uji pemahamanmu dengan mencocokkan gerakan sholat dan bacaannya!</p>
        </div>

        <div className="reveal max-w-3xl mx-auto bg-white shadow-sm border border-slate-200 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="font-bold text-lg mb-1">🔗 Cocokkan Gerakan dengan Bacaannya</h3>
            <p className="text-sm text-slate-600">Klik item di kolom <strong className="text-slate-800">Kiri</strong>, lalu klik pasangannya di kolom <strong className="text-slate-800">Kanan</strong></p>
          </div>

          {/* Score + Reset */}
          <div className="flex items-center justify-between px-4 py-3 bg-[rgba(82,183,136,0.06)] border border-slate-200 rounded-xl mb-6">
            <span className="text-sm text-slate-600">
              Pasangan benar: <strong className="text-[#d4a017] text-base">{matched.size}</strong>/5
            </span>
            <button onClick={reset} className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-emerald-500 hover:bg-slate-100 transition-colors">
              🔄 Reset
            </button>
          </div>

          {/* Matching area */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              {leftItems.map((item) => (
                <button
                  key={item.id}
                  disabled={matched.has(item.id)}
                  onClick={() => !matched.has(item.id) && setSelectedLeft(item.id)}
                  className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold text-center transition-all duration-200 ${getLeftClass(item.id)}`}
                >
                  {matched.has(item.id) && '✓ '}{item.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {rightItems.map((item) => (
                <button
                  key={item.id}
                  disabled={matched.has(item.id)}
                  onClick={() => !matched.has(item.id) && setSelectedRight(item.id)}
                  className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold text-center transition-all duration-200 font-amiri ${getRightClass(item.id)}`}
                >
                  {matched.has(item.id) && '✓ '}{item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {feedback.msg && (
            <div className={`mt-5 py-3 px-4 rounded-xl text-sm font-semibold text-center transition-all ${feedback.type === 'success' ? 'bg-slate-100 border border-slate-300 text-emerald-600' : 'bg-rose-50 border border-rose-200 text-rose-600'}`}>
              {feedback.msg}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
