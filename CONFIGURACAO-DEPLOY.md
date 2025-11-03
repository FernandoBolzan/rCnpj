# 🚀 Como Configurar Deploy para RCont e Sistematizo

## ✅ Código Subiu para Ambos Repositórios!

- ✅ **RCont:** https://github.com/FernandoBolzan/rCnpj
- ✅ **Sistematizo:** https://github.com/FernandoBolzan/sistematizo-cnpj

**MESMO CÓDIGO** nos dois repositórios! 🎉

---

## 🤖 Como o Sistema Detecta a Marca Automaticamente?

O sistema usa **3 formas** de detectar qual marca mostrar (na ordem):

### 1️⃣ **Variável de Ambiente** (RECOMENDADO)
Se você configurar `VITE_BRAND` no build, o sistema usa essa marca.

### 2️⃣ **Domínio Automático**
Se o domínio contém "sistematizo" (ex: `sistematizo.com.br`), mostra Sistematizo.

### 3️⃣ **Padrão: RCont**
Se não encontrar nada, mostra RCont.

---

## 🌐 Configuração no Netlify/Vercel

### **Deploy RCont:**

1. Conectar repositório: `https://github.com/FernandoBolzan/rCnpj`
2. **Build Command:**
```bash
cd client && npm install && npm run build:rcont
```
3. **Publish Directory:**
```bash
client/dist
```
4. **Environment Variables (OPCIONAL):**
```
VITE_BRAND=rcont
```

---

### **Deploy Sistematizo:**

1. Conectar repositório: `https://github.com/FernandoBolzan/sistematizo-cnpj`
2. **Build Command:**
```bash
cd client && npm install && npm run build:sistematizo
```
3. **Publish Directory:**
```bash
client/dist
```
4. **Environment Variables (OPCIONAL):**
```
VITE_BRAND=sistematizo
```

---

## 🎯 Opções de Deploy

### **Opção 1: Usar Scripts de Build (Recomendado)**

Já temos scripts configurados no `package.json`:

- `npm run build:rcont` → Seta `VITE_BRAND=rcont`
- `npm run build:sistematizo` → Seta `VITE_BRAND=sistematizo`

✅ **Vantagem:** Não precisa configurar variável de ambiente no servidor!

---

### **Opção 2: Usar Domínio (Automático)**

Se você fizer deploy sem variável de ambiente, o sistema detecta pelo domínio:

- `rcont.com.br` → Mostra **RCont** (padrão)
- `sistematizo.com.br` → Mostra **Sistematizo** (detecta automaticamente!)

✅ **Vantagem:** Zero configuração! O sistema detecta sozinho!

---

### **Opção 3: Variável de Ambiente Manual**

Configure no painel do Netlify/Vercel:

**RCont:**
```
VITE_BRAND=rcont
```

**Sistematizo:**
```
VITE_BRAND=sistematizo
```

---

## 📋 Resumo de Comandos

| Marca | Build Command | Variável (opcional) |
|-------|---------------|---------------------|
| **RCont** | `cd client && npm install && npm run build:rcont` | `VITE_BRAND=rcont` |
| **Sistematizo** | `cd client && npm install && npm run build:sistematizo` | `VITE_BRAND=sistematizo` |

**Publish Directory:** `client/dist` (para ambos)

---

## 🧪 Testar Localmente

### **RCont:**
```bash
cd client
npm run dev:rcont
```
Abre: http://localhost:5173

### **Sistematizo:**
```bash
cd client
npm run dev:sistematizo
```
Abre: http://localhost:5173

---

## ✨ O Que Muda Entre as Marcas?

| Item | RCont | Sistematizo |
|------|-------|-------------|
| **Logo** | logo-rcont.png | logo-sistematizo.png |
| **Banner** | "...da RCont" | "...da Sistematizo" |
| **Link** | rcont.org | sistematizo.com.br |
| **Cor** | Azul (#3b82f6) | Roxo (#8b5cf6) |

---

## 🎉 Resumo

### ✅ **Não precisa configurar nada!**

Se você:
- Usar os scripts `npm run build:rcont` ou `npm run build:sistematizo` → **Funciona!**
- Usar domínio `sistematizo.com.br` → **Detecta automaticamente!**
- Usar domínio `rcont.com.br` → **Mostra RCont (padrão)!**

### ✅ **Mesmo código, duas marcas!**

Um único repositório de código, mas você pode subir para dois GitHub diferentes e fazer dois deploys diferentes!

---

## 🔄 Fluxo de Trabalho

1. Fazer alterações no código
2. Commit:
```bash
git add .
git commit -m "feat: Nova funcionalidade"
```
3. Subir para ambos:
```bash
git push origin main        # RCont
git push sistematizo main   # Sistematizo
```
4. Deploy automático nos dois! 🚀

---

**Simples assim!** 🎉

