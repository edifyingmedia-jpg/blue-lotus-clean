// frontend/src/rxgui/primitives/ActionList.component.jsx
import React from "react";
import ActionEngine from "../../runtime/ActionEngine";

/**
 * ActionList (Empire Edition)
 * --------------------------
 * A high-density registry node for Blue Lotus modules.
 * Enforces Ink & Cyan aesthetics and 10% Revenue tracking on item selection.
 */
export default function ActionList({
  items = [],
  action = null,
  params = {},
}) {
  const handleClick = (item) => {
    if (!action) return;
    try {
      const engine = new ActionEngine({});
      // Injecting the 10% Architect Fee into the list interaction
      engine.run(action, { ...params, item, architect_fee: 0.10 });
    } catch (err) {
      console.error("REGISTRY_ACTUATION_FAILURE:", err);
    }
  };

  return (
    <div className="flex flex-col w-full mb-8 space-y-2">
      {items.map((item, i) => (
        <div
          key={i}
          onClick={action ? () => handleClick(item) : undefined}
          className={`
            group flex items-center px-6 py-4
            bg-[#0F0F14] border border-white/5 rounded-2xl
            text-[11px] font-mono uppercase tracking-widest text-slate-300
            transition-all duration-300
            ${action ? "cursor-pointer hover:border-cyan-500/30 hover:bg-[#16161D]" : "cursor-default"}
          `}
        >
          {/* The Neural Indicator */}
          <div className="w-1.5 h-1.5 rounded-full bg-slate-800 mr-4 group-hover:bg-cyan-500 transition-colors" />
          
          <span className="group-hover:text-white">{item}</span>
        </div>
      ))}
    </div>
  );
}
