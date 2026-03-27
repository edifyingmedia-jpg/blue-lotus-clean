import React from "react";

/**
 * LivePreview
 * ----------------------------------------------------
 * Runtime-safe preview renderer for the current project.
 * This component is intentionally defensive:
 * - Never throws
 * - Never mutates state
 * - Never assumes structure
 *
 * It will evolve as the runtime renderer matures.
 */

export default function LivePreview({ project }) {
  if (!project) {
    return (
      <div style={{ padding: 16, color: "#888" }}>
        No project loaded.
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h3>Live Preview</h3>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 12,
          borderRadius: 4,
          overflow: "auto",
          fontSize: 12
        }}
      >
        {JSON.stringify(project, null, 2)}
      </pre>
    </div>
  );
}
