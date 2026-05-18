import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base '/mon-suivi-vols/' en build (GitHub Pages = site projet),
// mais '/' en dev pour garder http://localhost:5173/ simple.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/mon-suivi-vols/' : '/',
}))
