// frontend/src/runtime/components/primitives/Button.jsx
import React from "react";

/**
 * Button Primitive (Modernized)
 * ---------------------------
 * Defaults to the Blue Lotus "Actuation" style.
 * Supports Tailwind overrides via the className prop.
 */
export default function Button({ text, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest
        transition-all duration-200 active:scale-95
        bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]
        border border-blue-400/30
        ${className}
      `}
    >
      {text || "Action"}
    </button>
  );
}
