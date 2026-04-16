// backend/twin/engine.js
/**
 * TWIN Engine (Backend Core)
 * This is the secure, server-side executor for all TWIN actions.
 * All privileged logic stays here — never in the frontend.
 */

import { getProject } from "./actions/getProject.js";
import { createProject } from "./actions/createProject.js";
import { updateProject } from "./actions/updateProject.js";
import { deleteProject } from "./actions/deleteProject.js";
import { listProjects } from "./actions/listProjects.js";
import { getAllUserData } from "./actions/getAllUserData.js";
import { generateProjectPreview } from "./actions/generateProjectPreview.js";
import { validateProjectDefinition } from "./actions/validateProjectDefinition.js";

/**
 * runTWIN
 * @param {string} action - The name of the action to perform
 * @param {Object} payload - The data required for the action
 */
export async function runTWIN(action, payload = {}) {
  try {
    // Standardize logging for Vercel
    console.log(`[TWIN Engine] Executing action: ${action}`);

    switch (action) {
      case "ping":
        return { ok: true, message: "TWIN engine online", timestamp: new Date() };

      case "getProject":
        return await getProject(payload);

      case "createProject":
        return await createProject(payload);

      case "updateProject":
        return await updateProject(payload);

      case "deleteProject":
        return await deleteProject(payload);

      case "listProjects":
        return await listProjects(payload);

      case "getAllUserData":
        return await getAllUserData(payload);

      case "generateProjectPreview":
        return await generateProjectPreview(payload);

      case "validateProjectDefinition":
        return await validateProjectDefinition(payload);

      default:
        throw new Error(`Unknown TWIN action: ${action}`);
    }
  } catch (err) {
    // This log is vital for debugging in the Vercel Dashboard
    console.error(`[TWIN Engine Error] Action "${action}" failed:`, err.message);
    throw err;
  }
}
