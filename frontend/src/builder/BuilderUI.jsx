// frontend/src/builder/BuilderUI.jsx
import React from 'react';
import BuilderCanvas from './BuilderCanvas';
import NodeRenderer from './NodeRenderer';

export default function BuilderUI({ appDefinition }) {
  return (
    <div className="flex h-screen bg-[#09090B] text-slate-300 overflow-hidden selection:bg-cyan-500/30">
      
      {/* MAIN CANVAS: The Rendering Void */}
      <div className="flex-1 border-r border-white/5 p-8 lg:p-12 overflow-auto custom-scrollbar relative">
        {/* Subtle watermark for the Empire branding */}
        <div className="absolute top-10 left-10 opacity-5 pointer-events-none">
          <span className="text-[10vw] font-black italic tracking-tighter text-white">LOTUS</span>
        </div>
        
        <BuilderCanvas appDefinition={appDefinition} />
      </div>

      {/* SIDEBAR: The Neural Node Tree */}
      <div className="w-85 bg-[#0F0F14] p-6 space-y-6 overflow-y-auto border-l border-white/5 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">
            Architecture Tree
          </h3>
          <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        </div>

        <div className="space-y-2">
          {appDefinition?.nodes?.length > 0 ? (
            appDefinition.nodes.map((node, index) => (
              <div key={node.id || index} className="group transition-all duration-300">
                <NodeRenderer node={node} />
              </div>
            ))
          ) : (
            <div className="py-10 text-center border border-dashed border-white/5 rounded-2xl">
              <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Awaiting_Nodes</p>
            </div>
          )}
        </div>

        {/* REVENUE INDICATOR: The 10% Infrastructure */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Platform_Tax</span>
              <span className="text-[9px] font-black text-cyan-500">10.00%</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full w-[10%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
