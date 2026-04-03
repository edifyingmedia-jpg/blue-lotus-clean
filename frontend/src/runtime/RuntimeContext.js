// frontend/src/runtime/RuntimeContext.js

import React, { createContext, useContext, useMemo } from "react";

import StateEngine from "./StateEngine";
import NavigationEngine from "./NavigationEngine";
import ActionEngine from "./ActionEngine";
import ActionDispatcher from "./ActionDispatcher";
import RuntimeEngine from "./RuntimeEngine";

const RuntimeContext = createContext(null);

/**
 * RuntimeProvider
 * ----------------------------------------------------
 * Creates and wires all runtime engines, then exposes
 * them through React context to the entire runtime tree.
 */

export function RuntimeProvider({ children }) {
  const runtime = useMemo(() => {
    const stateEngine = new StateEngine();
    const navigationEngine = new NavigationEngine();
    const actionEngine = new ActionEngine({
      stateEngine,
      navigationEngine,
    });
    const dispatcher = new ActionDispatcher({
      actionEngine,
    });
    const runtimeEngine = new RuntimeEngine({
      stateEngine,
      navigationEngine,
      actionEngine,
      dispatcher,
    });

    return {
      stateEngine,
      navigationEngine,
      actionEngine,
      dispatcher,
      runtimeEngine,
    };
  }, []);

  return (
    <RuntimeContext.Provider value={runtime}>
      {children}
    </RuntimeContext.Provider>
  );
}

export function useRuntime() {
  const ctx = useContext(RuntimeContext);
  if (!ctx) {
    throw new Error("useRuntime must be used within RuntimeProvider");
  }
  return ctx;
}
