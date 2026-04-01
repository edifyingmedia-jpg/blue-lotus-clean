// frontend/src/components/Button.jsx
import React from "react";

export default function Button({ children, onClick, style, ...rest }) {
  return (
    <button
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      style={{
        display: "inline-block",
        padding: "8px 12px",
        borderRadius: 6,
        border: "none",
        background: "linear-gradient(90deg,#0ea5a4,#06b6d4)",
        color: "#fff",
        cursor: "pointer",
        fontSize: 14,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
