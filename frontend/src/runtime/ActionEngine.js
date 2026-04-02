// frontend/src/runtime/ActionEngine.js

import componentRegistry from "../components/ComponentRegistry";

export function executeAction(action) {
  if (!action || !action.type) {
    return;
  }

  const handler = componentRegistry.getAction(action.type);

  if (!handler) {
    console.warn("Unknown action:", action.type);
    return;
  }

  return handler(action.payload || {});
}
