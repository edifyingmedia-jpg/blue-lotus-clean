import React from "react";

export default function ComponentPanel({ addComponent }) {
  const basicComponents = [
    { type: "text", label: "Text" },
    { type: "button", label: "Button" },
    { type: "input", label: "Input Field" }
  ];

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Components</h3>
      {basicComponents.map((comp) => (
        <button
          key={comp.type}
          style={{ display: "block", marginBottom: 10 }}
          onClick={() => addComponent(comp.type)}
        >
          Add {comp.label}
        </button>
      ))}
    </div>
  );
}
