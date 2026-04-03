export function validateAppDefinition(definition) {
  if (!definition) return false;
  if (typeof definition !== "object") return false;
  if (!definition.pages) return false;
  if (!Array.isArray(definition.pages)) return false;
  return true;
}
