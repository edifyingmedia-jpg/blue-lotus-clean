// backend/twin/actions/validateProjectDefinition.js

/**
 * validateProjectDefinition (Backend Action)
 * Strictly validates the structure of a project definition.
 * Ensures runtime safety before previewing, saving, or rendering.
 */

export async function validateProjectDefinition({ definition }) {
  if (!definition || typeof definition !== "object") {
    return {
      ok: false,
      errors: ["Project definition is missing or invalid"],
    };
  }

  const errors = [];

  // -----------------------------
  // Validate screens
  // -----------------------------
  if (!Array.isArray(definition.screens)) {
    errors.push("screens must be an array");
  } else {
    definition.screens.forEach((screen, index) => {
      if (!screen.id) errors.push(`Screen ${index} is missing id`);
      if (!screen.name) errors.push(`Screen ${index} is missing name`);
      if (!Array.isArray(screen.components))
        errors.push(`Screen ${screen.id} components must be an array`);
      if (!Array.isArray(screen.routes))
        errors.push(`Screen ${screen.id} routes must be an array`);
    });
  }

  // -----------------------------
  // Validate components
  // -----------------------------
  if (!Array.isArray(definition.components)) {
    errors.push("components must be an array");
  } else {
    definition.components.forEach((component, index) => {
      if (!component.id)
        errors.push(`Component ${index} is missing id`);
      if (!component.type)
        errors.push(`Component ${component.id} is missing type`);
      if (component.props && typeof component.props !== "object")
        errors.push(`Component ${component.id} props must be an object`);
      if (component.children && !Array.isArray(component.children))
        errors.push(`Component ${component.id} children must be an array`);
    });
  }

  // -----------------------------
  // Validate routes
  // -----------------------------
  if (!Array.isArray(definition.routes)) {
    errors.push("routes must be an array");
  } else {
    definition.routes.forEach((route, index) => {
      if (!route.path)
        errors.push(`Route ${index} is missing path`);
      if (!route.screenId)
        errors.push(`Route ${route.path} is missing screenId`);
    });
  }

  // -----------------------------
  // Cross‑reference: routes → screens
  // -----------------------------
  if (Array.isArray(definition.routes) && Array.isArray(definition.screens)) {
    const screenIds = new Set(definition.screens.map(s => s.id));

    definition.routes.forEach(route => {
      if (!screenIds.has(route.screenId)) {
        errors.push(
          `Route path "${route.path}" references missing screenId "${route.screenId}"`
        );
      }
    });
  }

  // -----------------------------
  // Final result
  // -----------------------------
  if (errors.length > 0) {
    return {
      ok: false,
      errors,
    };
  }

  return {
    ok: true,
    message: "Project definition is valid",
  };
}
