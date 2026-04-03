import React from "react";
import ActionEngine from "../runtime/ActionEngine";

export default function ActionImage({
  src = "",
  alt = "",
  action = null,
  params = {},
  width = "100%",
  height = "auto",
  margin = "0 0 12px 0",
  borderRadius = 6,
  objectFit = "cover",
}) {
  const handleClick = () => {
    if (!action) return;

    try {
      const engine = new ActionEngine({});
      engine.run(action, params);
    } catch (err) {
      console.error("ActionImage error:", err);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      onClick={handleClick}
      style={{
        width,
        height,
        margin,
        borderRadius,
        objectFit,
        cursor: action ? "pointer" : "default",
      }}
    />
  );
}
