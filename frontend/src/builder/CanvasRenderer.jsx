// frontend/src/builder/CanvasRenderer.jsx

import React from "react";
import { RegistryV2 } from "./components/registry";

/**
 * Renders a single component node using RegistryV2.
 */
function RenderNode({ node }) {
  const Renderer = RegistryV2[node.type];

  if (!Renderer) {
    return (
      <div
        style={{
          padding: 12,
          border: "1px dashed red",
          marginBottom: 8
        }}
      >
        Unknown component type: <strong>{node.type}</strong>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 12 }}>
      {/* Render the component */}
      <Renderer {...node.props} />

      {/* Render children recursively */}
      {node.children?.length > 0 && (
        <div style={{ marginLeft: 16, marginTop: 8 }}>
          {node.children.map((child) => (
            <RenderNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Main Canvas Renderer
 */
export function CanvasRenderer({ components }) {
  if (!components || components.length === 0) {
    return (
      <p style={{ color: "#888" }}>
        No components to render. Use the AI panel to generate UI.
      </p>
    );
  }

  return (
    <div>
      {components.map((node) => (
        <RenderNode key={node.id} node={node} />
      ))}
    </div>
  );
}
