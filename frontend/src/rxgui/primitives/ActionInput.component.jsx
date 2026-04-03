import React from "react";
import ActionEngine from "../runtime/ActionEngine";

export default function ActionInput({
  value = "",
  placeholder = "",
  action = null,
  params = {},
  onChangeAction = null,
  onChangeParams = {},
  width = "100%",
  padding = "10px",
  fontSize = 16,
  margin = "0 0 12px 0",
  border = "1px solid #ccc",
  borderRadius = 6,
}) {
  const handleClick = () => {
    if (!action) return;

    try {
      const engine = new ActionEngine({});
      engine.run(action, params);
    } catch (err) {
      console.error("ActionInput click error:", err);
    }
  };

  const handleChange = (e) => {
    if (!onChangeAction) return;

    try {
      const engine = new ActionEngine({});
      engine.run(onChangeAction, { ...onChangeParams, value: e.target.value });
    } catch (err) {
      console.error("ActionInput change error:", err);
    }
  };

  return (
    <input
      value={value}
      placeholder={placeholder}
      onClick={handleClick}
      onChange={handleChange}
      style={{
        width,
        padding,
        fontSize,
        margin,
        border,
        borderRadius,
        boxSizing: "border-box",
      }}
    />
  );
}
