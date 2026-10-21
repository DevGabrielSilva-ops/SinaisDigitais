const steps = [
  {
    n: '1',
    text: 'Não apague nada. Faça print das conversas, guarde links, nome de usuário e horários antes de bloquear o contato.',
  },
  {
    n: '2',
    text: 'Bloqueie o contato e não responda a pedidos de sigilo, imagens ou encontro presencial.',
  },
  {
    n: '3',
    text: 'Avise imediatamente um adulto de confiança ou responsável.',
  },
  {
    n: '4',
    text: 'Denuncie no canal correto (veja ao lado) — quanto mais rápido, maior a chance de interromper o contato com outras possíveis vítimas.',
  },
  {
    n: '5',
    text: 'Em caso de risco imediato ou encontro já marcado, acione a Polícia pelo 190.',
  },
]

export default function ReportSection() {
  return (
    <section className="section report-section" id="denuncia">
      <div className="container">
        <span className="eyebrow">Canal de denúncia</span>
        <h2>Como denunciar aliciamento e abuso infantil online</h2>

        <div className="report-grid">
          <div>
            <ol className="report-steps" style={{ padding: 0 }}>
              {steps.map((s) => (
                <li key={s.n}>
                  <span className="num">{s.n}</span>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="report-channels">
            <div className="channel-card">
              <div className="channel-name">Disque 100</div>
              <div className="channel-detail">
                Disque Direitos Humanos. Ligação gratuita e anônima, 24h, para denunciar
                violência contra crianças e adolescentes. Também disponível por WhatsApp:
                (61) 99611-0100.
              </div>
              <a
                className="channel-link"
                href="https://www.gov.br/pt-br/servicos/denunciar-violacao-de-direitos-humanos"
                target="_blank"
                rel="noreferrer"
              >
                gov.br/mdh — Disque 100
              </a>
            </div>

            <div className="channel-card">
              <div className="channel-name">SaferNet Brasil</div>
              <div className="channel-detail">
                Central Nacional de Denúncias de Crimes Cibernéticos. Denúncia 100% anônima de
                páginas e perfis com conteúdo de abuso e exploração sexual infantil, encaminhada
                às autoridades competentes.
              </div>
              <a className="channel-link" href="https://new.safernet.org.br/denuncie" target="_blank" rel="noreferrer">
                safernet.org.br/denuncie
              </a>
            </div>

            <div className="emergency-note">
              <strong>Risco imediato ou encontro marcado?</strong> Ligue para a Polícia (190)
              agora. Canais de denúncia online são essenciais, mas não substituem uma emergência
              em andamento.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
