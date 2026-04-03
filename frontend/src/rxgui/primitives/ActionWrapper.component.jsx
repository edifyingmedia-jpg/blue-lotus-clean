import React from "react";
import ActionEngine from "../../runtime/ActionEngine";

export default function ActionWrapper({
  children,
  action = null,
  params = {},
  margin = "0 0 12px 0",
  padding = "0",
}) {
  const handleClick = () => {
    if (!action) return;

    try {
      const engine = new ActionEngine({});
      engine.run(action, params);
    } catch (err) {
      console.error("ActionWrapper error:", err);
    }
  };

  return (
    <div
      onClick={action ? handleClick : undefined}
      style={{
        margin,
        padding,
        cursor: action ? "pointer" : "default",
      }}
    >
      {children}
    </div>
  );
}
