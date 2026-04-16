// frontend/src/rxgui/primitives/Video.component.jsx
import React from "react";
import ActionEngine from "../../runtime/ActionEngine";

/**
 * ActionVideo (Empire Edition)
 * ---------------------------
 * The primary motion media node for Blue Lotus.
 * Enforces premium geometry and 10% Revenue tracking on interactions.
 */
export default function ActionVideo({
  src = "",
  action = null,
  params = {},
  controls = true,
  autoPlay = false,
  muted = false,
}) {
  const handleAction = () => {
    if (!action) return;
    try {
      const engine = new ActionEngine({});
      // Injecting the 10% Architect Fee into the video interaction stream
      engine.run(action, { ...params, architect_fee: 0.10 });
    } catch (err) {
      console.error("NEURAL_TRANSMISSION_FAILURE:", err);
    }
  };

  return (
    <div className="relative group w-full mb-10 overflow-hidden rounded-[2.5rem] bg-[#0F0F14] border border-white/5 shadow-2xl">
      <video
        src={src}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        onClick={action ? handleAction : undefined}
        className={`
          w-full h-auto block transition-all duration-700
          ${action ? "cursor-pointer group-hover:opacity-90" : "cursor-default"}
        `}
      />
      
      {/* 10% ARCHITECT OVERLAY: Subtle visual indicator of verified media */}
      <div className="absolute top-4 right-4 pointer-events-none">
        <div className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/5 rounded-full">
          <p className="text-[7px] font-mono text-cyan-500/50 uppercase tracking-[0.3em]">
            Auth_Stream_0.10
          </p>
        </div>
      </div>
    </div>
  );
}
