// backend/twin/actions/validateProjectDefinition.js

/**
 * validateProjectDefinition
 * -------------------------
 * This action validates the structure of a TWIN project definition.
 * It ensures the project has the required fields, correct types,
 * and no missing or malformed sections before saving or rendering.
 */

export async function validateProjectDefinition({ project }) {
  if (!project || typeof project !== "object") {
    throw new Error("Invalid project payload: expected an object.");
  }

  const errors = [];

  // Required fields
  if (!project.id) errors.push("Missing project.id");
  if (!project.name) errors.push("Missing project.name");
  if (!project.pages || !Array.isArray(project.pages)) {
    errors.push("project.pages must be an array");
  }

  // Validate each page
  if (Array.isArray(project.pages)) {
    project.pages.forEach((page, index) => {
      if (!page.id) errors.push(`Page ${index} missing id`);
      if (!page.name) errors.push(`Page ${index} missing name`);
      if (!page.components || !Array.isArray(page.components)) {
        errors.push(`Page ${index} components must be an array`);
      }
    });
  }

  // If errors exist, return them
  if (errors.length > 0) {
    return {
      ok: false,
      valid: false,
      errors,
    };
  }

  // Otherwise, project is valid
  return {
    ok: true,
    valid: true,
    message: "Project definition is valid",
  };
}
