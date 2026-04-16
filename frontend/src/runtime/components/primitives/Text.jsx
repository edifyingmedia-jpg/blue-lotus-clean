// frontend/src/runtime/components/primitives/Text.jsx
import React from "react";

/**
 * Text Primitive (Modernized)
 * --------------------------
 * Handles typography with Blue Lotus default slate-200 color.
 * Supports Tailwind overrides for size, weight, and custom styles.
 */
export default function Text({ 
  children, 
  className = "", 
  variant = "body" 
}) {
  // Define base styles for different text roles
  const variants = {
    heading: "text-lg font-black uppercase tracking-tighter text-blue-400",
    subheading: "text-sm font-bold uppercase tracking-widest text-slate-400",
    body: "text-sm text-slate-200 leading-relaxed",
    caption: "text-xs text-slate-500 italic"
  };

  const selectedVariant = variants[variant] || variants.body;

  return (
    <p className={`${selectedVariant} ${className}`}>
      {children}
    </p>
  );
}
