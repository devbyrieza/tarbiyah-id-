import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import '../globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tarbiyah.id — Media Pembelajaran PAI Interaktif',
  description:
    'Media pembelajaran interaktif berbasis ICT untuk mata kuliah ICT Pembelajaran PAI 1. Dilengkapi materi komprehensif, aktivitas interaktif, dan evaluasi dengan umpan balik otomatis. Institut Al-Masthuriyah Sukabumi.',
  keywords: ['Tarbiyah.id', 'PAI', 'sholat', 'pembelajaran interaktif', 'ICT', 'media pembelajaran', 'Islam'],
    openGraph: {
      title: 'Tarbiyah.id — Media Pembelajaran PAI',
      description: 'Media pembelajaran interaktif berbasis ICT untuk Pendidikan Agama Islam',
      type: 'website',
    },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${plusJakarta.variable} font-jakarta antialiased`}>{children}</body>
    </html>
  )
}
