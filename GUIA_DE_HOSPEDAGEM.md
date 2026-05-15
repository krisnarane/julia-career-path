# 🚀 Guia de Hospedagem - Julia Career Path

## 📊 Comparativo Rápido de Opções

| Plataforma | Tipo | Grátis? | Limite | Bom Para |
|---|---|---|---|---|
| **Cloudflare Pages** ⭐ | Static | Sim | Ilimitado | Melhor opção atual |
| **Vercel** | Full-stack | Sim | 100GB/mês | Deploy rápido |
| **Netlify** | Static | Sim | 100GB/mês | Fácil de usar |
| **GitHub Pages** | Static | Sim | 1GB | Projetos simples |
| **Azure Static Web Apps** | Static | Sim | 100GB/mês | Integração com Azure |
| **Firebase Hosting** | Static | Sim | 10GB/mês | Rápido globalmente |
| **Railway** | Full-stack | Quasi | $5/mês | Servidores simples |
| **Render** | Full-stack | Sim (sleep) | Limitado | Deploy automático |

---

## ✨ OPÇÃO 1: CLOUDFLARE PAGES (RECOMENDADO) ⭐

**Por que?** Seu projeto já está configurado com Wrangler. É grátis e rápido.

### Passo 1: Criar conta Cloudflare
1. Acesse https://dash.cloudflare.com
2. Clique em "Sign up"
3. Crie conta com email

### Passo 2: Conectar seu GitHub
1. No dashboard Cloudflare, vá a **Workers & Pages**
2. Clique em **Pages**
3. Clique em **Connect to Git**
4. Autorize Cloudflare a acessar seu GitHub
5. Selecione o repositório `julia-career-path`

### Passo 3: Configurar build
```
Build command: npm run build
Build output directory: dist/
Root directory: /
```

### Passo 4: Deploy automático
Pronto! Cada push para `main` faz deploy automático.

**URL**: `seu-projeto.pages.dev`

**Grátis inclui:**
- Unlimited bandwidth
- Unlimited requests
- Suporte a variáveis de ambiente
- Deploy automático via Git
- SSL grátis

---

## 🔥 OPÇÃO 2: VERCEL (ALTERNATIVA)

**Bom para:** Deploy super rápido, edge functions, preview automático de PRs.

### Passo 1: Criar conta
Acesse https://vercel.com e clique "Sign up with GitHub"

### Passo 2: Importar projeto
1. Clique "Add New..."
2. Selecione "Project"
3. Escolha `julia-career-path`
4. Configure framework como "Other"

### Passo 3: Build settings
```
Build Command: npm run build
Output Directory: dist
```

### Passo 4: Deploy
Pronto! Vercel detecta e faz deploy automático.

**URL**: `seu-projeto.vercel.app`

**Grátis inclui:**
- 100GB/mês de bandwidth
- Deployments ilimitados
- Preview automático
- CI/CD integrado
- SSL grátis

---

## 🎨 OPÇÃO 3: NETLIFY (ALTERNATIVA)

**Bom para:** Interface amigável, bom para iniciantes.

### Passo 1: Conectar conta
Acesse https://netlify.com e clique "Sign up with GitHub"

### Passo 2: Novo site
1. Clique "Add new site"
2. Escolha "Import an existing project"
3. Selecione GitHub e autorize
4. Escolha repositório

### Passo 3: Build
```
Build command: npm run build
Publish directory: dist
```

### Passo 4: Deploy
Netlify faz deploy automático a cada push.

**URL**: `seu-projeto.netlify.app`

**Bênfice Netlify:**
- Forms grátis
- Analytics básico
- Functions grátis
- Redirects ilimitados

---

## ☁️ OPÇÃO 4: AZURE STATIC WEB APPS (Azure - Barato)

**Por que?** Você já está estudando Azure! Integra com GitHub.

### Passo 1: Login Azure
Acesse https://portal.azure.com

### Passo 2: Criar Static Web App
1. Busque "Static Web Apps"
2. Clique "Create"
3. Preencha:
   - **Resource group**: criar novo (ex: `julia-pdi`)
   - **Name**: `julia-career-path`
   - **Region**: `East US` ou mais próximo
   - **Pricing plan**: `Free` ⭐

### Passo 3: Conectar GitHub
1. Selecione sua org/account GitHub
2. Selecione repositório
3. Branch: `main`
4. Build presets: `Custom`

### Passo 4: Configurar build
```
App location: /
Api location: api
Output location: dist
```

### Passo 5: Deploy
Azure cria workflow no `.github/workflows/` e faz deploy automático.

**URL**: `https://seu-projeto.azurestaticapps.net`

**Grátis inclui:**
- 100GB/mês bandwidth
- SSL automático
- Custom domains
- Staging environments
- GitHub integration

**Custo**: Praticamente grátis (só paga se ultrapassar limites).

---

## 🚀 OPÇÃO 5: GITHUB PAGES (Mais Simples)

**Bom para:** Projetos estáticos simples, sem backend.

⚠️ **Atenção**: Seu projeto tem SSR (servidor), então isso é limitado.

Se quiser apenas estático:

### Passo 1: Habilitar GitHub Pages
1. Vá ao repositório
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `main` / folder `docs`

