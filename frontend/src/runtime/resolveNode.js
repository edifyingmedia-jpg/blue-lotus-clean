// frontend/src/runtime/resolveNode.js
import React from "react";
import ComponentRenderer from "./ComponentRenderer"; 

/**
 * resolveNode
 * ----------------------------------------------------
 * Hardened compatibility layer for the Blue Lotus runtime.
 * Acts as a circuit-breaker to prevent malformed nodes from crashing the UI.
 */
export default function resolveNode(node) {
  // 1. Immediate Null-Safety
  if (!node) return null;

  // 2. Schema Validation (Crucial for AI-generated projects)
  if (typeof node !== "object" || !node.type) {
    console.warn("[Blue Lotus] resolveNode received invalid node structure:", node);
    return (
      <div className="bg-amber-900/10 text-amber-500 p-3 rounded-lg border border-amber-500/30 text-xs italic">
        ⚠️ Node definition missing 'type' property.
      </div>
    );
  }

  try {
    // 3. Forward to the optimized rendering pipeline
    return <ComponentRenderer node={node} />;
  } catch (err) {
    // 4. Visual Error Boundary (Prevents White-Screen-of-Death)
    console.error("[Blue Lotus] Render failure at node:", node.id || "unknown", err);
    return (
      <div className="bg-red-900/20 text-red-400 p-4 rounded-xl border border-red-500/40 my-2 backdrop-blur-sm">
        <h4 className="font-bold text-[10px] uppercase tracking-widest mb-1 opacity-70">
          Component Error
        </h4>
        <p className="text-sm font-medium">{node.type} failed to render.</p>
        <p className="text-[10px] mt-2 opacity-60 leading-tight">
          {err.message}
        </div>
    );
  }
}
