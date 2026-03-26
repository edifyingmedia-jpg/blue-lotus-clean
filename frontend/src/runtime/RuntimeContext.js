/**
 * RuntimeContext.js
 * ----------------------------------------------------
 * Provides global runtime context for:
 *  - stateEngine
 *  - navigationEngine
 *  - actionEngine
 *  - appDefinition
 *
 * This context allows deeply nested components to access
 * runtime engines without prop‑drilling.
 */

import React, { createContext, useContext } from "react";

const RuntimeContext = createContext(null);

export function RuntimeProvider({
  appDefinition,
  stateEngine,
  navigationEngine,
  actionEngine,
  children,
}) {
  if (!appDefinition) {
    throw new Error("RuntimeProvider requires appDefinition");
  }
  if (!stateEngine || !navigationEngine || !actionEngine) {
    throw new Error("RuntimeProvider requires all runtime engines");
  }

  const value = {
    appDefinition,
    stateEngine,
    navigationEngine,
    actionEngine,
  };

  return (
    <RuntimeContext.Provider value={value}>
      {children}
    </RuntimeContext.Provider>
  );
}

export function useRuntime() {
  const ctx = useContext(RuntimeContext);
  if (!ctx) {
    throw new Error("useRuntime must be used inside <RuntimeProvider>");
  }
  return ctx;
}
