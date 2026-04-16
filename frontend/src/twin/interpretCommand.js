// frontend/src/twin/interpretCommand.js

/**
 * TWIN Command Interpreter
 * Converts natural language into structured commands
 * for the Blue Lotus TWIN engine.
 */

export default function interpretCommand(input) {
  if (!input || typeof input !== "string") {
    return { type: "invalid", reason: "Input must be a string." };
  }

  const text = input.trim();
  const lower = text.toLowerCase();

  // ----------------------------------------
  // BUILD APP
  // ----------------------------------------
  if (lower.startsWith("build app")) {
    return {
      type: "build_app",
      spec: {
        name: extractName(text, "build app"),
        pages: []
      }
    };
  }

  // ----------------------------------------
  // RUN APP
  // ----------------------------------------
  if (lower.startsWith("run app")) {
    const parts = lower.split(" ");
    const appId = parts[2] || null;

    return {
      type: "run_app",
      appId
    };
  }

  // ----------------------------------------
  // ACTION INSIDE APP
  // Example: "in app 123 click button Save"
  // ----------------------------------------
  if (lower.startsWith("in app")) {
    const parts = lower.split(" ");
    const appId = parts[2] || null;

    const actionText = text.substring(text.indexOf(parts[3]));
    return {
      type: "action",
      appId,
      actionName: "natural_language",
      payload: { text: actionText }
    };
  }

  // ----------------------------------------
  // BUILD MODE (explicit)
  // "build:" or "generate app:"
  // ----------------------------------------
  if (lower.startsWith("build:") || lower.startsWith("generate app:")) {
    return {
      type: "build_app",
      spec: {
        name: "Generated App",
        prompt: text
      }
    };
  }

  // ----------------------------------------
  // DEFAULT → CHAT MODE
  // ----------------------------------------
  return {
    type: "chat",
    prompt: text
  };
}

/**
 * Extracts a name after a command prefix.
 * Example: "build app My Store" → "My Store"
 */
function extractName(full, prefix) {
  const raw = full.substring(prefix.length).trim();
  return raw.length > 0 ? raw : "Untitled App";
}
