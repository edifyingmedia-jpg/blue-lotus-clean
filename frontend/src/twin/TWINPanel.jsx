import React from "react";
import TWIN from "./TWIN";
import { useAppDefinition } from "../state/AppDefinitionContext";
import "./TwinPanel.css";

/**
 * TWINPanel.jsx
 * -------------
 * The structural shell for the Governess / TWIN Prime.
 * This component manages the "Aura" of the sidebar based on the 
 * Architect's status.
 */

export default function TWINPanel() {
  const { isPrimeActive } = useAppDefinition();

  return (
    <aside 
      className={`twin-panel-root ${isPrimeActive ? 'prime-aura' : 'governess-aura'}`}
      style={{
        width: '360px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        borderLeft: isPrimeActive ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* We nest the core TWIN component here. 
          TWIN handles the messages, while this Panel handles the presence.
      */}
      <TWIN />

      {/* Optional: Prime Status Indicator Glow */}
      {isPrimeActive && (
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(168,85,247,0.05)]" />
      )}
    </aside>
  );
}
