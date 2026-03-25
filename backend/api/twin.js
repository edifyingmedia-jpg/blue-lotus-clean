// backend/api/twin.js

/**
 * TWIN Backend API Route
 * This is the secure server-side entry point for all TWIN actions.
 * All privileged logic stays here — never in the frontend.
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, payload } = req.body || {};

  if (!action) {
    return res.status(400).json({ error: "Missing TWIN action" });
  }

  try {
    // Dynamically load the TWIN engine (server-side only)
    const { runTWIN } = await import("../twin/engine.js");

    const result = await runTWIN(action, payload);

    return res.status(200).json(result);
  } catch (err) {
    console.error("TWIN Backend Error:", err);
    return res.status(500).json({ error: err.message || "TWIN internal error" });
  }
}
