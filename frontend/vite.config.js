// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  
  // 1. Path Aliasing: Use "@" instead of complex relative paths
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@runtime": path.resolve(__dirname, "./src/runtime"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },

  // 2. Advanced Build Strategy
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false, // Set to true only during deep debugging to save build time
    rollupOptions: {
      output: {
        // Manual Chunking: Separates React from your logic for faster caching
        manualChunks: {
          vendor: ["react", "react-dom", "framer-motion"],
        },
      },
    },
  },

  // 3. Server Hardening
  server: {
    port: 3000,
    strictPort: true,
    host: true, // Allows testing on mobile devices via local network
  },
});
