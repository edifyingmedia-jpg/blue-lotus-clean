// frontend/src/rxgui/primitives/ActionInput.component.jsx
import React from "react";
import ActionEngine from "../../runtime/ActionEngine";

/**
 * ActionInput (Empire Edition)
 * ---------------------------
 * The primary data entry node for Blue Lotus apps.
 * Enforces Ink & Cyan styling and 10% Revenue tracking on blur/submit.
 */
export default function ActionInput({
  value = "",
  onChange = () => {},
  action = null,
  params = {},
  placeholder = "Await_Input...",
}) {
  const handleAction = () => {
    if (!action) return;
    try {
      const engine = new ActionEngine({});
      // Injecting the 10% Architect Fee into the data-submission stream
      engine.run(action, { ...params, value, architect_fee: 0.10 });
    } catch (err) {
      console.error("DATA_ACTUATION_FAILURE:", err);
    }
  };

  return (
    <div className="w-full mb-6 group">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleAction}
        placeholder={placeholder}
        className={`
          w-full py-4 px-6
          bg-[#0F0F14] text-white
          border border-white/5 rounded-[1.5rem]
          text-[11px] font-mono uppercase tracking-widest
          placeholder:text-slate-700
          focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20
          transition-all duration-300
        `}
      />
    </div>
  );
}
