import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_BRAND': JSON.stringify(mode === 'sistematizo' ? 'sistematizo' : 'rcont')
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
}))
