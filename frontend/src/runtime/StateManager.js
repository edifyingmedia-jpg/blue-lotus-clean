// frontend/src/runtime/StateManager.js

export default class StateManager {
  constructor() {
    this.appStates = new Map();
  }

  /**
   * Initialize state with a deep copy to prevent reference leakage.
   */
  initialize(appId, initialState = {}) {
    if (!appId) throw new Error("[StateManager] appId is required for initialization.");
    
    // Using structuredClone for a true deep copy (2026 Standard)
    this.appStates.set(appId, structuredClone(initialState));
    return this.get(appId);
  }

  /**
   * Get a read-only snapshot of the app state.
   */
  get(appId) {
    const state = this.appStates.get(appId);
    if (!state) {
      throw new Error(`[StateManager] No state found for app '${appId}'.`);
    }
    return structuredClone(state);
  }

  /**
   * Update state with deep isolation.
   */
  update(appId, updates) {
    if (!appId) throw new Error("[StateManager] appId is required for updates.");
    if (!updates || typeof updates !== "object") return;

    const current = this.appStates.get(appId);
    if (!current) {
      throw new Error(`[StateManager] Cannot update: App '${appId}' not initialized.`);
    }

    // Merge updates while maintaining immutability
    const newState = { ...current, ...updates };
    this.appStates.set(appId, newState);
    
    return structuredClone(newState);
  }

  /**
   * Remove state to free up memory.
   */
  clear(appId) {
    this.appStates.delete(appId);
  }
}
