# 📸 Guia: Adicionar e Personalizar Eventos

## ✅ Como funciona hoje

A seção de eventos é editável direto pela UI, logada como admin, e os dados ficam no banco D1 (não mais em arquivo estático):

1. **Tipo de dado**: `Event` interface em [src/types/index.ts](src/types/index.ts)
2. **API**: `listEvents` / `upsertEvent` / `deleteEvent` em [src/api/events.ts](src/api/events.ts), tabela `events` no D1
3. **Componente**: `EventCard` em [src/components/ui-custom/EventCard.tsx](src/components/ui-custom/EventCard.tsx)
4. **Modal de edição**: [src/components/ui-custom/EventModal.tsx](src/components/ui-custom/EventModal.tsx)
5. **Seção**: `EventsSection` em [src/components/sections/EventsSection.tsx](src/components/sections/EventsSection.tsx)
6. **Integração**: página inicial [src/routes/index.tsx](src/routes/index.tsx) (loader `listEvents()`)

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

## 📝 Editar, adicionar ou remover eventos

Tudo isso agora é feito pela UI, logada como admin:

1. Acesse `/` (página inicial) logada como admin.
2. Na seção "Eventos e Participações", use o botão "Adicionar Evento" para criar um novo, ou o ícone de lápis no canto de cada card para editar.
3. No modal, preencha: título, descrição, data (texto livre, ex: "Maio 2026"), local, tipo (select), imagem (URL ou caminho em `/images/`), destaques (tags) e link (opcional).
4. Salve — a mudança já aparece na página. Para excluir, use "Deletar" dentro do modal de edição (com confirmação).

Deslogada, a seção fica somente leitura.

---

## 🖼️ Adicionar Imagens dos Eventos

### **Estrutura esperada:**
```
public/
└── images/
    ├── profile.jpeg            (sua foto)
    ├── event-microsoft.jpg
    ├── event-google-cloud.jpg
    ├── event-amazon.jpg
    └── event-spiw.jpg
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

Depois, no modal de edição do evento, informe o caminho no campo "Imagem" (ex: `/images/event-seu-evento.jpg`). Também é possível usar uma URL externa completa.

**Recomendações:**
- ✅ Formato: JPG ou PNG
- ✅ Tamanho: 800x450px (16:9) ou redimensiona automaticamente
- ✅ Compressão: ~100-200KB cada
- ✅ Qualidade: Boa resolução (fotos reais de eventos)

---

## 🎯 Propriedades Explicadas

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | ✅ | Gerado automaticamente ao criar pela UI |
| `title` | string | ✅ | Nome do evento |
| `description` | string | ❌ | Descrição breve (~100 caracteres) |
| `date` | string | ✅ | Data do evento (ex: "Maio 2026") |
| `location` | string | ✅ | Local (ex: "São Paulo, SP" ou "Online") |
| `type` | string | ✅ | Tipo: Conferência \| Workshop \| Hackathon \| Meetup \| Curso \| Palestra \| Summit |
| `image` | string | ❌ | Caminho da imagem em `/images/` ou URL externa |
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
type: "Summit"       // Summits
```

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
# Logue como admin para ver os botões de edição
```

---

**Persistência**: os eventos ficam no banco D1 local (`npm run db:migrate:local`) e, quando aprovado, no remoto (`npm run db:migrate:remote`).
