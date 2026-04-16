// frontend/src/builder/NodeRenderer.jsx
import React from "react";
import { RegistryV2 } from "./components/registry.jsx";

/**
 * NodeRenderer (Empire Edition)
 * ----------------------------
 * Visualizes the neural hierarchy in the sidebar.
 * Optimized for high-density architectural viewing.
 */
export default function NodeRenderer({ node }) {
  if (!node || !node.type) return null;

  const Renderer = RegistryV2[node.type];

  // 1. Sophisticated Fault Handling
  if (!Renderer) {
    return (
      <div className="p-3 bg-red-500/5 border border-red-500/20 text-red-400 text-[9px] font-black uppercase tracking-widest rounded-xl my-2">
        [!] UNKNOWN_PRIMITIVE: {node.type}
      </div>
    );
  }

  return (
    <div className="group/node mb-2 last:mb-0">
      {/* The Node Label/Trigger */}
      <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all cursor-pointer">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover/node:bg-cyan-500 transition-colors shadow-[0_0_8px_rgba(6,182,212,0)] group-hover/node:shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/node:text-white">
          {node.type}
        </span>
        <span className="ml-auto text-[8px] font-mono text-slate-700 uppercase tracking-tighter">
          {node.id?.substring(0, 6) || 'AUTO'}
        </span>
      </div>

      {/* Children & The Neural Bridge */}
      {node.children?.length > 0 && (
        <div className="ml-4 mt-2 pl-4 border-l border-white/5 transition-colors group-hover/node:border-cyan-500/20">
          {node.children.map((child) => (
            <div key={child.id || Math.random()} className="relative">
              {/* Horizontal bridge line */}
              <div className="absolute -left-4 top-5 w-3 h-[1px] bg-white/5 group-hover/node:bg-cyan-500/20" />
              <NodeRenderer node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
