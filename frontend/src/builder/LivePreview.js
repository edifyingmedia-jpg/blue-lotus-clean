import React from "react";
import { ComponentRenderer } from "../components";
import { useProject } from "../state/ProjectContext";

export default function LivePreview() {
  const { project } = useProject();

  if (!project || !project.pages || project.pages.length === 0) {
    return (
      <div style={{ padding: 20, color: "#666" }}>
        No pages found in project.
      </div>
    );
  }

  const currentPage = project.pages.find((p) => p.id === project.currentPageId);

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
        background: "#fff",
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
