import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'frontend', // This tells Vite your frontend files are in the frontend folder
  build: {
    outDir: '../dist', // This puts the final build back in the root for Vercel to find
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './frontend/src'),
    },
  },
});
