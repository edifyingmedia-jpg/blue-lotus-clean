// frontend/src/runtime/ActionDispatcher.js

/**
 * Routes actions to the correct engine inside the runtime layer.
 * This stays intentionally minimal until full action types are defined.
 */

export default class ActionDispatcher {
  constructor({ runtimeEngine, stateManager }) {
    this.runtimeEngine = runtimeEngine;
    this.stateManager = stateManager;
  }

  /**
   * Dispatch an action to the correct handler.
   */
  dispatch(appId, action) {
    if (!action || typeof action !== "object") {
      throw new Error("ActionDispatcher.dispatch: action must be an object.");
    }

    const { type, payload } = action;

    switch (type) {
      case "UPDATE_STATE":
        return this.stateManager.update(appId, payload);

      case "RUN_APP":
        return this.runtimeEngine.run(payload);

      default:
        throw new Error(`ActionDispatcher: unknown action type '${type}'.`);
    }
  }
}
