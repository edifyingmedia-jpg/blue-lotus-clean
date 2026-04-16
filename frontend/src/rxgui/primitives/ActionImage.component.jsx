// frontend/src/rxgui/primitives/ActionImage.component.jsx
import React from "react";
import ActionEngine from "../../runtime/ActionEngine";

/**
 * ActionImage (Empire Edition)
 * ---------------------------
 * The primary visual media node for Blue Lotus.
 * Enforces premium geometry and 10% Revenue tracking on interactions.
 */
export default function ActionImage({
  src = "",
  alt = "",
  action = null,
  params = {},
}) {
  const handleClick = () => {
    if (!action) return;
    try {
      const engine = new ActionEngine({});
      // Injecting the 10% Architect Fee into the image action stream
      engine.run(action, { ...params, architect_fee: 0.10 });
    } catch (err) {
      console.error("NEURAL_VISION_FAILURE:", err);
    }
  };

  return (
    <div className="relative group w-full mb-8 overflow-hidden rounded-[2rem] bg-[#0F0F14] border border-white/5">
      <img
        src={src}
        alt={alt}
        onClick={action ? handleClick : undefined}
        className={`
          w-full h-auto block transition-all duration-700
          ${action ? "cursor-pointer group-hover:scale-105 group-hover:opacity-80" : "cursor-default"}
        `}
      />
      
      {/* Interactive Overlay: Only shows if an action is tied to the image */}
      {action && (
        <div className="absolute inset-0 pointer-events-none border-0 group-hover:border-[4px] border-cyan-500/20 transition-all duration-300 rounded-[2rem]" />
      )}
    </div>
  );
}
