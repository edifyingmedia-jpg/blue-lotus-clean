// QualityGate.js
// Ensures generated output meets minimum structural requirements.

export default class QualityGate {
  validate(output) {
    if (!output) return false;

    // Basic validation: output must be an object or string
    const type = typeof output;
    if (type !== "object" && type !== "string") {
      return false;
    }

    // If object, ensure it has some keys
    if (type === "object" && Object.keys(output).length === 0) {
      return false;
    }

    return true;
  }
}
