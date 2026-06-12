import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const isValidUrl = supabaseUrl.startsWith('http')
const finalUrl = isValidUrl ? supabaseUrl : 'https://placeholder.supabase.co'
const finalKey = isValidUrl ? supabaseAnonKey : 'placeholder-key'

export const supabase = createClient(finalUrl, finalKey)

// Types
export type Material = {
  id: string
  title: string
  description: string
  type: 'article' | 'video' | 'quiz' | 'document'
  content_url?: string
  content_text?: string
  thumbnail_url?: string
  created_at: string
}

export type Quiz = {
  id: string
  title: string
  description: string
  questions: QuizQuestion[]
  created_at: string
}

export type QuizQuestion = {
  text: string
  options: string[]
  correct: number
}

export type ForumPost = {
  id: string
  title: string
  body: string
  author_name: string
  is_admin: boolean
  reply_count?: number
  created_at: string
}

export type ForumReply = {
  id: string
  post_id: string
  body: string
  author_name: string
  is_admin: boolean
  created_at: string
}

export type LeaderboardEntry = {
  id: string
  student_name: string
  score: number
  created_at: string
}

export type QuizResult = {
  id: string
  student_name: string
  score: number
  total: number
  percentage?: number
  created_at: string
}
