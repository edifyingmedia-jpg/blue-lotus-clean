// frontend/src/runtime/ProjectLoader.js
import AppDefinitionValidator from "./AppDefinitionValidator";

export default class ProjectLoader {
  /**
   * Loads and validates a project definition.
   * Ensures it meets the 2026 Blue Lotus structural standards.
   */
  static load(project) {
    if (!project || typeof project !== "object") {
      throw new Error("[ProjectLoader] Invalid project: Input must be an object.");
    }

    // 1. Normalize the structure with safe defaults
    const normalized = {
      id: project.id || `proj_${Date.now()}`,
      name: project.name || "Untitled App",
      pages: Array.isArray(project.pages) ? project.pages : [],
      theme: project.theme || { colors: {}, spacing: {} },
      state: project.state || {},
      metadata: project.metadata || { version: "1.0.0" }
    };

    // 2. Perform a deep structural audit
    const validation = AppDefinitionValidator.validate(normalized);
    if (!validation.valid) {
      console.error("[ProjectLoader] Validation failed:", validation.errors);
      // In development, we throw; in production, we could attempt a 'repair'
      throw new Error(`Invalid Project Schema: ${validation.errors.join(", ")}`);
    }

    return normalized;
  }
}
