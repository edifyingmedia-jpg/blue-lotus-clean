// frontend/src/runtime/StateEngine.js
import { safeGet, safeSet, deepClone } from "./utils";

export default class StateEngine {
  constructor() {
    this.state = {};
    this.listeners = new Set();
    this.middleware = []; // Added for v2.0 flexibility
  }

  /**
   * Hardened Initialization
   */
  initialize(appDefinition) {
    const initial = {};
    appDefinition.pages?.forEach(page => {
      page.components?.forEach(component => {
        if (component.stateKey) {
          initial[component.stateKey] = component.defaultValue ?? null;
        }
      });
    });
    this.state = initial;
    this.emit();
    return this.get();
  }

  /**
   * Set value at path with Middleware support
   */
  set(path, value) {
    if (!path || typeof path !== "string") return;

    let newValue = deepClone(value);
    
    // Run middlewares (e.g., validation or logging)
    this.middleware.forEach(mw => {
      newValue = mw(path, newValue, this.state);
    });

    const cloned = deepClone(this.state);
    safeSet(cloned, path, newValue);
    this.state = cloned;
    this.emit();
  }

  /**
   * Get value at path with safe fallback
   */
  getAt(path, fallback = null) {
    return safeGet(this.state, path) ?? fallback;
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  emit() {
    const snapshot = this.get();
    this.listeners.forEach(fn => {
      try { fn(snapshot); } catch (e) { console.error("[StateEngine] Listener Error:", e); }
    });
  }

  get() {
    return deepClone(this.state);
  }

  use(mw) {
    this.middleware.push(mw);
  }
}
