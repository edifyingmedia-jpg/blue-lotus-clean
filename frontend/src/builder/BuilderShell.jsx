// frontend/src/builder/BuilderShell.jsx
import { useState } from 'react'
import TwinPanel from '../twin/TwinPanel'
import CanvasRenderer from '../runtime/CanvasRenderer'

export default function BuilderShell() {
  const [app, setApp] = useState(null)

  return (
    <div className="h-screen flex flex-col bg-slate-950 font-sans text-slate-200">
      {/* GLOBAL HEADER */}
      <header className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <strong className="text-xs font-black uppercase tracking-widest text-white">
            Blue Lotus Builder
          </strong>
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
          Architect Mode
        </span>
      </header>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT: CONTROL PANEL */}
        <aside className="w-[340px] bg-slate-900 border-r border-slate-800 p-3 overflow-y-auto">
          <TwinPanel onBuild={setApp} />
        </aside>

        {/* RIGHT: LIVE VIEWPORT */}
        <main className="flex-1 bg-slate-950 relative overflow-hidden">
          <div className="h-full w-full overflow-auto p-8 custom-scrollbar">
            <CanvasRenderer app={app} />
          </div>
        </main>
      </div>
    </div>
  )
}
