import React from "react";

export default function BuilderApp({ components }) {
  return (
    <div style={{ padding: 24 }}>
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
    </div>
  );
}
