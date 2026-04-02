import React from "react";

export default function Text({
  children,
  color = "#000",
  size = 16,
  weight = "normal",
  align = "left",
  style = {}
}) {
  return (
    <span
      style={{
        color,
        fontSize: size,
        fontWeight: weight,
        textAlign: align,
        display: "block",
        ...style
      }}
    >
      {children}
    </span>
  );
}
