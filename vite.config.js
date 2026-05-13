import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api/contact': {
        target: 'https://n8n.guillers.es',
        changeOrigin: true,
        secure: true,
        rewrite: () => '/webhook/contacto-landing',
      },
    },
  },
});
