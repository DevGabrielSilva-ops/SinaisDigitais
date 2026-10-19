import { useEffect, useRef, useState } from 'react'
import { analyzeText, EXAMPLE_TEXT } from '../lib/analyzeText.js'

const API_URL = (import.meta.env.VITE_API_URL || 'https://siteconince-backend.onrender.com')
  .replace(/\/+$/, '')

const WELCOME = {
  role: 'assistant',
  kind: 'text',
  content:
    'Oi. Cole aqui uma conversa (ou descreva uma situação) que te deixou com dúvida, e eu aponto quais sinais de risco aparecem. Isso não é uma avaliação definitiva nem substitui uma denúncia — é um apoio para você decidir o próximo passo.',
}

const FAQ = [
  {
    test: /denunc/i,
    reply:
      'Você pode denunciar pelo Disque 100 (ligação gratuita e anônima, 24h) ou pela Central de Denúncias da SaferNet, para conteúdo publicado online. Tem os dois canais com link na seção "Denunciar" desta página. Se houver risco imediato, ligue 190.',
  },
  {
    test: /grave|s[ée]rio|perigo/i,
    reply:
      'Não dá para afirmar a gravidade sem contexto, mas alguns sinais pedem ação imediata: pedido de foto, tentativa de encontro presencial ou qualquer ameaça. Se qualquer um desses apareceu, preserve as provas e procure ajuda. Em caso de risco imediato, ligue 190.',
  },
  {
    test: /medo|assustad|nervos/i,
    reply:
      'Faz sentido sentir isso — e você não fez nada de errado ao notar e perguntar. Se quiser, cole a conversa que recebeu e eu te ajudo a identificar os pontos específicos. Se for uma emergência agora, ligue 190.',
  },
]

function CategoryBadge({ cat }) {
  return (
    <div className="flag-item">
      <div className="flag-item-head">
        <span className="flag-dot" />
        <strong>{cat.label}</strong>
      </div>
      <p>{cat.advice}</p>
    </div>
  )
}

function AnalysisBubble({ result, engine }) {
  const found = Array.isArray(result?.found) ? result.found : []
  const totalCategories = result?.totalCategories ?? found.length

  return (
    <div className="analysis-card">
      <div className="analysis-head">
        <span
          className={`level-pill level-${
            found.length >= 3 ? 'high' : found.length >= 1 ? 'mid' : 'low'
          }`}
        >
          {result?.level ?? 'Resultado'}
        </span>

        <span className="engine-tag">
          {engine === 'ai'
            ? 'analisado por IA'
            : 'análise por padrões (local)'}
        </span>
      </div>

      {found.length === 0 ? (
        <p>
          Não identifiquei, nas categorias que reconheço hoje, padrões claros
          de risco neste texto. Isso não significa que está tudo bem — na
          dúvida, converse com um adulto de confiança.
        </p>
      ) : (
        <>
          <p style={{ marginBottom: '12px' }}>
            Encontrei {found.length} de {totalCategories} categorias de sinal
            de alerta:
          </p>

          <div className="flag-list">
            {found.map((cat) => (
              <CategoryBadge key={cat.key} cat={cat} />
            ))}
          </div>
        </>
      )}

      <p className="analysis-footer">
        Esta é uma ferramenta educativa, não uma avaliação profissional.
        Em caso de risco imediato, ligue 190. Para denunciar, veja a seção
        "Denunciar" logo abaixo.
      </p>
    </div>
  )
}

