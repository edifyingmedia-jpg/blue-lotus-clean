import React from "react";
import { useProject } from "../state";
import { findNodeById } from "../utils/findNodeById";

/**
 * Inspector
 * --------------------------------------------------
 * Displays and edits props for the currently selected component.
 */

export default function Inspector() {
  const { project, setProject, selectedId } = useProject();

  if (!project || !selectedId) {
    return (
      <div style={{ padding: 16, color: "#888" }}>
        No component selected.
      </div>
    );
  }

  const node = findNodeById(project.root, selectedId);

  if (!node) {
    return (
      <div style={{ padding: 16, color: "red" }}>
        Selected component not found.
      </div>
    );
  }

  function updateProp(key, value) {
    function updateNode(current) {
      if (current.id === selectedId) {
        return {
          ...current,
          props: {
            ...current.props,
            [key]: value,
          },
        };
      }

      if (Array.isArray(current.children)) {
        return {
          ...current,
          children: current.children.map(updateNode),
        };
      }

      return current;
    }

    setProject({
      ...project,
      root: updateNode(project.root),
    });
  }

  return (
    <div style={{ padding: 16 }}>
      <h3>Inspector</h3>

      {Object.entries(node.props || {}).map(([key, value]) => (
        <div key={key} style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: 12 }}>{key}</label>
          <input
            type="text"
            value={value}
            onChange={(e) => updateProp(key, e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      ))}
    </div>
  );
}
