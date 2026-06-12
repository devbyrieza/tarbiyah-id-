export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-50">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-teal-100 rounded-full blur-3xl opacity-50 anim-float"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-amber-100 rounded-full blur-3xl opacity-50 anim-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8 anim-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-semibold text-slate-600">Media Pembelajaran Interaktif 2026</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-tight anim-fade-in" style={{ animationDelay: '0.1s' }}>
            Belajar Agama Islam Lebih <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Menyenangkan.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed anim-fade-in" style={{ animationDelay: '0.2s' }}>
            Platform edukasi modern untuk memahami materi Pendidikan Agama Islam dengan benar, interaktif, dan mudah dipahami oleh semua kalangan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center anim-fade-in" style={{ animationDelay: '0.3s' }}>
            <a href="#materi" className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-teal-600/20 hover:-translate-y-1 flex items-center justify-center gap-2">
              Mulai Belajar <span>→</span>
            </a>
            <a href="#petunjuk" className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold rounded-2xl transition-all shadow-sm hover:-translate-y-1 flex items-center justify-center gap-2">
              Cara Penggunaan
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
