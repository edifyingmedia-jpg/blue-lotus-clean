// AppRenderer.jsx
// Top-level renderer that validates the app definition and renders the canvas.

import React from "react";
import AppDefinitionValidator from "./AppDefinitionValidator";
import CanvasRenderer from "./CanvasRenderer";

export default function AppRenderer({ appDefinition }) {
  const validation = AppDefinitionValidator.validate(appDefinition);

  if (!validation.valid) {
    return (
      <div style={{ color: "red", padding: "12px" }}>
        {validation.error}
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <CanvasRenderer tree={appDefinition.tree} />
    </div>
  );
}
