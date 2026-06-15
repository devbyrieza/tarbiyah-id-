import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MateriTambahan from '@/components/MateriTambahan'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MateriTambahan />
      </main>
      <Footer />
    </>
  )
}
