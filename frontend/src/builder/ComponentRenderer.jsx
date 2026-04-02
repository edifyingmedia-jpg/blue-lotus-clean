// frontend/src/builder/ComponentRenderer.jsx

import React from "react";
import componentRegistry from "../components/ComponentRegistry";

/**
 * ComponentRenderer
 * -----------------
 * Looks up a component by name from the runtime registry
 * and renders it with the provided props.
 */

export default function ComponentRenderer({ type, props }) {
  const Component = componentRegistry.getComponent(type);

  if (!Component) {
    return (
      <div style={{ padding: 12, border: "1px dashed red" }}>
        Unknown component type: <strong>{type}</strong>
      </div>
    );
  }

  return <Component {...props} />;
}
