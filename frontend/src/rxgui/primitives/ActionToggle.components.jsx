import React from "react";
import { ActionEngine } from "../runtime/ActionEngine";

export default function ActionToggle({
  value = false,
  action = null,
  params = {},
  label = "",
  margin = "0 0 12px 0",
  fontSize = 16,
}) {
  const handleChange = () => {
    try {
      const engine = new ActionEngine();
      engine.run(action, { ...params, value: !value });
    } catch (err) {
      console.error("ActionToggle error:", err);
    }
  };

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        margin,
        fontSize,
        cursor: "pointer",
      }}
    >
      <input type="checkbox" checked={value} onChange={handleChange} />
      {label}
    </label>
  );
}
