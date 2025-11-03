/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BRAND?: 'rcont' | 'sistematizo'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

