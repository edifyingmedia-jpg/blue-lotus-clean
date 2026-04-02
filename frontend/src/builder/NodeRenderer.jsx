// frontend/src/builder/NodeRenderer.jsx

import React from "react";
import { RegistryV2 } from "./components/registry.jsx";

/**
 * NodeRenderer (Updated)
 * ----------------------
 * Uses RegistryV2 — same registry as CanvasRenderer.
 * Renders node.props and node.children consistently.
 */

export default function NodeRenderer({ node }) {
  if (!node || !node.type) {
    return null;
  }

  const Renderer = RegistryV2[node.type];

  if (!Renderer) {
    return (
      <div style={{ padding: 8, background: "#330000", color: "white" }}>
        Unknown component: {node.type}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <Renderer {...(node.props || {})} />

      {node.children?.length > 0 && (
        <div style={{ marginLeft: 16, marginTop: 8 }}>
          {node.children.map((child) => (
            <NodeRenderer key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
