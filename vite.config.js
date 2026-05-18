import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relative en build => le site marche quelle que soit l'URL
// (GitHub Pages sous /repo/, repo renomme, Netlify/Vercel a la racine...).
export default defineConfig({
  plugins: [react()],
  base: './',
})
