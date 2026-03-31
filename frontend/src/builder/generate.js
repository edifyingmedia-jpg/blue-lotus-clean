// frontend/src/builder/generate.js

import { builderCoreTemplate } from "./templates";

export function generateBuilder(input) {
  const name = normalizeName(input);
  return builderCoreTemplate(name);
}

export default generateBuilder;

function normalizeName(input) {
  if (!input) return "Lotus Builder";

  // Accept either a string prompt or an object payload
  const raw =
    typeof input === "string"
      ? input
      : typeof input === "object" && input !== null
      ? input.name || input.title || input.prompt || ""
      : "";

  const extracted = extractBuilderName(raw);
  return extracted || "Lotus Builder";
}

function extractBuilderName(text) {
  const t = String(text || "").trim();
  if (!t) return "";

  // Examples:
  // "Build an app builder called Lotus Forge"
  // "Create a builder named Lotus Forge"
  // "app builder: Lotus Forge"
  const patterns = [
    /app builder called\s+["']?([^"'\n]+)["']?/i,
    /builder called\s+["']?([^"'\n]+)["']?/i,
    /builder named\s+["']?([^"'\n]+)["']?/i,
    /app builder:\s*["']?([^"'\n]+)["']?/i,
    /^["']?([^"'\n]+)["']?$/i,
  ];

  for (const re of patterns) {
    const m = t.match(re);
    if (m && m[1]) return cleanName(m[1]);
  }

  return "";
}

function cleanName(name) {
  return String(name)
    .replace(/\s+/g, " ")
    .replace(/[^\w\s\-]/g, "")
    .trim()
    .slice(0, 60);
}
