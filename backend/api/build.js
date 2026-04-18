// backend/api/build.js
import path from "path";
import fs from "fs/promises";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const { files } = req.body || {};

    if (!files || typeof files !== "object") {
      return res.status(400).json({
        ok: false,
        error: "Build requires a 'files' object containing file paths and content."
      });
    }

    // Create a temporary build directory
    const buildDir = path.join("/tmp", `bluelotus-build-${Date.now()}`);
    await fs.mkdir(buildDir, { recursive: true });

    // Write each file to the build directory
    for (const filePath of Object.keys(files)) {
      const fullPath = path.join(buildDir, filePath);
      const dir = path.dirname(fullPath);

      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(fullPath, files[filePath], "utf8");
    }

    // Return the list of generated files
    return res.status(200).json({
      ok: true,
      buildDirectory: buildDir,
      generatedFiles: Object.keys(files),
      timestamp: Date.now()
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "Build engine failure.",
      details: err.message
    });
  }
}
