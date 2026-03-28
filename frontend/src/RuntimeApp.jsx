import React from "react";
import AppLayout from "./layout/AppLayout.jsx";
import AppRouter from "./router/AppRouter.jsx";
import { ProjectProvider } from "./state/ProjectContext.jsx";

export default function RuntimeApp() {
  return (
    <ProjectProvider>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </ProjectProvider>
  );
}
