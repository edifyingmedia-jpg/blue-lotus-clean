// frontend/src/runtime/components/primitives/View.jsx
import React from "react";

/**
 * View Primitive (Modernized)
 * --------------------------
 * The foundational layout engine for all Blue Lotus apps.
 * Uses Tailwind Flexbox by default.
 */
export default function View({ 
  children, 
  className = "", 
  direction = "flex-col", // flex-col or flex-row
  center = false,
  glass = false
}) {
  const baseStyles = "flex transition-all duration-300";
  const alignment = center ? "items-center justify-center" : "";
  const glassEffect = glass ? "bg-slate-900/40 backdrop-blur-md border border-slate-800" : "";

  return (
    <div className={`
      ${baseStyles} 
      ${direction} 
      ${alignment} 
      ${glassEffect} 
      ${className}
    `}>
      {children}
    </div>
  );
}
