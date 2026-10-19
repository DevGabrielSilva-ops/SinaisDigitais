import { useEffect, useState } from 'react'
import Hero from './components/Hero.jsx'
import InfoSection from './components/InfoSection.jsx'
import ThreatChecker from './components/ThreatChecker.jsx'
import Carousel from './components/Carousel.jsx'
import ParentsSection from './components/ParentsSection.jsx'
import ReportSection from './components/ReportSection.jsx'
import Footer from './components/Footer.jsx'

const sections = [
  { id: 'inicio', label: 'Início', dark: true },
  { id: 'como-acontece', label: 'Como acontece', dark: false },
  { id: 'verificador', label: 'Verificar conversa', dark: false },
  { id: 'galeria', label: 'Galeria', dark: false },
  { id: 'para-pais', label: 'Para pais', dark: false },
  { id: 'denuncia', label: 'Denunciar', dark: true },
]

function SideNav() {
  const [active, setActive] = useState('inicio')
  const [onDark, setOnDark] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
            const meta = sections.find((s) => s.id === entry.target.id)
            if (meta) setOnDark(meta.dark)
          }
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={`side-nav ${onDark ? 'on-dark' : ''}`}>
      {sections.map((s) => (
        <button
          key={s.id}
          className={active === s.id ? 'active' : ''}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
        >
          {s.label}
        </button>
      ))}
    </nav>
  )
}

export default function App() {
  return (
    <>
      <SideNav />
      <Hero />
      <InfoSection />
      <ThreatChecker />
      <Carousel />
      <ParentsSection />
      <ReportSection />
      <Footer />
    </>
  )
}
