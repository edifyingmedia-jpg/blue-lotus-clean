// frontend/src/rxgui/primitives/ActionText.component.jsx
import React from "react";
import ActionEngine from "../../runtime/ActionEngine";

/**
 * ActionText (Empire Edition)
 * --------------------------
 * The primary typographic node for Blue Lotus.
 * Enforces Ink & Cyan hierarchy and 10% Revenue tracking.
 */
export default function ActionText({
  text = "",
  action = null,
  params = {},
  variant = "body", // label, body, header
}) {
  const handleClick = () => {
    if (!action) return;
    try {
      const engine = new ActionEngine({});
      // Injecting the 10% Architect Fee into the text interaction stream
      engine.run(action, { ...params, architect_fee: 0.10 });
    } catch (err) {
      console.error("NEURAL_VOICE_FAILURE:", err);
    }
  };

  const variants = {
    header: "text-[14px] font-black uppercase tracking-[0.5em] text-white",
    body: "text-[12px] font-medium text-slate-400 leading-relaxed",
    label: "text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-500/80",
  };

  return (
    <div
      onClick={action ? handleClick : undefined}
      className={`
        mb-4 transition-all duration-300
        ${variants[variant] || variants.body}
        ${action ? "cursor-pointer hover:text-cyan-400" : "cursor-default"}
      `}
    >
      {text}
    </div>
  );
}
