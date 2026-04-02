// frontend/src/builder/ComponentRenderer.jsx

import React from "react";
import { RegistryV2 } from "./components/registry.jsx";

/**
 * ComponentRenderer (Updated)
 * ---------------------------
 * Uses RegistryV2 — the same registry used by CanvasRenderer.
 * Renders node.props and node.children consistently with the new system.
 */

export default function ComponentRenderer({ node }) {
  if (!node) {
    return (
      <div style={{ padding: 12, border: "1px dashed red" }}>
        Missing node
      </div>
    );
  }

  const Renderer = RegistryV2[node.type];

  if (!Renderer) {
    return (
      <div style={{ padding: 12, border: "1px dashed red" }}>
        Unknown component type: <strong>{node.type}</strong>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <Renderer {...node.props} />

      {node.children?.length > 0 && (
        <div style={{ marginLeft: 16, marginTop: 8 }}>
          {node.children.map((child) => (
            <ComponentRenderer key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
