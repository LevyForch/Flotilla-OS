import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use VITE_BASE_PATH env var, or '/Flotilla-OS/' for GitHub Pages, or '/' for local dev
const base = process.env.VITE_BASE_PATH ?? '/Flotilla-OS/'

export default defineConfig({
  plugins: [react()],
  base,
})
