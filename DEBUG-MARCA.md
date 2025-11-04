# 🐛 Debug de Detecção de Marca

## 🔧 O Que Foi Corrigido

### **Problema Identificado:**
A detecção de marca estava sendo executada **FORA dos componentes**, no momento do import do módulo. Isso causava:
1. Logo/favicon do RCont aparecendo no domínio Sistematizo
2. Possível aparição de aspas duplas (erro de código)
3. Detecção acontecendo no build time ao invés de runtime

### **Solução Aplicada:**
✅ Movemos `getBrandConfig()` para **DENTRO** de cada componente  
✅ Adicionamos sistema de cache para performance  
✅ Adicionamos console.log para debug  
✅ A detecção agora acontece no **runtime** (quando o site carrega)  

---

## 🧪 Como Verificar se Está Funcionando

### **1. Abrir Console do Navegador**

No site, pressione **F12** ou:
- **Chrome/Edge:** Ctrl+Shift+J (Windows) ou Cmd+Option+J (Mac)
- **Firefox:** Ctrl+Shift+K (Windows) ou Cmd+Option+K (Mac)
- **Safari:** Cmd+Option+C (Mac)

### **2. Procurar Logs de Debug**

No console, você deve ver algo como:

**Se estiver no domínio Sistematizo:**
```
🔍 Detecção de Marca: {
  VITE_BRAND: "sistematizo",
  hostname: "cnpjcnae.sistematizo.com.br",
  userAgent: "Mozilla/5.0..."
}
✅ Marca detectada por ENV: sistematizo
```

**Ou (se não houver variável de ambiente):**
```
🔍 Detecção de Marca: {
  VITE_BRAND: undefined,
  hostname: "cnpjcnae.sistematizo.com.br",
  userAgent: "Mozilla/5.0..."
}
✅ Marca detectada por DOMÍNIO: sistematizo
```

**Se estiver no domínio RCont:**
```
🔍 Detecção de Marca: {
  VITE_BRAND: "rcont",
  hostname: "cnpjcnae.rcont.org",
  userAgent: "Mozilla/5.0..."
}
✅ Marca detectada por ENV: rcont
```

---

## ✅ Checklist de Verificação

### **No Domínio Sistematizo:**
- [ ] Logo Sistematizo aparece no topo
- [ ] Favicon Sistematizo na aba do navegador
- [ ] Título da aba: "Sistematizo - Consulta CNPJ e CNAE Gratuita"
- [ ] Banner: "...fale com um contador da Sistematizo"
- [ ] Console mostra: "Marca detectada por ENV: sistematizo" ou "por DOMÍNIO: sistematizo"

### **No Domínio RCont:**
- [ ] Logo RCont aparece no topo
- [ ] Favicon RCont na aba do navegador
- [ ] Título da aba: "RCont - Consulta CNPJ e CNAE Gratuita"
- [ ] Banner: "...fale com um contador da RCont"
- [ ] Console mostra: "Marca detectada por ENV: rcont"

---

## 🔍 Diagnóstico de Problemas

### **Problema: Logo/Favicon Errado**

**Sintoma:** Logo do RCont aparece no Sistematizo (ou vice-versa)

**Verificar:**
1. Abrir console (F12)
2. Ver o log de detecção
3. Verificar se `hostname` está correto
4. Verificar se `VITE_BRAND` está correto

**Soluções:**

**A) Se `VITE_BRAND` está errado:**
```bash
# Fazer rebuild com o modo correto
cd client
npm run build:sistematizo  # Para Sistematizo
# ou
npm run build:rcont  # Para RCont
```

**B) Se o hostname não contém "sistematizo":**
- Verificar se o domínio está correto
- A detecção automática por domínio só funciona se o hostname contém "sistematizo"

**C) Se nem ENV nem domínio detectam:**
- Vai usar o padrão (RCont)
- Você precisa fazer deploy com `npm run build:sistematizo`

---

### **Problema: Aspas Duplas Aparecendo**

**Sintoma:** Texto com `"` ou aspas aparecendo na tela

**Causa:** Possível erro de compilação ou cache do navegador

**Solução:**
```bash
# 1. Limpar cache do navegador
Ctrl+Shift+Delete → Limpar cache

# 2. Hard refresh
Ctrl+Shift+R (ou Cmd+Shift+R no Mac)

# 3. Rebuild local
cd client
npm run build:sistematizo
```

---

### **Problema: Deploy Automático Detecta Marca Errada**

**Sintoma:** Netlify/Vercel faz deploy mas detecta marca errada

**Solução no Netlify/Vercel:**

1. **Build Command:** Usar o script correto
```bash
# Para Sistematizo
cd client && npm install && npm run build:sistematizo

# Para RCont
cd client && npm install && npm run build:rcont
```

2. **Environment Variables (Opcional):**
```
VITE_BRAND=sistematizo
# ou
VITE_BRAND=rcont
```

3. **Fazer Redeploy** após mudar as configurações

---

## 🚨 Casos de Emergência

### **Se nada funcionar:**

1. **Limpar tudo e rebuildar:**
```bash
cd client
rm -rf node_modules
rm -rf dist
npm install
npm run build:sistematizo
```

2. **Verificar se as imagens existem:**
```bash
ls -la client/public/
# Deve mostrar:
# logo-rcont.png
# logo-sistematizo.png
# rcont-icon.png
# sistematizo-icon.png
```

3. **Testar localmente ANTES de fazer deploy:**
```bash
cd client
npm run dev:sistematizo
# Abrir http://localhost:5173
# Verificar se aparece Sistematizo
```

---

## 📊 Logs de Debug

Os logs aparecem no console do navegador para ajudar a diagnosticar:

```javascript
🔍 Detecção de Marca: {
  VITE_BRAND: "sistematizo",           // Variável de ambiente
  hostname: "cnpjcnae.sistematizo.com.br",  // Domínio atual
  userAgent: "Mozilla/5.0..."          // Navegador do usuário
}
✅ Marca detectada por ENV: sistematizo
```

**O que cada campo significa:**

- **VITE_BRAND:** Variável definida no build (prioridade 1)
- **hostname:** Domínio onde o site está rodando (prioridade 2)
- **userAgent:** Info do navegador (apenas para debug)

**Ordem de prioridade:**
1. `VITE_BRAND` (se definido no build)
2. Domínio contém "sistematizo"
3. Padrão: RCont

---

## 🎯 Teste Rápido

Para testar se está tudo ok:

```bash
# Terminal 1 - RCont
cd client
npm run dev:rcont
# Abrir http://localhost:5173
# Ver console: deve mostrar "rcont"

# Terminal 2 - Sistematizo
cd client
npm run dev:sistematizo
# Abrir http://localhost:5173
# Ver console: deve mostrar "sistematizo"
```

---

## 📞 Suporte

Se o problema persistir:

1. Tirar screenshot do console (F12)
2. Copiar os logs que aparecem
3. Informar qual domínio está com problema
4. Enviar as informações

---

**✅ Correção aplicada e enviada para GitHub!**
- Commit: `49aba24`
- Repos: RCont e Sistematizo atualizados

