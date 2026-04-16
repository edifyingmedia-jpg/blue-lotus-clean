import React from "react";
import TWIN from "./TWIN";
import { useAppDefinition } from "../state/AppDefinitionContext";
import "./TwinPanel.css";

/**
 * TwinPanel.jsx
 * -------------
 * The structural container for the Governess / TWIN Prime.
 * This file wraps the core TWIN logic in the appropriate Empire-themed 
 * CSS classes to ensure it stays in its sidebar position.
 */

export default function TwinPanel() {
  const { isPrimeActive } = useAppDefinition();

  return (
    <aside className={`twin-panel ${isPrimeActive ? 'prime-mode' : ''}`}>
      {/* We inject the core TWIN component here. 
        TWIN handles the chat, credits, and strategy. 
      */}
      <TWIN />
    </aside>
  );
}
