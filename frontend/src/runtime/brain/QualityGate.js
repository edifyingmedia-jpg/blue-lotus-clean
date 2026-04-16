// frontend/src/runtime/brain/QualityGate.js

/**
 * QualityGate (Advanced)
 * ---------------------
 * Validates that generated output meets the Blue Lotus structural spec.
 * Acts as the final filter before the renderer attempts to actuate the build.
 */
export default class QualityGate {
  validate(output) {
    if (!output) return false;

    // 1. Basic Type Check
    if (typeof output !== "object") {
      console.warn("[SYS_GATE]: Output must be a valid JSON object.");
      return false;
    }

    // 2. Critical Field Verification
    // Every Blue Lotus app must have a 'nodes' array or a 'spec' root.
    const hasSpec = output.spec || (Array.isArray(output.nodes) && output.nodes.length > 0);
    
    if (!hasSpec) {
      console.warn("[SYS_GATE]: Output is missing required render nodes.");
      return false;
    }

    // 3. Metadata Integrity
    if (!output.id && !output.name) {
      console.warn("[SYS_GATE]: Identity check failed. Missing ID/Name.");
      return false;
    }

    return true;
  }
}
