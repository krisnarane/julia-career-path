# 📸 Guia: Adicionar Foto de Perfil ao Projeto

## 🎯 Locais onde a foto vai aparecer

1. **Navbar** (canto superior esquerdo)
2. **HeroSection** (card de perfil, lado direito)

---

## 📋 Passo 1: Preparar sua foto

Recomendações:
- ✅ Formato: PNG ou JPG
- ✅ Tamanho: 300x300px (quadrada)
- ✅ Compressão: ~50-100KB
- ✅ Fundo: claro ou transparente
- ✅ Enquadramento: cabeça e ombros (tipo LinkedIn)

**Onde comprimir**: 
- https://imagecompressor.com
- https://tinypng.com

---

## 🌐 Opção 1: USAR URL PÚBLICA (Mais Fácil)

Se você não quer mexer com arquivos, pode usar uma URL pública.

### Passo 1: Upload para CDN grátis

Escolha um destes:

**A) Imgur (mais simples)**
1. Acesse https://imgur.com
2. Clique em "New Post"
3. Selecione sua foto
4. Copie o link da imagem
5. Exemplo: `https://i.imgur.com/abc123.jpg`

**B) GitHub (integrado)**
1. Crie uma pasta `public/images/` no projeto
2. Faça upload no GitHub
3. URL será: `https://raw.githubusercontent.com/seu-usuario/julia-career-path/main/public/images/profile.jpg`

**C) ImgBB (também simples)**
1. Acesse https://imgbb.com
2. Faça upload
3. Copie o link direto

### Passo 2: Adicionar URL ao Profile

Abra [src/data/profile.ts](src/data/profile.ts) e adicione:

```typescript
export const profile: Profile = {
  name: "Julia Krisnarane",
  title: "Estagiária em Engenharia de Software",
  // ... outros campos ...
  
  // ← ADICIONE ESTA LINHA:
  profileImage: "https://i.imgur.com/seu-link-aqui.jpg",
  
  // ... resto dos campos ...
};
```

### Passo 3: Atualizar tipo TypeScript

Abra [src/types/index.ts](src/types/index.ts) e adicione no interface Profile:

```typescript
export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  company: string;
  area: string;
  startDate: string;
  endDate: string;
  github: string;
  linkedin: string;
  lastUpdate: string;
  bio: string;
  // ← ADICIONE ESTA LINHA:
  profileImage?: string;  // URL da foto de perfil
}
```

### Passo 4: Atualizar HeroSection

Abra [src/components/sections/HeroSection.tsx](src/components/sections/HeroSection.tsx) e substitua:

**ANTES:**
```tsx
<div className="flex items-center gap-3">
  <div className="h-12 w-12 rounded-2xl gradient-primary text-white flex items-center justify-center font-bold text-lg">
    {profile.name.charAt(0)}
  </div>
  <div>
    <p className="font-semibold">{profile.name}</p>
    <p className="text-xs text-muted-foreground">{profile.title}</p>
  </div>
</div>
```

**DEPOIS:**
```tsx
<div className="flex items-center gap-3">
  {profile.profileImage ? (
    <img 
      src={profile.profileImage} 
      alt={profile.name}
      className="h-12 w-12 rounded-2xl object-cover shadow-soft"
    />
  ) : (
    <div className="h-12 w-12 rounded-2xl gradient-primary text-white flex items-center justify-center font-bold text-lg">
      {profile.name.charAt(0)}
    </div>
  )}
  <div>
    <p className="font-semibold">{profile.name}</p>
    <p className="text-xs text-muted-foreground">{profile.title}</p>
  </div>
</div>
```

### Passo 5: Atualizar Navbar (opcional)

Se quiser foto grande no Navbar também, abra [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx) e substitua:

**ANTES:**
```tsx
<Link to="/" className="flex items-center gap-2 font-bold">
  <span className="h-8 w-8 rounded-xl gradient-primary flex items-center justify-center text-white shadow-soft">
    <Sparkles className="h-4 w-4" />
  </span>
  <span>PDI Julia</span>
</Link>
```

**DEPOIS:**
```tsx
<Link to="/" className="flex items-center gap-2 font-bold">
  {profile.profileImage ? (
    <img 
      src={profile.profileImage} 
      alt={profile.name}
      className="h-8 w-8 rounded-xl object-cover shadow-soft"
    />
  ) : (
    <span className="h-8 w-8 rounded-xl gradient-primary flex items-center justify-center text-white shadow-soft">
      <Sparkles className="h-4 w-4" />
    </span>
  )}
  <span>PDI Julia</span>
</Link>
```

### Pronto! ✨

Agora sua foto aparece:
- No Navbar (lado esquerdo)
- No Card de Perfil (lado direito)

Veja em tempo real com: `npm run dev`

---

## 🖼️ Opção 2: ARQUIVOS LOCAIS (Alternativa)

Se prefere guardar a foto junto com o projeto:

### Passo 1: Criar pasta de imagens

```
src/
├── assets/
│   └── images/
│       └── profile.jpg  ← Coloque sua foto aqui
```

