// backend/twin/engine.js

/**
 * TWIN Engine (Backend Core)
 * This is the secure, server-side executor for all TWIN actions.
 * All privileged logic stays here — never in the frontend.
 */

import { getProject } from "./actions/getProject.js";

export async function runTWIN(action, payload = {}) {
  try {
    switch (action) {
      case "ping":
        return { ok: true, message: "TWIN engine online" };

      case "getProject":
        return await getProject(payload);

      default:
        throw new Error(`Unknown TWIN action: ${action}`);
    }
  } catch (err) {
    console.error("TWIN Engine Error:", err);
    throw err;
  }
}
