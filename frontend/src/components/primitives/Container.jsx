import React from "react";

export default function Container({
  children,
  padding = 0,
  margin = 0,
  maxWidth = "100%",
  style = {}
}) {
  return (
    <div
      style={{
        padding,
        margin,
        maxWidth,
        boxSizing: "border-box",
        ...style
      }}
    >
      {children}
    </div>
  );
}
