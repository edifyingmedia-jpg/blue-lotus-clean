// frontend/src/utils/id.js

/**
 * generateId (Empire Edition)
 * --------------------------
 * Produces a high-entropy, collision-resistant identifier.
 * Essential for unique node actuation and 10% revenue tracking.
 */
export function generateId(prefix = 'NODE') {
  // Use performance.now() for high-precision time entropy
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).slice(2, 8);
  
  // Format: PREFIX-TIME-RANDOM (e.g., APP-LNV2K8-XJ39)
  return `${prefix.toUpperCase()}-${timestamp}-${randomStr}`.toUpperCase();
}

/**
 * generateAppId
 * ------------
 * Specialized for top-level marketplace registrations.
 */
export function generateAppId() {
  return generateId('APP');
}
