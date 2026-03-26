/**
 * StateManager.js
 * ----------------------------------------------------
 * Thin wrapper around StateEngine for components that
 * need direct access to runtime state without prop drilling.
 *
 * Responsibilities:
 *  - Provide get/set/patch helpers
 *  - Expose subscribe/unsubscribe for reactive updates
 *  - Never mutate state directly
 */

import eventBus from "./utils/eventBus";

export default class StateManager {
  constructor(stateEngine) {
    if (!stateEngine) {
      throw new Error("StateManager requires a StateEngine instance");
    }

    this.engine = stateEngine;
  }

  /**
   * Read a value from the state tree
   */
  get(path) {
    return this.engine.get(path);
  }

  /**
   * Set a value in the state tree
   */
  set(path, value) {
    this.engine.set(path, value);
  }

  /**
   * Apply a partial update
   */
  patch(patchObj) {
    this.engine.patch(patchObj);
  }

  /**
   * Subscribe to state changes
   */
  subscribe(callback) {
    if (typeof callback !== "function") return;

    eventBus.on("state:changed", callback);

    return () => {
      eventBus.off("state:changed", callback);
    };
  }
}