### Passo 2: Importar no Profile

**Arquivo**: [src/data/profile.ts](src/data/profile.ts)

```typescript
// ← Adicione no topo:
import profileImage from "@/assets/images/profile.jpg";

export const profile: Profile = {
  name: "Julia Krisnarane",
  // ...
  
  // ← Adicione aqui:
  profileImage: profileImage,
  
  // ...
};
```

Resto é igual à Opção 1 (passos 3, 4, 5).

---

## 🎨 BONUS: Adicionar Foto Grande na Home

Quer uma foto grande ao lado das informações? Adicione em [src/components/sections/HeroSection.tsx](src/components/sections/HeroSection.tsx):

```tsx
<div className="lg:col-span-2 animate-fade-in">
  {profile.profileImage && (
    <div className="mb-6 rounded-3xl overflow-hidden shadow-soft">
      <img 
        src={profile.profileImage} 
        alt={profile.name}
        className="w-full h-auto object-cover"
      />
    </div>
  )}
  
  <GradientCard glow>
    {/* ... resto do código ... */}
  </GradientCard>
</div>
```

Isso adiciona sua foto em destaque antes do card de informações!

---

## 🔄 RESUMEN RÁPIDO (Só URL Pública)

1. **Upload foto**: Imgur ou ImgBB
2. **Copiar link**: `https://i.imgur.com/xxxx.jpg`
3. **Editar** [src/data/profile.ts](src/data/profile.ts): Adicionar `profileImage: "seu-link"`
4. **Editar** [src/types/index.ts](src/types/index.ts): Adicionar campo no interface
5. **Editar** [src/components/sections/HeroSection.tsx](src/components/sections/HeroSection.tsx): Substituir código do círculo "J"
6. **Testar**: `npm run dev`
7. **Commit**: `git add . && git commit -m "Adiciona foto de perfil"`
8. **Deploy**: `git push origin main`

---

## 🎯 Exemplo Completo Pronto para Copiar

Se preferir, aqui está o código final para HeroSection (substitua a seção do perfil):

```tsx
import { profile } from "@/data/profile";
import { GradientCard } from "@/components/ui-custom/GradientCard";
import { InternshipTimer } from "@/components/ui-custom/InternshipTimer";
import { Github, Linkedin, Building2, Briefcase, Calendar } from "lucide-react";

const fmt = (d: string) => new Date(d).toLocaleDateString("pt-BR", { month: "short", year: "numeric" });

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-10">
      <div className="absolute inset-0 -z-10 gradient-soft opacity-60 rounded-3xl blur-3xl" />
      <div className="grid lg:grid-cols-5 gap-8 items-stretch">
        <div className="lg:col-span-3 animate-fade-in">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary-deep mb-4 px-3 py-1 rounded-full bg-primary/15 border border-primary/30">
            ✨ Plano de Desenvolvimento Individual
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Olá, eu sou{" "}
            <span className="bg-clip-text text-transparent gradient-primary">{profile.name}</span>
          </h1>
          <p className="mt-3 text-lg md:text-xl font-medium text-foreground">{profile.title}</p>
          <p className="mt-2 text-muted-foreground">{profile.subtitle}</p>
          <p className="mt-6 max-w-xl text-foreground/80">{profile.bio}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={profile.github} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-primary text-white font-medium shadow-soft hover-scale">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border font-medium hover:border-primary hover-scale">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>

        <div className="lg:col-span-2 animate-fade-in">
          <GradientCard glow>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {profile.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt={profile.name}
                    className="h-12 w-12 rounded-2xl object-cover shadow-soft"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-2xl gradient-primary text-white flex items-center justify-center font-bold text-lg">
                    {profile.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{profile.name}</p>
                  <p className="text-xs text-muted-foreground">{profile.title}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2"><Building2 className="h-4 w-4 text-primary-deep" /> {profile.company}</p>
                <p className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary-deep" /> {profile.area}</p>
                <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary-deep" /> {fmt(profile.startDate)} — {fmt(profile.endDate)}</p>
              </div>
              <InternshipTimer start={profile.startDate} end={profile.endDate} />
              <p className="text-xs text-muted-foreground pt-1">Última atualização: {profile.lastUpdate}</p>
            </div>
          </GradientCard>
        </div>
      </div>
    </section>
  );
}
```

---

## ❓ DÚVIDAS

**P: A foto fica quadrada?**
R: Sim, com `rounded-2xl` em HeroSection e `rounded-xl` no Navbar. Mude para `rounded-full` se quiser circular.

**P: Posso usar fotos de diferentes tamanhos?**
R: Sim! Use `object-cover` para manter proporção sem distorcer.

**P: E se a URL ficar inválida?**
R: Volta a mostrar o círculo "J" automaticamente (está no `if/else`).

**P: Preciso de permissão para Imgur?**
R: Não! Imgur permite upload anônimo de imagens.

---

**Dica**: Teste com `npm run dev` antes de fazer deploy! 🚀
