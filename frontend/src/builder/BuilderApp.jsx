// frontend/src/builder/BuilderApp.jsx
import React, { useState } from "react";
import { LivePreview, Inspector, ComponentPanel, AppStatusPanel } from "../components";
import AICommandPanel from "./AICommandPanel";

export default function BuilderApp() {
  const [tree, setTree] = useState(null); 
  const [history, setHistory] = useState([]); 

  return (
    <div className="h-screen w-full flex bg-[#09090B] text-slate-300 overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* LEFT PANEL: The Architect's Console */}
      <aside className="w-80 flex flex-col border-r border-white/5 bg-[#0F0F14] shadow-2xl z-20">
        <div className="p-6 border-b border-white/5 bg-white/[0.02]">
          <h2 className="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase">
            Blue Lotus Console
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <AICommandPanel setTree={setTree} setHistory={setHistory} />
          <div className="px-6 pb-8">
            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-4">Library Primitives</div>
            <ComponentPanel />
          </div>
        </div>
      </aside>

      {/* CENTER PANEL: The Rendering Void */}
      <main className="flex-1 relative flex flex-col bg-[#09090B]">
        <header className="h-14 border-b border-white/5 flex items-center px-8 justify-between bg-white/[0.01] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Actuation</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full border border-white/10" />
            <div className="w-2.5 h-2.5 rounded-full border border-white/10" />
            <div className="w-2.5 h-2.5 rounded-full border border-white/10" />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-12 flex justify-center items-start">
          <div className="relative group w-full max-w-5xl">
            {/* Subtle glow behind the canvas */}
            <div className="absolute -inset-4 bg-cyan-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative w-full min-h-[80vh] bg-[#121217] rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden transition-all duration-700">
              <LivePreview tree={tree} />
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT PANEL: The Neural Inspector */}
      <aside className="w-80 border-l border-white/5 bg-[#0F0F14] shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-white/[0.02]">
          <h2 className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase text-right">
            Properties
          </h2>
        </div>
        <div className="p-6 h-full overflow-y-auto custom-scrollbar">
          <Inspector tree={tree} setTree={setTree} />
        </div>
      </aside>

      {/* Status Overlay */}
      <AppStatusPanel app={{ name: "NEURAL_NODE_01" }} activeScreen={tree} />
    </div>
  );
}
