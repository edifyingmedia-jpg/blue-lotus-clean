export default class AppDefinitionValidator {
  static validate(appDefinition) {
    if (!appDefinition || typeof appDefinition !== "object") {
      return { valid: false, error: "App definition is missing or invalid." };
    }

    if (!appDefinition.name || typeof appDefinition.name !== "string") {
      return { valid: false, error: "App definition must include a valid 'name' field." };
    }

    if (!Array.isArray(appDefinition.components)) {
      return { valid: false, error: "App definition must include a 'components' array." };
    }

    for (let i = 0; i < appDefinition.components.length; i++) {
      const comp = appDefinition.components[i];

      if (!comp.type || typeof comp.type !== "string") {
        return { valid: false, error: `Component at index ${i} is missing a valid 'type' field.` };
      }

      if (!comp.props || typeof comp.props !== "object") {
        return { valid: false, error: `Component at index ${i} must include a 'props' object.` };
      }
    }

    return { valid: true };
  }
}
