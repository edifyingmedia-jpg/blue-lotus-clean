// frontend/src/runtime/ComponentRenderer.jsx

import React from "react";
import { getComponent } from "./ComponentRegistry";

/**
 * ComponentRenderer dynamically renders a component
 * based on its type and props from the app definition.
 *
 * This is the core of the Blue Lotus runtime.
 */
export default function ComponentRenderer({
  component,
  selectedComponentId,
}) {
  if (!component) return null;

  const { id, type, props, children } = component;

  // Look up the actual React component from the registry
  const ResolvedComponent = getComponent(type);

  if (!ResolvedComponent) {
    return (
      <div style={{
        padding: "0.5rem",
        background: "#ffe6e6",
        border: "1px solid #ffb3b3",
        borderRadius: "4px",
        color: "#990000",
        margin: "0.25rem 0"
      }}>
        Unknown component type: <strong>{type}</strong>
      </div>
    );
  }

  // Highlight selected component in the preview
  const isSelected = id === selectedComponentId;

  const wrapperStyle = isSelected
    ? {
        outline: "2px solid #4A90E2",
        borderRadius: "4px",
        padding: "2px",
      }
    : {};

  return (
    <div style={wrapperStyle}>
      <ResolvedComponent {...props}>
        {Array.isArray(children) &&
          children.map((child) => (
            <ComponentRenderer
              key={child.id}
              component={child}
              selectedComponentId={selectedComponentId}
            />
          ))}
      </ResolvedComponent>
    </div>
  );
}
