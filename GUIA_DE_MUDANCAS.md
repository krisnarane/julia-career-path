# 📋 Guia de Situações de Mudanças - Julia Career Path

## 📌 Visão Geral do Projeto

Este é um site de **PDI (Plano de Desenvolvimento Individual)** construído com:
- **Framework**: TanStack Start (React + React Router)
- **Estilo**: Tailwind CSS + Radix UI
- **Dados**: Arquivos TypeScript em `src/data/`
- **Componentes**: Estruturados em `src/components/`
- **Deploy**: Cloudflare Workers (Wrangler)

---

## 🎯 SITUAÇÕES DE MUDANÇAS COMUNS

### 📝 1. ALTERAR DADOS PESSOAIS E INFORMAÇÕES DE PERFIL

#### Situação: "Quero atualizar meu nome, título ou biografia"

**Arquivo**: [src/data/profile.ts](src/data/profile.ts)

```typescript
export const profile: Profile = {
  name: "Julia",                    // ← MUDE AQUI: seu nome
  title: "Estagiária em Desenvolvimento Java",  // ← MUDE: seu título
  subtitle: "Java | Spring Boot | AWS | Terraform | SQL",  // ← MUDE: suas skills principais
  company: "Itaú Unibanco",         // ← MUDE: sua empresa
  area: "Desenvolvimento Backend / Cloud",  // ← MUDE: sua área
  startDate: "2025-03-01",          // ← MUDE: data início
  endDate: "2027-03-01",            // ← MUDE: data fim
  github: "https://github.com/julia",  // ← MUDE: seu GitHub
  linkedin: "https://linkedin.com/in/julia",  // ← MUDE: seu LinkedIn
  lastUpdate: "12 de maio de 2026",  // ← MUDE: última atualização
  bio: "Sou apaixonada por tecnologia...",  // ← MUDE: sua bio completa
};
```

**O que muda no site**: A navbar, hero section e informações do perfil em toda a página.

---

### 🚀 2. ADICIONAR OU REMOVER ETAPAS DE CARREIRA

#### Situação: "Quero adicionar uma nova meta de carreira ou mudar meu focus"

**Isso agora é editado direto pela UI, logada como admin** (não é mais um arquivo estático).

1. Acesse `/objetivo-carreira` logada como admin.
2. Para etapas da timeline: use o botão "Adicionar Etapa" ou o ícone de lápis em cada etapa para editar título, foco e marcar a etapa atual.
3. Para as metas em andamento (card lateral): use o "+" para adicionar, ou os ícones de lápis/lixeira em cada meta para editar ou remover.

As alterações são salvas no banco D1 (tabelas `career_steps` e `career_goals` via `src/api/career.ts`) e refletidas imediatamente na página.

---

### 💼 3. ATUALIZAR CONTRIBUIÇÕES E PROJETOS

#### Situação: "Quero adicionar um novo projeto ou mudar o status de um projeto"

**Arquivo**: [src/data/contributions.ts](src/data/contributions.ts)

```typescript
export const contributions: Contribution[] = [
  {
    id: "api-credito",
    icon: "Banknote",                    // ← Mude o ícone (veja Lucide Icons)
    title: "API de Análise de Crédito",  // ← Título do projeto
    category: "Backend",                 // ← Categoria: Backend, Infra, Estudos, Comunidade
    description: "API REST simulando...",  // ← Descrição curta
    technologies: ["Java", "Spring Boot", "REST API", "PostgreSQL"],  // ← Skills usadas
    impacts: [
      "Aplicação de regras de negócio",  // ← Impactos/aprendizados
      "Organização em camadas",
    ],
    status: "Em andamento",  // ← MUDE PARA: "Concluído" ou "Planejado"
  },
  // ← ADICIONE UM NOVO PROJETO ASSIM:
  {
    id: "novo-projeto",
    icon: "Code",
    title: "Sistema de Gestão de Tarefas",
    category: "Backend",
    description: "Sistema para gerenciar tarefas com autenticação e banco de dados.",
    technologies: ["Java", "MongoDB", "JWT", "Docker"],
    impacts: ["Prática com NoSQL", "Containerização", "Segurança"],
    status: "Em andamento",
  },
];
```

