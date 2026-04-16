// frontend/src/runtime/BuilderEngine.js
import generateId from './utils/generateId';

/**
 * The "Blueprinting Station": Translates high-level AI/User specs 
 * into a structured, renderable application definition.
 */
export default class BuilderEngine {
  /**
   * Convert a high-level spec into a hardened app definition.
   */
  async build(spec) {
    if (!spec || typeof spec !== "object") {
      throw new Error("BuilderEngine.build: spec must be an object.");
    }

    // Ensures that even minimal specs result in a valid, timestamped blueprint
    const appDefinition = {
      id: spec.id || generateId('app'),
      name: spec.name || "Untitled Project",
      pages: Array.isArray(spec.pages) ? spec.pages : [],
      metadata: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: "1.0.0"
      }
    };

    return appDefinition;
  }
}
