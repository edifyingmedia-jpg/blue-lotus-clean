import React from "react";
import ActionEngine from "../../runtime/ActionEngine";

export default function ActionText({
  text = "",
  action = null,
  params = {},
  color = "#333",
  fontSize = 16,
  margin = "0 0 12px 0",
}) {
  const handleClick = () => {
    if (!action) return;

    try {
      const engine = new ActionEngine({});
      engine.run(action, params);
    } catch (err) {
      console.error("ActionText error:", err);
    }
  };

  return (
    <div
      onClick={action ? handleClick : undefined}
      style={{
        color,
        fontSize,
        margin,
        cursor: action ? "pointer" : "default",
      }}
    >
      {text}
    </div>
  );
}
