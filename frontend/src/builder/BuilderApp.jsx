import React from "react";
import { useProject } from "../state";
import { ComponentPanel } from "../components";
import { PageRenderer } from "../pages";

export default function BuilderApp() {
  const { project, setProject } = useProject();

  if (!project) {
    return (
      <div style={{ padding: 20 }}>
        <h2>No project loaded</h2>
        <p>Use the Builder to create or load a project.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ width: 280, borderRight: "1px solid #ddd" }}>
        <ComponentPanel
          onAddComponent={(component) => {
            const updated = { ...project };
            updated.pages[0].components.push(component);
            setProject(updated);
          }}
        />
      </div>

      <div style={{ flex: 1, padding: 20 }}>
        <PageRenderer page={project.pages[0]} />
      </div>
    </div>
  );
}
