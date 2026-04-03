import React from "react";

export default function ActionContainer({
  children,
  padding = "12px",
  margin = "0 0 16px 0",
  background = "transparent",
  border = "none",
  borderRadius = 6,
  width = "100%",
  height = "auto",
}) {
  return (
    <div
      style={{
        padding,
        margin,
        background,
        border,
        borderRadius,
        width,
        height,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}
