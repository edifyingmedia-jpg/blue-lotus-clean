// frontend/src/runtime/ActionEngine.js

export default class ActionEngine {
  constructor(actions = {}) {
    this.actions = actions;
    this.onBeforeRun = null; // Hook for security gates or logging
  }

  register(name, fn) {
    this.actions[name] = fn;
  }

  run(name, payload) {
    const action = this.actions[name];

    if (!action) {
      console.warn(`ActionEngine: action "${name}" not found`);
      return;
    }

    try {
      // Execute middleware hook if defined (e.g., for ActionGate checks)
      if (this.onBeforeRun) {
        this.onBeforeRun(name, payload);
      }

      return action(payload);
    } catch (err) {
      console.error(`ActionEngine: error running "${name}"`, err);
    }
  }
}
