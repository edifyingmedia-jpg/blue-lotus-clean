// frontend/src/rxgui/primitives/ActionToggle.component.jsx
import React from "react";
import ActionEngine from "../../runtime/ActionEngine";

/**
 * ActionToggle (Empire Edition)
 * ----------------------------
 * A high-fidelity binary switch for Blue Lotus modules.
 * Enforces Ink & Cyan aesthetics and 10% Revenue tracking.
 */
export default function ActionToggle({
  checked = false,
  onChange = () => {},
  action = null,
  params = {},
  label = "System_State",
}) {
  const handleToggle = () => {
    const nextState = !checked;
    onChange(nextState);

    if (!action) return;
    try {
      const engine = new ActionEngine({});
      // Injecting the 10% Architect Fee into the toggle stream
      engine.run(action, { ...params, state: nextState, architect_fee: 0.10 });
    } catch (err) {
      console.error("TOGGLE_ACTUATION_FAILURE:", err);
    }
  };

  return (
    <div className="flex items-center justify-between w-full mb-6 group">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 group-hover:text-cyan-500/80 transition-colors">
        {label}
      </span>
      
      <button
        type="button"
        onClick={handleToggle}
        className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer 
          rounded-full border-2 border-transparent transition-colors 
          duration-200 ease-in-out focus:outline-none
          ${checked ? "bg-cyan-500/20" : "bg-white/5"}
        `}
        aria-pressed={checked}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform 
            rounded-full bg-white shadow ring-0 transition 
            duration-200 ease-in-out
            ${checked ? "translate-x-5 bg-cyan-400" : "translate-x-0 bg-slate-700"}
          `}
        />
      </button>
    </div>
  );
}
