// frontend/src/builder/BuilderCanvas.jsx
import React from "react";
import { ComponentRenderer } from "../components";

export default function BuilderCanvas({ appDefinition }) {
  // 1. Safety check with the "Empty State" aesthetic
  if (!appDefinition || (!appDefinition.sections && !appDefinition.root)) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#09090B] text-slate-600">
        <div className="text-center p-12 border border-dashed border-white/5 rounded-[2rem] bg-white/[0.01]">
          <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-sm font-black text-slate-400 mb-2 uppercase tracking-[0.3em]">Awaiting Actuation</h2>
          <p className="text-[10px] font-mono tracking-widest">SIGNAL_STRENGTH: NOMINAL</p>
        </div>
      </div>
    );
  }

  // 2. Resolve the root node
  const rootNode = appDefinition.root || { type: 'Container', children: appDefinition.sections };

  return (
    <div className="w-full h-full bg-[#09090B] overflow-auto custom-scrollbar p-8 lg:p-16 flex justify-center">
      {/* The "Device Frame" look - Prepping for the Storefront Preview */}
      <div className="relative w-full max-w-5xl group">
        {/* Glow behind the actual app content */}
        <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/10 to-transparent blur-2xl opacity-50 transition-opacity duration-1000 group-hover:opacity-100" />
        
        <div className="relative min-h-full bg-[#121217] rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-hidden">
          <ComponentRenderer component={rootNode} />
        </div>

        {/* Storefront Metadata Overlay (The 10% Infrastructure) */}
        <div className="absolute top-6 right-6 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-mono text-cyan-500 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          PROFIT_MARGIN: 90% | ARCHITECT_FEE: 10%
        </div>
      </div>
    </div>
  );
}
