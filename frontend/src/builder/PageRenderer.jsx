import React from "react";
import { ComponentRenderer } from "../components";
import { useProject } from "../state/ProjectContext";

/**
 * PageRenderer (Builder)
 * Renders the currently selected page inside the Builder UI.
 * This is NOT the runtime renderer — that is in /runtime.
 * This version is Builder‑aware and safe for editing mode.
 */
export default function PageRenderer() {
  const { project } = useProject();

  if (!project || !project.pages || project.pages.length === 0) {
    return (
      <div style={{ padding: 20, color: "#666" }}>
        No pages found in project.
      </div>
    );
  }

  const currentPage = project.pages.find(
    (p) => p.id === project.currentPageId
  );

  if (!currentPage) {
    return (
      <div style={{ padding: 20, color: "#666" }}>
        No page selected.
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 20,
        background: "#fafafa",
        border: "1px solid #ddd",
        borderRadius: 6,
        minHeight: 300,
        overflow: "auto"
      }}
    >
      {currentPage.components.map((component) => (
        <ComponentRenderer key={component.id} component={component} />
      ))}
    </div>
  );
}
