// frontend/src/builder/CanvasRenderer.jsx

import React from "react";

/**
 * Registry of supported component types.
 * You can expand this easily as TWIN PRIME evolves.
 */
const COMPONENTS = {
  "generated-text": ({ text }) => (
    <div style={{ fontSize: 16, padding: "4px 0" }}>{text}</div>
  ),

  button: ({ text }) => (
    <button
      style={{
        padding: "8px 16px",
        background: "#4a6cf7",
        color: "white",
        border: "none",
        borderRadius: 4,
        cursor: "pointer"
      }}
    >
      {text || "Button"}
    </button>
  ),

  input: ({ text }) => (
    <input
      placeholder={text || "Input"}
      style={{
        padding: 8,
        border: "1px solid #ccc",
        borderRadius: 4,
        width: "100%"
      }}
    />
  ),

  image: ({ src, alt }) => (
    <img
      src={src || "https://via.placeholder.com/150"}
      alt={alt || "Image"}
      style={{ maxWidth: "100%", borderRadius: 4 }}
    />
  )
};

/**
 * Renders a single component node.
 */
function RenderNode({ node }) {
  const Renderer = COMPONENTS[node.type];

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
