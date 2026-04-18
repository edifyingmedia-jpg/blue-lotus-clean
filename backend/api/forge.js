// backend/api/forge.js
export default function handler(req, res) {
  const { html } = req.body || {};

  if (!html || typeof html !== "string") {
    return res.status(400).json({
      ok: false,
      error: "Forge requires an HTML string."
    });
  }

  // Placeholder for future sanitization + transformation
  return res.status(200).json({
    ok: true,
    forged: html,
    timestamp: Date.now()
  });
}
