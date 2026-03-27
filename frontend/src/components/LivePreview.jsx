import React from "react";
import { getComponent } from "../runtime/ComponentRegistry";

/**
 * LivePreview
 * ----------------------------------------------------
 * Runtime renderer for the current project definition.
 * Safely renders component trees using the ComponentRegistry.
 */

function renderNode(node) {
  if (!node || typeof node !== "object") {
    return null;
  }

  const { id, type, props = {}, children = [] } = node;
  const Component = getComponent(type);

  if (!Component) {
    return (
      <div
        key={id}
        style={{
          padding: 8,
          border: "1px dashed red",
          color: "red",
          marginBottom: 8,
        }}
      >
        Unknown component type: <strong>{type}</strong>
      </div>
    );
  }

  return (
    <Component key={id} {...props}>
      {Array.isArray(children)
        ? children.map((child) => renderNode(child))
        : null}
    </Component>
  );
}

export default function LivePreview({ project }) {
  if (!project || !project.root) {
    return (
      <div style={{ padding: 16, color: "#888" }}>
        No project loaded.
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h3>Live Preview</h3>
      {renderNode(project.root)}
    </div>
  );
}
