// frontend/src/runtime/utils/safeGet.js

/**
 * Safely access nested object properties without throwing errors.
 * Improved to handle null-checks and provide reliable fallbacks.
 */
export default function safeGet(obj, path, defaultValue = undefined) {
  if (!obj || typeof path !== "string") return defaultValue;

  const parts = path.split(".");
  let current = obj;

  for (const part of parts) {
    if (current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, part)) {
      current = current[part];
    } else {
      return defaultValue;
    }
  }

  // Final check: if the result is null/undefined, return the defaultValue
  return current !== undefined && current !== null ? current : defaultValue;
}
