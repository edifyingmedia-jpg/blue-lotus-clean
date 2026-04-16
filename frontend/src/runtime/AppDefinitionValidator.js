// frontend/src/runtime/AppDefinitionValidator.js

/**
 * Validates the structural integrity of a Blue Lotus app blueprint.
 * Ensures the AI has provided a renderable project structure.
 */
export function validateAppDefinition(definition) {
  // 1. Basic Type Check
  if (!definition || typeof definition !== "object") {
    console.error("[Runtime] Invalid AppDefinition: Root must be an object.");
    return false;
  }

  // 2. Page Array Integrity
  if (!definition.pages || !Array.isArray(definition.pages)) {
    console.error("[Runtime] Invalid AppDefinition: 'pages' property is missing or not an array.");
    return false;
  }

  // 3. Minimum Content Check
  if (definition.pages.length === 0) {
    console.error("[Runtime] Invalid AppDefinition: App must contain at least one page.");
    return false;
  }

  // 4. Structural Verification
  // Ensures every page has at least a basic ID or name for the Engine to target
  const hasValidPages = definition.pages.every(page => page && (page.id || page.name));
  if (!hasValidPages) {
    console.error("[Runtime] Invalid AppDefinition: One or more pages are missing required identifiers.");
    return false;
  }

  return true;
}
