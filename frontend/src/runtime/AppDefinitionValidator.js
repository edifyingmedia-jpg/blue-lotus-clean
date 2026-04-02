// AppDefinitionValidator.js
// Validates the structure of an app definition before TWIN generates anything.

export default class AppDefinitionValidator {
  static validate(appDefinition) {
    if (!appDefinition || typeof appDefinition !== "object") {
      throw new Error("Invalid app definition: must be an object.");
    }

    // Required root fields
    const requiredFields = ["name", "pages", "schema"];

    requiredFields.forEach((field) => {
      if (!(field in appDefinition)) {
        throw new Error(`Invalid app definition: missing '${field}'.`);
      }
    });

    // Validate name
    if (typeof appDefinition.name !== "string" || !appDefinition.name.trim()) {
      throw new Error("Invalid app definition: 'name' must be a non-empty string.");
    }

    // Validate pages
    if (!Array.isArray(appDefinition.pages) || appDefinition.pages.length === 0) {
      throw new Error("Invalid app definition: 'pages' must be a non-empty array.");
    }

    appDefinition.pages.forEach((page, index) => {
      if (typeof page !== "object") {
        throw new Error(`Invalid page at index ${index}: must be an object.`);
      }

      if (!page.name || typeof page.name !== "string") {
        throw new Error(`Invalid page at index ${index}: missing or invalid 'name'.`);
      }

      if (!Array.isArray(page.components)) {
        throw new Error(`Invalid page '${page.name}': 'components' must be an array.`);
      }
    });

    // Validate schema
    if (typeof appDefinition.schema !== "object") {
      throw new Error("Invalid app definition: 'schema' must be an object.");
    }

    // Validate actions
    if (appDefinition.actions) {
      if (typeof appDefinition.actions !== "object") {
        throw new Error("Invalid app definition: 'actions' must be an object.");
      }

      Object.entries(appDefinition.actions).forEach(([actionName, actionDef]) => {
        if (typeof actionDef !== "object") {
          throw new Error(`Invalid action '${actionName}': must be an object.`);
        }

        if (!actionDef.type || typeof actionDef.type !== "string") {
          throw new Error(`Invalid action '${actionName}': missing or invalid 'type'.`);
        }
      });
    }

    return true;
  }
}
