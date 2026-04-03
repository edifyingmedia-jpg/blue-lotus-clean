// frontend/src/rxgui/primitives/ActionText.component.jsx

import React from "react";
import { ActionEngine } from "../runtime/ActionEngine";

/**
 * ActionText
 * --------------------------------------------------
 * A text element that triggers an ActionEngine action
 * when clicked. Used for inline triggers like:
 * "Tap here", "Load more", "Refresh", etc.
 */

export default function ActionText({
  text = "",
  action = null,
  params = {},
  color = "#3366ff",
  fontSize = 16,
  fontWeight = "normal",
  margin = "0 0 8px 0",
}) {
  const handleClick = () => {
    if (!action) return;

    try {
      const engine = new ActionEngine();
      engine.run(action, params);
    } catch (err) {
      console.error("ActionText error:", err);
    }
  };

  return (
    <span
      onClick={handleClick}
      style={{
        cursor: action ? "pointer" : "default",
        color,
        fontSize,
        fontWeight,
        margin,
        textDecoration: action ? "underline" : "none",
      }}
    >
      {text}
    </span>
  );
}
