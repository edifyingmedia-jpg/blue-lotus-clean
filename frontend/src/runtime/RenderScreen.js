import React from "react";
import resolveNode from "./resolveNode";

/**
 * RenderScreen
 * ------------
 * Renders a full screen definition by resolving its root node.
 */

export default function RenderScreen({ screen }) {
  if (!screen || !screen.root) {
    console.warn("RenderScreen: No screen or root node provided.");
    return null;
  }

  try {
    return resolveNode(screen.root);
  } catch (err) {
    console.error("Error rendering screen:", err);
    return (
      <div style={{ padding: 20, color: "red" }}>
        <strong>Render Error:</strong> {err.message}
      </div>
    );
  }
}
