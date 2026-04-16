// frontend/src/utils/format.js

/**
 * format (Empire Edition)
 * ----------------------
 * The primary data-to-string bridge for the Blue Lotus UI.
 * Hardened for currency actuation and industrial metadata.
 */
export function format(value, type = "auto") {
  if (value === null || value === undefined) return "";

  // Currency Actuation (Essential for 10% Architect Tax)
  if (type === "currency") {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  // Neural Metadata / Object Translation
  if (typeof value === "object") {
    try {
      return JSON.stringify(value, null, 2);
    } catch (err) {
      return "[NEURAL_DATA_ERROR]";
    }
  }

  // Industrial String Formatting
  return String(value);
}

/**
 * formatEmpireDate
 * ---------------
 * Standardizes time stamps for system logs.
 */
export function formatEmpireDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();
}
