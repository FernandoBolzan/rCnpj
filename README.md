# rCnpj

Sistema completo de consulta CNPJ e CNAE com cache, histórico, favoritos e modo offline.

## Funcionalidades

- **Consulta CNPJ**: Busca dados de empresas via BrasilAPI com fallback para ReceitaWS
- **Consulta CNAE**: Busca por código ou descrição usando API IBGE v2
- **Cache inteligente**: Armazena dados em localStorage e memória
- **Modo offline**: Funciona com dados mock quando APIs externas falham
- **Favoritos**: Salva empresas e CNAEs favoritos
- **Histórico**: Mantém histórico das últimas consultas
- **Import/Export**: Exporta e importa dados em JSON

## Instalação

```bash
# Instalar todas as dependências
npm run install:all

# Ou manualmente:
npm install
cd client && npm install
cd ../server && npm install
```

## Execução

```bash
# Iniciar servidor e cliente simultaneamente
npm run dev

# Ou separadamente:
npm run server    # Backend na porta 4000
npm run client    # Frontend na porta 5173
```

## APIs Utilizadas

- **CNPJ**: BrasilAPI (primária) + ReceitaWS (fallback)
- **CNAE**: IBGE v2 (oficial)

## Estrutura do Projeto

```
rCnpj/
├─ server/                  # Node.js + Express (proxy/cache)
├─ client/                  # React + TS + Vite + Tailwind
├─ package.json             # Scripts raiz
└─ README.md
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do servidor:

```env
PORT=4000
BRASILAPI_URL=https://brasilapi.com.br
RECEITAWS_URL=https://www.receitaws.com.br
IBGE_CNAE_URL=https://servicodados.ibge.gov.br/api/v2/cnae
CACHE_TTL_MS=600000
```

## Teste Manual

### CNPJ
- Teste com CNPJ mock: `00000000000000`
- Deve exibir empresa mock com CNAE principal e secundários

### CNAE
- Teste com código: `8621601` (subclasse UTI móvel)
- Teste com código: `86216` (classe serviços móveis)
- Teste com texto: `urgencia` (deve retornar resultados relacionados)

### Modo Offline
- Desligue a internet para testar o banner "Offline (mock)"
- As consultas devem usar dados mock automaticamente

### Funcionalidades
- Salvar favoritos e ver em "Favoritos (N)"
- Exportar JSON e importar de volta
- Limpar cache e verificar recarregamento

## Testes

```bash
# Executar testes em modo watch
npm run test

# Executar testes uma vez
npm run test:run

# Executar linting
npm run lint
```

## Build

```bash
npm run build
```
