// frontend/src/runtime/RenderScreen.jsx

import React from "react";
import ComponentRenderer from "./ComponentRenderer";

/**
 * RenderScreen
 * ----------------------------------------------------
 * Renders a single screen definition:
 * {
 *   id: "Home",
 *   components: [ ... ],
 *   params: { ... }
 * }
 */

export default function RenderScreen({ screen }) {
  if (!screen) {
    return (
      <div style={{ padding: 20, color: "#999" }}>
        No screen provided.
      </div>
    );
  }

  const { components = [] } = screen;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {components.map((component, index) => (
        <ComponentRenderer
          key={component.id || index}
          component={component}
          screen={screen}
        />
      ))}
    </div>
  );
}
