// frontend/src/runtime/AppDefinitionValidator.js

import componentRegistry from "../components/ComponentRegistry";

export function validateAppDefinition(appDefinition) {
  if (!appDefinition || !appDefinition.sections) {
    return { valid: false, errors: ["Missing sections array"] };
  }

  const errors = [];

  appDefinition.sections.forEach((section, sIndex) => {
    if (!section.components) {
      errors.push(`Section ${sIndex} is missing components array`);
      return;
    }

    section.components.forEach((component, cIndex) => {
      if (!component.type) {
        errors.push(`Component ${cIndex} in section ${sIndex} has no type`);
        return;
      }

      const exists = componentRegistry.getComponent(component.type);

      if (!exists) {
        errors.push(
          `Unknown component type "${component.type}" in section ${sIndex}, component ${cIndex}`
        );
      }
    });
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