**O que muda**: Página de Contribuições (`/contribuicoes`) e cards exibem novos projetos.

---

### 🎓 4. ADICIONAR OU MODIFICAR SOFT SKILLS

#### Situação: "Quero marcar uma soft skill como 'Em desenvolvimento' ou adicionar uma nova"

**Arquivo**: [src/data/softSkills.ts](src/data/softSkills.ts)

```typescript
export const softSkills: SoftSkill[] = [
  { 
    icon: "MessageCircle",               // ← Nome do ícone Lucide
    title: "Comunicação",                // ← Nome da skill
    description: "Expresso ideias...",   // ← Descrição
    status: "Já pratico"                 // ← MUDE PARA: "Em desenvolvimento"
  },
  // ← ADICIONE UMA NOVA ASSIM:
  { 
    icon: "Brain",
    title: "Inteligência Emocional",
    description: "Reconhecer e gerenciar emoções no ambiente de trabalho.",
    status: "Em desenvolvimento"
  },
];
```

**O que muda**: Página de Soft Skills (`/soft-skills`) mostra as habilidades com cores diferentes.

---

### 🗺️ 5. CRIAR OU MODIFICAR ROADMAP DE DESENVOLVIMENTO

#### Situação: "Quero adicionar um novo milestone ao roadmap de 2026-2027"

**Arquivo**: [src/data/roadmap.ts](src/data/roadmap.ts)

```typescript
// Adicionar um novo roadmap item:
export const roadmapItems: RoadmapItem[] = [
  {
    id: "q1-2026",
    quarter: "Q1 2026",
    description: "Aprofundar em Spring Boot e criar primeira API",
    milestones: ["Concluir curso Spring", "Projeto API iniciado"],
    status: "completed"
  },
  // ← ADICIONE:
  {
    id: "q3-2026",
    quarter: "Q3 2026",
    description: "Especialização em cloud e infraestrutura",
    milestones: ["Certificação AZ-204", "Projeto Terraform concluído"],
    status: "in-progress"  // "completed", "in-progress", "planned"
  },
];
```

**O que muda**: Página `/roadmap` exibe os marcos em uma timeline visual.

---

## 🎨 6. ALTERAR ESTILOS E CORES

### Situação: "Quero mudar o gradiente, cores primárias ou tema"

**Arquivo**: [src/styles.css](src/styles.css)

```css
/* Variáveis de cor - procure por: */
@layer base {
  :root {
    --primary: 160 84% 39%;           /* ← Cor primária (mude aqui) */
    --background: 0 0% 100%;           /* ← Cor de fundo */
    --foreground: 240 10% 3.9%;        /* ← Cor do texto */
    --card: 0 0% 100%;
    --muted-foreground: 240 3.8% 46.1%;
    /* ... mais variáveis ... */
  }
}
```

**Alternativa com Tailwind**:
- Abra [tailwind.config.ts](tailwind.config.ts) ou use a extensão Tailwind no VS Code
- Customize as cores no arquivo de configuração

**O que muda**: Todo o site muda de cor/tema.

---

## 🧩 7. ADICIONAR NOVAS PÁGINAS/ROTAS

### Situação: "Quero criar uma página nova, como 'Experiências' ou 'Blog'"

**Passo 1**: Crie o arquivo de rota em `src/routes/`

```typescript
// src/routes/experiencias.tsx
import { createFileRoute } from '@tanstack/react-router'
import { ExperiencesSection } from '@/components/sections/ExperiencesSection'

export const Route = createFileRoute('/experiencias')({
  component: ExperiencesPage,
})

function ExperiencesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
      <ExperiencesSection />
    </div>
  )
}
```

