// frontend/src/builder/BuilderApp.jsx
import React, { useState } from "react";
import { 
  LivePreview, 
  Inspector, 
  ComponentPanel, 
  AppStatusPanel 
} from "../components";
import AICommandPanel from "./AICommandPanel";

/**
 * BuilderApp (Modernized Version)
 * ------------------------------
 * - Centralized state management for the component tree.
 * - Professional 3-column IDE layout.
 * - Integrated AI Command and Property Inspection.
 */
export default function BuilderApp() {
  const [tree, setTree] = useState(null); // The unified node tree
  const [history, setHistory] = useState([]); // Interaction logs

  return (
    <div className="h-screen w-full flex bg-[#050505] text-slate-300 overflow-hidden font-sans">
      
      {/* LEFT PANEL: Library & AI Command */}
      <aside className="w-80 flex flex-col border-r border-slate-800 bg-slate-900/50">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-[10px] font-black tracking-widest text-blue-500 uppercase">
            Blue Lotus Builder
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <AICommandPanel setTree={setTree} setHistory={setHistory} />
          <div className="px-4 pb-6">
            <ComponentPanel />
          </div>
        </div>
      </aside>

      {/* CENTER PANEL: The Canvas */}
      <main className="flex-1 relative flex flex-col bg-[#020202]">
        <header className="h-12 border-b border-slate-800 flex items-center px-6 justify-between bg-slate-900/30">
          <span className="text-xs font-medium text-slate-500">Live Preview</span>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-700" />
            <div className="w-2 h-2 rounded-full bg-slate-700" />
            <div className="w-2 h-2 rounded-full bg-slate-700" />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-12 flex justify-center">
          <div className="w-full max-w-4xl min-h-full bg-white rounded-t-xl shadow-2xl shadow-blue-900/10 overflow-hidden">
            <LivePreview tree={tree} />
          </div>
        </div>
      </main>

      {/* RIGHT PANEL: Inspector */}
      <aside className="w-72 border-l border-slate-800 bg-slate-900/50">
        <Inspector tree={tree} setTree={setTree} />
      </aside>

      {/* Persistent Status Overlay */}
      <AppStatusPanel app={{ name: "New Project" }} activeScreen={tree} />
    </div>
  );
}
