import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [twinInput, setTwinInput] = useState("");
  const [previewHTML, setPreviewHTML] = useState("<div style='color: #64748b; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh;'>Awaiting Architectural Intent...</div>");
  const [isThinking, setIsThinking] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#09090B] text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* LEFT PANEL: THE ARCHITECT ENGINE */}
      <aside className="w-[400px] flex flex-col border-r border-white/5 bg-[#0F0F14] shadow-2xl z-20">
        
        {/* Header with Glass Effect */}
        <div className="p-6 border-b border-white/5 bg-white/[0.02] backdrop-blur-md flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-white">
              BLUE <span className="text-cyan-500">LOTUS</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-[0.2em] uppercase">Neural Architect v2.0</p>
          </div>
          <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        </div>

        {/* Input Area */}
        <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold ml-1">Command Console</label>
            <div className="relative group">
              <textarea 
                value={twinInput}
                onChange={(e) => setTwinInput(e.target.value)}
                placeholder="Describe your architectural vision..."
                className="w-full h-64 bg-black/40 border border-white/10 rounded-2xl p-5 text-sm leading-relaxed text-slate-300 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all resize-none placeholder:text-slate-700 shadow-inner"
              />
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-600 italic">
                {isThinking ? "Processing..." : "Ready"}
              </div>
            </div>
          </div>

          {/* Premium Build Button */}
          <button 
            onClick={() => setIsThinking(true)}
            disabled={isThinking}
            className="relative group overflow-hidden w-full py-5 bg-white text-black font-black rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 tracking-widest uppercase text-xs">
              {isThinking ? "Synchronizing..." : "Initiate Synthesis"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white group-hover:hidden" />
          </button>

          {/* Metrics Footer */}
          <div className="mt-auto pt-6 border-t border-white/5 grid grid-cols-2 gap-4 text-[10px] font-mono text-slate-500">
            <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
              LATENCY: <span className="text-slate-300">24ms</span>
            </div>
            <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
              TOKENS: <span className="text-slate-300">1.2k</span>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT PANEL: THE CANVAS */}
      <main className="flex-1 relative bg-[#09090B] p-4 lg:p-8">
        {/* Floating Canvas Header */}
        <div className="absolute top-12 left-12 z-30 flex items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            Real-time Rendering Node
          </span>
        </div>

        {/* The Frame Wrapper */}
        <div className="w-full h-full relative group">
          <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative w-full h-full bg-[#121217] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
             <iframe 
              title="Preview"
              srcDoc={previewHTML}
              className="w-full h-full border-none transition-all duration-1000"
              style={{ filter: isThinking ? 'grayscale(1) blur(4px)' : 'none' }}
            />
          </div>
        </div>
      </main>

    </div>
  );
}
