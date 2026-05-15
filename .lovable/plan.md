
# Plano — Site PDI Pessoal da Julia

Site front-end de Plano de Desenvolvimento Individual, inspirado nas funcionalidades do repositório referenciado (sem copiar código, textos ou identidade), com dados fictícios personalizados para Julia.

## Observação sobre stack

Você pediu Next.js, mas o template Lovable usa **TanStack Start + React + TypeScript + Tailwind CSS v4** (equivalente em SPA/SSR, mesma DX de roteamento por arquivos). Vou adaptar a estrutura para esse stack — o resultado visual e funcional será idêntico ao planejado. Sem backend, sem banco, dados mockados em `src/data/`.

## Páginas (rotas)

- `/` — Sobre (Hero + ProfileCard + InternshipTimer + links)
- `/objetivo-carreira` — Timeline de 5 etapas + metas em andamento
- `/contribuicoes` — Grid de cards com FilterTabs (Todas/Backend/Cloud/Infra/Estudos/Projetos/Comunidade)
- `/roadmap` — Stack por área com badges verde/amarelo/vermelho + resumo automático
- `/soft-skills` — Duas seções (Já pratico / Em desenvolvimento) em cards

Cada rota com `head()` próprio (title, description, og) — SEO real, não hash anchors.

## Design system

Paleta aplicada via tokens HSL/oklch em `src/styles.css`:

- `--background` #FFF6FF
- `--primary` #FFA3C4 (rosa principal)
- `--primary-foreground` #111827
- `--accent` #7C3AED (roxo tech)
- `--info` #38BDF8 (azul)
- `--success` #22C55E, `--warning` #FACC15, `--destructive` #EF4444
- `--muted-foreground` #6B7280
- Gradientes pré-definidos: `--gradient-primary` (rosa→roxo→azul), `--gradient-soft`
- Sombras: `--shadow-soft`, `--shadow-glow`
- Radius grande (rounded-2xl/3xl)
- Background com grid tecnológico discreto (CSS pattern) + glassmorphism leve nos cards

Tipografia: Inter (já disponível) com pesos variados.

## Componentes

```
src/components/
  layout/
    Navbar.tsx          (desktop + trigger mobile, links ativos destacados)
    MobileMenu.tsx      (sheet animado)
    Footer.tsx          (mini, com última atualização e links)
  sections/
    HeroSection.tsx
    ProfileCard.tsx
    CareerTimeline.tsx
    ContributionsSection.tsx
    RoadmapSection.tsx
    SoftSkillsSection.tsx
  ui-custom/
    GradientCard.tsx
    SectionTitle.tsx
    TechnologyBadge.tsx (variantes status)
    FilterTabs.tsx
    SkillCard.tsx
    ContributionCard.tsx
    InternshipTimer.tsx (calcula tempo decorrido/restante em tempo real)
    GoalCard.tsx
```

shadcn já presente (Button, Card, Tabs, Badge, Sheet) é reutilizado por baixo.

## Dados (mock)

```
src/data/
  profile.ts       (nome, título, empresa, área, período, links, bio)
  career.ts        (5 etapas + etapa atual + metas)
  contributions.ts (4 itens fictícios com categoria/tech/impactos/status)
  roadmap.ts       (áreas → tecnologias com status)
  softSkills.ts    (2 grupos com ícone/título/descrição)
src/types/index.ts (Profile, CareerStep, Contribution, Tech, SoftSkill, Status)
```

Dados pré-preenchidos exatamente como descrito no prompt (Julia, Itaú, Java/Spring/AWS/Terraform, etc.).

## Animações

- Fade-in / slide-up nas seções ao montar (CSS keyframes já no template)
- Hover scale nos cards de contribuição
- Transição suave nas FilterTabs
- Etapa atual da carreira pulsando levemente em rosa
- MobileMenu com slide-in

Sem Framer Motion — usando utilitários CSS já configurados (`animate-fade-in`, `hover-scale`).

## Responsividade

- Mobile: stack vertical, menu hamburguer, cards 1 coluna
- Tablet: 2 colunas
- Desktop: 3 colunas em contribuições/roadmap, timeline horizontal opcional

## Detalhes técnicos

- Rotas: arquivos em `src/routes/` (convenção TanStack: `index.tsx`, `objetivo-carreira.tsx`, `contribuicoes.tsx`, `roadmap.tsx`, `soft-skills.tsx`)
- Navbar fica no `__root.tsx` (compartilhada) com `<Outlet />`
- Cada rota define seu próprio `head()` em português
- `InternshipTimer` usa `useEffect` + `setInterval` para atualizar a cada minuto
- Filtros em `/contribuicoes` com `useState` local
- Resumo do roadmap: contagem derivada via `useMemo`
- Tudo em português

## Entregáveis

- 5 páginas funcionais e responsivas
- ~15 componentes organizados
- Dados mockados em `src/data/` fáceis de editar
- Design fiel à paleta rosa/roxo solicitada
- README com instruções (incluindo onde editar cada dado)

## O que NÃO será feito

- Sem backend, API, banco
- Sem cópia de textos/visual do repo original
- Sem Next.js (uso TanStack Start equivalente — confirme se quiser que eu force Next, mas isso exigiria reconfigurar o template)
