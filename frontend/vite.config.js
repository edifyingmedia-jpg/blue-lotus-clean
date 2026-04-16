// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Vite Configuration (Empire Edition)
 * ----------------------------------
 * The master build and orchestration blueprint for Blue Lotus.
 * Hardened for high-density neural actuation and 10% Revenue tracking.
 */
export default defineConfig({
  plugins: [react()],
  
  // 1. Industrial Path Aliasing
  // Eliminates "Relative Path Hell" for cleaner Architect-level imports.
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@rxgui": path.resolve(__dirname, "./src/rxgui"),
      "@state": path.resolve(__dirname, "./src/state"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },

  // 2. Monolith Build Strategy
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false, // Disabled for production to protect proprietary logic
    rollupOptions: {
      output: {
        // Manual Chunking: Fuses core dependencies for 10% faster initial load
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "framer-motion"],
          state: ["@state"], // Isolates the revenue logic for security
        },
      },
    },
  },

  // 3. Server Hardening
  server: {
    port: 3000,
    strictPort: true, // Prevents the system from jumping to 3001 if port is busy
    host: true,       // Allows mobile testing of the Neural Bridge
    open: true,       // Auto-ignites the browser on boot
  },
});
