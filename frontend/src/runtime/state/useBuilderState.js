/**
 * useBuilderState.js
 * ----------------------------------------------------
 * React hook for interacting with the runtime state
 * inside the builder environment.
 *
 * Responsibilities:
 *  - Subscribe to state changes from StateEngine
 *  - Provide get/set/patch helpers
 *  - Keep builder UI reactive to preview state
 */

import { useEffect, useState } from "react";
import eventBus from "../utils/eventBus";

export default function useBuilderState(stateEngine) {
  if (!stateEngine) {
    throw new Error("useBuilderState requires a StateEngine instance");
  }

  const [version, setVersion] = useState(0);

  useEffect(() => {
    const handler = () => {
      setVersion((v) => v + 1);
    };

    eventBus.on("state:changed", handler);

    return () => {
      eventBus.off("state:changed", handler);
    };
  }, []);

  return {
    /**
     * Read a value from the state tree
     */
    get: (path) => stateEngine.get(path),

    /**
     * Set a value in the state tree
     */
    set: (path, value) => stateEngine.set(path, value),

    /**
     * Apply a partial update
     */
    patch: (patchObj) => stateEngine.patch(patchObj),

    /**
     * Used only to force React re-renders
     */
    version,
  };
}
