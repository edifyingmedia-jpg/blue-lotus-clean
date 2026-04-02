// frontend/src/runtime/RuntimeEngine.js

export default class RuntimeEngine {
  constructor() {
    this.activeApps = new Map();
  }

  /**
   * Run an app definition and return initial runtime state.
   */
  run(appDefinition) {
    if (!appDefinition || typeof appDefinition !== "object") {
      throw new Error("RuntimeEngine.run: invalid app definition.");
    }

    const appId = appDefinition.id || this._generateId();
    const initialState = this._initializeState(appDefinition);

    this.activeApps.set(appId, {
      appDefinition,
      state: initialState,
    });

    return {
      appId,
      state: initialState,
      pages: appDefinition.pages || [],
    };
  }

  /**
   * Initialize state from app definition.
   */
  _initializeState(appDefinition) {
    const state = {};

    if (Array.isArray(appDefinition.pages)) {
      for (const page of appDefinition.pages) {
        if (Array.isArray(page.components)) {
          for (const component of page.components) {
            if (component.stateKey) {
              state[component.stateKey] = component.defaultValue ?? null;
            }
          }
        }
      }
    }

    return state;
  }

  /**
   * Update state for a running app.
   */
  updateState(appId, updates) {
    const app = this.activeApps.get(appId);
    if (!app) {
      throw new Error(`RuntimeEngine.updateState: app '${appId}' not found.`);
    }

    app.state = {
      ...app.state,
      ...updates,
    };

    return app.state;
  }

  /**
   * Generate a simple unique ID.
   */
  _generateId() {
    return "app-" + Math.random().toString(36).slice(2);
  }
}
