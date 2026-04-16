// frontend/src/runtime/Workspace.jsx
import React, { useState } from "react";
import "./Workspace.css";

/**
 * Workspace
 * ----------------------------------------------------
 * The hardened preview laboratory for Blue Lotus.
 */
export default function Workspace({ preview }) {
  // v2.0 Feature: Viewport resizing state
  const [viewMode, setViewMode] = useState("desktop"); // 'mobile', 'tablet', 'desktop'

  return (
    <div className={`workspace-root mode-${viewMode}`}>
      {/* Optional: Viewport Toggles could go here in the header */}
      <div className={`workspace-frame device-${viewMode}`}>
        {/* The Actual App Preview */}
        {preview}
      </div>
      
      {/* Subtle Viewport Label */}
      <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-white/20 pointer-events-none">
        Blue Lotus Runtime // {viewMode} viewport
      </div>
    </div>
  );
}
