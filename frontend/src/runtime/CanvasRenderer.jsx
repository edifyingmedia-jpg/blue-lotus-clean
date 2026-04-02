// CanvasRenderer.jsx
// Renders an entire app tree by recursively rendering nodes.

import React from "react";
import ComponentRenderer from "./ComponentRenderer";

export default function CanvasRenderer({ tree }) {
  if (!tree) {
    return (
      <div style={{ padding: "12px", color: "#666" }}>
        No app rendered yet.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {renderNode(tree)}
    </div>
  );
}

function renderNode(node) {
  if (!node) return null;

  // If this is a leaf component
  if (!node.children || node.children.length === 0) {
    return <ComponentRenderer node={node} />;
  }

  // If this component has children, wrap them
  return (
    <div>
      <ComponentRenderer node={node} />
      {node.children.map((child, index) => (
        <div key={index}>{renderNode(child)}</div>
      ))}
    </div>
  );
}
