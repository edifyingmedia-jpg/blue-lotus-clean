// frontend/src/runtime/StateEngine.js

export default class StateEngine {
  constructor() {
    this.state = {};
  }

  /**
   * Initialize state from an app definition.
   */
  initialize(appDefinition) {
    const initial = {};

    if (Array.isArray(appDefinition.pages)) {
      for (const page of appDefinition.pages) {
        if (Array.isArray(page.components)) {
          for (const component of page.components) {
            if (component.stateKey) {
              initial[component.stateKey] = component.defaultValue ?? null;
            }
          }
        }
      }
    }

    this.state = initial;
    return this.state;
  }

  /**
   * Apply updates to the state.
   */
  update(updates) {
    if (!updates || typeof updates !== "object") {
      throw new Error("StateEngine.update: updates must be an object.");
    }

    this.state = {
      ...this.state,
      ...updates,
    };

    return this.state;
  }

  /**
   * Get the current state snapshot.
   */
  getState() {
    return { ...this.state };
  }
}
