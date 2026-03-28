import React, { createContext, useContext, useMemo } from "react";
import { initTWINSession } from "./twin/initTWINSession";
import ActionEngine from "./ActionEngine";

const RuntimeContext = createContext(null);

export function RuntimeProvider({ children }) {
  const twinSession = useMemo(() => {
    return initTWINSession({ isOwner: true });
  }, []);

  const action = useMemo(() => {
    return ActionEngine({ runtime: { twin: twinSession } });
  }, [twinSession]);

  const runtime = useMemo(() => {
    return {
      twin: twinSession,
      action,
    };
  }, [twinSession, action]);

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
