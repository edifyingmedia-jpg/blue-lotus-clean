// frontend/src/rxgui/components/ComponentRenderer.jsx
import React from "react";
import ComponentRegistry from "../../runtime/ComponentRegistry";

/**
 * ComponentRenderer (Empire Edition)
 * ---------------------------------
 * Renders a single neural node using the Global Registry.
 * Supports recursive child actuation for complex Empire layouts.
 */
export default function ComponentRenderer({ node }) {
  // Safety Gate: Ensure the node exists
  if (!node || !node.type) {
    console.warn("ACTUATION_WARNING: Invalid node structure received.", node);
    return null;
  }

  const Component = ComponentRegistry[node.type];

  // Failure State: Unknown Component Type
  if (!Component) {
    return (
      <div className="p-4 border border-red-900/50 bg-red-950/20 rounded-xl text-[10px] font-mono text-red-500 uppercase tracking-widest">
        <span className="font-black text-red-400">Actuation_Error:</span> Unknown Type "{node.type}"
      </div>
    );
  }

  try {
    return (
      <Component {...node.props}>
        {/* RECURSIVE BRIDGE: 
            If this node has children, we pass them back through the renderer 
            to allow for infinite structural nesting. 
        */}
        {Array.isArray(node.children) && node.children.length > 0
          ? node.children.map((child, idx) => (
              <ComponentRenderer key={child.id || idx} node={child} />
            ))
          : node.children}
      </Component>
    );
  } catch (err) {
    console.error("NEURAL_COLLAPSE:", err);
    return (
      <div className="p-4 border border-orange-900/50 bg-orange-950/20 rounded-xl text-[10px] font-mono text-orange-500 uppercase tracking-widest">
        <span className="font-black text-orange-400">Critical_Failure:</span> {node.type} collapsed during render
      </div>
    );
  }
}
