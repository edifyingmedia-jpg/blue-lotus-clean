// ComponentRenderer.jsx
// Renders a component from the registry with its props.

import React from "react";
import { getComponent } from "./ComponentRegistry";

export default function ComponentRenderer({ node }) {
  if (!node || !node.type) {
    return null;
  }

  const Component = getComponent(node.type);

  if (!Component) {
    return (
      <div style={{ color: "red", padding: "8px" }}>
        Unknown component type: {node.type}
      </div>
    );
  }

  try {
    return <Component {...node.props} />;
  } catch (err) {
    return (
      <div style={{ color: "red", padding: "8px" }}>
        Error rendering {node.type}: {err.message}
      </div>
    );
  }
}
