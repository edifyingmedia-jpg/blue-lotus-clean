import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // This prevents the build from crashing on small warnings
    chunkSizeWarningLimit: 2000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // This tells Vercel to look for .jsx files automatically
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  }
})
