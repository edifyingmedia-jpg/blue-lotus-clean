// frontend/src/runtime/utils/generateId.js

/**
 * Generates a unique ID with an optional prefix.
 * Includes a timestamp and random segment for high-concurrency safety.
 */
export default function generateId(prefix = "id") {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 7);
  return `${prefix}-${timestamp}-${random}`;
}
