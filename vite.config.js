import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8', // usa @vitest/coverage-v8
      reporter: ['text', 'html'], // genera informe en terminal y en carpeta html
    },
  }
})
