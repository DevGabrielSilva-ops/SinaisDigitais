# Sinais Digitais

Protótipo de SPA educativa sobre aliciamento sexual infantil online (grooming),
feito em React + Vite, para o projeto interdisciplinar de Direito e ADS.

## Estrutura de páginas (seções da rolagem única)

1. **Início** — frase de impacto + CTA
2. **Como acontece** — etapas do aliciamento, papel da IA, como combater (3 blocos)
3. **Verificador de sinais** — chat interativo que analisa uma conversa colada e aponta padrões de risco
4. **Galeria** — carrossel de imagens/ilustrações da campanha
5. **Para pais** — sinais de alerta e ação recomendada
6. **Denunciar** — passo a passo + canais oficiais (Disque 100, SaferNet, emergência 190)

Optei por **uma única página com seções**, em vez de rotas separadas: o conteúdo é
sequencial (ler → reconhecer → agir) e o usuário raramente vai direto a uma
seção — ele rola a página inteira. Rotas fariam sentido se o projeto crescer
para incluir, por exemplo, um quiz interativo completo ou uma área de login.

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) instalado (versão 18 ou mais recente).

```bash
cd sinais-digitais
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`).
Funciona em desktop e mobile — teste redimensionando a janela ou abrindo pelo
celular na mesma rede (o Vite mostra um endereço de rede ao rodar `npm run dev -- --host`).

Para gerar a versão de produção (arquivos estáticos prontos para hospedar):

```bash
npm run build
npm run preview   # para conferir o build localmente
```

## O verificador de sinais (chat)

O chat funciona em duas camadas:

- **Motor local por padrões** (`src/lib/analyzeText.js`) — roda inteiramente no
  navegador, sem chave de API nem backend. Funciona assim que você der
  `npm run dev`. Reconhece categorias como pedido de sigilo, isolamento,
  elogios sobre maturidade, pedido de foto, troca de app, presentes,
  chantagem e proposta de encontro.
- **Backend opcional com IA real** (`server/`) — um servidor Node separado
  que chama a API da Anthropic com uma chave que **fica só no servidor**,
  nunca no navegador. Quando esse servidor está rodando, o chat detecta
  automaticamente (`GET /api/health`) e passa a usar a IA em vez do motor
  local, com um *system prompt* que só permite analisar texto — a IA se
  recusa a gerar, completar ou "exemplificar" mensagens de aliciamento,
  mesmo se pedirem isso diretamente.

Para ativar a camada com IA:

```bash
cd server
cp .env.example .env
# edite .env e coloque sua ANTHROPIC_API_KEY
npm install
npm start
```

Com o backend rodando (porta 3001) e o frontend rodando (`npm run dev`, porta
5173), o proxy configurado em `vite.config.js` já encaminha as chamadas de
`/api/*` para o servidor automaticamente.

Sem o backend, o site continua 100% funcional — só usa o motor local.

## Onde trocar conteúdo

- **Textos das seções:** cada seção é um componente em `src/components/`
  (`Hero.jsx`, `InfoSection.jsx`, `ParentsSection.jsx`, `ReportSection.jsx`).
- **Imagens do carrossel:** hoje usa ícones SVG de placeholder
  (`src/components/icons.jsx`). Para usar fotos/artes reais, coloque os
  arquivos em `public/images/` e, em `Carousel.jsx`, troque `icon: NomeDoIcone`
  por `src: '/images/arquivo.jpg'` em cada item do array `slides`.
- **Cores e tipografia:** tudo centralizado em `src/styles.css`, no bloco
  `:root` no topo do arquivo.

## O que eu expandiria primeiro

1. **Mais categorias e contexto no motor local**, ou ajuste fino do
   *system prompt* da IA para reduzir falsos positivos/negativos — hoje é uma
   base sólida, mas um projeto real se beneficiaria de testes com casos reais
   (anonimizados) antes de qualquer uso fora da sala de aula.
2. **Persistência simples de conteúdo** (ex.: um arquivo JSON ou CMS leve)
   para que quem não mexe em código consiga atualizar textos e canais de
   denúncia sem editar `.jsx`.
3. **Página dedicada por seção com rota própria** (`react-router`), útil se o
   site crescer e alguém precisar compartilhar o link direto de "Como
   denunciar", por exemplo, em vez da página inteira.
4. **Acessibilidade e i18n**: já há foco visível e HTML semântico básico, mas
   vale um teste com leitor de tela e, se o projeto for além da sala de aula,
   suporte a Libras (ex.: VLibras, usado por vários sites públicos
   brasileiros).
5. **Analytics de uso responsável**: saber quais seções são mais lidas ajuda a
   melhorar o material, mas evite qualquer coleta que identifique quem é
   adolescente e o que ele/ela pesquisou — é um tema sensível.

## Nota

Todo o conteúdo é educativo e fictício, conforme a proposta original do
trabalho. Os canais de denúncia (Disque 100, SaferNet, 190) são reais e devem
ser usados em qualquer situação verdadeira — este site não substitui nenhum
canal oficial.
