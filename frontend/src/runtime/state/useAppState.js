import { useState, useCallback } from "react";

/**
 * useAppState
 * ----------------------------------------------------
 * Lightweight runtime state container for app‑level UI.
 * This is NOT the builder state — this is for the
 * running app’s own ephemeral UI state.
 */

export default function useAppState(initial = {}) {
  const [state, setState] = useState(initial);

  const update = useCallback((patch) => {
    setState((prev) => ({
      ...prev,
      ...(typeof patch === "function" ? patch(prev) : patch),
    }));
  }, []);

  const reset = useCallback(() => {
    setState(initial);
  }, [initial]);

  return {
    state,
    update,
    reset,
  };
}
