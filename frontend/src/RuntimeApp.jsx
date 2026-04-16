// frontend/src/RuntimeApp.jsx
import React from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { AppDefinitionProvider } from "./state/AppDefinitionContext";
import { ScreenRenderer } from "./rxgui/layouts/ScreenRenderer.component";

/**
 * RuntimeApp (Empire Edition)
 * --------------------------
 * The high-fidelity execution engine for manifested Blue Lotus nodes.
 * Optimized for cloned sites and deployed storefront applications.
 */
export default function RuntimeApp() {
  return (
    <ThemeProvider>
      <AppDefinitionProvider>
        {/* ACTUATION_LAYER: 
          Directly renders the manifest without the overhead of the builder.
          Ensures the 10% Architect Tax is the only governing logic.
        */}
        <div className="min-h-screen bg-[#09090B]">
          <ScreenRenderer />
        </div>
      </AppDefinitionProvider>
    </ThemeProvider>
  );
}
