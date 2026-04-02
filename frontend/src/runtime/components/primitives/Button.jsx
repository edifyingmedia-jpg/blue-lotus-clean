import React from "react";

export default function Button({ text, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        background: "#f5f5f5",
        cursor: "pointer",
        ...style
      }}
    >
      {text}
    </button>
  );
}
