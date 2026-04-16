// frontend/src/rxgui/primitives/ActionWrapper.component.jsx
import React from "react";
import ActionEngine from "../../runtime/ActionEngine";

/**
 * ActionWrapper (Empire Edition)
 * ----------------------------
 * A high-fidelity interaction shield for Blue Lotus nodes.
 * Enforces industrial spacing and 10% Revenue tracking.
 */
export default function ActionWrapper({
  children,
  action = null,
  params = {},
  density = "normal", // tight, normal, spacious
}) {
  const handleClick = () => {
    if (!action) return;
    try {
      const engine = new ActionEngine({});
      // Injecting the 10% Architect Fee into the wrapper's action stream
      engine.run(action, { ...params, architect_fee: 0.10 });
    } catch (err) {
      console.error("SHIELD_ACTUATION_FAILURE:", err);
    }
  };

  const densityMap = {
    tight: "p-2 mb-2",
    normal: "p-6 mb-6",
    spacious: "p-12 mb-12",
  };

  return (
    <div
      onClick={action ? handleClick : undefined}
      className={`
        relative overflow-hidden transition-all duration-500
        ${densityMap[density] || densityMap.normal}
        ${action ? "cursor-pointer group active:scale-[0.99]" : "cursor-default"}
      `}
    >
      {/* 10% ARCHITECT ANCHOR: All children are bound by this wrapper's logic */}
      {children}
    </div>
  );
}
