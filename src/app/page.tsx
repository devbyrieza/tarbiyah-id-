import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Petunjuk from '@/components/Petunjuk'
import Tujuan from '@/components/Tujuan'
import MateriTambahan from '@/components/MateriTambahan'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Petunjuk />
        <Tujuan />
        <MateriTambahan />
      </main>
      <Footer />
    </>
  )
}
