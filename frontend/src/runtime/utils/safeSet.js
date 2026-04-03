// frontend/src/runtime/utils/safeSet.js

/**
 * Safely set a nested property on an object.
 * Example: safeSet(obj, "a.b.c", value)
 */

export default function safeSet(obj, path, value) {
  if (!obj || typeof path !== "string") return obj;

  const parts = path.split(".");
  let current = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];

    if (!current[part] || typeof current[part] !== "object") {
      current[part] = {};
    }

    current = current[part];
  }

  current[parts[parts.length - 1]] = value;
  return obj;
}
