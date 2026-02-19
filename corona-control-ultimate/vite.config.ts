import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
    dedupe: ['three'],
  },
  server: {
    port: 3000,
    host: true,
    headers: {
      // Relaxed headers for Hugging Face iframe compatibility
    },
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 5000,
    minify: false, // TEMPORARY: Disable minification for better debugging
    rollupOptions: {
      output: {
        // manualChunks removed to let Vite handle splitting automatically
      },
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'zustand', '@dimforge/rapier3d-compat'],
  },
})
