import React from "react";
import ActionEngine from "../../runtime/ActionEngine";

export default function ActionList({
  items = [],
  action = null,
  params = {},
  margin = "0 0 12px 0",
  padding = "0",
  gap = 8,
  fontSize = 16,
  color = "#333",
}) {
  const handleClick = (item) => {
    if (!action) return;

    try {
      const engine = new ActionEngine({});
      engine.run(action, { ...params, item });
    } catch (err) {
      console.error("ActionList error:", err);
    }
  };

  return (
    <div style={{ margin, padding, display: "flex", flexDirection: "column", gap }}>
      {items.map((item, i) => (
        <div
          key={i}
          onClick={action ? () => handleClick(item) : undefined}
          style={{
            fontSize,
            color,
            cursor: action ? "pointer" : "default",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
