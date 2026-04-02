// frontend/src/twin/twin.js

import BuilderEngine from "../runtime/BuilderEngine";
import ActionEngine from "../runtime/ActionEngine";
import RuntimeEngine from "../runtime/RuntimeEngine";
import AppDefinitionValidator from "../runtime/AppDefinitionValidator";

export default class TWIN {
  constructor(options = {}) {
    this.builderEngine = options.builderEngine || new BuilderEngine();
    this.actionEngine = options.actionEngine || new ActionEngine();
    this.runtimeEngine = options.runtimeEngine || new RuntimeEngine();
    this.validator = options.validator || AppDefinitionValidator;

    // In‑memory registry of apps TWIN knows about
    this.apps = new Map();
  }

  /**
   * High‑level entry point for commands.
   * Example commands:
   *  - { type: "build_app", spec: {...} }
   *  - { type: "run_app", appId: "my-app" }
   *  - { type: "action", appId, actionName, payload }
   */
  async handleCommand(command) {
    if (!command || typeof command !== "object") {
      throw new Error("TWIN.handleCommand: command must be an object.");
    }

    const { type } = command;

    switch (type) {
      case "build_app":
        return this.buildApp(command.spec);

      case "run_app":
        return this.runApp(command.appId);

      case "action":
        return this.runAction(
          command.appId,
          command.actionName,
          command.payload
        );

      default:
        throw new Error(`TWIN.handleCommand: unknown command type '${type}'.`);
    }
  }

  /**
   * Build an app from a high‑level spec using the BuilderEngine.
   * Returns a validated appDefinition and registers it under an ID.
   */
  async buildApp(spec) {
    if (!spec || typeof spec !== "object") {
      throw new Error("TWIN.buildApp: spec must be an object.");
    }

    // Let BuilderEngine turn the spec into an app definition
    const appDefinition = await this.builderEngine.build(spec);

    // Validate before registering
    this.validator.validate(appDefinition);

    const appId = appDefinition.id || this._generateAppId(appDefinition.name);
    this.apps.set(appId, appDefinition);

    return { appId, appDefinition };
  }

  /**
   * Run an app by ID using the RuntimeEngine.
   * Returns whatever the runtime decides (e.g., initial state, view model).
   */
  async runApp(appId) {
    const appDefinition = this.apps.get(appId);

    if (!appDefinition) {
      throw new Error(`TWIN.runApp: app '${appId}' not found.`);
    }

    // Ensure still valid before running
    this.validator.validate(appDefinition);

    return this.runtimeEngine.run(appDefinition);
  }

  /**
   * Execute an action inside a running app via the ActionEngine.
   */
  async runAction(appId, actionName, payload) {
    const appDefinition = this.apps.get(appId);

    if (!appDefinition) {
      throw new Error(`TWIN.runAction: app '${appId}' not found.`);
    }

    if (!actionName || typeof actionName !== "string") {
      throw new Error("TWIN.runAction: actionName must be a non-empty string.");
    }

    // Validate app before executing actions
    this.validator.validate(appDefinition);

    return this.actionEngine.execute({
      appDefinition,
      appId,
      actionName,
      payload,
    });
  }

  /**
   * Simple ID generator based on name + timestamp.
   * Safe, local, no external dependencies.
   */
  _generateAppId(name = "app") {
    const safeName = String(name).toLowerCase().replace(/\s+/g, "-");
    const ts = Date.now().toString(36);
    return `${safeName}-${ts}`;
  }
}
