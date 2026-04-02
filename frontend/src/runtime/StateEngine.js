// frontend/src/runtime/StateEngine.js

import componentRegistry from "../components/ComponentRegistry";

export function initializeState(appDefinition) {
  if (!appDefinition || !appDefinition.state) {
    return {};
  }

  return { ...appDefinition.state };
}

export function updateState(state, action) {
  if (!action || !action.type) {
    return state;
  }

  const handler = componentRegistry.getStateHandler(action.type);

  if (!handler) {
    console.warn("Unknown state action:", action.type);
    return state;
  }

  return handler(state, action.payload || {});
}
