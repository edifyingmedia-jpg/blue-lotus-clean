// AppDefinitionValidator.js
// Ensures the project definition coming from the Builder is valid and safe.

export function validateAppDefinition(project) {
  if (!project) {
    return { valid: false, error: "Project is missing." };
  }

  if (!Array.isArray(project.pages)) {
    return { valid: false, error: "Project.pages must be an array." };
  }

  for (const page of project.pages) {
    if (!page.id || typeof page.id !== "string") {
      return { valid: false, error: "Each page must have a valid id." };
    }

    if (!page.name || typeof page.name !== "string") {
      return { valid: false, error: `Page ${page.id} is missing a name.` };
    }

    if (!Array.isArray(page.components)) {
      return {
        valid: false,
        error: `Page ${page.id} has invalid components array.`
      };
    }

    for (const component of page.components) {
      if (!component.id || typeof component.id !== "string") {
        return {
          valid: false,
          error: `Component missing id on page ${page.id}.`
        };
      }

      if (!component.type || typeof component.type !== "string") {
        return {
          valid: false,
          error: `Component ${component.id} missing type on page ${page.id}.`
        };
      }

      if (typeof component.props !== "object") {
        return {
          valid: false,
          error: `Component ${component.id} has invalid props.`
        };
      }
    }
  }

  return { valid: true, error: null };
}
