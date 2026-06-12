import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Fallback url so it doesn't crash if user hasn't set up Supabase yet
const isValidUrl = supabaseUrl.startsWith('http')
const finalUrl = isValidUrl ? supabaseUrl : 'https://placeholder.supabase.co'
const finalKey = isValidUrl ? supabaseAnonKey : 'placeholder-key'

export const supabase = createClient(finalUrl, finalKey)

export type QuizResult = {
  id?: string
  student_name: string
  score: number
  total: number
  percentage: number
  answers: Record<number, boolean>
  created_at?: string
}
