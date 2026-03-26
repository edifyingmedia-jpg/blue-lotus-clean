// frontend/src/runtime/StateManager.js

import React from "react";
import { RuntimeProvider } from "./RuntimeContext";

/**
 * StateManager wraps the runtime with all required providers.
 * This is the single entry point for runtime state.
 */
export default function StateManager({
  children,
  initialState = {},
}) {
  return (
    <RuntimeProvider initialState={initialState}>
      {children}
    </RuntimeProvider>
  );
}
