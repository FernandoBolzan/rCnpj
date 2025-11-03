# 🚀 Como Subir o Sistematizo no GitHub

## ✅ Tudo Pronto!

- ✅ Logos configuradas
- ✅ Banner personalizado para cada marca
- ✅ URLs corretos (rcont.org e sistematizo.com.br)
- ✅ RCont já está no GitHub

---

## 📝 Agora Siga Estes Passos:

### 1️⃣ Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome do repositório: `sistematizo-cnpj` (ou outro nome)
3. **IMPORTANTE:** Deixe tudo desmarcado:
   - ❌ Não adicione README
   - ❌ Não adicione .gitignore
   - ❌ Não adicione license
4. Clique em **"Create repository"**
5. **Copie a URL** que aparece (exemplo: `https://github.com/SeuUsuario/sistematizo-cnpj.git`)

---

### 2️⃣ Adicionar Remote do Sistematizo

Abra o PowerShell nesta pasta e execute:

```powershell
# Substituir pela URL do seu repositório
git remote add sistematizo https://github.com/SeuUsuario/sistematizo-cnpj.git
```

Verificar se deu certo:
```powershell
git remote -v
```

Deve aparecer:
```
origin       https://github.com/FernandoBolzan/rCnpj.git (fetch)
origin       https://github.com/FernandoBolzan/rCnpj.git (push)
sistematizo  https://github.com/SeuUsuario/sistematizo-cnpj.git (fetch)
sistematizo  https://github.com/SeuUsuario/sistematizo-cnpj.git (push)
```

---

### 3️⃣ Fazer Push para Sistematizo

```powershell
git push sistematizo main
```

✅ **PRONTO! Código subiu para o Sistematizo!**

---

## 🔄 Uso no Dia a Dia

### Subir para RCont (como antes):
```powershell
git push origin main
```

### Subir para Sistematizo:
```powershell
git push sistematizo main
```

### Subir para AMBOS de uma vez:
```powershell
git push origin main
git push sistematizo main
```

---

## 🧪 Testar Localmente

### Testar RCont:
```powershell
cd client
npm run dev
# ou
npm run dev:rcont
```
Abrir: http://localhost:5173

### Testar Sistematizo:
```powershell
cd client
npm run dev:sistematizo
```
Abrir: http://localhost:5173

Vai ver:
- Logo do Sistematizo
- Banner: "Precisa abrir sua empresa? Fale com um contador especializado da Sistematizo"
- Link para: sistematizo.com.br

---

## 📦 Build para Produção

### Build RCont:
```powershell
cd client
npm run build:rcont
```

### Build Sistematizo:
```powershell
cd client
npm run build:sistematizo
```

---

## ❓ Dúvidas?

- ✅ **Mesmo código** para ambas marcas
- ✅ **Logo e banner** mudam automaticamente
- ✅ **Sem duplicação** de código
- ✅ **Push independente** para cada GitHub

**Simples assim!** 🎉

