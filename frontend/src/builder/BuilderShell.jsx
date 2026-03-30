import React from "react";
import { CanvasRenderer } from "../runtime";

export default function BuilderShell() {
  return (
    <div style={styles.shell}>
      <aside style={styles.left}>
        <div style={styles.leftHeader}>TWIN</div>

        {/* Placeholder until AICommandPanel.jsx exists */}
        <div style={styles.leftBody}>
          <div style={styles.placeholderTitle}>AI command panel</div>
          <div style={styles.placeholderText}>
            Next file: <code>frontend/src/builder/AICommandPanel.jsx</code>
          </div>
        </div>
      </aside>

      <main style={styles.right}>
        <div style={styles.rightHeader}>Preview</div>
        <div style={styles.rightBody}>
          <CanvasRenderer />
        </div>
      </main>
    </div>
  );
}

const styles = {
  shell: {
    display: "grid",
    gridTemplateColumns: "360px 1fr",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "#070a10",
    color: "#e5e7eb",
  },
  left: {
    borderRight: "1px solid #1f2937",
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  right: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  leftHeader: {
    padding: "14px 16px",
    borderBottom: "1px solid #1f2937",
    fontWeight: 600,
    letterSpacing: "0.2px",
  },
  rightHeader: {
    padding: "14px 16px",
    borderBottom: "1px solid #1f2937",
    fontWeight: 600,
    letterSpacing: "0.2px",
  },
  leftBody: {
    padding: "16px",
    overflow: "auto",
  },
  rightBody: {
    padding: "0px",
    overflow: "auto",
  },
  placeholderTitle: {
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "8px",
  },
  placeholderText: {
    fontSize: "13px",
    color: "#9ca3af",
    lineHeight: 1.5,
  },
};
