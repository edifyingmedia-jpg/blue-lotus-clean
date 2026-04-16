// frontend/src/builder/AppStatusPanel.jsx
import React from "react";

export function AppStatusPanel({ app, previewMode, activeScreen }) {
  if (!app) return null;

  return (
    <div className="fixed bottom-4 right-4 w-64 p-4 bg-slate-900/90 backdrop-blur-md text-slate-300 rounded-xl border border-slate-800 shadow-2xl z-[9999]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-black uppercase tracking-tighter text-blue-500">
          Blue Lotus Engine
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-500">LIVE</span>
        </div>
      </div>

      <div className="space-y-1.5 text-[11px] font-medium">
        <div className="flex justify-between">
          <span className="text-slate-500">App</span>
          <span className="text-slate-100">{app.name || "Unnamed"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Mode</span>
          <span className={previewMode ? "text-amber-400" : "text-blue-400"}>
            {previewMode ? "Previewing" : "Architecting"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Active Screen</span>
          <span className="text-slate-100">{activeScreen?.name || "None"}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[10px] text-center">
        <div className="bg-slate-800/50 p-1 rounded">
          <div className="text-slate-500 uppercase font-bold">Screens</div>
          <div className="text-slate-100">{app.screens?.length || 0}</div>
        </div>
        <div className="bg-slate-800/50 p-1 rounded">
          <div className="text-slate-500 uppercase font-bold">Components</div>
          <div className="text-slate-100">{activeScreen?.components?.length || 0}</div>
        </div>
      </div>
    </div>
  );
}
