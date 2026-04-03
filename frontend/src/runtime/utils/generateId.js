// frontend/src/runtime/utils/generateId.js

/**
 * Generates a unique ID with an optional prefix.
 */

export default function generateId(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2)}`;
}
