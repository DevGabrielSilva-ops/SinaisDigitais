const steps = [
  {
    title: 'Aproximação amigável',
    text: 'O agressor inicia contato como se fosse um igual — um jogo, um interesse em comum, um elogio — para parecer familiar e inofensivo.',
  },
  {
    title: 'Construção de confiança',
    text: 'Presta atenção na rotina, nas fragilidades emocionais e nas informações pessoais que a criança compartilha, e usa isso para parecer próximo e compreensivo.',
  },
  {
    title: 'Isolamento e segredo',
    text: 'Sugere que a conversa fique só entre os dois, afastando pais, responsáveis e amigos que poderiam perceber o padrão.',
  },
  {
    title: 'Mudança gradual de tom',
    text: 'Aos poucos, os assuntos ficam mais íntimos, testando limites e normalizando o desconforto até que ele pareça "normal".',
  },
  {
    title: 'Pedido e chantagem',
    text: 'Solicita imagens ou um encontro presencial. Diante de recusa, pode usar ameaças com o material já obtido (sextorsão).',
  },
]

const aiPoints = [
  {
    title: 'Identidades falsas convincentes',
    text: 'Ferramentas de geração de imagem criam rostos e perfis inteiros de pessoas que não existem, tornando a identidade fictícia muito mais difícil de desconfiar.',
  },
  {
    title: 'Conversas em escala',
    text: 'Chatbots e automação permitem sustentar diversas conversas simultâneas, ampliando o número de vítimas abordadas ao mesmo tempo.',
  },
  {
    title: 'Deepfakes e imagens manipuladas',
    text: 'Fotos reais podem ser alteradas digitalmente, criando material comprometedor mesmo sem qualquer contato físico ter ocorrido.',
  },
  {
    title: 'Aproximação personalizada',
    text: 'Dados públicos de redes sociais ajudam a moldar uma abordagem que parece coincidir "por acaso" com os interesses da vítima.',
  },
]

const fightPoints = [
  {
    title: 'Legislação em atualização constante',
    text: 'O art. 241-D do ECA criminaliza o aliciamento, mas a velocidade da tecnologia exige atualização contínua das normas e da capacitação de quem investiga.',
  },
  {
    title: 'Detecção tecnológica preventiva',
    text: 'A mesma tecnologia usada para aliciar pode ser usada para identificar padrões de conversa de risco antes que o dano se concretize.',
  },
  {
    title: 'Educação digital ampla',
    text: 'Conhecer os sinais de alerta é a defesa mais rápida disponível, porque não depende de mudança de lei nem de nenhuma plataforma.',
  },
  {
    title: 'Canais de denúncia simples',
    text: 'Quanto mais acessível for denunciar, mais rápido um caso pode ser interrompido — é o próximo tema desta página.',
  },
]

export default function InfoSection() {
  return (
    <section className="section" id="como-acontece">
      <div className="container">
        <div className="info-block">
          <span className="kicker-num">01</span>
          <div>
            <h2>Como o aliciamento acontece na internet</h2>
            <p className="intro">
              O processo é progressivo, não instantâneo. É justamente essa gradação que faz
              a vítima muitas vezes não perceber que está diante de uma situação criminosa.
            </p>
            <ul className="bullet-list">
              {steps.map((s) => (
                <li key={s.n}>
                  <span className="num">{s.n}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <div style={{ color: 'var(--ink-soft)', fontSize: '15px', marginTop: '4px' }}>
                      {s.text}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="info-block">
          <span className="kicker-num">02</span>
          <div>
            <h2>O papel da inteligência artificial</h2>
            <p className="intro">
              A IA não cria o crime, mas amplia seu alcance e disfarce. Vale entender onde ela
              entra nesse processo.
            </p>
            <ul className="bullet-list">
              {aiPoints.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="info-block">
          <span className="kicker-num">03</span>
          <div>
            <h2>Como isso pode ser combatido</h2>
            <p className="intro">
              Nenhuma frente sozinha resolve o problema — lei, tecnologia e educação precisam
              caminhar juntas.
            </p>
            <ul className="bullet-list">
              {fightPoints.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
