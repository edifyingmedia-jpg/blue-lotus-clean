// frontend/src/rxgui/primitives/ActionDivider.component.jsx
import React from "react";

/**
 * ActionDivider (Empire Edition)
 * ----------------------------
 * A structural separation node for Blue Lotus modules.
 * Enforces the Ink & Cyan aesthetic and industrial spacing.
 */
export default function ActionDivider({ 
  variant = "subtle", // subtle or accent
}) {
  const styles = {
    subtle: "bg-white/5",
    accent: "bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent",
  };

  return (
    <div className={`
      w-full h-[1px] my-10 
      ${styles[variant] || styles.subtle}
      transition-all duration-700
    `} />
  );
}
