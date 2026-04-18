// backend/api/flow.js

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const { step, payload } = req.body || {};

    if (!step) {
      return res.status(400).json({
        ok: false,
        error: "Flow requires a 'step' parameter."
      });
    }

    switch (step) {
      case "twin":
        return res.status(200).json({
          ok: true,
          step: "twin",
          received: payload || null
        });

      case "forge":
        return res.status(200).json({
          ok: true,
          step: "forge",
          received: payload || null
        });

      case "compile":
        return res.status(200).json({
          ok: true,
          step: "compile",
          received: payload || null
        });

      case "build":
        return res.status(200).json({
          ok: true,
          step: "build",
          received: payload || null
        });

      default:
        return res.status(404).json({
          ok: false,
          error: `Unknown flow step: ${step}`
        });
    }

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "Flow engine failure.",
      details: err.message
    });
  }
}
