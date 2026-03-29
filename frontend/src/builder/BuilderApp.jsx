import React, { useState } from "react";
import { ComponentPanel } from "./ComponentPanel";

/**
 * BuilderApp is now an AI‑driven builder.
 * Users do NOT click components.
 * Users speak or type instructions.
 * The AI interprets the command and updates the component tree.
 */

export default function BuilderApp() {
  const [components, setComponents] = useState([]);
  const [history, setHistory] = useState([]);

  // This is where TWIN will interpret natural language commands.
  async function handleAICommand(command) {
    // Record the command in the history panel
    setHistory((prev) => [...prev, { role: "user", text: command }]);

    // TODO: Replace this placeholder with real TWIN logic.
    // For now, we simulate the AI generating a component.
    const simulatedComponent = {
      id: `cmp_${Date.now()}`,
      type: "generated-text",
      props: { text: `AI created this from: "${command}"` },
      children: []
    };

    setComponents((prev) => [...prev, simulatedComponent]);

    setHistory((prev) => [
      ...prev,
      { role: "ai", text: `Added a component based on: "${command}"` }
    ]);
  }

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      {/* Left: AI Command Panel */}
      <aside
        style={{
          width: 300,
          borderRight: "1px solid #ddd",
          background: "#fafafa",
          overflowY: "auto"
        }}
      >
        <ComponentPanel onAICommand={handleAICommand} />

        {/* Command History */}
        <div style={{ padding: 16 }}>
          <h4>History</h4>
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
        </div>
      </aside>

      {/* Center: Canvas */}
      <main
        style={{
          flex: 1,
          background: "#fff",
          padding: 24,
          overflow: "auto"
        }}
      >
        <h2>Canvas</h2>

        {components.length === 0 && (
          <p style={{ color: "#888" }}>
            Describe what you want to build.  
            The AI will generate the app here.
          </p>
        )}

        {components.map((cmp) => (
          <div
            key={cmp.id}
            style={{
              padding: 12,
              marginBottom: 12,
              border: "1px dashed #ccc"
            }}
          >
            {cmp.props?.text || cmp.type}
          </div>
        ))}
      </main>
    </div>
  );
}
