# 🚀 Setup Rápido para Sistematizo

## Passo 1: Criar logo do Sistematizo

Coloque a logo do Sistematizo em:
```
client/public/logo-sistematizo.png
```

---

## Passo 2: Criar repositório no GitHub

1. Vá em: https://github.com/new
2. Nome: `sistematizo-cnpj` (ou outro nome)
3. Deixe **vazio** (sem README)
4. Criar repositório

---

## Passo 3: Adicionar remote do Sistematizo

```bash
cd C:\Users\fbolz\Documents\Code\rCnpj

# Adicionar remote
git remote add sistematizo https://github.com/SeuUsuario/sistematizo-cnpj.git

# Verificar
git remote -v
```

Deve mostrar:
```
origin       https://github.com/FernandoBolzan/rCnpj.git (fetch)
origin       https://github.com/FernandoBolzan/rCnpj.git (push)
sistematizo  https://github.com/SeuUsuario/sistematizo-cnpj.git (fetch)
sistematizo  https://github.com/SeuUsuario/sistematizo-cnpj.git (push)
```

---

## Passo 4: Fazer primeiro push para Sistematizo

```bash
# Push da branch main para o repositório Sistematizo
git push sistematizo main
```

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