**Passo 2**: Adicione o link na navbar em [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx)

```typescript
const links = [
  { to: "/", label: "Sobre" },
  { to: "/objetivo-carreira", label: "Objetivo" },
  { to: "/experiencias", label: "Experiências" },  // ← ADICIONE
  // ...
];
```

**Passo 3**: Crie um componente de seção em `src/components/sections/`

```typescript
// src/components/sections/ExperiencesSection.tsx
export function ExperiencesSection() {
  return (
    <section>
      <h1>Minhas Experiências</h1>
      {/* Seu conteúdo aqui */}
    </section>
  )
}
```

**O que muda**: Nova página acessível pela navbar.

---

## 🖼️ 8. MODIFICAR COMPONENTES VISUAIS

### Situação: "Quero mudar o layout de um componente ou adicionar novos campos"

**Exemplo - Modificar Card de Contribuição**:

**Arquivo**: [src/components/ui-custom/ContributionCard.tsx](src/components/ui-custom/ContributionCard.tsx)

```typescript
export function ContributionCard({ item }: { item: Contribution }) {
  // Adicione novos campos aqui:
  const duration = "3 meses";  // ← NOVO CAMPO
  const link = "github.com/...";  // ← NOVO CAMPO
  
  return (
    <div className="glass rounded-2xl border border-border p-6">
      {/* Adicione elementos novos aqui */}
      <p className="text-sm text-muted-foreground">Duração: {duration}</p>
      {link && <a href={link} className="text-primary">Ver projeto</a>}
    </div>
  )
}
```

**O que muda**: Como os cards de contribuição aparecem na página.

---

## 🔗 9. ADICIONAR LINKS E INTEGRAÇÕES EXTERNAS

### Situação: "Quero adicionar botões para GitHub, LinkedIn, ou outras redes"

**Arquivo**: [src/components/sections/HeroSection.tsx](src/components/sections/HeroSection.tsx)

```typescript
import { profile } from "@/data/profile"

export function HeroSection() {
  return (
    <section>
      {/* ... conteúdo ... */}
      <div className="flex gap-4 mt-6">
        {profile.github && (
          <a href={profile.github} target="_blank" className="button">
            GitHub
          </a>
        )}
        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" className="button">
            LinkedIn
          </a>
        )}
        {/* ← ADICIONE NOVOS LINKS AQUI */}
      </div>
    </section>
  )
}
```

**O que muda**: Botões de contato/redes sociais ficam visíveis e clicáveis.

---

## 📱 10. AJUSTAR RESPONSIVIDADE MOBILE

### Situação: "Quero tornar algo melhor em celular"

**Padrão no projeto** (usa Tailwind):

```typescript
<div className="hidden md:flex">           {/* ← Escondido em mobile, visível em desktop */}
  {/* Conteúdo desktop */}
</div>

<div className="flex md:hidden">            {/* ← Visível em mobile, escondido em desktop */}
  {/* Conteúdo mobile */}
</div>

<div className="px-4 md:px-6 py-8 md:py-12">  {/* ← Padding menor em mobile, maior em desktop */}
  {/* Conteúdo responsivo */}
</div>
```

**O que muda**: Layout se adapta automaticamente a diferentes telas.

---

## 🚀 11. MODIFICAR BUILD E DEPLOY

### Situação: "Quero mudar como a aplicação é feita ou deployada"

**Arquivo**: [vite.config.ts](vite.config.ts)

```typescript
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },  // ← Entrada do servidor
  },
  // ← Adicione configurações Vite aqui
});
```

**Arquivo**: [wrangler.jsonc](wrangler.jsonc)

```json
{
  "name": "julia-career-path",      // ← Nome do projeto Cloudflare
  "main": "dist/server.js",          // ← Arquivo de entrada
  "compatibility_date": "2024-01-01", // ← Data de compatibilidade
  // ← Adicione variáveis de ambiente aqui
}
```

