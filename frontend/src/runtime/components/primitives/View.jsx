// frontend/src/runtime/components/primitives/View.jsx

import React from "react";

/**
 * BLView
 * --------------------------------------------------
 * A flexible container component for grouping children.
 * Supports:
 * - padding
 * - margin
 * - background color
 * - border radius
 * - layout direction
 */

export default function BLView({
  children,
  padding = "0",
  margin = "0 0 8px 0",
  background = "transparent",
  borderRadius = "0",
  flexDirection = "column",
  gap = "0",
}) {
  return (
    <div
      style={{
        padding,
        margin,
        background,
        borderRadius,
        display: "flex",
        flexDirection,
        gap,
      }}
    >
      {children}
    </div>
  );
}
