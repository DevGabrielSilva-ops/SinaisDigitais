// Motor de análise por padrões (heurístico), sem dependência de rede.
// Serve como base funcional imediata e como fallback quando o backend
// com IA (ver /server) não estiver configurado ou disponível.
//
// Importante: os padrões ficam no nível de CATEGORIAS DE COMPORTAMENTO,
// não uma lista de frases reais de aliciamento — o objetivo é reconhecer
// intenção, não fornecer um roteiro.

export const CATEGORIES = [
  {
    key: 'sigilo',
    label: 'Pedido de sigilo',
    advice: 'Pedir para "não contar pra ninguém" é uma das táticas mais comuns para afastar adultos de confiança.',
    patterns: [
      /não\s+conta\s+pra?\s+ningu[ée]m/i,
      /segredo\s+(nosso|entre\s+n[oó]s)/i,
      /s[oó]\s+entre\s+(a\s+gente|n[oó]s)/i,
      /n[aã]o\s+precisa\s+contar\s+(pra|para)\s+(sua|seu)/i,
    ],
  },
  {
    key: 'isolamento',
    label: 'Isolamento de outras pessoas',
    advice: 'Desqualificar pais, professores ou amigos ("eles não entendem você") tenta enfraquecer a rede de apoio da vítima.',
    patterns: [
      /eles?\s+n[aã]o\s+(entende|entendem|vai entender)/i,
      /s[oó]\s+eu\s+(te\s+)?entendo/i,
      /n[aã]o\s+confia\s+nel[ea]s?/i,
    ],
  },
  {
    key: 'elogio_maturidade',
    label: 'Elogios sobre "maturidade" ou aparência',
    advice: 'Elogiar aparência ou dizer que a pessoa "parece mais velha" costuma preceder uma virada de tom na conversa.',
    patterns: [
      /madur[ao]\s+(pra|para)\s+(a\s+)?(sua\s+)?idade/i,
      /parece\s+mais\s+velh[ao]/i,
      /vc\s+[ée]\s+diferente\s+d[ao]s?\s+outr[ao]s/i,
    ],
  },
  {
    key: 'pedido_imagem',
    label: 'Pedido de foto pessoal',
    advice: 'Qualquer pedido insistente de foto — mesmo "inocente" no início — é um sinal de alerta que merece atenção imediata.',
    patterns: [
      /manda(r)?\s+(uma\s+)?foto/i,
      /tira(r)?\s+uma\s+foto\s+(sua|pra\s+mim)/i,
      /me\s+mostra(r)?\s+como\s+(vc|voc[eê])\s+(est[aá]|ficou)/i,
    ],
  },
  {
    key: 'troca_app',
    label: 'Insistência para trocar de aplicativo',
    advice: 'Migrar para um app mais privado dificulta que pais e plataformas percebam o que está acontecendo.',
    patterns: [
      /vamos\s+falar\s+(no|pelo)\s+(whats|telegram|discord|instagram)/i,
      /me\s+chama\s+(no|pelo)\s+(whats|telegram|privado)/i,
      /baixa\s+(o|esse)\s+app/i,
    ],
  },
  {
    key: 'presentes',
    label: 'Oferta de presentes, dinheiro ou créditos',
    advice: 'Presentes e favores costumam ser usados para criar uma sensação de dívida ou obrigação.',
    patterns: [
      /vou\s+te\s+dar\s+(um\s+presente|dinheiro|cr[ée]ditos?)/i,
      /te\s+pago\s+(pra|para)/i,
      /quer\s+ganhar\s+(cr[ée]ditos?|dinheiro)/i,
    ],
  },
  {
    key: 'chantagem',
    label: 'Pressão, ameaça ou chantagem',
    advice: 'Ameaças de expor algo ou "espalhar" são sinal de sextorsão — situação de risco imediato.',
    patterns: [
      /se\s+voc[eê]\s+n[aã]o\s+(mandar|fizer)/i,
      /vou\s+(espalhar|mostrar\s+pra\s+todo\s+mundo)/i,
      /todo\s+mundo\s+vai\s+ver/i,
    ],
  },
  {
    key: 'encontro',
    label: 'Proposta de encontro presencial',
    advice: 'Qualquer tentativa de marcar um encontro presencial exige interrupção imediata do contato.',
    patterns: [
      /vamos\s+nos\s+encontrar/i,
      /posso\s+te\s+buscar/i,
      /qual\s+[ée]\s+o\s+endere[cç]o/i,
    ],
  },
]

export function analyzeText(text) {
  const found = []
  for (const cat of CATEGORIES) {
    const match = cat.patterns.find((re) => re.test(text))
    if (match) {
      const m = text.match(match)
      found.push({ ...cat, snippet: m ? m[0] : null })
    }
  }

  let level = 'sem sinais claros'
  if (found.length >= 3) level = 'atenção alta'
  else if (found.length >= 1) level = 'atenção'

  return {
    found,
    level,
    totalCategories: CATEGORIES.length,
  }
}

// Exemplo curto, fictício e não-gráfico só para demonstrar a ferramenta.
export const EXAMPLE_TEXT = `Oi! Nossa, você parece bem mais madura pra sua idade.
Não precisa contar pra sua mãe que a gente conversa, isso fica só entre a gente.
Será que você conseguiria me mandar uma foto sua?`
