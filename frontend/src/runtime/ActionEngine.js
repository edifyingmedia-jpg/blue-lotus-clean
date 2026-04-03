// frontend/src/runtime/ActionEngine.js

import safeGet from "./utils/safeGet.js";
import { deepClone } from "./utils.js";
import NavigationEngine from "./NavigationEngine.js";
import StateEngine from "./StateEngine.js";
import eventBus from "./utils/eventBus.js";

export default class ActionEngine {
  constructor(runtime) {
    this.runtime = runtime;
    this.stateEngine = new StateEngine(runtime);
    this.navigationEngine = new NavigationEngine(runtime);
  }

  async run(action, context = {}) {
    if (!action || typeof action !== "object") return;

    const { type } = action;

    switch (type) {
      case "setState":
        return this.handleSetState(action, context);

      case "navigate":
        return this.handleNavigate(action, context);

      case "conditional":
        return this.handleConditional(action, context);

      case "log":
        return this.handleLog(action, context);

      default:
        console.warn("Unknown action type:", type);
        return;
    }
  }

  handleSetState(action, context) {
    const { key, value } = action;
    if (!key) return;

    const resolvedValue =
      typeof value === "function" ? value(context) : deepClone(value);

    this.stateEngine.setState(key, resolvedValue);
  }

  handleNavigate(action, context) {
    const { to, params } = action;
    if (!to) return;

    const resolvedParams =
      typeof params === "function" ? params(context) : deepClone(params);

    this.navigationEngine.navigate(to, resolvedParams);
  }

  async handleConditional(action, context) {
    const { condition, ifTrue, ifFalse } = action;

    let result = false;

    try {
      if (typeof condition === "function") {
        result = await condition(context);
      } else if (typeof condition === "string") {
        result = safeGet(context, condition);
      }
    } catch (err) {
      console.error("Error evaluating condition:", err);
    }

    if (result && ifTrue) {
      return this.run(ifTrue, context);
    }

    if (!result && ifFalse) {
      return this.run(ifFalse, context);
    }
  }

  handleLog(action, context) {
    const { message } = action;
    const resolved =
      typeof message === "function" ? message(context) : message;

    console.log("[ActionEngine LOG]:", resolved);
    eventBus.emit("log", resolved);
  }
}
