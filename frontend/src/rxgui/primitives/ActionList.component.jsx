import React from "react";
import ActionEngine from "../runtime/ActionEngine";

export default function ActionList({
  items = [],
  itemAction = null,
  itemParams = {},
  gap = 8,
  margin = "0 0 16px 0",
  fontSize = 16,
  color = "#333",
}) {
  const handleItemClick = (item) => {
    if (!itemAction) return;

    try {
      const engine = new ActionEngine({});
      engine.run(itemAction, { ...itemParams, item });
    } catch (err) {
      console.error("ActionList error:", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap, margin }}>
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => handleItemClick(item)}
          style={{
            cursor: itemAction ? "pointer" : "default",
            fontSize,
            color,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
