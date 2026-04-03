// frontend/src/runtime/utils/validator.js

/**
 * Minimal validation helpers used by the runtime layer.
 */

export function isString(value) {
  return typeof value === "string";
}

export function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

export function isFunction(value) {
  return typeof value === "function";
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
