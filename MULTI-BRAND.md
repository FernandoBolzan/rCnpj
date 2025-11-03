# 🎨 Sistema Multi-Marca (White Label)

Este projeto suporta **múltiplas marcas** (RCont e Sistematizo) usando o mesmo código base.

## 📋 Como Funciona

### Marcas Disponíveis:
- **RCont** - www.rcont.org (azul)
- **Sistematizo** - www.sistematizo.com.br (roxo)

### Sistema Automático:
O sistema detecta a marca por:
1. **Variável de ambiente** `VITE_BRAND` (definida no build)
2. **Domínio** (se contém "sistematizo" no hostname)
3. **Padrão:** RCont

---

## 🚀 Desenvolvimento

### Modo RCont (padrão):
```bash
cd client
npm run dev
# ou
npm run dev:rcont
```

### Modo Sistematizo:
```bash
cd client
npm run dev:sistematizo
```

---

## 📦 Build para Produção

### Build RCont:
```bash
cd client
npm run build:rcont
```

### Build Sistematizo:
```bash
cd client
npm run build:sistematizo
```

---

## 🔧 Configuração de Marca

Edite: `client/src/config/brand.ts`

Cada marca tem:
- `name`: Nome da empresa
- `logo`: Caminho da logo (`/logo-rcont.png` ou `/logo-sistematizo.png`)
- `primaryColor`: Cor principal
- `website`: URL do site
- `bannerText`: Texto do banner
- `bannerCTA`: Texto do botão

---

## 🖼️ Logos

Coloque as logos em:
- `client/public/logo-rcont.png`
- `client/public/logo-sistematizo.png`

---

## 🌐 GitHub - Múltiplos Repositórios

### 1. Adicionar remote do Sistematizo:
```bash
git remote add sistematizo https://github.com/SeuUsuario/sistematizo-cnpj.git
```

### 2. Ver todos os remotes:
```bash
git remote -v
```

### 3. Fazer push para RCont (origin):
```bash
git push origin main
```

### 4. Fazer push para Sistematizo:
```bash
git push sistematizo main
```

### 5. Fazer push para AMBOS de uma vez:
```bash
git push origin main
git push sistematizo main
```

---

## 🔀 Branches Separadas (Opcional)

Se quiser manter branches separadas:

```bash
# Criar branch para sistematizo
git checkout -b sistematizo-brand

# Fazer mudanças específicas do Sistematizo
# (ex: trocar logo, cores, etc.)

# Commit
git add .
git commit -m "chore: Configuracao para Sistematizo"

# Push para remote sistematizo
git push sistematizo sistematizo-brand:main

# Voltar para main (RCont)
git checkout main
```

---

## 📝 Fluxo de Trabalho Recomendado

### Cenário 1: Mesma versão para ambas marcas
```bash
# Desenvolver na main
git add .
git commit -m "feat: Nova funcionalidade"

# Subir para ambos
git push origin main
git push sistematizo main
```

### Cenário 2: Versões diferentes
```bash
# Branch main = RCont
git checkout main
git add .
git commit -m "feat: Funcionalidade RCont"
git push origin main

# Branch sistematizo = Sistematizo
git checkout sistematizo-brand
git merge main  # Pegar mudanças da main
# Fazer ajustes específicos se necessário
git push sistematizo sistematizo-brand:main
```

---

## 🎯 Deploy

### Netlify/Vercel para RCont:
```bash
npm run build:rcont
# Fazer deploy da pasta dist/
```

### Netlify/Vercel para Sistematizo:
```bash
npm run build:sistematizo
# Fazer deploy da pasta dist/
```

### Variáveis de Ambiente no Deploy:

**RCont:**
```
VITE_BRAND=rcont
```

**Sistematizo:**
```
VITE_BRAND=sistematizo
```

---

## ✅ Checklist para Nova Marca

- [ ] Adicionar logo em `client/public/logo-[marca].png`
- [ ] Configurar em `client/src/config/brand.ts`
- [ ] Testar com `npm run dev:[marca]`
- [ ] Criar repositório GitHub
- [ ] Adicionar remote: `git remote add [marca] [url]`
- [ ] Build: `npm run build:[marca]`
- [ ] Deploy com variável `VITE_BRAND=[marca]`

---

## 📌 Notas Importantes

1. **Mesmo código base** para todas as marcas
2. **Logo e textos** mudam automaticamente
3. **URLs** diferentes para cada marca
4. **Build separado** gera versão específica
5. **Zero duplicação de código** 🎉

