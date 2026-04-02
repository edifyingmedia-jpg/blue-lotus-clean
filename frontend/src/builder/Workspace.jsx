// frontend/src/builder/Workspace.jsx

import React, { useState } from "react";
import TwinPanel from "../twin/TwinPanel";
import CanvasRenderer from "../runtime/CanvasRenderer";
import ComponentPanel from "./ComponentPanel";

export default function Workspace() {
  const [app, setApp] = useState(null);

  return (
    <div style={styles.shell}>
      <header style={styles.header}>
        <strong>Blue Lotus Workspace</strong>
        <span style={{ color: "#94a3b8" }}>Architect Mode</span>
      </header>

      <div style={styles.body}>
        <aside style={styles.left}>
          <TwinPanel onBuild={setApp} />
        </aside>

        <aside style={styles.components}>
          <ComponentPanel />
        </aside>

        <main style={styles.right}>
          <CanvasRenderer app={app} />
        </main>
      </div>
    </div>
  );
}

const styles = {
  shell: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#0f172a"
  },
  header: {
    height: "48px",
    background: "#020617",
    color: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    borderBottom: "1px solid #1e293b"
  },
  body: {
    flex: 1,
    display: "flex",
    overflow: "hidden"
  },
  left: {
    width: "340px",
    background: "#020617",
    borderRight: "1px solid #1e293b",
    padding: "12px",
    overflowY: "auto"
  },
  components: {
    width: "260px",
    background: "#f7f7f7",
    borderRight: "1px solid #ddd",
    overflowY: "auto"
  },
  right: {
    flex: 1,
    background: "#0f172a",
    overflow: "auto",
    padding: "16px"
  }
};
