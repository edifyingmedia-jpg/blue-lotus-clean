import React from "react";
import { getComponent } from "../runtime/ComponentRegistry";
import { useProject } from "../state";

/**
 * LivePreview
 * ----------------------------------------------------
 * Interactive runtime renderer with selection support.
 */

function RenderNode({ node }) {
  const { selectedId, setSelectedId } = useProject();

  if (!node || typeof node !== "object") return null;

  const { id, type, props = {}, children = [] } = node;
  const Component = getComponent(type);

  const isSelected = selectedId === id;

  if (!Component) {
    return (
      <div
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
    <div
      style={{
        outline: isSelected ? "2px solid #4da3ff" : "none",
        outlineOffset: 2,
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(id);
      }}
    >
      <Component {...props}>
        {Array.isArray(children)
          ? children.map((child) => (
              <RenderNode key={child.id} node={child} />
            ))
          : null}
      </Component>
    </div>
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
      <RenderNode node={project.root} />
    </div>
  );
}
