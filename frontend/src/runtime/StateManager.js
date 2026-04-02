// frontend/src/runtime/StateManager.js

export default class StateManager {
  constructor() {
    this.appStates = new Map();
  }

  /**
   * Initialize state for an app.
   */
  initialize(appId, initialState = {}) {
    if (!appId) {
      throw new Error("StateManager.initialize: appId is required.");
    }

    this.appStates.set(appId, { ...initialState });
    return this.get(appId);
  }

  /**
   * Get current state for an app.
   */
  get(appId) {
    const state = this.appStates.get(appId);
    if (!state) {
      throw new Error(`StateManager.get: no state found for app '${appId}'.`);
    }
    return { ...state };
  }

  /**
   * Apply updates to an app's state.
   */
  update(appId, updates) {
    if (!appId) {
      throw new Error("StateManager.update: appId is required.");
    }
    if (!updates || typeof updates !== "object") {
      throw new Error("StateManager.update: updates must be an object.");
    }

    const current = this.appStates.get(appId);
    if (!current) {
      throw new Error(`StateManager.update: no state found for app '${appId}'.`);
    }

    const newState = { ...current, ...updates };
    this.appStates.set(appId, newState);

    return { ...newState };
  }

  /**
   * Remove state for an app.
   */
  clear(appId) {
    this.appStates.delete(appId);
  }
}
