import React from "react";
import ComponentRegistry from "../../runtime/ComponentRegistry";

/**
 * ComponentRenderer.jsx
 * ---------------------
 * Renders a single component node using the ComponentRegistry.
 */

export default function ComponentRenderer({ node }) {
  if (!node || !node.type) {
    console.warn("⚠ ComponentRenderer: Invalid node:", node);
    return null;
  }

  const Component = ComponentRegistry[node.type];

  if (!Component) {
    console.error(`❌ ComponentRenderer: Unknown component type "${node.type}"`);
    return (
      <div style={{ color: "red", padding: "8px" }}>
        Unknown component: {node.type}
      </div>
    );
  }

  try {
    return <Component {...node.props} children={node.children} />;
  } catch (err) {
    console.error("ComponentRenderer error:", err);
    return (
      <div style={{ color: "red", padding: "8px" }}>
        Error rendering component: {node.type}
      </div>
    );
  }
}
