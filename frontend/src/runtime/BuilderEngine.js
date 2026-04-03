// frontend/src/runtime/BuilderEngine.js

export default class BuilderEngine {
  /**
   * Convert a high-level spec into an app definition.
   * This is intentionally minimal until the full builder is implemented.
   */
  async build(spec) {
    if (!spec || typeof spec !== "object") {
      throw new Error("BuilderEngine.build: spec must be an object.");
    }

    const appDefinition = {
      id: spec.id || this._generateId(),
      name: spec.name || "Untitled App",
      pages: Array.isArray(spec.pages) ? spec.pages : [],
      createdAt: Date.now(),
    };

    return appDefinition;
  }

  /**
   * Simple unique ID generator.
   */
  _generateId() {
    return "app-" + Math.random().toString(36).slice(2);
  }
}
