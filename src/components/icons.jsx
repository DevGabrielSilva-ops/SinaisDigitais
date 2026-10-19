// Ilustrações abstratas e não-gráficas, só para preencher o carrossel enquanto
// imagens reais (fotos/ilustrações da equipe) não são anexadas.
// Substitua cada <Slide> em Carousel.jsx por uma <img src="/images/..."> quando tiver arte final.

export function ShieldIcon() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#163e39" />
      <path
        d="M200 60 L280 90 V160 C280 205 245 235 200 250 C155 235 120 205 120 160 V90 Z"
        fill="none"
        stroke="#cfe0da"
        strokeWidth="4"
      />
      <path d="M175 155 L195 175 L230 130" fill="none" stroke="#c98a2c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function AlertChatIcon() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#1f5c55" />
      <rect x="90" y="80" width="160" height="100" rx="4" fill="none" stroke="#f2f1ea" strokeWidth="4" />
      <path d="M120 180 L120 210 L155 180" fill="none" stroke="#f2f1ea" strokeWidth="4" strokeLinejoin="round" />
      <rect x="230" y="130" width="110" height="80" rx="4" fill="#c98a2c" opacity="0.9" />
      <line x1="270" y1="155" x2="270" y2="175" stroke="#163e39" strokeWidth="5" strokeLinecap="round" />
      <circle cx="270" cy="188" r="2.5" fill="#163e39" />
    </svg>
  )
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#16232e" />
      <rect x="150" y="150" width="100" height="80" rx="6" fill="none" stroke="#cfe0da" strokeWidth="4" />
      <path d="M170 150 V115 a30 30 0 0 1 60 0 V150" fill="none" stroke="#cfe0da" strokeWidth="4" />
      <circle cx="200" cy="185" r="8" fill="#c98a2c" />
    </svg>
  )
}

export function FamilyIcon() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#274f49" />
      <circle cx="160" cy="130" r="26" fill="none" stroke="#f2f1ea" strokeWidth="4" />
      <path d="M120 210 C120 175 200 175 200 210" fill="none" stroke="#f2f1ea" strokeWidth="4" />
      <circle cx="250" cy="150" r="18" fill="none" stroke="#c98a2c" strokeWidth="4" />
      <path d="M222 210 C222 185 278 185 278 210" fill="none" stroke="#c98a2c" strokeWidth="4" />
    </svg>
  )
}

export function ReportFlagIcon() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#3e4c52" />
      <line x1="170" y1="80" x2="170" y2="220" stroke="#f2f1ea" strokeWidth="5" />
      <path d="M170 90 L250 105 L170 140 Z" fill="#c98a2c" />
    </svg>
  )
}
