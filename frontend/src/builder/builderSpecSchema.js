// frontend/src/builder/builderSpecSchema.js
/**
 * Canonical builder spec shape used by BuilderFactory and templates.
 *
 * This file documents and exports a small schema object (not a runtime validator)
 * that describes the JSON shape for portable builder specs. The shape is intentionally
 * simple and JSON-serializable so specs can be saved, exported, and re-instantiated.
 *
 * Fields:
 * - meta: { name, version, description, createdAt }
 * - manifest: Array of component entries (name, label, description, props)
 * - tokens: Plain object of design tokens (colors, spacing, radii, etc.)
 * - nodes: Array of node objects used by the workspace (id, type, props, children)
 *
 * Note: This is a descriptive schema for developer reference. If you want runtime
 * validation, add a lightweight validator (e.g., ajv) and a JSON Schema derived
 * from this shape.
 */

export const builderSpecSchema = {
  meta: {
    /** Human name for the builder/template */
    name: "string",
    /** Semver or simple version string */
    version: "string",
    /** Short description */
    description: "string",
    /** ISO timestamp */
    createdAt: "string",
  },
  manifest: [
    /* Example manifest entry:
    {
      name: "Button",
      label: "Button",
      description: "A clickable button",
      props: { children: "Click me", variant: "primary" }
    }
    */
  ],
  tokens: {
    /* Example tokens:
    color: { primary: "#06b6d4", surface: "#0b1220" },
    spacing: { sm: 8, md: 16 }
    */
  },
  nodes: [
    /* Example node:
    {
      id: "n-1",
      type: "Card",
      props: { title: "Hello" },
      children: [{ id: "n-2", type: "Button", props: { children: "Click" }, children: [] }]
    }
    */
  ],
};

/** Helper: create an empty spec that follows the schema shape */
export function createEmptySpec({ name = "builder", description = "" } = {}) {
  return {
    meta: {
      name,
      version: "0.1.0",
      description,
      createdAt: new Date().toISOString(),
    },
    manifest: [],
    tokens: {},
    nodes: [],
  };
}

export default { builderSpecSchema, createEmptySpec };