**O que muda**: Como a aplicação é compilada e deployada.

---

## 💾 12. ADICIONAR TIPOS DE DADOS NOVOS

### Situação: "Quero criar um novo tipo de dado estruturado"

**Arquivo**: [src/types/index.ts](src/types/index.ts)

```typescript
// ← ADICIONE UM NOVO TIPO ASSIM:
export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

export interface CareerStep {
  id: number;
  title: string;
  focus: string;
  current?: boolean;
  // ← ADICIONE NOVOS CAMPOS AQUI
}
```

**O que muda**: Estrutura de dados em toda a aplicação.

---

## 🔍 13. BUSCAR E FILTRAR DADOS

### Situação: "Quero adicionar um filtro ou buscador de contribuições"

**Arquivo**: [src/components/ui-custom/FilterTabs.tsx](src/components/ui-custom/FilterTabs.tsx)

```typescript
const categories = ["Backend", "Infra", "Estudos", "Comunidade", "Todos"];

export function FilterTabs({ onFilterChange }: { onFilterChange: (cat: string) => void }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onFilterChange(cat)}
          className="px-4 py-2 rounded-full border"
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
```

**Como usar**:

```typescript
const [filter, setFilter] = useState("Todos");
const filtered = contributions.filter(c => 
  filter === "Todos" ? true : c.category === filter
);
```

**O que muda**: Contribuições podem ser filtradas por categoria.

---

## ⏱️ 14. ADICIONAR CONTADORES E TIMERS

### Situação: "Quero mostrar quanto tempo falta para o fim do estágio"

**Arquivo**: [src/components/ui-custom/InternshipTimer.tsx](src/components/ui-custom/InternshipTimer.tsx)

```typescript
import { profile } from "@/data/profile"

export function InternshipTimer() {
  const endDate = new Date(profile.endDate);
  const now = new Date();
  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="p-6 glass rounded-2xl">
      <h3>Tempo até fim do estágio</h3>
      <p className="text-3xl font-bold text-primary">{daysLeft} dias</p>
    </div>
  )
}
```

**O que muda**: Mostra um contador dinâmico na página.

---

## 📊 15. ADICIONAR ANÁLISES E ESTATÍSTICAS

### Situação: "Quero mostrar estatísticas sobre meu desenvolvimento"

```typescript
// src/lib/utils.ts - Adicione funções de cálculo:

export function getCompletedContributions() {
  return contributions.filter(c => c.status === "Concluído").length;
}

export function getTotalTechnologies() {
  const techs = new Set();
  contributions.forEach(c => c.technologies.forEach(t => techs.add(t)));
  return techs.size;
}

export function getAchievedSkills() {
  return softSkills.filter(s => s.status === "Já pratico").length;
}
```

**Como usar**:

```typescript
<div className="grid grid-cols-3 gap-4">
  <div>
    <p className="text-3xl font-bold">{getCompletedContributions()}</p>
    <p>Projetos Concluídos</p>
  </div>
  <div>
    <p className="text-3xl font-bold">{getTotalTechnologies()}</p>
    <p>Tecnologias</p>
  </div>
  <div>
    <p className="text-3xl font-bold">{getAchievedSkills()}</p>
    <p>Skills Dominadas</p>
  </div>
</div>
```

**O que muda**: Dashboard com estatísticas aparece na página.

---

## 🔐 16. VARIÁVEIS DE AMBIENTE E SEGURANÇA

### Situação: "Quero proteger dados sensíveis ou usar uma API externa"

**Arquivo**: `.env` (criar na raiz)

```bash
VITE_API_URL=https://api.example.com
VITE_GITHUB_TOKEN=xxx
VITE_PUBLIC_KEY=xxx
```

**Usar em componentes**:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
```

**O que muda**: Dados sensíveis ficam protegidos e fáceis de configurar.

---

## 📦 17. INSTALAR NOVAS DEPENDÊNCIAS

### Situação: "Quero adicionar uma nova biblioteca (ex: gráficos, animações)"

```bash
# Instalar
npm install chart.js react-chartjs-2

