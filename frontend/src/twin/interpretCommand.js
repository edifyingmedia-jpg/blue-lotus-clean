/**
 * interpretCommand.js
 * ----------------------------------------------------
 * Interprets natural language input and returns a
 * structured proposal describing intended changes.
 *
 * IMPORTANT:
 * - This file does NOT mutate state
 * - This file does NOT execute changes
 * - This file does NOT call AI yet
 *
 * It only returns intent.
 */

/**
 * @param {string} input - Natural language command from the user
 * @returns {object} proposal
 */
export default function interpretCommand(input) {
  if (!input || typeof input !== "string") {
    return {
      type: "NO_OP",
      reason: "Empty or invalid input",
    };
  }

  const normalized = input.toLowerCase().trim();

  // --- Simple intent detection (stub) ---

  if (normalized.includes("add") && normalized.includes("text")) {
    return {
      type: "ADD_COMPONENT",
      target: "screen",
      component: {
        type: "Text",
        props: {
          value: "New text added by TWIN.",
        },
      },
      confidence: 0.4,
      explanation: "User requested adding a text component.",
    };
  }

  if (normalized.includes("add") && normalized.includes("button")) {
    return {
      type: "ADD_COMPONENT",
      target: "screen",
      component: {
        type: "Button",
        props: {
          label: "New Button",
        },
      },
      confidence: 0.4,
      explanation: "User requested adding a button component.",
    };
  }

  if (normalized.includes("create") && normalized.includes("screen")) {
    return {
      type: "ADD_SCREEN",
      screen: {
        title: "New Screen",
        components: [],
      },
      confidence: 0.3,
      explanation: "User requested creating a new screen.",
    };
  }

  // --- Fallback ---

  return {
    type: "UNRECOGNIZED",
    originalInput: input,
    confidence: 0.1,
    explanation:
      "TWIN could not confidently interpret this command yet.",
  };
}
