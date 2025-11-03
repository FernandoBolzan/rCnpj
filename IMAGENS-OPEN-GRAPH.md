# 🎨 Imagens Open Graph (Compartilhamento)

## 📋 O Que São?

As imagens Open Graph aparecem quando você compartilha o link no:
- 📱 **WhatsApp**
- 📘 **Facebook**
- 🐦 **Twitter/X**
- 💬 **Telegram**
- 💼 **LinkedIn**

---

## 📐 Especificações das Imagens

### **Tamanho Recomendado:**
- **Dimensões:** 1200x630 pixels (formato landscape)
- **Formato:** PNG ou JPG
- **Tamanho máximo:** 8 MB (recomendado: < 1 MB)
- **Aspect ratio:** 1.91:1

### **Área Segura:**
- Evite colocar texto importante nas bordas
- Deixe margem de ~40px em todos os lados
- Alguns apps cortam as bordas da imagem

---

## 🎨 Onde Colocar as Imagens

Criar e colocar em `client/public/`:

```
client/public/
├── og-image-rcont.png          # Imagem RCont (1200x630px)
└── og-image-sistematizo.png    # Imagem Sistematizo (1200x630px)
```

---

## ✨ Sugestão de Design

### **RCont (Azul #3b82f6):**

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│    [Logo RCont]                                     │
│                                                     │
│         RCont                                       │
│    Consulta CNPJ e CNAE                             │
│                                                     │
│    ✓ Consultas Ilimitadas                          │
│    ✓ Informações Completas                         │
│    ✓ Análise Simples Nacional                      │
│    ✓ 100% Gratuito                                 │
│                                                     │
│                              rcont.org              │
└─────────────────────────────────────────────────────┘
```

**Elementos:**
- Fundo: Gradiente azul (#3b82f6 → #1e40af)
- Logo: Centralizado no topo
- Título: "RCont" (fonte grande, bold)
- Subtítulo: "Consulta CNPJ e CNAE"
- 4 Benefícios com checkmarks
- URL no canto inferior direito

---

### **Sistematizo (Roxo #8b5cf6):**

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│    [Logo Sistematizo]                               │
│                                                     │
│      Sistematizo                                    │
│    Consulta CNPJ e CNAE                             │
│                                                     │
│    ✓ Consultas Ilimitadas                          │
│    ✓ Informações Completas                         │
│    ✓ Análise Simples Nacional                      │
│    ✓ 100% Gratuito                                 │
│                                                     │
│                         sistematizo.com.br          │
└─────────────────────────────────────────────────────┘
```

**Elementos:**
- Fundo: Gradiente roxo (#8b5cf6 → #6d28d9)
- Logo: Centralizado no topo
- Título: "Sistematizo" (fonte grande, bold)
- Subtítulo: "Consulta CNPJ e CNAE"
- 4 Benefícios com checkmarks
- URL no canto inferior direito

---

## 🛠️ Como Criar as Imagens

### **Opção 1: Canva (Recomendado para Não-Designers)**

1. Acessar: https://www.canva.com
2. Criar design personalizado: **1200 x 630 px**
3. Usar template "Facebook Post" ou "Twitter Post"
4. Adicionar:
   - Fundo com gradiente da cor da marca
   - Logo no topo
   - Título e subtítulo
   - 4 ícones de check com textos
   - URL da marca
5. Exportar como PNG

### **Opção 2: Figma (Para Designers)**

1. Criar frame: 1200x630px
2. Adicionar elementos visuais
3. Exportar como PNG (2x para melhor qualidade)

### **Opção 3: Photoshop/GIMP**

1. Novo documento: 1200x630px, 72 DPI
2. Adicionar camadas de design
3. Exportar como PNG

### **Opção 4: Ferramenta Online**

- https://www.opengraph.xyz/
- https://ogimage.vercel.app/
- https://metatags.io/ (com preview)

---

## 🧪 Como Testar

### **Testar Localmente:**
1. Colocar imagens em `client/public/`
2. Rodar: `npm run dev:rcont` ou `npm run dev:sistematizo`
3. Verificar se a imagem carrega em: `http://localhost:5173/og-image-rcont.png`

### **Testar Compartilhamento:**

**Facebook Debugger:**
- https://developers.facebook.com/tools/debug/
- Colar URL do site
- Ver preview do card

**Twitter Card Validator:**
- https://cards-dev.twitter.com/validator
- Colar URL do site
- Ver preview do card

**WhatsApp:**
- Compartilhar link com você mesmo
- Ver como aparece

**LinkedIn Post Inspector:**
- https://www.linkedin.com/post-inspector/
- Colar URL do site

---

## ✅ Checklist

Antes de fazer deploy:

- [ ] Imagem RCont criada (1200x630px)
- [ ] Imagem Sistematizo criada (1200x630px)
- [ ] Imagens otimizadas (< 1 MB cada)
- [ ] Imagens colocadas em `client/public/`
- [ ] Texto legível e bem posicionado
- [ ] Logo visível
- [ ] Cores da marca corretas
- [ ] Testado no Facebook Debugger
- [ ] Testado no Twitter Card Validator
- [ ] Build local funcionando

---

## 📝 Exemplo de Prompt para IA Geradora de Imagens

Se quiser usar Midjourney/DALL-E/Stable Diffusion:

```
Create a professional Open Graph image (1200x630px) for a CNPJ/CNAE consultation website.
- Modern gradient background in [blue/purple] tones
- Clean typography with company name "[RCont/Sistematizo]"
- Title: "Consulta CNPJ e CNAE"
- Icons for: unlimited searches, complete information, tax analysis, free service
- Minimalist, professional design
- Corporate/business style
- Brazilian market focus
```

---

## 🎯 Resultado Final

Quando alguém compartilhar o link do seu site, aparecerá:

**WhatsApp/Telegram:**
```
┌───────────────────────────────┐
│  [Imagem OG - 1200x630]       │
├───────────────────────────────┤
│  RCont - Consulta CNPJ e      │
│  CNAE Gratuita                │
│                               │
│  Consulte CNPJ e CNAE         │
│  gratuitamente. Informações   │
│  completas de empresas...     │
│                               │
│  rcont.org                    │
└───────────────────────────────┘
```

**Facebook/LinkedIn:**
- Imagem grande (banner)
- Título
- Descrição
- URL

**Twitter/X:**
- Card grande com imagem
- Título e descrição
- Link

---

## 💡 Dicas Pro

1. **Use texto grande** - Será visto em telas pequenas
2. **Alto contraste** - Fundo escuro, texto claro (ou vice-versa)
3. **Evite detalhes pequenos** - Imagem pode ser reduzida
4. **Logo visível** - Branding importante
5. **Call-to-action sutil** - "Consulte Grátis", "100% Gratuito"
6. **Cores da marca** - Consistência visual
7. **Margem de segurança** - 40px nas bordas

---

## 🔄 Atualização

Depois de criar e colocar as imagens:

```bash
# Commit
git add client/public/og-image-*.png
git commit -m "feat: Adicionar imagens Open Graph para compartilhamento"

# Subir para ambos
git push origin main
git push sistematizo main
```

---

**As imagens aparecerão automaticamente ao compartilhar!** 🎉

