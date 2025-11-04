# 🚨 SOLUÇÃO URGENTE - Sistematizo Mostrando Logo RCont

## ⚠️ PROBLEMA CONFIRMADO

O domínio `cnpjcnae.sistematizo.com.br` está mostrando:
- ❌ Logo RCont
- ❌ Favicon RCont
- ❌ Marca RCont

Quando deveria mostrar Sistematizo.

---

## 🔍 DIAGNÓSTICO RÁPIDO

### **Passo 1: Verificar Console do Navegador**

1. Abrir `cnpjcnae.sistematizo.com.br`
2. Pressionar **F12**
3. Ir na aba **Console**
4. Procurar a mensagem:

```
🔍 Detecção de Marca: { ... }
```

**Se aparecer:**
```
✅ Marca detectada por PADRÃO: rcont
```

**Significa:** O build está **ERRADO**! Não está usando `build:sistematizo`.

---

## ✅ SOLUÇÃO IMEDIATA

### **Opção A: Netlify (Recomendado)**

1. **Ir no Painel Netlify:**
   - https://app.netlify.com
   - Selecionar o site Sistematizo

2. **Site settings → Build & deploy → Build settings**

3. **Alterar Build command para:**
```bash
cd client && npm install && npm run build:sistematizo
```

4. **Deploy settings:**
   - Publish directory: `client/dist`
   - Branch: `main`

5. **Environment variables (adicionar):**
   - Key: `VITE_BRAND`
   - Value: `sistematizo`

6. **Trigger deploy:**
   - Deploys → Trigger deploy → Deploy site

---

### **Opção B: Vercel**

1. **Ir no Painel Vercel:**
   - https://vercel.com
   - Selecionar o projeto Sistematizo

2. **Settings → General:**

3. **Build & Development Settings:**
   - Build Command: `cd client && npm install && npm run build:sistematizo`
   - Output Directory: `client/dist`
   - Install Command: `npm install`

4. **Environment Variables:**
   - Name: `VITE_BRAND`
   - Value: `sistematizo`

5. **Fazer Redeploy:**
   - Deployments → ... → Redeploy

---

## 🔧 VERIFICAÇÃO PÓS-DEPLOY

Após fazer o redeploy, verificar:

1. **Abrir:** `cnpjcnae.sistematizo.com.br`
2. **Limpar cache:** Ctrl+Shift+R (ou Cmd+Shift+R no Mac)
3. **Verificar:**
   - ✅ Logo Sistematizo no topo
   - ✅ Favicon Sistematizo na aba
   - ✅ Título: "Sistematizo - Consulta CNPJ..."

4. **Console (F12) deve mostrar:**
```
✅ Marca detectada por ENV: sistematizo
```

---

## 📋 CHECKLIST COMPLETO

### **Netlify/Vercel:**
- [ ] Build Command: `cd client && npm install && npm run build:sistematizo`
- [ ] Publish Directory: `client/dist`
- [ ] Environment Variable: `VITE_BRAND=sistematizo`
- [ ] Branch: `main`
- [ ] Repositório: `sistematizo-cnpj`

### **Após Deploy:**
- [ ] Limpar cache do navegador (Ctrl+Shift+R)
- [ ] Logo Sistematizo aparece
- [ ] Favicon Sistematizo aparece
- [ ] Console mostra "sistematizo"

---

## 🚨 SE NÃO FUNCIONAR

### **Build Manual Local para Testar:**

```powershell
# Na pasta do projeto
cd C:\Users\fbolz\Documents\Code\rCnpj\client

# Instalar dependências
npm install

# Build Sistematizo
npm run build:sistematizo

# Verificar se gerou correto
npm run preview
# Abrir http://localhost:4173
# DEVE mostrar Sistematizo
```

Se funcionar localmente mas não no deploy:
- ✅ Código está correto
- ❌ Configuração do Netlify/Vercel está errada

---

## 💡 ATALHO RÁPIDO

Se tiver acesso ao painel Netlify/Vercel:

**Netlify:**
1. Site settings
2. Build & deploy
3. Environment variables
4. Add variable: `VITE_BRAND` = `sistematizo`
5. Trigger deploy

**Vercel:**
1. Settings
2. Environment Variables
3. Add: `VITE_BRAND` = `sistematizo`
4. Redeploy

---

## 📞 SUPORTE

Se precisar de ajuda:

1. **Tirar screenshot do painel Netlify/Vercel:**
   - Página de "Build settings"
   - Página de "Environment variables"

2. **Tirar screenshot do console (F12):**
   - Logs de detecção de marca

3. **Informar:**
   - Qual plataforma (Netlify ou Vercel)?
   - Qual o build command atual?
   - Há variável VITE_BRAND configurada?

---

## ⚡ SOLUÇÃO RÁPIDA (1 MINUTO)

```bash
# 1. Painel Netlify/Vercel
# 2. Environment Variables
# 3. Adicionar:
VITE_BRAND = sistematizo

# 4. Trigger Deploy
# 5. Aguardar 2-3 minutos
# 6. Ctrl+Shift+R no navegador
```

---

**✅ Isso vai resolver o problema!**

