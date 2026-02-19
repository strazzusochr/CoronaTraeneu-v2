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
    rollupOptions: {
      output: {
        manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // Group React and Three together to avoid circular dependency issues
              if (id.includes('react') || id.includes('scheduler') || id.includes('three') || id.includes('@react-three')) {
                return 'vendor-core'; 
              }
              // Other large libs
              if (id.includes('rapier')) return 'vendor-physics';
              
              return 'vendor-utils';
            }
          },
      },
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'zustand', '@dimforge/rapier3d-compat'],
  },
})
