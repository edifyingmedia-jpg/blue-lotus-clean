// frontend/src/runtime/ActionDispatcher.js

/**
 * ActionDispatcher
 * ---------------------------------------------------------
 * Receives component-level events (onPress, onChange, etc.)
 * and dispatches them to the ActionEngine in a standardized way.
 *
 * Responsibilities:
 *  - Normalize event payloads
 *  - Support single or multiple actions
 *  - Support conditional actions
 *  - Never mutate state directly
 */

export default class ActionDispatcher {
  constructor({ actionEngine }) {
    this.actionEngine = actionEngine;
  }

  /**
   * Dispatch a component event.
   *
   * Example event:
   * {
   *   type: "onPress",
   *   actions: [
   *     { type: "navigate", to: "Home" },
   *     { type: "setState", path: "clicked", value: true }
   *   ]
   * }
   */
  async dispatchEvent(event) {
    if (!event) return;

    const { actions } = event;
    if (!actions) return;

    // Single action
    if (!Array.isArray(actions)) {
      await this.executeAction(actions);
      return;
    }

    // Multiple actions
    for (const action of actions) {
      await this.executeAction(action);
    }
  }

  /**
   * Execute a single action object.
   */
  async executeAction(action) {
    if (!action || typeof action !== "object") return;

    // Inline conditional support
    if (action.if) {
      const condition = action.if;
      return await this.actionEngine.run({
        type: "conditional",
        if: condition,
        then: action.then,
        else: action.else,
      });
    }

    // Delegate to ActionEngine
    await this.actionEngine.run(action);
  }
}
