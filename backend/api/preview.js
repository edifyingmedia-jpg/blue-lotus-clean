// backend/api/preview.js
export default function handler(req, res) {
  const { html } = req.body || {};

  if (!html || typeof html !== "string") {
    return res.status(400).json({ error: "Invalid preview payload" });
  }

  return res.status(200).json({
    ok: true,
    sanitized: html,
    timestamp: Date.now()
  });
}
