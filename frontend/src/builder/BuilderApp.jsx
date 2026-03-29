import React, { useState } from "react";
import { ComponentPanel } from "./ComponentPanel";

export default function BuilderApp() {
  const [components, setComponents] = useState([]);

  function handleAddComponent(component) {
    setComponents((prev) => [...prev, component]);
  }

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      {/* Left Sidebar */}
      <aside
        style={{
          width: 260,
          borderRight: "1px solid #ddd",
          background: "#fafafa",
          overflowY: "auto"
        }}
      >
        <ComponentPanel onAddComponent={handleAddComponent} />
      </aside>

      {/* Canvas */}
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
            Click a component on the left to add it to the canvas.
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
            {cmp.type}
          </div>
        ))}
      </main>
    </div>
  );
}
