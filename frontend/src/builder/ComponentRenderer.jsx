// frontend/src/builder/ComponentRenderer.jsx
import React from "react";
import { RegistryV2 } from "./components/registry.jsx";

/**
 * ComponentRenderer (Empire Edition)
 * ---------------------------
 * Optimized for the Blue Lotus neural grid.
 * Handles recursive rendering with industrial-grade error reporting.
 */
export default function ComponentRenderer({ node }) {
  // 1. Critical Failure Check
  if (!node) {
    return (
      <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-xl">
        [FAULT]: NULL_POINTER_IN_NODE_TREE
      </div>
    );
  }

  // 2. Resolve Component from Neural Registry
  const Renderer = RegistryV2[node.type];

  // 3. Unknown Type Recovery
  if (!Renderer) {
    return (
      <div className="p-4 border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10px] font-black uppercase tracking-widest rounded-xl">
        [FAULT]: UNKNOWN_PRIMITIVE_{node.type?.toUpperCase()}
      </div>
    );
  }

  // 4. Recursive Build
  return (
    <div className="group/node relative mb-4 last:mb-0">
      {/* Component Core */}
      <div className="relative z-10">
        <Renderer {...node.props} />
      </div>

      {/* Children & Nesting Bridge */}
      {node.children?.length > 0 && (
        <div className="relative ml-6 mt-4 pl-6 border-l border-white/5 transition-colors group-hover/node:border-cyan-500/20">
          {/* Subtle horizontal bridge lines for hierarchy */}
          {node.children.map((child) => (
            <div key={child.id || Math.random()} className="relative">
              <div className="absolute -left-6 top-5 w-4 h-[1px] bg-white/5" />
              <ComponentRenderer node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
