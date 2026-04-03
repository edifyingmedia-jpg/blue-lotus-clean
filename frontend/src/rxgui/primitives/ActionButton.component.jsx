import React from "react";
import ActionEngine from "../runtime/ActionEngine";

export default function ActionButton({
  label = "Button",
  action = null,
  params = {},
  background = "#3366ff",
  color = "#ffffff",
  padding = "10px 16px",
  fontSize = 16,
  fontWeight = "600",
  borderRadius = 6,
  margin = "0 0 12px 0",
}) {
  const handleClick = () => {
    if (!action) return;

    try {
      const engine = new ActionEngine({});
      engine.run(action, params);
    } catch (err) {
      console.error("ActionButton error:", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background,
        color,
        padding,
        fontSize,
        fontWeight,
        borderRadius,
        margin,
        border: "none",
        cursor: action ? "pointer" : "default",
      }}
    >
      {label}
    </button>
  );
}
