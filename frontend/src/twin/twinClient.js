// frontend/src/twin/twinClient.js

class TwinClient {
  constructor() {}

  /**
   * Send a command to the backend TWIN Brain.
   * This replaces the old local TWIN class.
   */
  async send(command) {
    try {
      const response = await fetch("/api/twin-brain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: JSON.stringify(command)
            }
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Backend error");
      }

      return data.reply;
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
      payload
    });
  }
}

export default new TwinClient();
