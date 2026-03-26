// frontend/src/runtime/components/primitives/Image.jsx

import React from "react";

/**
 * BLImage
 * --------------------------------------------------
 * Basic image component for the Blue Lotus runtime.
 * Supports:
 * - src
 * - alt text
 * - width / height
 * - border radius
 * - object fit
 */

export default function BLImage({
  src = "",
  alt = "",
  width = "100%",
  height = "auto",
  borderRadius = "6px",
  objectFit = "cover",
  margin = "0 0 8px 0",
}) {
  if (!src) {
    return (
      <div
        style={{
          padding: "12px",
          background: "#f8d7da",
          color: "#721c24",
          borderRadius: "6px",
          margin,
        }}
      >
        Missing image source
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height,
        borderRadius,
        objectFit,
        display: "block",
        margin,
      }}
    />
  );
}
