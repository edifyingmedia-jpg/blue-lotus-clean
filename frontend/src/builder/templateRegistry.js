// frontend/src/builder/templateRegistry.js

/**
 * Blue Lotus Template Registry (Upgraded)
 * ---------------------------------------
 * - Supports multiple templates
 * - Supports dynamic imports
 * - Safe for TWIN + runtime
 * - Auto‑expands as you add more templates
 */

const templateRegistry = {};

/**
 * Register a template manually.
 * Useful when adding new templates.
 */
export function registerTemplate(name, template) {
  templateRegistry[name] = template;
}

/**
 * Load a template by name.
 * Returns null if not found.
 */
export function getTemplate(name) {
  return templateRegistry[name] || null;
}

/**
 * List all available template names.
 */
export function listTemplates() {
  return Object.keys(templateRegistry);
}

/**
 * Preload built‑in templates.
 * Add more here as you create them.
 */
import basicBuilder from "./templates/basic-builder.json";
registerTemplate("basic-builder", basicBuilder);

export default {
  registerTemplate,
  getTemplate,
  listTemplates,
  templateRegistry
};
