# 📸 Guia: Adicionar e Personalizar Eventos

## ✅ O que foi criado

A seção de eventos foi implementada com:

1. **Tipo de dado**: `Event` interface em [src/types/index.ts](src/types/index.ts)
2. **Dados**: 4 eventos de exemplo em [src/data/events.ts](src/data/events.ts)
3. **Componente**: `EventCard` em [src/components/ui-custom/EventCard.tsx](src/components/ui-custom/EventCard.tsx)
4. **Seção**: `EventsSection` em [src/components/sections/EventsSection.tsx](src/components/sections/EventsSection.tsx)
5. **Integração**: Adicionado na página inicial [src/routes/index.tsx](src/routes/index.tsx)

---

## 🎨 Design dos Cards

Os cards de evento têm:
- ✅ Imagem em destaque (16:9)
- ✅ Badge com tipo de evento (Conferência, Workshop, etc)
- ✅ Título e descrição
- ✅ Data e localização com ícones
- ✅ Tags com highlights/tecnologias
- ✅ Link para mais informações (opcional)
- ✅ Efeitos hover (escala, borda, sombra)
- ✅ Animações fade-in

---

## 📝 Editar Eventos Existentes

Abra [src/data/events.ts](src/data/events.ts) e modifique os eventos:

```typescript
{
  id: "seu-evento-unico",                    // ID único (use kebab-case)
  title: "Nome do Evento",                   // Título em destaque
  description: "Descrição breve do evento",  // Descrição (até ~100 caracteres)
  date: "Mês Ano",                           // Ex: "Maio 2026", "Novembro 2025"
  location: "Cidade, Estado",                // Ex: "São Paulo, SP" ou "Online"
  type: "Conferência",                       // Tipo: Conferência | Workshop | Hackathon | Meetup | Curso | Palestra
  image: "/images/event-nome.jpg",           // Caminho da imagem em public/images/
  highlights: ["Tag 1", "Tag 2", "Tag 3"],  // Tags com skills/tópicos
  link: "https://link-do-evento.com",       // Link externo (opcional)
}
```

---

## ➕ Adicionar Novo Evento

Abra [src/data/events.ts](src/data/events.ts) e adicione ao final do array:

```typescript
export const events: Event[] = [
  // ... eventos existentes ...
  
  {
    id: "python-summit-2026",
    title: "Python Summit Brasil 2026",
    description: "Conferência anual de Python com palestras, workshops e networking.",
    date: "Julho 2026",
    location: "Rio de Janeiro, RJ",
    type: "Conferência",
    image: "/images/event-python-summit.jpg",
    highlights: ["Python", "Backend", "Data Science", "Community"],
    link: "https://pythonsummit.com.br",
  },
];
```

---

## 🖼️ Adicionar Imagens dos Eventos

### **Estrutura esperada:**
```
public/
└── images/
    ├── profile.jpeg            (sua foto)
    ├── event-itau.jpg          (evento Itaú)
    ├── event-aws.jpg           (evento AWS)
    ├── event-hackathon.jpg     (hackathon)
    ├── event-women-tech.jpg    (meetup mulheres)
    └── event-python-summit.jpg (novo evento)
```

### **Como adicionar imagens:**

**Via Explorer:**
1. Abra `C:\Users\jukia\Downloads\julia-career-path\public\images`
2. Coloque as imagens dos eventos lá
3. Nomeie com padrão: `event-nome-descritivo.jpg`

**Via Terminal:**
```bash
# Exemplo
cp "C:\caminho\da\foto.jpg" "C:\Users\jukia\Downloads\julia-career-path\public\images\event-seu-evento.jpg"
```

**Recomendações:**
- ✅ Formato: JPG ou PNG
- ✅ Tamanho: 800x450px (16:9) ou redimensiona automaticamente
- ✅ Compressão: ~100-200KB cada
- ✅ Qualidade: Boa resolução (fotos reais de eventos)

---

## 🎯 Propriedades Explicadas

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | ✅ | Identificador único (usar kebab-case) |
| `title` | string | ✅ | Nome do evento |
| `description` | string | ✅ | Descrição breve (~100 caracteres) |
| `date` | string | ✅ | Data do evento (ex: "Maio 2026") |
| `location` | string | ✅ | Local (ex: "São Paulo, SP" ou "Online") |
| `type` | string | ✅ | Tipo: Conferência \| Workshop \| Hackathon \| Meetup \| Curso \| Palestra |
| `image` | string | ✅ | Caminho da imagem em `/images/` |
| `highlights` | string[] | ❌ | Tags com tópicos/skills (ex: ["Java", "Backend"]) |
| `link` | string | ❌ | URL externa para mais informações |

---

## 🎨 Tipos de Evento Disponíveis

```typescript
type: "Conferência"  // Conferências grandes
type: "Workshop"     // Workshops e treinamentos
type: "Hackathon"    // Competições/hackathons
type: "Meetup"       // Encontros locais
type: "Curso"        // Cursos online/presenciais
type: "Palestra"     // Palestras e talks
```

---

## 🎬 Exemplo Completo: Adicionar Novo Evento

**1. Adicione em** [src/data/events.ts](src/data/events.ts):
```typescript
{
  id: "tech-conference-2026",
  title: "Tech Conference Brasil 2026",
  description: "Grande conferência de tecnologia com as principais tendências do mercado.",
  date: "Agosto 2026",
  location: "Brasília, DF",
  type: "Conferência",
  image: "/images/event-tech-conf.jpg",
  highlights: ["Inovação", "Cloud", "AI", "Networking"],
  link: "https://techconference.com.br",
},
```

**2. Coloque a imagem em:** `public/images/event-tech-conf.jpg`

**3. Rode o servidor:**
```bash
npm run dev
```

**4. Veja a novo card aparecer na página inicial!** 🚀

---

## 🎯 Customizar Aparência

### **Mudar quantidade de colunas:**
Edite [src/components/sections/EventsSection.tsx](src/components/sections/EventsSection.tsx):

```typescript
// Padrão: 4 colunas em tela grande
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

// Mude para 3 colunas:
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

// Ou 2 colunas:
<div className="grid md:grid-cols-2 gap-6 mt-8">
```

### **Mudar espaçamento:**
```typescript
// Atual: gap-6
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

// Mais espaço: gap-8
// Menos espaço: gap-4
```

### **Mudar padding/margens:**
```typescript
// Atual: py-12 (padding vertical)
<section className="py-12">

// Mais: py-16
// Menos: py-8
```

---

## 💡 Dicas

✅ **Para eventos sem imagem**: Aparece um placeholder gradiente
✅ **Responsivo**: 1 coluna em mobile, 2 em tablet, 4 em desktop
✅ **Efeitos**: Hover faz a imagem zoom e border muda de cor
✅ **Performance**: Imagens são lazy-loaded (não carregam até ver)
✅ **SEO**: Cada evento tem alt text na imagem

---

## 🧪 Testar

```bash
# Rodando desenvolvimento
npm run dev

# Ir para http://localhost:5173
# Ver seção "Eventos e Participações" após o hero
```

---

## 📊 Estatísticas

Atualmente tem:
- 4 eventos de exemplo
- 4 tipos de eventos diferentes
- Imagens em placeholder (mostram gradiente)
- Pronto para adicionar quantos eventos quiser!

---

**Próximo passo**: Adicione suas imagens em `public/images/` e pronto! 🎉
