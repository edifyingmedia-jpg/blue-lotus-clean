/**
 * twinClient.js
 * ----------------------------------------------------
 * Frontend-safe wrapper for calling TWIN backend actions.
 *
 * This client:
 *  - Sends requests to the Blue Lotus backend
 *  - Wraps fetch with consistent error handling
 *  - Ensures deterministic, predictable responses
 *  - Never exposes owner-only logic (that stays in twin.js)
 */

const API_BASE = "/api/twin";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method || "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TWIN request failed: ${res.status} ${text}`);
  }

  return res.json();
}

const twinClient = {
  /**
   * Run a TWIN action by name
   */
  run(actionName, payload = {}) {
    return request("/run", {
      body: { action: actionName, payload },
    });
  },

  /**
   * Validate a project definition
   */
  validateProject(definition) {
    return request("/validate", {
      body: { definition },
    });
  },

  /**
   * Generate a preview of a project
   */
  generatePreview(definition) {
    return request("/preview", {
      body: { definition },
    });
  },

  /**
   * Save a project to the backend
   */
  saveProject(project) {
    return request("/save", {
      body: { project },
    });
  },

  /**
   * Load a project by ID
   */
  loadProject(id) {
    return request("/load", {
      body: { id },
    });
  },
};

export default twinClient;
