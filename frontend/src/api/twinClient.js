// frontend/src/api/twinClient.js

/**
 * twinClient
 * A minimal, safe wrapper for calling the backend TWIN API route.
 * All privileged logic stays server-side.
 */

export async function twinRequest(action, payload = {}) {
  try {
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
  } catch (err) {
    console.error("TWIN API Error:", err);
    throw err;
  }
}
