import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComponentPanel } from "../builder";
import LivePreview from "../components/LivePreview";
import Inspector from "../components/Inspector";
import { useProject } from "../state";

export default function AppRouter() {
  const { project } = useProject();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BuilderLayout
              left={<ComponentPanel addComponent={project.addComponent} />}
              right={
                <div style={{ display: "flex", height: "100%" }}>
                  <div style={{ flex: 2, borderRight: "1px solid #ddd" }}>
                    <LivePreview project={project} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Inspector />
                  </div>
                </div>
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
