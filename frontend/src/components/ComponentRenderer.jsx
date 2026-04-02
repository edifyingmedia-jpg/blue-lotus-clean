// frontend/src/components/ComponentRenderer.jsx

import React from "react";
import componentRegistry from "./ComponentRegistry";

export default function ComponentRenderer({ component }) {
  if (!component || !component.type) {
    return null;
  }

  const Component = componentRegistry.getComponent(component.type);

  if (!Component) {
    return (
      <div
        style={{
          padding: 8,
          background: "#330000",
          color: "white",
        }}
      >
        Unknown component: {component.type}
      </div>
    );
  }

  return <Component {...(component.props || {})} />;
}
