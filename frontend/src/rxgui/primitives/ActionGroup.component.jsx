// frontend/src/rxgui/primitives/ActionGroup.component.jsx
import React from "react";

/**
 * ActionGroup (Empire Edition)
 * ---------------------------
 * A high-density cluster for interactive nodes.
 * Optimizes the layout for storefront app-cards and control decks.
 */
export default function ActionGroup({
  children,
  direction = "row", // row or column
  align = "center",
  justify = "start",
}) {
  const directions = {
    row: "flex-row items-center space-x-4",
    column: "flex-col space-y-3",
  };

  const justifications = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  };

  return (
    <div 
      className={`
        flex w-full mb-6
        ${directions[direction] || directions.row}
        ${justifications[justify] || justifications.start}
      `}
    >
      {/* ACTUATOR NOTE: 
          This group acts as a single neural unit. 
          Use 'column' for mobile-first storefronts. 
      */}
      {children}
    </div>
  );
}
