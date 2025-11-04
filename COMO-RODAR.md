# 🚀 Como Rodar o Projeto

## ⚠️ IMPORTANTE: Você Precisa Estar na Pasta `client/`

Todos os comandos devem ser executados **DENTRO** da pasta `client/`:

```powershell
cd client
```

---

## 🧪 Desenvolvimento (Local)

### **RCont (Azul):**
```powershell
cd client
npm run dev:rcont
```
Abrir: http://localhost:5173

### **Sistematizo (Roxo):**
```powershell
cd client
npm run dev:sistematizo
```
Abrir: http://localhost:5173

### **Padrão (RCont):**
```powershell
cd client
npm run dev
```

---

## 📦 Build para Produção

### **RCont:**
```powershell
cd client
npm run build:rcont
```
→ Gera pasta `dist/` com build do RCont

### **Sistematizo:**
```powershell
cd client
npm run build:sistematizo
```
→ Gera pasta `dist/` com build do Sistematizo

---

## ❌ Erros Comuns

### **Erro: "Missing script: build:rcont"**

**Causa:** Você está na pasta errada (raiz do projeto)

**Solução:**
```powershell
# Certifique-se de estar na pasta client/
cd client

# Agora rode o comando
npm run dev:rcont
```

### **Erro: "Cannot find module"**

**Causa:** Dependências não instaladas

**Solução:**
```powershell
cd client
npm install
npm run dev:rcont
```

---

## 🔍 Verificar Scripts Disponíveis

```powershell
cd client
npm run
```

Deve mostrar:
```
Scripts available in rcnpj-client via `npm run-script`:
  dev
    vite
  dev:rcont
    vite --mode rcont
  dev:sistematizo
    vite --mode sistematizo
  build
    tsc && vite build
  build:rcont
    tsc && vite build --mode rcont
  build:sistematizo
    tsc && vite build --mode sistematizo
  ...
```

---

## 📂 Estrutura do Projeto

```
rCnpj/
├── client/              ← VOCÊ PRECISA ESTAR AQUI!
│   ├── package.json     ← Scripts estão aqui
│   ├── vite.config.ts   ← Config do Vite
│   ├── src/
│   │   ├── config/
│   │   │   └── brand.ts ← Config de marcas
│   │   └── ...
│   └── public/
│       ├── logo-rcont.png
│       ├── logo-sistematizo.png
│       ├── rcont-icon.png
│       └── sistematizo-icon.png
├── server/
└── package.json         ← Scripts do servidor (NÃO USE ESTE!)
```

---

## ✅ Passo a Passo Completo

### **1. Abrir Terminal na Pasta do Projeto**
```powershell
cd C:\Users\fbolz\Documents\Code\rCnpj
```

### **2. Entrar na Pasta Client**
```powershell
cd client
```

### **3. Instalar Dependências (se necessário)**
```powershell
npm install
```

### **4. Rodar o Projeto**

**RCont:**
```powershell
npm run dev:rcont
```

**Sistematizo:**
```powershell
npm run dev:sistematizo
```

### **5. Abrir no Navegador**
```
http://localhost:5173
```

---

## 🎯 O Que Cada Modo Faz

### **`--mode rcont`:**
- Define `VITE_BRAND=rcont`
- Logo: logo-rcont.png
- Favicon: rcont-icon.png
- Cor: Azul (#3b82f6)
- Banner: "...da RCont"

### **`--mode sistematizo`:**
- Define `VITE_BRAND=sistematizo`
- Logo: logo-sistematizo.png
- Favicon: sistematizo-icon.png
- Cor: Roxo (#8b5cf6)
- Banner: "...da Sistematizo"

---

## 🚀 Deploy (Netlify/Vercel)

### **Build Command:**
```bash
cd client && npm install && npm run build:rcont
# ou
cd client && npm install && npm run build:sistematizo
```

### **Publish Directory:**
```
client/dist
```

### **Environment Variables (Opcional):**
```
VITE_BRAND=rcont
# ou
VITE_BRAND=sistematizo
```

---

## 💡 Dicas

1. **Sempre** rode comandos `npm` de dentro da pasta `client/`
2. Se mudar de marca, **recarregue** a página (Ctrl+R ou F5)
3. Para limpar cache: Ctrl+Shift+R (hard reload)
4. Para ver console de erros: F12 → Console

---

**Tudo certo agora!** 🎉

