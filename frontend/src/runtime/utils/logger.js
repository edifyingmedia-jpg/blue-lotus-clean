// frontend/src/runtime/utils/logger.js

/**
 * Minimal logger used by the runtime layer.
 * Safe for production and silent by default.
 */

const isDev =
  typeof process !== "undefined" &&
  process.env &&
  process.env.NODE_ENV === "development";

export function log(...args) {
  if (isDev) console.log("[Runtime]", ...args);
}

export function warn(...args) {
  if (isDev) console.warn("[Runtime Warning]", ...args);
}

export function error(...args) {
  console.error("[Runtime Error]", ...args);
}
