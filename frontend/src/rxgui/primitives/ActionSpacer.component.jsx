import React from "react";

export default function ActionSpacer({
  height = 12,
  width = "100%",
}) {
  return (
    <div
      style={{
        height,
        width,
      }}
    />
  );
}
