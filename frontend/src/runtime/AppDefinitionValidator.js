// AppDefinitionValidator.js
// Validates the structure of an app definition before TWIN attempts to render it.

export default class AppDefinitionValidator {
  static validate(appDefinition) {
    if (!appDefinition || typeof appDefinition !== "object") {
      return {
        valid: false,
        error: "App definition is missing or invalid."
      };
    }

    // Must have a name
    if (!appDefinition.name || typeof appDefinition.name !== "string") {
      return {
        valid: false,
        error: "App definition must include a valid 'name' field."
      };
    }

    // Must have a components array
    if (!Array.isArray(appDefinition.components)) {
      return {
        valid: false,
        error: "App definition must include a 'components' array."
      };
    }

    // Validate each component entry
    for (let i = 0; i < appDefinition.components.length; i++) {
      const comp = appDefinition.components[i];

      if (!comp.type || typeof comp.type !== "string") {
        return {
          valid: false,
          error: `Component at index ${i} is missing a valid 'type' field.`
        };
      }

      if (!comp.props || typeof comp.props !== "object") {
        return {
          valid: false,
          error: `Component at index ${i} must include a 'props' object.`
        };
      }
    }

    return { valid: true };
  }
}
