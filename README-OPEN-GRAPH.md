# 🎨 Como Criar as Imagens de Compartilhamento

## 🚀 Método Rápido (5 minutos)

### **1. Abrir o Gerador**
```bash
# Abra o arquivo no navegador:
criar-imagens-og.html
```

### **2. Capturar as Imagens**

**Windows:**
1. Pressione `Win + Shift + S`
2. Selecione "Retângulo"
3. Capture exatamente o card azul (RCont) ou roxo (Sistematizo)
4. Abra o Paint (Ctrl+V)
5. Salvar como PNG: `og-image-rcont.png` ou `og-image-sistematizo.png`

**Mac:**
1. Pressione `Cmd + Shift + 4`
2. Arraste para selecionar o card
3. A imagem será salva automaticamente na área de trabalho
4. Renomeie para: `og-image-rcont.png` ou `og-image-sistematizo.png`

### **3. Colocar as Imagens**
```bash
# Copiar para o projeto:
client/public/og-image-rcont.png
client/public/og-image-sistematizo.png
```

### **4. Testar**
```bash
cd client
npm run dev:rcont
```

Abrir navegador: http://localhost:5173/og-image-rcont.png

---

## 🎨 Método Profissional (Canva)

### **1. Criar no Canva**
1. Acessar: https://www.canva.com
2. Criar design personalizado: **1200 x 630 px**
3. Usar cores:
   - **RCont:** #3b82f6 (azul)
   - **Sistematizo:** #8b5cf6 (roxo)

### **2. Elementos Recomendados**
- Logo da marca (topo)
- Título grande: "RCont" ou "Sistematizo"
- Subtítulo: "Consulta CNPJ e CNAE"
- 4 ícones com checkmark:
  - ✓ Consultas Ilimitadas
  - ✓ Informações Completas
  - ✓ Análise Simples Nacional
  - ✓ 100% Gratuito
- URL: rcont.org ou sistematizo.com.br

### **3. Exportar**
- Formato: PNG
- Qualidade: Alta
- Tamanho: 1200x630px

---

## 📱 O Que Vai Aparecer

Quando compartilhar o link no **WhatsApp, Facebook, Twitter, LinkedIn:**

```
┌─────────────────────────────────────┐
│                                     │
│    [Imagem da marca - 1200x630]    │
│                                     │
├─────────────────────────────────────┤
│  RCont - Consulta CNPJ e CNAE      │
│  Gratuita                           │
│                                     │
│  Consulte CNPJ e CNAE              │
│  gratuitamente. Informações         │
│  completas de empresas...           │
│                                     │
│  📍 rcont.org                       │
└─────────────────────────────────────┘
```

---

## ✅ Checklist Final

Antes de fazer commit:

- [ ] `og-image-rcont.png` criada (1200x630px)
- [ ] `og-image-sistematizo.png` criada (1200x630px)
- [ ] Imagens em `client/public/`
- [ ] Testado localmente
- [ ] Imagens com menos de 1 MB cada
- [ ] Logo visível e legível
- [ ] Texto legível

---

## 🧪 Como Testar o Compartilhamento

### **Facebook Debugger:**
1. https://developers.facebook.com/tools/debug/
2. Colar URL do site
3. Clicar em "Fetch new information"
4. Ver preview

### **Twitter Card Validator:**
1. https://cards-dev.twitter.com/validator
2. Colar URL do site
3. Ver preview

### **LinkedIn Post Inspector:**
1. https://www.linkedin.com/post-inspector/
2. Colar URL do site
3. Ver preview

---

## 🔧 Troubleshooting

### **Imagem não aparece:**
1. Verificar se o arquivo está em `client/public/`
2. Verificar se o nome está correto: `og-image-rcont.png` ou `og-image-sistematizo.png`
3. Limpar cache do navegador
4. Fazer rebuild: `npm run build:rcont`

### **Imagem cortada no WhatsApp:**
- Deixar margem de 40px nas bordas
- Não colocar texto importante nas extremidades

### **Imagem não atualiza:**
- Usar Facebook Debugger para limpar cache
- Pode levar até 24h para atualizar em alguns apps

---

## 📚 Documentação Completa

Ver: **IMAGENS-OPEN-GRAPH.md**

---

**Dúvidas? Consulte a documentação completa!** 🚀

