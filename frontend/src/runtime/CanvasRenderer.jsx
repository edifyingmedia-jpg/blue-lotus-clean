// frontend/src/runtime/CanvasRenderer.jsx
import React from "react";
import ComponentRenderer from "./ComponentRenderer";

export default function CanvasRenderer({ tree }) {
  if (!tree) {
    return (
      <div className="p-4 text-gray-500 italic">
        No app rendered yet.
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-auto">
      {renderNode(tree)}
    </div>
  );
}

function renderNode(node) {
  if (!node) return null;

  // Leaf Node (No children)
  if (!node.children || node.children.length === 0) {
    return <ComponentRenderer key={node.id} node={node} />;
  }

  // Branch Node (Has children)
  // We use the node's own styling for the wrapper to allow the AI to 
  // create layouts (flex, grid, etc.)
  return (
    <div 
      key={node.id || `node-${Math.random()}`} 
      className={node.props?.className || ""}
      style={node.props?.style}
    >
      <ComponentRenderer node={node} />
      {node.children.map((child) => renderNode(child))}
    </div>
  );
}
