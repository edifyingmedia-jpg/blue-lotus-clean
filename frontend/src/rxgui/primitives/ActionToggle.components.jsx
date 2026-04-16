// frontend/src/rxgui/layouts/AppLayout.jsx
import React from "react";

/**
 * AppLayout (Empire Edition)
 * -------------------------
 * The primary architectural vessel for all Blue Lotus apps.
 * Enforces the Ink & Cyan environment and establishes the Revenue Anchor.
 */
export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#09090B] text-slate-200 selection:bg-cyan-500/30 selection:text-white">
      {/* THE NEURAL GRID OVERLAY */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      
      {/* MAIN VIEWPORT */}
      <div className="relative flex flex-col min-h-screen max-w-[1920px] mx-auto overflow-x-hidden">
        
        {/* TOP COMMAND NAV */}
        <nav className="h-20 border-b border-white/5 flex items-center justify-between px-10 backdrop-blur-md bg-[#09090B]/80 sticky top-0 z-50">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 animate-pulse" />
            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white">Blue Lotus <span className="text-cyan-500">Prime</span></span>
          </div>
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
            Architect_Verified // 10% Platform_Fee_Active
          </div>
        </nav>

        {/* CONTENT ACTUATION AREA */}
        <main className="flex-grow p-8 md:p-12 lg:p-20">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

        {/* REVENUE FOOTER */}
        <footer className="py-6 px-10 border-t border-white/5 flex justify-between items-center bg-[#0C0C12]">
          <p className="text-[8px] font-mono text-slate-700 uppercase tracking-[0.3em]">
            &copy; 2026 Blue Lotus Empire // All Node Rights Reserved
          </p>
          <div className="flex space-x-6">
            <div className="h-1 w-12 bg-cyan-500/20 rounded-full" />
          </div>
        </footer>
      </div>
    </div>
  );
}
