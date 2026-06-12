export default function Footer() {
  const navs = ['Petunjuk', 'Tujuan', 'Materi', 'Interaktif', 'Nilai Islam', 'Evaluasi']

  return (
    <footer className="border-t border-slate-200 bg-white pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🕌</span>
            <div>
              <h3 className="font-extrabold text-lg text-slate-800">PAI Interaktif</h3>
              <p className="text-sm text-slate-500">Media Pembelajaran ICT — Tata Cara Sholat</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {navs.map((nav) => (
              <a key={nav} href={`#${nav.toLowerCase().replace(' ', '-')}`} className="text-sm text-slate-500 hover:text-emerald-500 transition-colors">
                {nav}
              </a>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-200 mb-6" />

        <div className="text-center space-y-1">
          <p className="text-sm text-slate-500">Tugas UAS — <strong className="text-slate-600">ICT Pembelajaran PAI 1</strong></p>
          <p className="text-sm text-slate-500">Institut Al-Masthuriyah Sukabumi &nbsp;|&nbsp; Jurusan PAI &nbsp;|&nbsp; Semester VI</p>
          <p className="text-sm text-slate-500">Dosen: <strong className="text-slate-600">Dr. Aang Ali Nurzen Amin, M.Pd.</strong></p>
          <p className="text-xs text-[#3d6150] mt-3">Dibuat dengan Next.js + TypeScript + Tailwind CSS + Supabase</p>
        </div>
      </div>
    </footer>
  )
}
