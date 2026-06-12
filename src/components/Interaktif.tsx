'use client'
import { useEffect, useRef, useState } from 'react'
import { fireConfetti, playCorrect, playWrong, playWin } from '@/lib/utils'

import { Gamepad, Star, Sparkles, PartyPopper, CheckCircle2, XCircle, GripVertical, Check, ListChecks } from 'lucide-react'

type Item = { id: string; content: string; type: 'islam' | 'iman' }

const initialItems: Item[] = [
  { id: '1', content: 'Membaca Dua Kalimat Syahadat', type: 'islam' },
  { id: '2', content: 'Iman kepada Malaikat-Malaikat Allah', type: 'iman' },
  { id: '3', content: 'Mendirikan Sholat 5 Waktu', type: 'islam' },
  { id: '4', content: 'Iman kepada Kitab-Kitab Allah', type: 'iman' },
  { id: '5', content: 'Menunaikan Zakat', type: 'islam' },
  { id: '6', content: 'Iman kepada Hari Kiamat', type: 'iman' },
]

export default function Interaktif() {
  const [items, setItems] = useState<Item[]>([])
  const [boxes, setBoxes] = useState<{ id: string; items: Item[] }[]>([
    { id: 'islam', items: [] },
    { id: 'iman', items: [] },
  ])
  const [feedback, setFeedback] = useState<{ msg: string; isError: boolean } | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setItems([...initialItems].sort(() => Math.random() - 0.5))
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleDragStart = (e: React.DragEvent, item: Item) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item))
  }

  const handleDrop = (e: React.DragEvent, boxId: string) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('text/plain')
    if (!data) return
    const item = JSON.parse(data) as Item

    if (item.type !== boxId) {
      playWrong()
      setFeedback({ msg: `Ops! "${item.content}" bukan bagian dari Rukun ${boxId === 'islam' ? 'Islam' : 'Iman'}.`, isError: true })
      setTimeout(() => setFeedback(null), 3000)
      return
    }

    playCorrect()
    const newItems = items.filter((i) => i.id !== item.id)
    setItems(newItems)
    setBoxes((prev) =>
      prev.map((b) => (b.id === boxId ? { ...b, items: [...b.items, item] } : b))
    )
    setFeedback({ msg: `Benar! "${item.content}" ditambahkan ke Rukun ${boxId === 'islam' ? 'Islam' : 'Iman'}.`, isError: false })
    setTimeout(() => setFeedback(null), 2000)

    if (newItems.length === 0) {
      setTimeout(() => {
        playWin()
        fireConfetti()
      }, 500)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-xs font-bold text-teal-600 uppercase tracking-wider mb-4">
            <Gamepad className="w-3.5 h-3.5" /> Game Edukasi
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Tantangan Klasifikasi</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Tarik dan letakkan (Drag & Drop) kartu di bawah ini ke dalam kotak kategori yang tepat.</p>
        </div>

        {feedback && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 anim-fade-in">
            <div className={`px-6 py-3 rounded-full shadow-lg border text-sm font-bold backdrop-blur-md flex items-center gap-2 ${
              feedback.isError ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
            }`}>
              {feedback.isError ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              {feedback.msg}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 reveal">
          <div className="w-full lg:w-1/3 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-teal-600" /> Item Tersedia ({items.length})
            </h3>
            <div className="flex flex-col gap-3 min-h-[300px]">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 py-12">
                  <PartyPopper className="w-12 h-12 mb-3 text-emerald-500" />
                  <p className="font-medium text-slate-500 text-center">Semua item berhasil diklasifikasikan!</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="p-4 bg-white border border-slate-200 rounded-xl cursor-grab active:cursor-grabbing hover:border-teal-400 hover:shadow-md transition-all font-medium text-slate-700 select-none flex items-center gap-3 group"
                  >
                    <GripVertical className="w-4 h-4 text-slate-300 group-hover:text-teal-400" />
                    {item.content}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="w-full lg:w-2/3 grid sm:grid-cols-2 gap-6">
            {boxes.map((box) => (
              <div
                key={box.id}
                onDrop={(e) => handleDrop(e, box.id)}
                onDragOver={handleDragOver}
                className="bg-white border-2 border-dashed border-slate-200 hover:border-teal-400 hover:bg-teal-50/30 transition-all rounded-[2rem] p-8 flex flex-col min-h-[400px]"
              >
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                    box.id === 'islam' ? 'bg-amber-100 text-amber-600' : 'bg-teal-100 text-teal-600'
                  }`}>
                    {box.id === 'islam' ? <Star className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg capitalize">Rukun {box.id}</h3>
                    <p className="text-xs text-slate-500">{box.items.length} item terkumpul</p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  {box.items.length === 0 ? (
                    <div className="m-auto text-slate-400 text-sm font-medium">Drop item ke sini...</div>
                  ) : (
                    box.items.map((item) => (
                      <div key={item.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl font-medium text-slate-700 flex items-center gap-3 anim-fade-in">
                        <Check className="w-4 h-4 text-emerald-500" /> {item.content}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
