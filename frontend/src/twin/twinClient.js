/**
 * twinClient.js
 * ----------------------------------------------------
 * Safe, minimal frontend wrapper for calling backend
 * TWIN actions. This file contains zero privileged logic.
 *
 * All sensitive operations remain server-side inside:
 *   backend/api/twin.js
 *   backend/twin/engine.js
 */

export async function twinRequest(action, payload = {}) {
  const res = await fetch("/api/twin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, payload })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "TWIN request failed");
  }

  return data;
}
