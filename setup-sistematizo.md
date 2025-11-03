# 🚀 Setup Rápido para Sistematizo

## ✅ Passo 1: Logo (JÁ FEITO!)

As logos já estão configuradas:
- ✅ `client/public/logo-rcont.png`
- ✅ `client/public/logo-sistematizo.png`

---

## Passo 2: Criar repositório no GitHub para Sistematizo

1. Vá em: https://github.com/new
2. Nome sugerido: `sistematizo-cnpj`
3. Deixe **vazio** (sem README, sem .gitignore, sem license)
4. Clique em **"Create repository"**
5. **Copie a URL** do repositório (ex: `https://github.com/SeuUsuario/sistematizo-cnpj.git`)

---

## Passo 3: Adicionar Remote do Sistematizo

Abra o PowerShell/Terminal na pasta do projeto e execute:

```powershell
# Adicionar remote do Sistematizo
git remote add sistematizo https://github.com/SeuUsuario/sistematizo-cnpj.git

# Verificar remotes configurados
git remote -v
```

**Deve mostrar:**
```
origin       https://github.com/FernandoBolzan/rCnpj.git (fetch)
origin       https://github.com/FernandoBolzan/rCnpj.git (push)
sistematizo  https://github.com/SeuUsuario/sistematizo-cnpj.git (fetch)
sistematizo  https://github.com/SeuUsuario/sistematizo-cnpj.git (push)
```

---

## Passo 4: Fazer Primeiro Push para Sistematizo

```powershell
# Push de todo o código para o repositório Sistematizo
git push sistematizo main
```

✅ **Pronto! Agora você tem dois repositórios!**

---

## Passo 5: Deploy

### Para RCont (Netlify/Vercel):
- **URL:** cnpjcnae.rcont.org
- **Build command:** `cd client && npm run build:rcont`
- **Variável de ambiente:** `VITE_BRAND=rcont`

### Para Sistematizo (Netlify/Vercel):
- **URL:** cnpjcnae.sistematizo.com.br
- **Build command:** `cd client && npm run build:sistematizo`
- **Variável de ambiente:** `VITE_BRAND=sistematizo`

---

## ✅ Pronto!

Agora você tem:
- ✅ Mesmo código para ambas as marcas
- ✅ Logo diferente para cada uma
- ✅ Textos diferentes no banner
- ✅ URLs diferentes
- ✅ Deploy independente
- ✅ Dois repositórios GitHub

---

## 🔄 Fluxo Diário

### Atualizar ambas as marcas:
```bash
# Fazer mudanças no código
git add .
git commit -m "feat: Nova funcionalidade"

# Subir para AMBOS os repositórios
git push origin main
git push sistematizo main
```

### Atualizar apenas RCont:
```bash
git push origin main
```

### Atualizar apenas Sistematizo:
```bash
git push sistematizo main
```

---

## 🎨 Testar Localmente

### Testar como RCont:
```bash
cd client
npm run dev:rcont
```
Acesse: http://localhost:5173

### Testar como Sistematizo:
```bash
cd client
npm run dev:sistematizo
```
Acesse: http://localhost:5173

A logo e textos mudam automaticamente! ✨

