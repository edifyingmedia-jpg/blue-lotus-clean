// frontend/src/components/Button.jsx
import React from "react";

export default function Button({ children = "Button", onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 12px",
        borderRadius: 6,
        border: "none",
        background: "#0ea5a4",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
