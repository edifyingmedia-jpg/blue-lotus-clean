// frontend/src/rxgui/primitives/ActionContainer.component.jsx
import React from "react";

/**
 * ActionContainer (Empire Edition)
 * -------------------------------
 * The primary structural vessel for Blue Lotus layouts.
 * Enforces the Ink & Cyan spacing system and layout integrity.
 */
export default function ActionContainer({
  children,
  type = "flex", // flex, grid, or stack
  gap = "gap-6",
}) {
  const layoutBase = "w-full mb-8 relative transition-all duration-300";
  
  const layoutTypes = {
    flex: "flex flex-wrap items-center",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    stack: "flex flex-col space-y-4"
  };

  return (
    <div className={`${layoutBase} ${layoutTypes[type] || layoutTypes.flex} ${gap}`}>
      {/* 10% ARCHITECT ANCHOR: 
          This container ensures all child elements stay within 
          the Empire's visual boundaries. 
      */}
      {children}
    </div>
  );
}
