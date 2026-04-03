import React from "react";
import RenderScreen from "../../runtime/RenderScreen";

/**
 * ScreenRenderer.component.jsx
 * ----------------------------
 * This component receives a `screen` object (from the app definition)
 * and renders it through the runtime RenderScreen engine.
 */

export default function ScreenRenderer({ screen }) {
  if (!screen) {
    console.warn("⚠ ScreenRenderer: No screen provided.");
    return null;
  }

  return (
    <div
      className="bl-screen-renderer"
      data-screen={screen?.name || "unknown"}
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <RenderScreen screen={screen} />
    </div>
  );
}
