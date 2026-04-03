// frontend/src/runtime/utils/safeGet.js

/**
 * Safely access nested object properties without throwing errors.
 * Example: safeGet(obj, "a.b.c", defaultValue)
 */

export default function safeGet(obj, path, defaultValue = undefined) {
  if (!obj || typeof path !== "string") return defaultValue;

  const parts = path.split(".");
  let current = obj;

  for (const part of parts) {
    if (current && Object.prototype.hasOwnProperty.call(current, part)) {
      current = current[part];
    } else {
      return defaultValue;
    }
  }

  return current;
}
