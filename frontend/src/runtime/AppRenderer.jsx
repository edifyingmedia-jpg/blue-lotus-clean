import React from "react";
import { ComponentRenderer } from "../components";
import { validateAppDefinition } from "./AppDefinitionValidator";

/**
 * AppRenderer
 * Renders the entire app at runtime using the validated project definition.
 */
export default function AppRenderer({ project }) {
  const validation = validateAppDefinition(project);

  if (!validation.valid) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        Runtime Error: {validation.error}
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
        background: "#fff",
        minHeight: "100vh",
        overflow: "auto"
      }}
    >
      {currentPage.components.map((component) => (
        <ComponentRenderer key={component.id} component={component} />
      ))}
    </div>
  );
}
