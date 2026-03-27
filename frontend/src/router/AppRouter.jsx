import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BuilderLayout } from "../layout";
import { ComponentPanel } from "../builder";
import { PageRenderer } from "../pages";
import { useProject } from "../state";

export default function AppRouter() {
  const { project } = useProject();

  return (
    <BrowserRouter>
      <Routes>
        {/* Builder Route */}
        <Route
          path="/"
          element={
            <BuilderLayout
              left={<ComponentPanel addComponent={project.addComponent} />}
              right={<PageRenderer page={project.currentPage} />}
            />
          }
        />

        {/* Future: Additional routes can go here */}
      </Routes>
    </BrowserRouter>
  );
}
