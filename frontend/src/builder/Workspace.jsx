// frontend/src/builder/Workspace.jsx
import React, { useState } from "react";
import TwinPanel from "../twin/TwinPanel";
import CanvasRenderer from "../runtime/CanvasRenderer";
import ComponentPanel from "./ComponentPanel";

export default function Workspace() {
  const [app, setApp] = useState(null);

  return (
    <div className="h-screen flex flex-col bg-slate-950 font-sans text-slate-200">
      {/* HEADER */}
      <header className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <strong className="text-xs font-black uppercase tracking-widest text-white">
            Blue Lotus Workspace
          </strong>
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
          Architect Mode
        </span>
      </header>

      {/* MAIN WORKSPACE BODY */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT: TWIN AI CONTROL */}
        <aside className="w-[340px] bg-slate-900 border-r border-slate-800 p-3 overflow-y-auto custom-scrollbar">
          <TwinPanel onBuild={setApp} />
        </aside>

        {/* MIDDLE: COMPONENT LIBRARY */}
        <aside className="w-[260px] bg-slate-900/50 border-r border-slate-800 overflow-y-auto">
          <ComponentPanel />
        </aside>

        {/* RIGHT: LIVE CANVAS */}
        <main className="flex-1 bg-[#020202] overflow-auto p-4 relative">
          <div className="h-full w-full rounded-xl border border-slate-800/40 overflow-hidden shadow-2xl">
            <CanvasRenderer app={app} />
          </div>
        </main>
      </div>
    </div>
  );
}
