// frontend/src/builder/Workspace.jsx
import React, { useState } from "react";
import TwinPanel from "../twin/TwinPanel";
import CanvasRenderer from "../runtime/CanvasRenderer";
import ComponentPanel from "./ComponentPanel";

export default function Workspace() {
  const [app, setApp] = useState(null);
  const [activeTab, setActiveTab] = useState("BUILDER");

  return (
    <div className="h-screen flex flex-col bg-[#09090B] font-sans text-slate-200 overflow-hidden">
      
      {/* ELITE ARCHITECT HEADER */}
      <header className="h-16 bg-[#0F0F14] border-b border-white/5 flex items-center justify-between px-8 shrink-0 z-30 shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <strong className="text-sm font-black uppercase tracking-[0.4em] text-white">
              Blue Lotus <span className="text-cyan-500">Empire</span>
            </strong>
            <span className="text-[9px] font-mono text-slate-600 tracking-widest uppercase mt-0.5">
              Node_Status: Actuation_Ready
            </span>
          </div>
          
          {/* Internal Navigation for Storefront/Profile */}
          <nav className="flex gap-1 ml-8">
            {["BUILDER", "STOREFRONT", "REVENUE"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${
                  activeTab === tab 
                    ? "bg-white text-black shadow-lg" 
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* 10% ARCHITECT TAX HUD */}
        <div className="flex items-center gap-4">
          <div className="text-right mr-4 hidden md:block">
            <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Platform_Tax</p>
            <p className="text-[10px] font-mono text-cyan-500">10% FIXED</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-[10px] font-black shadow-inner">
            TJ
          </div>
        </div>
      </header>

      {/* MAIN WORKSPACE BODY */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: TWIN AI CONTROL (The Brain) */}
        <aside className="w-[380px] bg-[#0F0F14] border-r border-white/5 p-6 overflow-y-auto custom-scrollbar shadow-xl z-20">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Neural Input</h3>
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
          </div>
          <TwinPanel onBuild={setApp} />
        </aside>

        {/* MIDDLE: COMPONENT LIBRARY (The Primitives) */}
        <aside className="w-[300px] bg-[#09090B] border-r border-white/5 overflow-y-auto z-10">
           <div className="p-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Primitive Registry</h3>
            <ComponentPanel />
           </div>
        </aside>

        {/* RIGHT: LIVE CANVAS (The Rendering Void) */}
        <main className="flex-1 bg-[#050505] overflow-auto p-10 relative flex justify-center items-start">
          {/* Subtle glow for the Actuation area */}
          <div className="absolute inset-0 bg-cyan-500/[0.02] pointer-events-none" />
          
          <div className="w-full max-w-5xl relative group">
            <div className="absolute -inset-1 bg-white/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative h-full w-full rounded-[2.5rem] border border-white/10 bg-[#121217] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              <CanvasRenderer app={app} />
            </div>
            
            {/* Storefront Action Trigger */}
            <button className="absolute bottom-8 right-8 px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-2xl hover:bg-cyan-400 transition-all active:scale-95">
              Publish to Storefront
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
