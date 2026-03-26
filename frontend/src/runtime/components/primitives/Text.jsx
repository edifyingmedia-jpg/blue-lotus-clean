// frontend/src/components/primitives/Text.jsx

import React from "react";

/**
 * BLText
 * --------------------------------------------------
 * Basic text component for the Blue Lotus runtime.
 * Supports:
 * - text content
 * - font size
 * - color
 * - weight
 * - alignment
 */

export default function BLText({
  text = "",
  fontSize = 16,
  color = "#333",
  fontWeight = "normal",
  textAlign = "left",
  margin = "0 0 8px 0",
}) {
  return (
    <p
      style={{
        fontSize,
        color,
        fontWeight,
        textAlign,
        margin,
      }}
    >
      {text}
    </p>
  );
}
