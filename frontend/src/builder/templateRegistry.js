// frontend/src/builder/templateRegistry.js

/**
 * Loads all builder templates from /src/builder/templates
 * and exposes them as a registry for TWIN and the runtime.
 */

import basicBuilder from "./templates/basic-builder.json";

const registry = {
  "basic-builder": basicBuilder
};

export function getTemplate(name) {
  return registry[name] || null;
}

export function listTemplates() {
  return Object.keys(registry);
}
