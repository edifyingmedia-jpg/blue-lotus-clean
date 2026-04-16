// scripts/validate-templates.js (Hardened Version)
const fs = require("fs");
const path = require("path");

function validateTemplate(filePath) {
  const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const errors = [];

  // ELITE UPGRADE: Structural Depth Checks
  if (!json.id) errors.push("Missing unique 'id' field");
  if (!Array.isArray(json.nodes) || json.nodes.length === 0) {
    errors.push("Templates must contain at least one layout node");
  }

  // 2026 DESIGN CHECK: Ensure Tailwind tokens exist
  if (!json.tokens?.colors?.primary) {
    errors.push("Missing 'primary' color token for brand consistency");
  }

  if (errors.length) {
    throw new Error(`\n❌ [VALIDATION FAILED] ${path.basename(filePath)}:\n- ${errors.join("\n- ")}`);
  }
}
