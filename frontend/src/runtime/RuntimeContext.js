import React, { createContext, useContext, useMemo } from "react";
import { initTWINSession } from "./index";

const RuntimeContext = createContext(null);

export function RuntimeProvider({ children }) {
  const twinSession = useMemo(() => {
    return initTWINSession({ isOwner: true });
  }, []);

  const runtime = useMemo(() => {
    return {
      twin: twinSession
    };
  }, [twinSession]);

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
