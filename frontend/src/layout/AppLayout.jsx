// frontend/src/layout/AppLayout.jsx
import React from "react";

/**
 * AppLayout (Empire Edition)
 * -------------------------
 * The master wrapper for all Blue Lotus modules.
 * Enforces the Ink & Cyan aesthetic at the root level.
 */
export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col h-screen w-full bg-[#09090B] text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* SYSTEM HEADER: THE COMMAND DECK */}
      <header className="h-14 bg-[#0F0F14] border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
            Blue Lotus <span className="text-cyan-500">Empire</span>
          </h1>
        </div>

        {/* REVENUE STATUS INDICATOR */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Global_Tax</span>
            <span className="text-[9px] font-black text-cyan-500 uppercase">10% Actuated</span>
          </div>
          <div className="h-8 w-[1px] bg-white/5" />
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="text-right">
              <p className="text-[9px] font-black text-white leading-none">ARCHITECT_USER</p>
              <p className="text-[7px] font-mono text-slate-500 uppercase mt-1">Tier: Founder</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-[10px] font-black group-hover:border-cyan-500/50 transition-all">
              TJ
            </div>
          </div>
        </div>
      </header>

      {/* THE VIEWPORT: NEURAL CONTENT AREA */}
      <main className="flex-1 overflow-hidden relative">
        {/* Subtle background glow to prevent "Flat Black" fatigue */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.03)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="h-full w-full overflow-auto custom-scrollbar">
          {children}
        </div>
      </main>

      {/* SYSTEM STATUS FOOTER */}
      <footer className="h-6 bg-[#09090B] border-t border-white/5 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-[7px] font-mono text-slate-700 uppercase tracking-widest">Network: Stable</span>
          <span className="text-[7px] font-mono text-slate-700 uppercase tracking-widest">Engine: v2.5.0-Prime</span>
        </div>
        <div className="text-[7px] font-mono text-slate-800 uppercase">
          &copy; 2026 Blue Lotus Neural Systems
        </div>
      </footer>
    </div>
  );
}
