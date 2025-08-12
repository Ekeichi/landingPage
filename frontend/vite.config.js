import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Désactiver le HMR pour accélérer le démarrage
    hmr: false,
    // Réduire le polling
    watch: {
      usePolling: false,
      interval: 1000
    }
  },
  // Optimisations de build
  build: {
    // Désactiver la minification en dev
    minify: false,
    // Réduire la taille des chunks
    chunkSizeWarningLimit: 1000
  },
  // Optimisations de performance
  optimizeDeps: {
    // Forcer le pré-bundling des dépendances
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
