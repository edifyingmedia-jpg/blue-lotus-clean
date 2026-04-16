// frontend/src/runtime/RuntimeContext.js
import React, { createContext, useContext, useRef } from "react";
import StateEngine from "./StateEngine";
import NavigationEngine from "./NavigationEngine";
import ActionEngine from "./ActionEngine";
import ActionDispatcher from "./ActionDispatcher";
import RuntimeEngine from "./RuntimeEngine";

const RuntimeContext = createContext(null);

/**
 * RuntimeProvider
 * ----------------------------------------------------
 * Hardened orchestrator for the Blue Lotus engines.
 */
export function RuntimeProvider({ children }) {
  // We use useRef instead of useMemo to guarantee 
  // that engines are never garbage collected during the session.
  const runtimeRef = useRef(null);

  if (!runtimeRef.current) {
    const stateEngine = new StateEngine();
    const navigationEngine = new NavigationEngine();
    
    const actionEngine = new ActionEngine({
      stateEngine,
      navigationEngine,
    });

    const dispatcher = new ActionDispatcher({
      actionEngine,
    });

    runtimeRef.current = new RuntimeEngine({
      stateEngine,
      navigationEngine,
      actionEngine,
      dispatcher,
    });
  }

  return (
    <RuntimeContext.Provider value={runtimeRef.current}>
      {children}
    </RuntimeContext.Provider>
  );
}

export function useRuntime() {
  const ctx = useContext(RuntimeContext);
  if (!ctx) {
    throw new Error("[Blue Lotus] useRuntime must be used within a RuntimeProvider.");
  }
  return ctx;
}
