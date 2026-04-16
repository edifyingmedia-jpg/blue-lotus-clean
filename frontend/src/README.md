// frontend/src/App.jsx
import React from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { AppDefinitionProvider, ProjectProvider } from "./state";
import AppRouter from "./AppRouter";
import "./index.css";

/**
 * App (Empire Edition)
 * -------------------
 * The master entry point for the Blue Lotus Monolith.
 * Fuses the Neural Bridge, the Project Builder, and the Atmospheric Palette.
 */
function App() {
  return (
    <ThemeProvider>
      <AppDefinitionProvider>
        <ProjectProvider>
          {/* THE MASTER SWITCHBOARD */}
          <AppRouter />
        </ProjectProvider>
      </AppDefinitionProvider>
    </ThemeProvider>
  );
}

export default App;
