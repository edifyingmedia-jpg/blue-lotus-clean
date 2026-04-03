// frontend/src/runtime/utils/deepClone.js

/**
 * Safe deep clone for plain JSON-compatible objects.
 */

export default function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}
