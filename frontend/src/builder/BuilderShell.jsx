import React from "react";
import { CanvasRenderer } from "../runtime";
import AICommandPanel from "./AICommandPanel";

export default function BuilderShell() {
  return (
    <div style={styles.shell}>
      <aside style={styles.left}>
        <AICommandPanel />
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
  rightHeader: {
    padding: "14px 16px",
    borderBottom: "1px solid #1f2937",
    fontWeight: 600,
    letterSpacing: "0.2px",
  },
  rightBody: {
    padding: "0px",
    overflow: "auto",
  },
};
