'use client'
import { useState, useEffect } from 'react'
import { supabase, ForumPost } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { MessageCircle, ArrowLeft, GraduationCap } from 'lucide-react'

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Reply states
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null)
  const [replies, setReplies] = useState<any[]>([])
  const [replyBody, setReplyBody] = useState('')
  const [replyAuthor, setReplyAuthor] = useState('')
  const [replying, setReplying] = useState(false)

  useEffect(() => { fetchPosts() }, [])

  const fetchPosts = async () => {
    setLoading(true)
    const { data } = await supabase.from('forum_posts').select('*, forum_replies(count)').order('created_at', { ascending: false })
    if (data) setPosts(data)
    setLoading(false)
  }

  const fetchReplies = async (postId: string) => {
    const { data } = await supabase.from('forum_replies').select('*').eq('post_id', postId).order('created_at', { ascending: true })
    if (data) setReplies(data)
  }

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !body.trim() || !author.trim()) return
    setSubmitting(true)
    await supabase.from('forum_posts').insert([{ title, body, author_name: author }])
    setTitle(''); setBody(''); setAuthor(''); setShowForm(false)
    fetchPosts()
    setSubmitting(false)
  }

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPost || !replyBody.trim() || !replyAuthor.trim()) return
    setReplying(true)
    await supabase.from('forum_replies').insert([{ post_id: selectedPost.id, body: replyBody, author_name: replyAuthor }])
    setReplyBody(''); setReplyAuthor('')
    fetchReplies(selectedPost.id)
    fetchPosts() // Update reply count
    setReplying(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <div className="pt-24 pb-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-xs font-bold text-teal-600 uppercase tracking-wider mb-4">
            <MessageCircle className="w-3.5 h-3.5" /> Tanya Jawab
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Forum Diskusi Tarbiyah.id</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Tanyakan hal yang belum kamu pahami seputar sholat, dan diskusikan bersama teman-teman atau pengajar.</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {!selectedPost ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold text-slate-900">Diskusi Terbaru</h2>
              <button 
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all shadow-md w-full sm:w-auto"
              >
                {showForm ? '✕ Batal' : '+ Buat Pertanyaan Baru'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handlePost} className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 mb-10 anim-fade-in">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nama Kamu</label>
                    <input required value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Nama Panggilan..." className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Judul Pertanyaan</label>
                    <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Contoh: Apakah boleh sholat sambil duduk?" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Detail Pertanyaan</label>
                    <textarea required value={body} onChange={e=>setBody(e.target.value)} placeholder="Jelaskan pertanyaanmu lebih detail di sini..." rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all resize-none" />
                  </div>
                </div>
                <button disabled={submitting} type="submit" className="w-full mt-6 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all disabled:opacity-50">
                  {submitting ? 'Mengirim...' : 'Kirim Pertanyaan'}
                </button>
              </form>
            )}

            {loading ? (
              <div className="text-center py-20">
                <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4" />
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map(post => (
                  <div key={post.id} className="bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-400 rounded-3xl p-6 md:p-8 transition-all group cursor-pointer" onClick={() => { setSelectedPost(post); fetchReplies(post.id); }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-sm">
                        {post.author_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{post.author_name}</p>
                        <p className="text-xs text-slate-500">{new Date(post.created_at).toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">{post.title}</h3>
                    <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed">{post.body}</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                      <span className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4" /> {(post as any).forum_replies?.[0]?.count || 0} Balasan
                      </span>
                    </div>
                  </div>
                ))}
                {posts.length === 0 && (
                  <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl">
                    <p className="text-slate-500 font-medium">Belum ada diskusi. Jadilah yang pertama bertanya!</p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="anim-fade-in">
            <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Diskusi
            </button>
            
            {/* Original Post */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg">
                  {selectedPost.author_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{selectedPost.author_name}</p>
                  <p className="text-xs text-slate-500">{new Date(selectedPost.created_at).toLocaleString('id-ID')}</p>
                </div>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">{selectedPost.title}</h2>
              <p className="text-slate-700 leading-relaxed text-lg bg-slate-50 p-6 rounded-2xl border border-slate-100">{selectedPost.body}</p>
            </div>

            {/* Replies */}
            <div className="space-y-4 mb-8 pl-4 md:pl-12 border-l-2 border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg mb-6">Balasan ({replies.length})</h3>
              {replies.map(reply => (
                <div key={reply.id} className={`p-6 rounded-2xl border shadow-sm ${reply.is_admin ? 'bg-teal-50 border-teal-200' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${reply.is_admin ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
                      {reply.is_admin ? <GraduationCap className="w-5 h-5" /> : reply.author_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className={`font-bold ${reply.is_admin ? 'text-teal-700' : 'text-slate-900'}`}>{reply.author_name}</p>
                      <p className="text-xs text-slate-500">{new Date(reply.created_at).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{reply.body}</p>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            <form onSubmit={handleReply} className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 md:pl-12">
              <p className="font-bold text-slate-900 mb-4">Ikut berdiskusi</p>
              <div className="space-y-4">
                <input required value={replyAuthor} onChange={e=>setReplyAuthor(e.target.value)} placeholder="Nama Panggilan..." className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all" />
                <textarea required value={replyBody} onChange={e=>setReplyBody(e.target.value)} placeholder="Tulis balasanmu di sini..." rows={3} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all resize-none" />
                <button disabled={replying} type="submit" className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all disabled:opacity-50">
                  {replying ? 'Mengirim...' : 'Kirim Balasan'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
