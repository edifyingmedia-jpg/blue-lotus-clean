// frontend/src/runtime/utils.js

/**
 * Deep Clones an object using the modern 2026 standard.
 * structuredClone is faster and handles Dates/RegEx better than JSON.
 */
export function deepClone(value) {
  if (!value) return value;
  return structuredClone(value);
}

/**
 * Generates a collision-resistant ID.
 */
export function generateId(prefix = "id") {
  return `${prefix}-${crypto.randomUUID().split("-")[0]}`;
}

/**
 * Advanced Type Check
 */
export function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * NEW: Safe Path Setter
 * Allows the AI to update: set(state, "user.profile.name", "Tiffany")
 */
export function safeSet(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const lastObj = keys.reduce((o, key) => (o[key] = o[key] || {}), obj);
  lastObj[lastKey] = value;
  return obj;
}

/**
 * NEW: Safe Path Getter
 */
export function safeGet(obj, path, fallback = null) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined ? o[key] : fallback), obj);
}
