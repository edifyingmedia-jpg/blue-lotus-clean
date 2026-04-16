// frontend/src/runtime/RuntimeEngine.js

export default class RuntimeEngine {
  constructor() {
    this.activeApps = new Map();
    this.listeners = new Set();
  }

  /**
   * Run an app definition and return initial runtime state.
   */
  run(appDefinition) {
    if (!appDefinition || typeof appDefinition !== "object") {
      throw new Error("[RuntimeEngine] Invalid app definition.");
    }

    // Use a more robust ID strategy for 2026 multi-tenancy
    const appId = appDefinition.id || `bl-${crypto.randomUUID().split('-')[0]}`;
    const initialState = this._initializeState(appDefinition);

    this.activeApps.set(appId, {
      appDefinition,
      state: initialState,
      status: "running",
      startedAt: Date.now()
    });

    this.notify("APP_STARTED", { appId, state: initialState });

    return {
      appId,
      state: initialState,
      pages: appDefinition.pages || [],
    };
  }

  /**
   * Automated State Extraction
   */
  _initializeState(appDefinition) {
    const state = {};
    appDefinition.pages?.forEach(page => {
      page.components?.forEach(component => {
        if (component.stateKey) {
          state[component.stateKey] = component.defaultValue ?? null;
        }
      });
    });
    return state;
  }

  /**
   * Hardened State Updates
   */
  updateState(appId, updates) {
    const app = this.activeApps.get(appId);
    if (!app) {
      throw new Error(`[RuntimeEngine] App '${appId}' not found.`);
    }

    app.state = { ...app.state, ...updates };
    this.notify("STATE_UPDATED", { appId, state: app.state });
    
    return app.state;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(type, payload) {
    this.listeners.forEach(fn => fn({ type, ...payload }));
  }
}
