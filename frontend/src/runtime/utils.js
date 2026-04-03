// frontend/src/runtime/utils.js

/**
 * Basic helper utilities used by the runtime layer.
 */

export function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function generateId(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2)}`;
}

export function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
