// frontend/src/builder/ComponentRenderer.jsx
import React from "react";
import { RegistryV2 } from "./components/registry.jsx";

/**
 * ComponentRenderer (Modernized)
 * ---------------------------
 * Uses RegistryV2 for component resolution.
 * Styled with Tailwind CSS for consistent workspace aesthetics.
 */
export default function ComponentRenderer({ node }) {
  if (!node) {
    return (
      <div className="p-3 border border-dashed border-red-900/50 bg-red-900/10 text-red-500 text-[10px] font-mono rounded">
        [SYS_ERR]: MISSING_NODE_DATA
      </div>
    );
  }

  const Renderer = RegistryV2[node.type];

  if (!Renderer) {
    return (
      <div className="p-3 border border-dashed border-amber-900/50 bg-amber-900/10 text-amber-500 text-[10px] font-mono rounded">
        [SYS_ERR]: UNKNOWN_TYPE_{node.type?.toUpperCase()}
      </div>
    );
  }

  return (
    <div className="mb-3 last:mb-0">
      <Renderer {...node.props} />
      
      {node.children?.length > 0 && (
        <div className="ml-4 mt-2 pl-4 border-l border-slate-800/50">
          {node.children.map((child) => (
            <ComponentRenderer key={child.id || Math.random()} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
