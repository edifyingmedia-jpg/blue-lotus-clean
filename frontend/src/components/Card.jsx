// frontend/src/components/Card.jsx
import React from "react";

export default function Card({ title = "Card", children }) {
  return (
    <div style={{ padding: 16, borderRadius: 8, background: "#0b1220", color: "#fff" }}>
      <h3 style={{ margin: "0 0 8px 0" }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
