import React from "react";

export default function ActionGroup({
  children,
  direction = "column",
  gap = 12,
  margin = "0 0 16px 0",
  align = "stretch",
  justify = "flex-start",
  width = "100%",
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        gap,
        margin,
        alignItems: align,
        justifyContent: justify,
        width,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}
