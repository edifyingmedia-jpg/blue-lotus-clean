// frontend/src/components/Card.jsx
import React from "react";

export default function Card({ title = "Card", children, style }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 8,
        background: "#0b1220",
        color: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        maxWidth: 480,
        ...style,
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", fontSize: 18 }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
