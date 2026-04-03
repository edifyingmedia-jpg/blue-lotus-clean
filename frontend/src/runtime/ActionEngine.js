// frontend/src/runtime/ActionEngine.js

/**
 * ActionEngine.js
 * ----------------------------------------------------
 * Executes JSON-defined runtime actions.
 *
 * Responsibilities:
 *  - Execute single or multi-step actions
 *  - Support conditional actions
 *  - Integrate with StateEngine and NavigationEngine (when provided)
 *  - Emit lifecycle events through eventBus
 *  - Deterministic, side-effect controlled
 */

import { safeGet, deepClone } from "./utils";
import eventBus from "./utils/eventBus";

export default class ActionEngine {
  constructor({ stateEngine = null, navigationEngine = null } = {}) {
    this.stateEngine = stateEngine;
    this.navigationEngine = navigationEngine;
  }

  /**
   * Main entry point for executing an action or array of actions.
   */
  async run(action) {
    if (!action) return;

    // Array of actions
    if (Array.isArray(action)) {
      for (const step of action) {
        await this.run(step);
      }
      return;
    }

    if (!action.type) {
      console.warn("Action missing type:", action);
      return;
    }

    eventBus.emit("action:start", action);

    try {
      switch (action.type) {
        case "setState":
          await this.handleSetState(action);
          break;

        case "navigate":
          await this.handleNavigate(action);
          break;

        case "conditional":
          await this.handleConditional(action);
          break;

        case "log":
          await this.handleLog(action);
          break;

        default:
          console.warn("Unknown action type:", action.type);
      }
    } catch (err) {
      console.error("ActionEngine error:", err);
      eventBus.emit("action:error", { action, error: err });
    }

    eventBus.emit("action:end", action);
  }

  /**
   * setState action
   */
  async handleSetState(action) {
    if (!this.stateEngine) {
      console.warn("setState ignored: no StateEngine provided");
      return;
    }

    const { path, value } = action;

    if (!path || typeof path !== "string") {
      console.warn("Invalid setState path:", action);
      return;
    }

    const cloned = deepClone(value);
    this.stateEngine.set(path, cloned);
  }

  /**
   * navigate action
   */
  async handleNavigate(action) {
    if (!this.navigationEngine) {
      console.warn("navigate ignored: no NavigationEngine provided");
      return;
    }

    const { to, params } = action;

    if (!to || typeof to !== "string") {
      console.warn("Invalid navigate target:", action);
      return;
    }

    await this.navigationEngine.navigate(to, params || {});
  }

  /**
   * conditional action
   */
  async handleConditional(action) {
    if (!this.stateEngine) {
      console.warn("conditional ignored: no StateEngine provided");
      return;
    }

    const condition = action.if;

    if (!condition || !condition.path) {
      console.warn("Invalid conditional action:", action);
      return;
    }

    const current = safeGet(this.stateEngine.state, condition.path);

    const matches =
      condition.equals !== undefined
        ? current === condition.equals
        : Boolean(current);

    if (matches && action.then) {
      await this.run(action.then);
    } else if (!matches && action.else) {
      await this.run(action.else);
    }
  }

  /**
   * log action
   */
  async handleLog(action) {
    if (action.message) {
      console.log("[ActionEngine]", action.message);
    }
  }
}
