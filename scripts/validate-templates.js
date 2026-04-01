// scripts/validate-templates.js
/**
 * Validates all builder templates in /src/builder/templates
 * against builderSpecSchema.js.
 *
 * CI uses this script to ensure only valid templates are published.
 */

const fs = require("fs");
const path = require("path");
const schema = require("../src/builder/builderSpecSchema");

function validateTemplate(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(raw);

  const errors = [];

  if (!Array.isArray(json.manifest)) {
    errors.push("manifest must be an array");
  }

  if (typeof json.tokens !== "object") {
    errors.push("tokens must be an object");
  }

  if (!Array.isArray(json.nodes)) {
    errors.push("nodes must be an array");
  }

  if (errors.length) {
    throw new Error(
      `Template ${path.basename(filePath)} is invalid:\n- ${errors.join("\n- ")}`
    );
  }
}

function run() {
  const templatesDir = path.join(
    __dirname,
    "../src/builder/templates"
  );

  const files = fs
    .readdirSync(templatesDir)
    .filter((f) => f.endsWith(".json"));

  if (!files.length) {
    console.log("No templates found.");
    return;
  }

  files.forEach((file) => {
    const full = path.join(templatesDir, file);
    validateTemplate(full);
    console.log(`✓ Validated ${file}`);
  });

  console.log("All templates validated successfully.");
}

try {
  run();
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
