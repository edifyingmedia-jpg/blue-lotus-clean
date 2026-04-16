// frontend/src/rxgui/primitives/ActionSpacer.component.jsx
import React from "react";

/**
 * ActionSpacer (Empire Edition)
 * ----------------------------
 * A structural void node for Blue Lotus modules.
 * Enforces industrial spacing scales instead of arbitrary pixels.
 */
export default function ActionSpacer({ 
  size = "md", // sm, md, lg, xl
  axis = "vertical" 
}) {
  const scales = {
    sm: "h-4 w-4",   // 16px
    md: "h-8 w-8",   // 32px
    lg: "h-16 w-16", // 64px
    xl: "h-32 w-32", // 128px
  };

  const isVertical = axis === "vertical";

  return (
    <div 
      className={`
        ${isVertical ? scales[size].split(' ')[0] : scales[size].split(' ')[1]}
        ${isVertical ? "w-full" : "h-full"}
        flex-shrink-0 transition-all duration-300
      `} 
      aria-hidden="true"
    />
  );
}
