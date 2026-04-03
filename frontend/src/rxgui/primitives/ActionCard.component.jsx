import React from "react";

export default function ActionCard({
  children,
  padding = "16px",
  margin = "0 0 16px 0",
  background = "#ffffff",
  border = "1px solid #e5e5e5",
  borderRadius = 8,
  shadow = "0 1px 3px rgba(0,0,0,0.08)",
  width = "100%",
}) {
  return (
    <div
      style={{
        padding,
        margin,
        background,
        border,
        borderRadius,
        boxShadow: shadow,
        width,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}
