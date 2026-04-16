// frontend/src/builder/templateRegistry.js

/**
 * Blue Lotus Template Registry (Upgraded)
 * ---------------------------------------
 * Manages the library of starting templates for the builder.
 * Ensures templates are validated against the builderSpecSchema.
 */

const templateRegistry = {};

/**
 * Register a template and ensure it has basic metadata.
 */
export function registerTemplate(name, template) {
  templateRegistry[name] = {
    ...template,
    registeredAt: new Date().toISOString(),
    engine: "Blue Lotus v2"
  };
}

export function getTemplate(name) {
  return templateRegistry[name] || null;
}

export function listTemplates() {
  return Object.keys(templateRegistry).map(name => ({
    name,
    label: templateRegistry[name].label || name
  }));
}

/**
 * Built-in Templates
 * ------------------
 * As you create more .json files in /templates, import and register them here.
 */
import basicBuilder from "./templates/basic-builder.json";

registerTemplate("basic-builder", basicBuilder);

export default {
  registerTemplate,
  getTemplate,
  listTemplates,
  templateRegistry
};
