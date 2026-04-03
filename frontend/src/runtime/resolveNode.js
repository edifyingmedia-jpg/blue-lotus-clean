/**
 * resolveNode.js
 * ----------------------------------------------------
 * Compatibility layer for legacy screen definitions.
 * Modern runtime uses ComponentRenderer, so this file
 * simply forwards nodes into that pipeline.
 */

import React from "react";
import ComponentRenderer from "../rxgui/components/ComponentRenderer";

export default function resolveNode(node) {
  if (!node) return null;

  try {
    return <ComponentRenderer node={node} />;
  } catch (err) {
    console.error("resolveNode error:", err);
    return (
      <div style={{ color: "red", padding: 10 }}>
        Error resolving node: {err.message}
      </div>
    );
  }
}
