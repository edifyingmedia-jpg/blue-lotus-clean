// frontend/src/builder/BuilderShell.jsx
import { useState } from 'react'
import TwinPanel from '../twin/TwinPanel'
import CanvasRenderer from '../runtime/CanvasRenderer'

export default function BuilderShell() {
  const [app, setApp] = useState(null)
  const [userTier] = useState("ARCHITECT") // For the Member Profile logic

  return (
    <div className="h-screen flex flex-col bg-[#09090B] font-sans text-slate-200 overflow-hidden">
      
      {/* PREMIUM GLOBAL HEADER */}
      <header className="h-16 bg-[#0F0F14] border-b border-white/5 flex items-center justify-between px-8 z-30 shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <strong className="text-sm font-black uppercase tracking-[0.3em] text-white">
              Blue Lotus <span className="text-cyan-500">Empire</span>
            </strong>
            <span className="text-[9px] font-mono text-slate-600 tracking-widest uppercase mt-0.5">
              System_Node: Primary_Actuator
            </span>
          </div>
        </div>

        {/* REVENUE & TIER HUD (The 10% Infrastructure) */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Platform Tax</span>
            <span className="text-xs font-mono text-cyan-500">10% FIXED</span>
          </div>
          
          <div className="h-10 w-[1px] bg-white/5" />

          {/* Member Profile Link Placeholder */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">T. Jefferson</span>
              <span className="text-[9px] font-black text-amber-500 tracking-widest uppercase">{userTier}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-xs font-black shadow-lg">
              TJ
            </div>
          </div>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: THE ARCHITECT CONSOLE (TWIN) */}
        <aside className="w-[380px] bg-[#0F0F14] border-r border-white/5 p-6 overflow-y-auto custom-scrollbar shadow-2xl z-20">
          <div className="mb-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Command Interface</h3>
            <TwinPanel onBuild={setApp} />
          </div>
        </aside>

        {/* RIGHT: THE RENDERING VOID (Storefront Preview) */}
        <main className="flex-1 bg-[#09090B] relative overflow-hidden flex flex-col">
          <div className="flex-1 overflow-auto p-12 lg:p-20 custom-scrollbar flex justify-center items-start">
            <div className="w-full max-w-6xl relative group">
              {/* Device Frame aesthetic for Storefront visualization */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative bg-[#121217] rounded-[2.5rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden min-h-[80vh]">
                <CanvasRenderer app={app} />
              </div>
            </div>
          </div>

          {/* Action Footer for Monetization */}
          <footer className="h-14 bg-[#0F0F14]/80 backdrop-blur-md border-t border-white/5 px-8 flex items-center justify-between">
            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              Draft_ID: {app ? 'ACTUATED_NODE_88' : 'NULL'}
            </div>
            <button className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition-all active:scale-95">
              Publish to Storefront
            </button>
          </footer>
        </main>
      </div>
    </div>
  )
}
