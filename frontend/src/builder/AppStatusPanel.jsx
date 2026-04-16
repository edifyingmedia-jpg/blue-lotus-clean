// frontend/src/builder/AppStatusPanel.jsx
import React from "react";

export function AppStatusPanel({ app, previewMode, activeScreen }) {
  if (!app) return null;

  return (
    <div className="fixed bottom-6 right-6 w-72 p-5 bg-[#0F0F14]/90 backdrop-blur-xl text-slate-300 rounded-2xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[9999]">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500">
          Neural Status
        </span>
        <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <span className="text-[9px] font-black text-cyan-500 tracking-widest uppercase">Live</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="space-y-3 text-[11px]">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-mono uppercase tracking-tighter">Architecture</span>
          <span className="text-white font-bold">{app.name || "PROJECT_ZERO"}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-mono uppercase tracking-tighter">Engine State</span>
          <span className={`font-black tracking-widest uppercase text-[9px] px-2 py-0.5 rounded ${
            previewMode ? "text-amber-500 bg-amber-500/5" : "text-cyan-400 bg-cyan-400/5"
          }`}>
            {previewMode ? "Simulating" : "Actuating"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-mono uppercase tracking-tighter">Active Node</span>
          <span className="text-slate-300 italic">{activeScreen?.name || "Root"}</span>
        </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div className="mt-5 pt-5 border-t border-white/5 grid grid-cols-2 gap-3">
        <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 text-center">
          <div className="text-slate-600 text-[8px] font-black uppercase tracking-widest mb-1">Nodes</div>
          <div className="text-white font-mono text-sm">{app.screens?.length || 0}</div>
        </div>
        <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 text-center">
          <div className="text-slate-600 text-[8px] font-black uppercase tracking-widest mb-1">Primitives</div>
          <div className="text-white font-mono text-sm">{activeScreen?.components?.length || 0}</div>
        </div>
      </div>
    </div>
  );
}
