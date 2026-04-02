/**
 * ActionDispatcher.js
 * ----------------------------------------------------
 * Executes validated actions produced by ActionEngine.
 * This layer does not validate — it only dispatches.
 */

export default class ActionDispatcher {
  constructor({ stateEngine, navigationEngine }) {
    this.stateEngine = stateEngine;
    this.navigationEngine = navigationEngine;
  }

  dispatch(action) {
    if (!action || typeof action.type !== "string") return;

    switch (action.type) {
      case "setState":
        return this.handleSetState(action.params);

      case "incrementState":
        return this.handleIncrementState(action.params);

      case "navigate":
        return this.handleNavigate(action.params);

      case "batch":
        return this.handleBatch(action.params);

      case "conditional":
        return this.handleConditional(action.params);

      default:
        console.warn("Unknown action type:", action.type);
        return;
    }
  }

  handleSetState(params) {
    if (!params) return;
    const { key, value } = params;
    this.stateEngine.set(key, value);
  }

  handleIncrementState(params) {
    if (!params) return;
    const { key, amount = 1 } = params;
    const current = this.stateEngine.get(key);
    const next = (typeof current === "number" ? current : 0) + amount;
    this.stateEngine.set(key, next);
  }

  handleNavigate(params) {
    if (!params) return;
    const { to } = params;
    this.navigationEngine.go(to);
  }

  handleBatch(params) {
    if (!params || !Array.isArray(params.actions
