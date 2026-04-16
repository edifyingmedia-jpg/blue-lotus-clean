// frontend/src/pages/PageRenderer.jsx
import React from "react";
import { getComponentRenderer } from "../components/ComponentRegistry";

/**
 * PageRenderer (Empire Edition)
 * ----------------------------
 * The primary actuation vessel for public-facing pages.
 * Supports the Ink & Cyan design system and prepares for Storefront metadata.
 */
export default function PageRenderer({ page }) {
  if (!page) return null;

  return (
    <div className="min-h-screen bg-[#09090B] text-slate-200">
      {/* PAGE HEADER: High-Density Typography */}
      <header className="py-12 px-8 max-w-7xl mx-auto border-b border-white/5 mb-12">
        <h2 className="text-[14px] font-black uppercase tracking-[0.5em] text-white">
          {page.name} <span className="text-cyan-500">Node</span>
        </h2>
        <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mt-2">
          Status: Manifest_Render_Complete
        </p>
      </header>

      {/* COMPONENT GRID: The Actuated Stack */}
      <main className="max-w-7xl mx-auto px-8 pb-24 space-y-12">
        {page.components.map((component) => {
          const Renderer = getComponentRenderer(component.type);
          if (!Renderer) {
            console.warn(`RENDER_FAILURE: Component type "${component.type}" not found in registry.`);
            return null;
          }

          return (
            <section 
              key={component.id} 
              className="relative group transition-all duration-500"
              data-node-id={component.id}
            >
              {/* Subtle hover glow for the "Premium" feel */}
              <div className="absolute -inset-4 bg-cyan-500/[0.02] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <Renderer component={component} />
            </section>
          );
        })}
      </main>

      {/* FOOTER: Architect Verification */}
      <footer className="py-8 border-t border-white/5 text-center">
        <p className="text-[8px] font-mono text-slate-800 uppercase tracking-[0.3em]">
          Rendered via Blue Lotus Prime Engine // 10% Platform Verified
        </p>
      </footer>
    </div>
  );
}
