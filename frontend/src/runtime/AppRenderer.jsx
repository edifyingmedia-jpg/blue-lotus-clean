// frontend/src/runtime/AppRenderer.jsx

import React from "react";
import PageRenderer from "./PageRenderer";
import StateManager from "./StateManager";

/**
 * AppRenderer is the root runtime renderer.
 * It renders a single page using the full app definition
 * and provides runtime state to all components.
 */
export default function AppRenderer({
  appDefinition,
  page,
  selectedComponentId,
  mode = "runtime",
}) {
  if (!appDefinition || !page) {
    return (
      <div
        style={{
          padding: "1rem",
          background: "#f8f9fa",
          border: "1px solid #dee2e6",
          borderRadius: "6px",
          color: "#495057",
        }}
      >
        <h3>Nothing to Render</h3>
        <p>The app definition or page is missing.</p>
      </div>
    );
  }

  return (
    <StateManager initialState={appDefinition.state || {}}>
      <div
        data-runtime-mode={mode}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <PageRenderer
          page={page}
          selectedComponentId={selectedComponentId}
        />
      </div>
    </StateManager>
  );
}
