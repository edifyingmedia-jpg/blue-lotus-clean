// frontend/src/rxgui/primitives/ActionButton.component.jsx
import React from "react";
import ActionEngine from "../../runtime/ActionEngine";

/**
 * ActionButton (Empire Edition)
 * ----------------------------
 * The primary interaction node for Blue Lotus apps.
 * Enforces Ink & Cyan styling and 10% Revenue tracking.
 */
export default function ActionButton({
  label = "Actuate",
  action = null,
  params = {},
}) {
  const handleClick = () => {
    if (!action) return;
    try {
      // Logic for 10% Architect Tax verification can be injected here
      const engine = new ActionEngine({});
      engine.run(action, { ...params, architect_fee: 0.10 });
    } catch (err) {
      console.error("ACTUATION_FAILURE:", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full py-4 px-6 mb-3
        bg-white text-black 
        hover:bg-cyan-400 active:scale-95
        rounded-xl transition-all duration-200
        text-[10px] font-black uppercase tracking-[0.2em]
        shadow-[0_10px_30px_rgba(0,0,0,0.3)]
        disabled:opacity-20 disabled:cursor-not-allowed
      `}
      disabled={!action}
    >
      {label}
    </button>
  );
}
