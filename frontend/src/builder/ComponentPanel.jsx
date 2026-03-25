import React from "react";
import { generateId } from "../utils";

const DEFAULT_COMPONENTS = [
  { type: "text", label: "Text" },
  { type: "button", label: "Button" },
  { type: "image", label: "Image" }
];

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
              id: generateId("cmp"),
              type: item.type,
              props: {}
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
