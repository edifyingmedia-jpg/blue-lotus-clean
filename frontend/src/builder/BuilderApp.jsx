import React, { useState } from "react";
import { CanvasRenderer } from "./CanvasRenderer";
import { interpretCommand } from "./ai/interpretCommand";
import { RegistryV2 } from "./components/registry.jsx";

/**
 * BuilderApp (Final Version)
 * --------------------------
 * - Single source of truth: `tree`
 * - AI commands produce a unified node tree
 * - CanvasRenderer renders the full app structure
 * - History panel shows all AI interactions
 */

export default function BuilderApp() {
  const [tree, setTree] = useState(null);        // unified node tree
  const [history, setHistory] = useState([]);    // AI + user messages

  async function handleAICommand(command) {
    setHistory((prev) => [...prev, { role: "user", text: command }]);

    const result = await interpretCommand(command);

    setHistory((prev) => [
      ...prev,
      {
        role: "ai",
        text: `Interpreted as: ${result.intent} → ${result.structureType}`
      }
    ]);

    // The interpreter now returns a unified node tree
    if (result.structureType === "tree" && result.tree) {
      setTree(result.tree);
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      {/* LEFT PANEL */}
      <aside
        style={{
          width: 320,
          borderRight: "1px solid #ddd",
          background: "#fafafa",
          overflowY: "auto",
          padding: 16
        }}
      >
        <h3>AI Builder</h3>

        <AIInput onSubmit={handleAICommand} />

        <h4 style={{ marginTop: 24 }}>History</h4>
        {history.map((entry, i) => (
          <div
            key={i}
            style={{
              marginBottom: 8,
              padding: 8,
              background: entry.role === "user" ? "#eef" : "#efe",
              borderRadius: 4
            }}
          >
            <strong>{entry.role === "user" ? "You" : "AI"}:</strong>{" "}
            {entry.text}
          </div>
        ))}
      </aside>

      {/* CANVAS */}
      <main
        style={{
          flex: 1,
          background: "#fff",
          padding: 24,
          overflow: "auto"
        }}
      >
        <h2>Canvas</h2>

        {!tree && (
          <p style={{ color: "#888" }}>
            Describe the app you want to build.  
            The AI will generate a live UI here.
          </p>
        )}

        {tree && (
          <div
            style={{
              padding: 16,
              border: "2px solid #4a6cf7",
              borderRadius: 6
            }}
          >
            <CanvasRenderer node={tree} registry={RegistryV2} />
          </div>
        )}
      </main>
    </div>
  );
}

/* -------------------------------------------------------------
   AI INPUT COMPONENT
------------------------------------------------------------- */

function AIInput({ onSubmit }) {
  const [value, setValue] = useState("");

  function send() {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue("");
  }

  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Describe the UI or app you want to build"
        style={{ width: "100%", minHeight: 80 }}
      />
      <button onClick={send} style={{ marginTop: 8 }}>
        Build
      </button>
    </div>
  );
}
