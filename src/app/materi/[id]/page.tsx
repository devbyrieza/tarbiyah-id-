'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase, Material } from '@/lib/supabase'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, Video, FileText, ArrowRight, Presentation, BookOpen, MessageCircle } from 'lucide-react'

export default function MateriPage() {
  const { id } = useParams<{ id: string }>()
  const [material, setMaterial] = useState<Material | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('materials').select('*').eq('id', id).single()
      if (data) setMaterial(data)
      setLoading(false)
    }
    fetch()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
    </div>
  )

  if (!material) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-sm max-w-sm w-full">
        <p className="text-slate-600 mb-6">Materi tidak ditemukan.</p>
        <Link href="/" className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold">Kembali ke Beranda</Link>
      </div>
    </div>
  )

  // Color schemas based on material type
  const getTypeBadgeStyles = () => {
    switch (material.type) {
      case 'video':
        return {
          container: 'bg-pink-50 text-pink-600 border-pink-200',
          icon: <Video className="w-3.5 h-3.5" />,
          label: 'Video Pembelajaran'
        }
      case 'ppt':
        return {
          container: 'bg-blue-50 text-blue-600 border-blue-200',
          icon: <Presentation className="w-3.5 h-3.5" />,
          label: 'Bahan Tayang (PPT)'
        }
      case 'makalah':
        return {
          container: 'bg-purple-50 text-purple-600 border-purple-200',
          icon: <BookOpen className="w-3.5 h-3.5" />,
          label: 'Modul & Makalah'
        }
      default:
        return {
          container: 'bg-slate-50 text-slate-600 border-slate-200',
          icon: <FileText className="w-3.5 h-3.5" />,
          label: 'Materi Pembelajaran'
        }
    }
  }

  const badgeStyles = getTypeBadgeStyles()

  const getFileExtension = (url: string) => {
    try {
      const pathname = new URL(url).pathname
      return pathname.split('.').pop()?.toLowerCase() || ''
    } catch {
      return url.split('?')[0].split('#')[0].split('.').pop()?.toLowerCase() || ''
    }
  }

  const fileExt = material.content_url ? getFileExtension(material.content_url) : ''

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link href="/" className="text-slate-500 hover:text-teal-600 font-bold text-sm transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
          <div className="flex gap-2">
            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border shadow-sm flex items-center gap-1.5 ${badgeStyles.container}`}>
              {badgeStyles.icon} {badgeStyles.label}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
          {material.type === 'video' && material.content_url && (
            <div className="aspect-video bg-slate-900 w-full relative">
              <iframe 
                src={material.content_url} 
                className="w-full h-full absolute inset-0" 
                allowFullScreen 
                title={material.title} 
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">{material.title}</h1>
            {material.description && <p className="text-slate-500 text-lg mb-8 leading-relaxed border-b border-slate-100 pb-8">{material.description}</p>}
            
            {(material.type === 'ppt' || material.type === 'makalah' || material.type === 'article' || material.type === 'document') && material.content_url && (
              <div className="mb-8">
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                      {material.type === 'ppt' ? <Presentation className="w-6 h-6 text-blue-600" /> : material.type === 'makalah' ? <BookOpen className="w-6 h-6 text-purple-600" /> : <FileText className="w-6 h-6 text-slate-600" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">
                        {material.type === 'ppt' ? 'Lampiran Bahan Tayang (PPT)' : material.type === 'makalah' ? 'Lampiran Modul & Makalah' : 'Lampiran Dokumen Utama'}
                      </h3>
                      <p className="text-sm text-slate-600">Klik tombol di samping untuk mengunduh atau membaca dokumen.</p>
                    </div>
                  </div>
                  <a href={material.content_url} target="_blank" rel="noreferrer" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2 w-full md:w-auto justify-center">
                    Buka File Materi <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                
                {fileExt === 'pdf' ? (
                  <div className="mt-8 aspect-[1/1.4] w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                    <iframe src={material.content_url} className="w-full h-full" />
                  </div>
                ) : ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx'].includes(fileExt) ? (
                  <div className="mt-8 aspect-[4/3] w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                    <iframe src={`https://docs.google.com/gview?url=${encodeURIComponent(material.content_url)}&embedded=true`} className="w-full h-full" />
                  </div>
                ) : null}
              </div>
            )}

            {material.content_text && (
              <div className="prose prose-lg prose-slate prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-700 prose-li:text-slate-700 prose-a:text-teal-600 max-w-none mt-8 border-t border-slate-100 pt-8">
                <ReactMarkdown>{material.content_text}</ReactMarkdown>
              </div>
            )}

            {/* Q&A Contextual Forum Card */}
            <div className="mt-12 p-8 bg-teal-50/50 border border-teal-200/60 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-1 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-teal-600" /> Ada Pertanyaan Mengenai Materi Ini?
                </h3>
                <p className="text-sm text-slate-600">Tanyakan atau diskusikan langsung materi ini bersama pengajar di forum tanya jawab kami.</p>
              </div>
              <Link href={`/forum?materi=${encodeURIComponent(material.title)}`} className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2 w-full sm:w-auto justify-center flex-shrink-0">
                Tanya di Forum &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
