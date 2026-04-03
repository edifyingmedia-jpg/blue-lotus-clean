// frontend/src/runtime/StateEngine.js

/**
 * StateEngine
 * ----------------------------------------------------
 * Central reactive state container for runtime apps.
 * Supports:
 *  - path-based updates
 *  - deep merging
 *  - subscriptions
 *  - immutable snapshots
 */

import { safeGet, safeSet, deepClone } from "./utils";

export default class StateEngine {
  constructor() {
    this.state = {};
    this.listeners = new Set();
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
              initial[component.stateKey] =
                component.defaultValue ?? null;
            }
          }
        }
      }
    }

    this.state = initial;
    this.emit();
    return this.get();
  }

  /**
   * Set a value at a path (e.g. "form.name").
   */
  set(path, value) {
    if (!path || typeof path !== "string") {
      console.warn("StateEngine.set: invalid path:", path);
      return;
    }

    const cloned = deepClone(this.state);
    safeSet(cloned, path, deepClone(value));

    this.state = cloned;
    this.emit();
  }

  /**
   * Merge multiple updates shallowly.
   */
  update(updates) {
    if (!updates || typeof updates !== "object") {
      throw new Error("StateEngine.update: updates must be an object.");
    }

    this.state = {
      ...this.state,
      ...deepClone(updates),
    };

    this.emit();
    return this.get();
  }

  /**
   * Subscribe to state changes.
   */
  subscribe(fn) {
    if (typeof fn !== "function") return;
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  /**
   * Notify listeners.
   */
  emit() {
    for (const fn of this.listeners) {
      try {
        fn(this.get());
      } catch (err) {
        console.error("StateEngine listener error:", err);
      }
    }
  }

  /**
   * Get a deep-cloned snapshot.
   */
  get() {
    return deepClone(this.state);
  }

  /**
   * Get a value at a path.
   */
  getAt(path) {
    return safeGet(this.state, path);
  }
}
