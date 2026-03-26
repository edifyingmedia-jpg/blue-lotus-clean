// frontend/src/runtime/PageRenderer.jsx

import React from "react";
import ComponentRenderer from "./ComponentRenderer";

/**
 * PageRenderer renders a single page from the app definition.
 * It loops through the page's components and renders each one.
 */
export default function PageRenderer({
  page,
  selectedComponentId,
}) {
  if (!page) {
    return (
      <div style={{
        padding: "1rem",
        background: "#e7f3ff",
        border: "1px solid #b3daff",
        borderRadius: "6px",
        color: "#004085"
      }}>
        <h3>No Page Loaded</h3>
        <p>The runtime attempted to render a page, but none was provided.</p>
      </div>
    );
  }

  const { components = [] } = page;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {components.map((component) => (
        <ComponentRenderer
          key={component.id}
          component={component}
          selectedComponentId={selectedComponentId}
        />
      ))}
    </div>
  );
}