### Passo 2: Build estático
```bash
npm run build
# Copiar dist/ para docs/
cp -r dist docs
```

### Passo 3: Push
```bash
git add .
git commit -m "Deploy"
git push origin main
```

**URL**: `seu-usuario.github.io/julia-career-path`

**Grátis 100%**

---

## 💰 OPÇÃO 6: RAILWAY (Barato com Créditos)

**Bom para:** Full-stack com servidor, desenvolvimento rápido.

### Passo 1: Criar conta
Acesse https://railway.app

### Passo 2: Novo projeto
1. Clique "Create New Project"
2. Selecione "Deploy from GitHub repo"
3. Autorize e escolha repositório

### Passo 3: Configurar
Railway detecta automaticamente a config (via `package.json`)

### Passo 4: Deploy
Pronto! Faz deploy automático.

**URL**: `seu-projeto-production.up.railway.app`

**Grátis:**
- $5 crédito/mês grátis
- Ótimo para experimentar
- Deploy automático
- Variáveis de ambiente

---

## 📋 MINHA RECOMENDAÇÃO PARA VOCÊ

### Melhor opção: **CLOUDFLARE PAGES** (Seu setup atual)

**Por quê?**
1. ✅ Já está configurado com Wrangler
2. ✅ Grátis e ilimitado
3. ✅ Suporta SSR (seu projeto tem servidor)
4. ✅ Deploy automático via Git
5. ✅ Edge functions para lógica customizada
6. ✅ Performance excelente globalmente

### Segunda melhor: **AZURE STATIC WEB APPS**

**Por quê?**
1. ✅ Você está estudando Azure
2. ✅ Ótimo prática para seu roadmap
3. ✅ Grátis com limites generosos
4. ✅ Staging environments automáticos
5. ✅ Integração GitHub perfeita

### Backup: **VERCEL**

Se Cloudflare tiver problemas, Vercel é super confiável.

---

## 🔧 PASSO A PASSO: DEPLOY NO CLOUDFLARE PAGES

### 1. Fazer push para GitHub

```bash
git add .
git commit -m "Deploy inicial no Cloudflare Pages"
git push origin main
```

### 2. Ir para Cloudflare Dashboard
https://dash.cloudflare.com/

### 3. Ir a Workers & Pages
Menu esquerdo → **Workers & Pages**

### 4. Criar novo projeto
**Pages** → **Connect to Git**

### 5. Autorizar GitHub
- Clique "Connect GitHub"
- Autorize Cloudflare
- Selecione `julia-career-path`

### 6. Configurar build
```
Framework preset: None
Build command: npm run build
Build output directory: dist
Root directory: /
```

### 7. Variáveis de ambiente (se houver)
Se tem `.env`, adicione as variáveis:
- Vá a **Settings**
- **Environment variables**
- Adicione cada uma

### 8. Deploy
Clique **Save and Deploy**

Cloudflare faz build automático e coloca online em ~5 minutos.

**Sua URL**: `julia-career-path.pages.dev` (ou customizada)

---

## 📝 PRÓXIMAS VEZES (Deploy automático)

Depois que configurar, é assim:

```bash
# Fazer mudanças
nano src/data/profile.ts  # ou editor

# Commit e push
git add .
git commit -m "Atualizei profile"
git push origin main

# ✨ Cloudflare detecta e faz deploy automático!
```

Não precisa fazer nada. Cloudflare verá o push, rodará `npm run build` e publicará automaticamente.

---

## 💻 USAR DOMÍNIO CUSTOMIZADO

### No Cloudflare Pages:
1. **Settings** → **Custom domain**
2. Adicione seu domínio (ex: `julia.dev`)
3. Siga instruções para apontar DNS

### Custos:
- Domínio `.dev` = ~$15/ano (Google Domains)
- Domínio `.com` = ~$10/ano (Namecheap)
- **Hospedagem** = GRÁTIS no Cloudflare!

---

## ❓ DÚVIDAS COMUNS

### "O projeto é estático ou tem servidor?"
Seu projeto usa **TanStack Start**, que tem SSR (Server-Side Rendering). Precisa de hospedagem que suporte servidor. Cloudflare Workers é perfeito para isso.

### "Preciso fazer algo no código?"
**Não!** O projeto já está pronto para Cloudflare. Só fazer push e configurar no dashboard.

### "Quanto custa?"
- Cloudflare: **GRÁTIS** (ilimitado)
- Azure: **GRÁTIS** (100GB/mês, depois ~$0.20/GB)
- Vercel: **GRÁTIS** (100GB/mês, depois $0.50/GB)
- Domínio: ~$10-15/ano

### "Posso trocar depois?"
**Sim!** Todos os serviços aceitam deploy do mesmo código.

### "Meus dados ficam seguros?"
Sim! Todos têm SSL/HTTPS, backups e compliance.

---

## 🎓 APRENDIZADO EXTRA

Fazer deploy em diferentes plataformas é ótimo para seu **portfólio**:

- ✅ Cloudflare = experiência com edge computing
- ✅ Azure = experiência com cloud Microsoft (seu roadmap!)
- ✅ GitHub Actions = CI/CD (importante para job)
- ✅ Variáveis de ambiente = segurança em produção

---

**Resumo**: Configure Cloudflare Pages agora (5 min), e você tem site online grátis para sempre! 🚀
