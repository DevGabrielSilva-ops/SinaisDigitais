import { useRef, useState, useEffect } from 'react'
import { ShieldIcon, AlertChatIcon, LockIcon, FamilyIcon, ReportFlagIcon } from './icons.jsx'


// Troque "icon" por "src: '/images/seu-arquivo.jpg'" quando tiver imagens reais.
// O componente Slide já sabe renderizar os dois formatos.
const slides = [
  {
    icon: FamilyIcon,
    title: 'Prevenção é a primeira barreira',
    caption: 'Conhecer o processo do aliciamento reduz o tempo de exposição ao risco.',
  },
  {
    icon: FamilyIcon,
    title: 'Nem toda conversa "gentil" é inocente',
    caption: 'Excesso de elogios e interesse repentino merecem atenção, não pânico.',
  },
  {
    icon: FamilyIcon,
    title: 'Privacidade não é sigilo forçado',
    caption: 'Pedidos para "não contar pra ninguém" são, em si, um sinal de alerta.',
  },
  {
    icon: FamilyIcon,
    title: 'Diálogo aberto em casa',
    caption: 'Crianças que sabem que não serão julgadas contam mais cedo o que viveram.',
  },
  {
    icon: ReportFlagIcon,
    title: 'Denunciar interrompe o ciclo',
    caption: 'Cada denúncia registrada ajuda a identificar padrões e agir mais rápido.',
  },
]

function Slide({ slide }) {
  const Icon = slide.icon
  return (
    <div className="carousel-slide">
      {slide.src ? (
        <img
          src={slide.src}
          alt={slide.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <Icon />
      )}
      <div className="slide-caption">
        <h3>{slide.title}</h3>
        <p>{slide.caption}</p>
      </div>
    </div>
  )
}

export default function Carousel() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const scrollToIndex = (i) => {
    const track = trackRef.current
    if (!track) return
    const slideEl = track.children[i]
    if (slideEl) {
      track.scrollTo({ left: slideEl.offsetLeft - track.offsetLeft, behavior: 'smooth' })
    }
  }

  const handlePrev = () => scrollToIndex(Math.max(0, active - 1))
  const handleNext = () => scrollToIndex(Math.min(slides.length - 1, active + 1))

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const children = Array.from(track.children)
      let closest = 0
      let closestDist = Infinity
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft - track.offsetLeft - track.scrollLeft)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      })
      setActive(closest)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="section carousel-section" id="galeria">
      <div className="container">
        <span className="eyebrow">Material de apoio</span>
        <h2>Imagens e ilustrações da campanha</h2>
        <p className="intro" style={{ marginTop: '14px', maxWidth: 'var(--measure)', color: 'var(--ink-soft)' }}>
          Este espaço foi pensado para receber as artes finais do projeto — cartazes, ilustrações
          das etapas do aliciamento ou fotos de campanha. Por enquanto, cada slide traz um ícone
          de referência para o funcionamento do carrossel.
        </p>

        <div className="carousel-wrap">
          <div className="carousel-track" ref={trackRef}>
            {slides.map((s, i) => (
              <Slide key={i} slide={s} />
            ))}
          </div>

          <div className="carousel-controls">
            <div className="carousel-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={i === active ? 'active' : ''}
                  aria-label={`Ir para o slide ${i + 1}`}
                  onClick={() => scrollToIndex(i)}
                />
              ))}
            </div>
            <div className="carousel-arrows">
              <button onClick={handlePrev} aria-label="Slide anterior">
                ‹
              </button>
              <button onClick={handleNext} aria-label="Próximo slide">
                ›
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
