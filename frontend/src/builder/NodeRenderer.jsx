// frontend/src/builder/NodeRenderer.jsx

import React from "react";
import componentRegistry from "../components/ComponentRegistry";

export default function NodeRenderer({ node }) {
  if (!node || !node.type) {
    return null;
  }

  const Component = componentRegistry.getComponent(node.type);

  if (!Component) {
    return (
      <div style={{ padding: 8, background: "#330000", color: "white" }}>
        Unknown component: {node.type}
      </div>
    );
  }

  return <Component {...(node.props || {})} />;
}
