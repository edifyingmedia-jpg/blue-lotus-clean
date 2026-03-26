// frontend/src/runtime/components/primitives/Button.jsx

import React from "react";

/**
 * BLButton
 * --------------------------------------------------
 * Basic button component for the Blue Lotus runtime.
 * Supports:
 * - label text
 * - background color
 * - text color
 * - padding
 * - border radius
 * - onClick (safe, no user code execution)
 */

export default function BLButton({
  label = "Button",
  background = "#4A90E2",
  color = "#fff",
  padding = "10px 16px",
  borderRadius = "6px",
  fontSize = 16,
  fontWeight = "600",
  onClick, // optional, safe handler
  margin = "0 0 8px 0",
}) {
  return (
    <button
      style={{
        background,
        color,
        padding,
        borderRadius,
        fontSize,
        fontWeight,
        border: "none",
        cursor: "pointer",
        margin,
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
