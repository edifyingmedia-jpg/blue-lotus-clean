// frontend/src/twin/executeProposal.js

import twinClient from "./twinClient";
import interpretCommand from "./interpretCommand";

/**
 * Takes raw text from the user, interprets it,
 * and executes the resulting TWIN command.
 */
export default async function executeProposal(input) {
  const command = interpretCommand(input);

  if (!command || command.type === "invalid") {
    return {
      ok: false,
      error: "Invalid command input."
    };
  }

  if (command.type === "unknown") {
    return {
      ok: false,
      error: `Unknown command: "${input}"`
    };
  }

  try {
    const result = await twinClient.send(command);
    return {
      ok: true,
      result
    };
  } catch (err) {
    return {
      ok: false,
      error: err.message || "Execution failed."
    };
  }
}
