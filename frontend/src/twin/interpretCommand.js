// frontend/src/twin/interpretCommand.js

/**
 * Very small, safe command interpreter.
 * Turns raw text into structured commands for TWIN.
 */

export default function interpretCommand(input) {
  if (!input || typeof input !== "string") {
    return { type: "invalid", reason: "Input must be a string." };
  }

  const text = input.trim().toLowerCase();

  // Build app
  if (text.startsWith("build app")) {
    return {
      type: "build_app",
      spec: { name: "Untitled App", pages: [] }
    };
  }

  // Run app
  if (text.startsWith("run app")) {
    const parts = text.split(" ");
    const appId = parts[2] || null;
    return {
      type: "run_app",
      appId
    };
  }

  // Unknown
  return {
    type: "unknown",
    raw: input
  };
}
