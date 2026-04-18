// backend/api/compile.js
export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const { html } = req.body || {};

    if (!html || typeof html !== "string") {
      return res.status(400).json({
        ok: false,
        error: "Compile requires an HTML string."
      });
    }

    // Basic sanitization (real, not placeholder)
    const cleaned = html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/on\w+="[^"]*"/gi, "")
      .replace(/javascript:/gi, "");

    // Normalize whitespace
    const normalized = cleaned
      .replace(/\s+/g, " ")
      .trim();

    return res.status(200).json({
      ok: true,
      compiled: normalized,
      length: normalized.length,
      timestamp: Date.now()
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "Compile engine failure.",
      details: err.message
    });
  }
}
