// frontend/src/components/LivePreview.jsx

import React from "react";
import componentRegistry from "./ComponentRegistry";

export default function LivePreview({ tree }) {
  if (!tree || !tree.type) {
    return null;
  }

  const Component = componentRegistry.getComponent(tree.type);

  if (!Component) {
    return (
      <div
        style={{
          padding: 8,
          background: "#330000",
          color: "white",
        }}
      >
        Unknown component: {tree.type}
      </div>
    );
  }

  return <Component {...(tree.props || {})} />;
}
