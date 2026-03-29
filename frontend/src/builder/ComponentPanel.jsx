import React from "react";

const DEFAULT_COMPONENTS = [
  { type: "text", label: "Text" },
  { type: "button", label: "Button" },
  { type: "image", label: "Image" }
];

function generateId(prefix = "cmp") {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function ComponentPanel({ onAddComponent }) {
  return (
    <div style={{ padding: 16 }}>
      <h3>Components</h3>

      {DEFAULT_COMPONENTS.map((item) => (
        <div
          key={item.type}
          style={{
            padding: "8px 12px",
            marginBottom: 8,
            border: "1px solid #ccc",
            borderRadius: 4,
            cursor: "pointer"
          }}
          onClick={() => {
            const component = {
              id: generateId(),
              type: item.type,
              props: {},
              children: []
            };

            onAddComponent(component);
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