# Ou
npm install framer-motion
```

**Usar no projeto**:

```typescript
import { Chart } from 'chart.js'
import { motion } from 'framer-motion'

export function SkillsChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Seu gráfico aqui */}
    </motion.div>
  )
}
```

**O que muda**: Novas funcionalidades ficam disponíveis em toda a app.

---

## 🎯 18. ATUALIZAR TEXTO E CONTEÚDO ESTÁTICO

### Situação: "Quero mudar o texto de um botão, título ou descrição"

Procure por:

1. **Arquivo de dados** (`src/data/`) - para dados estruturados
2. **Componentes** (`src/components/`) - para textos em componentes
3. **Rotas** (`src/routes/`) - para conteúdo de página

**Exemplo**:

```typescript
// Em qualquer arquivo:
<h1>Meu Título Original</h1>  // ← Procure e MUDE AQUI

// Ou em dados:
{ title: "Texto Antigo" }  // ← MUDE PARA: { title: "Texto Novo" }
```

**O que muda**: Texto aparece imediatamente na página.

---

## 🧪 19. TESTAR MUDANÇAS LOCALMENTE

### Situação: "Quero ver minhas mudanças antes de fazer deploy"

```bash
# Terminal 1: Desenvolver
npm run dev

# Abre em http://localhost:5173

# Terminal 2: Lint (verificar erros)
npm run lint

# Terminal 3: Build (simular produção)
npm run build
npm run preview
```

**O que muda**: Você vê as mudanças em tempo real.

---

## 🚀 20. FAZER DEPLOY DA APLICAÇÃO

### Situação: "Quero publicar minhas mudanças para o mundo ver"

```bash
# Compilar
npm run build

# Deploy para Cloudflare Workers (se configurado)
npm run deploy
# Ou manual:
wrangler publish
```

**O que muda**: Seu site fica online e acessível via URL do Cloudflare.

---

## 📚 REFERÊNCIAS RÁPIDAS

| O que quero fazer? | Arquivo | Campo |
|---|---|---|
| Mudar meu nome | `src/data/profile.ts` | `name` |
| Adicionar skill | `src/data/softSkills.ts` | adicione ao array |
| Mudar cor do tema | `src/styles.css` | variáveis CSS |
| Adicionar página | `src/routes/` | novo arquivo `.tsx` |
| Alterar projeto | página `/contribuicoes` (logada como admin) | editar/adicionar contribuição pela UI |
| Mudar objetivo | página `/objetivo-carreira` (logada como admin) | editar etapas/metas pela UI |
| Modificar navbar | `src/components/layout/Navbar.tsx` | `links` array |
| Adicionar ícone | qualquer lugar | use `lucide-react` |
| Testar mudanças | terminal | `npm run dev` |
| Publicar | terminal | `npm run build` + deploy |

---

## 💡 DICAS FINAIS

✅ **Sempre que mudar dados**:
1. Abra o terminal e rode `npm run dev`
2. Veja as mudanças em http://localhost:5173
3. Teste em celular (abra DevTools com F12)

✅ **Tipos TypeScript**:
- Arquivos `.ts` são dados e funções
- Arquivos `.tsx` são componentes React
- Arquivo [src/types/index.ts](src/types/index.ts) define os tipos

✅ **Estrutura de pastas**:
- `data/` = dados da aplicação
- `components/` = componentes React reutilizáveis
- `routes/` = páginas da aplicação
- `lib/` = funções auxiliares

✅ **Atalhos úteis**:
- `Ctrl + P` no VS Code para procurar arquivo
- `Ctrl + Shift + F` para buscar texto em todo projeto
- `Ctrl + /` para comentar código

---

**Última atualização**: 15 de maio de 2026
**Versão do projeto**: TanStack Start 1.167.50
