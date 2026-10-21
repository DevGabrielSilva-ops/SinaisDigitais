import { useRef, useState, useEffect } from 'react'
import { ShieldIcon, AlertChatIcon, LockIcon, FamilyIcon, ReportFlagIcon } from './icons.jsx'
import img1 from '../img/img1.jpg'
import img2 from '../img/img2.jpg'
import img3 from '../img/img3.jpg'



const slides = [
  {
    src: img1,
  },
  {
    src: img2,
  },
  {
    src: img3,
  },
]

function Slide({ slide }) {
  const Icon = slide.icon
  return (
    <div className="carousel-slide">
      {slide.src ? (
        <img
          className="carousel-image"
          src={slide.src}
          alt={slide.title}
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
        <h2>Imagens e ilustrações de como pode acontecer</h2>
        <p className="intro" style={{ marginTop: '14px', maxWidth: 'var(--measure)', color: 'var(--ink-soft)' }}>
          Este espaço foi pensado para receber ilustrações
          das etapas do aliciamento.
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
