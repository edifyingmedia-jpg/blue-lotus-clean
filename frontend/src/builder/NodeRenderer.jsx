// frontend/src/builder/NodeRenderer.jsx
import React from "react";
import { RegistryV2 } from "./components/registry.jsx";

/**
 * NodeRenderer (Modernized)
 * ----------------------
 * Uses RegistryV2 for consistent component resolution.
 * Styled with Tailwind for the Blue Lotus technical aesthetic.
 */
export default function NodeRenderer({ node }) {
  if (!node || !node.type) return null;

  const Renderer = RegistryV2[node.type];

  if (!Renderer) {
    return (
      <div className="p-2 bg-red-950/40 border border-red-900/50 text-red-400 text-[10px] font-mono rounded my-1">
        [!] UNKNOWN_NODE: {node.type}
      </div>
    );
  }

  return (
    <div className="mb-4 last:mb-0">
      <Renderer {...(node.props || {})} />
      
      {node.children?.length > 0 && (
        <div className="ml-4 mt-2 pl-4 border-l border-slate-800/60 transition-all">
          {node.children.map((child) => (
            <NodeRenderer key={child.id || Math.random()} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
