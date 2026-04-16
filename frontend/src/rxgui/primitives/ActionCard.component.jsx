// frontend/src/rxgui/primitives/ActionCard.component.jsx
import React from "react";

/**
 * ActionCard (Empire Edition)
 * --------------------------
 * The foundational container for all Blue Lotus modules.
 * Enforces the Ink & Cyan aesthetic and premium geometry.
 */
export default function ActionCard({ 
  children, 
  variant = "default" 
}) {
  return (
    <div className={`
      w-full mb-6 transition-all duration-500 group
      bg-[#0F0F14] border border-white/5 
      rounded-[2.5rem] p-10
      shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]
      hover:border-cyan-500/20 hover:shadow-cyan-500/5
    `}>
      {/* Subtle internal glow for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[2.5rem] pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
