import React from "react";

export default function ActionDivider({
  thickness = 1,
  color = "#e0e0e0",
  margin = "12px 0",
  width = "100%",
}) {
  return (
    <div
      style={{
        width,
        height: thickness,
        backgroundColor: color,
        margin,
      }}
    />
  );
}
