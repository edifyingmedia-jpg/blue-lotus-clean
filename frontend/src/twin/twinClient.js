// frontend/src/twin/twinClient.js

import TWIN from "./twin";

class TwinClient {
  constructor() {
    this.twin = new TWIN();
  }

  /**
   * Send a command to TWIN.
   * Example:
   *   send({ type: "build_app", spec: {...} })
   */
  async send(command) {
    try {
      return await this.twin.handleCommand(command);
    } catch (err) {
      console.error("TwinClient error:", err);
      throw err;
    }
  }

  /**
   * Build an app directly.
   */
  async buildApp(spec) {
    return this.send({ type: "build_app", spec });
  }

  /**
   * Run an app by ID.
   */
  async runApp(appId) {
    return this.send({ type: "run_app", appId });
  }

  /**
   * Execute an action inside a running app.
   */
  async runAction(appId, actionName, payload) {
    return this.send({
      type: "action",
      appId,
      actionName,
      payload,
    });
  }
}

export default new TwinClient();
