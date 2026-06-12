import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Petunjuk from '@/components/Petunjuk'
import Tujuan from '@/components/Tujuan'
import Materi from '@/components/Materi'
import MateriTambahan from '@/components/MateriTambahan'
import Interaktif from '@/components/Interaktif'
import NilaiIslam from '@/components/NilaiIslam'
import Evaluasi from '@/components/Evaluasi'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Petunjuk />
        <Tujuan />
        <Materi />
        <MateriTambahan />
        <Interaktif />
        <NilaiIslam />
        <Evaluasi />
      </main>
      <Footer />
    </>
  )
}
