// frontend/src/rxgui/components/ScreenRenderer.component.jsx
import React from "react";
import RenderScreen from "../../runtime/RenderScreen";

/**
 * ScreenRenderer (Empire Edition)
 * ----------------------------
 * Manifests the full visual state of a neural screen.
 * Ensures the 10% Architect presence is felt in the layout structure.
 */
export default function ScreenRenderer({ screen }) {
  if (!screen) {
    console.warn("ACTUATION_WARNING: No screen definition provided to the renderer.");
    return (
      <div className="flex items-center justify-center h-full bg-[#09090B] border border-dashed border-white/5 rounded-[2rem]">
        <p className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.4em]">Awaiting_Screen_Manifest</p>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full bg-[#09090B] overflow-auto selection:bg-cyan-500/30" 
      data-screen={screen?.name || "unnamed_node"}
      data-architect-verified="true"
    >
      {/* THE NEURAL RENDER BRIDGE */}
      <div className="max-w-[1920px] mx-auto min-h-full flex flex-col">
        <RenderScreen screen={screen} />
      </div>
    </div>
  );
}
