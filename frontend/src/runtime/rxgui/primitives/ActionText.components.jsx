// frontend/src/runtime/rxgui/primitives/ActionText.components.jsx
import React from "react";
import { ActionEngine } from "../runtime/ActionEngine";

/**
 * ActionText (Modernized)
 * ----------------------
 * An interactive text primitive that triggers the ActionEngine.
 * Styled with Blue Lotus "Interactive Blue" by default.
 */
export default function ActionText({
  text = "",
  action = null,
  params = {},
  className = "",
  variant = "link" // link, ghost, or highlight
}) {
  const handleClick = () => {
    if (!action) return;
    try {
      const engine = new ActionEngine();
      engine.run(action, params);
    } catch (err) {
      console.error("[SYS_ERR]: ActionText execution failed:", err);
    }
  };

  // Define interactive states based on variants
  const variants = {
    link: "text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/30",
    ghost: "text-slate-400 hover:text-slate-200",
    highlight: "text-blue-400 font-bold hover:brightness-125"
  };

  const activeStyle = action ? "cursor-pointer active:opacity-70 transition-all" : "cursor-default opacity-80";
  const baseStyle = "text-sm tracking-tight inline-block";

  return (
    <span 
      onClick={handleClick} 
      className={`
        ${baseStyle} 
        ${variants[variant]} 
        ${activeStyle} 
        ${className}
      `}
    >
      {text}
    </span>
  );
}
