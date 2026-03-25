import React from "react";
import { AppLayout } from "./layout";
import { AppRouter } from "./router";
import { ProjectProvider, useProject } from "./state";

function AppContent() {
  const { project } = useProject();

  return (
    <AppLayout>
      <AppRouter project={project} />
    </AppLayout>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
}
