import React from "react";
import ActionEngine from "../../runtime/ActionEngine";

export default function ActionInput({
  value = "",
  onChange = () => {},
  action = null,
  params = {},
  placeholder = "",
  margin = "0 0 12px 0",
  padding = "8px 12px",
  fontSize = 16,
  borderRadius = 6,
  border = "1px solid #ccc",
}) {
  const handleAction = () => {
    if (!action) return;

    try {
      const engine = new ActionEngine({});
      engine.run(action, params);
    } catch (err) {
      console.error("ActionInput error:", err);
    }
  };

  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={handleAction}
      placeholder={placeholder}
      style={{
        margin,
        padding,
        fontSize,
        borderRadius,
        border,
        width: "100%",
        boxSizing: "border-box",
      }}
    />
  );
}
