const warningSigns = [
  'Fica visivelmente ansiosa(o) ou muda de comportamento após usar o celular ou computador.',
  'Passa a esconder a tela, trocar de aplicativo ou apagar conversas quando alguém se aproxima.',
  'Recebe presentes, créditos de jogos ou dinheiro de alguém que só conhece pela internet.',
  'Fala sobre um "amigo" mais velho com quem conversa em segredo.',
  'Demonstra conhecimento sobre assuntos sexuais incompatível com a idade.',
  'Se isola de amigos e familiares e passa a priorizar uma única pessoa online.',
]

const actionSteps = [
  'Mantenha o diálogo aberto, sem julgamento — a criança precisa sentir que pode contar o que aconteceu sem ser culpada.',
  'Não force detalhes de uma vez; perguntas repetidas podem intimidar ainda mais.',
  'Preserve prints, links e nomes de perfil antes de bloquear qualquer contato.',
  'Ative controles de privacidade e converse sobre o que é seguro compartilhar online.',
  'Procure apoio especializado (escola, psicólogo, conselho tutelar) além da denúncia formal.',
]

export default function ParentsSection() {
  return (
    <section className="section parents-section" id="para-pais">
      <div className="container">
        <span className="eyebrow">Para responsáveis</span>
        <h2>Um guia rápido para reconhecer os sinais</h2>
        <p style={{ marginTop: '14px', maxWidth: 'var(--measure)', color: 'var(--teal-deep)' }}>
          Nenhum sinal isolado é uma prova definitiva, mas a combinação de vários deles merece
          atenção e conversa — nunca acusação precipitada.
        </p>

        <div className="parents-grid">
          <div className="parents-col">
            <h3>Sinais de alerta a observar</h3>
            <ul className="check-list">
              {warningSigns.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="parents-col">
            <h3>O que fazer se perceber algo</h3>
            <ul className="check-list">
              {actionSteps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
