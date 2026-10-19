export default function Hero() {
  const scrollToNext = () => {
    document.getElementById('como-acontece')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="inicio">
      <div className="container hero-inner">
        <h1>Você reconheceria os sinais de aliciamento antes que fosse tarde demais?</h1>
        <p className="lede">
          O aliciamento infantil online quase nunca começa como um crime óbvio. Começa como
          uma conversa comum — e é exatamente por isso que poucas pessoas percebem a virada
          a tempo. Esta é uma iniciativa educativa criada para mudar isso.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={scrollToNext}>
            Entenda como identificar
          </button>
          <button
            className="btn-ghost"
            onClick={() => document.getElementById('denuncia')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Já preciso denunciar
          </button>
        </div>
      </div>
      <div className="scroll-cue">
        <span className="dash" />
        <span>role para saber mais</span>
      </div>
    </section>
  )
}
