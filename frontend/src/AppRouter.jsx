// frontend/src/AppRouter.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BuilderApp from "./builder/BuilderApp";
import { AppLayout } from "./rxgui/layouts/AppLayout";

/**
 * AppRouter (Empire Edition)
 * -------------------------
 * The master traffic controller for Blue Lotus nodes.
 * Segregates the Storefront, the Builder, and the Neural Ingestion deck.
 */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LANDING & STOREFRONT: The gateway to the Empire */}
        <Route path="/" element={
          <AppLayout>
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <h1 className="text-[32px] font-black uppercase tracking-[0.6em] text-white mb-4">
                Blue_Lotus_<span className="text-cyan-500">Storefront</span>
              </h1>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Manifesting Neural Nodes // Architect_Fee_0.10_Active
              </p>
            </div>
          </AppLayout>
        } />

        {/* BUILDER NODE: The construction chamber */}
        <Route path="/build/*" element={<BuilderApp />} />

        {/* CLONER NODE: The Neural Ingestion deck (Planned) */}
        <Route path="/clone" element={
          <AppLayout>
            <div className="p-20 text-center">
              <span className="text-cyan-500 font-mono text-[12px] animate-pulse">
                INITIALIZING_NEURAL_INGESTION_DECK...
              </span>
            </div>
          </AppLayout>
        } />

        {/* FALLBACK ACTUATION */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