export default function ThreatChecker() {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [backendAvailable, setBackendAvailable] = useState(null)

  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, busy])

  // Verifica se o backend está acessível.
  useEffect(() => {
    const controller = new AbortController()

    async function checkBackend() {
      try {
        const response = await fetch(`${API_URL}/api/health`, {
          method: 'GET',
          signal: controller.signal,
        })

        if (!response.ok) {
          setBackendAvailable(false)
          return
        }

        setBackendAvailable(true)
      } catch {
        if (!controller.signal.aborted) {
          setBackendAvailable(false)
        }
      }
    }

    checkBackend()

    return () => controller.abort()
  }, [])

  async function handleSend(rawText) {
    const text = (rawText ?? input).trim()

    if (!text || busy) return

    setMessages((previous) => [
      ...previous,
      { role: 'user', kind: 'text', content: text },
    ])

    setInput('')
    setBusy(true)

    try {
      // Responde perguntas frequentes sem precisar consultar a IA.
      const looksLikeConversation =
        text.length > 60 || /\n/.test(text)

      if (!looksLikeConversation) {
        const faq = FAQ.find((item) => item.test.test(text))

        if (faq) {
          setMessages((previous) => [
            ...previous,
            {
              role: 'assistant',
              kind: 'text',
              content: faq.reply,
            },
          ])
          return
        }
      }

      // Tenta a API hospedada no Render.
      // Se não funcionar, usa a análise local.
      try {
        const response = await fetch(`${API_URL}/api/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        })

        if (response.ok) {
          const data = await response.json()

          if (typeof data.reply === 'string' && data.reply.trim()) {
            setMessages((previous) => [
              ...previous,
              {
                role: 'assistant',
                kind: 'text',
                content: data.reply,
              },
            ])
            return
          }
        }
      } catch {
        // Backend indisponível, sem CORS ou sem resposta:
        // continua para o mecanismo local.
      }

      // Fallback local: não depende da chave da IA.
      const result = analyzeText(text)

      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          kind: 'analysis',
          result,
          engine: 'local',
        },
      ])
    } catch (error) {
      console.error('Erro ao analisar o texto:', error)

      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          kind: 'text',
          content:
            'Não foi possível analisar este texto. Tente novamente. Se houver risco imediato, ligue 190.',
        },
      ])
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="section checker-section" id="verificador">
      <div className="container">
        <span className="eyebrow">Ferramenta interativa</span>

        <h2>Verificador de sinais em conversas</h2>

        <p
          style={{
            marginTop: '14px',
            maxWidth: 'var(--measure)',
            color: 'var(--ink-soft)',
          }}
        >
          Cole um trecho de conversa (sem precisar identificar quem é a
          criança) e receba uma leitura dos padrões de risco encontrados.
        </p>

        <div className="chat-shell">
          <div className="chat-messages" ref={scrollRef}>
            {messages.map((message, index) =>
              message.kind === 'analysis' ? (
                <div key={index} className="chat-row assistant">
                  <AnalysisBubble
                    result={message.result}
                    engine={message.engine}
                  />
                </div>
              ) : (
                <div
                  key={index}
                  className={`chat-row ${message.role}`}
                >
                  <div className={`bubble ${message.role}`}>
                    {message.content}
                  </div>
                </div>
              )
            )}

            {busy && (
              <div className="chat-row assistant">
                <div className="bubble assistant typing">
                  analisando…
                </div>
              </div>
            )}
          </div>

          <div className="chat-quick">
            <button
              type="button"
              disabled={busy}
              onClick={() => handleSend(EXAMPLE_TEXT)}
            >
              Ver um exemplo
            </button>

            <button
              type="button"
              disabled={busy}
              onClick={() => handleSend('Como faço para denunciar?')}
            >
              Como denuncio?
            </button>
          </div>

          <form
            className="chat-input-row"
            onSubmit={(event) => {
              event.preventDefault()
              handleSend()
            }}
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Cole aqui a conversa ou descreva a situação…"
              rows={2}
              disabled={busy}
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault()
                  handleSend()
                }
              }}
            />

            <button
              type="submit"
              className="btn-primary"
              disabled={busy || !input.trim()}
            >
              Enviar
            </button>
          </form>

          {backendAvailable === false && (
            <p className="analysis-footer">
              Servidor de IA indisponível no momento. O verificador local
              continuará disponível.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
