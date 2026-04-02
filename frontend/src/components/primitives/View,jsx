import React from "react";

export default function View({
  children,
  direction = "column",
  padding = 0,
  margin = 0,
  gap = 0,
  width = "100%",
  height = "auto",
  background,
  radius,
  style = {}
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        padding,
        margin,
        gap,
        width,
        height,
        background,
        borderRadius: radius,
        boxSizing: "border-box",
        ...style
      }}
    >
      {children}
    </div>
  );
}
