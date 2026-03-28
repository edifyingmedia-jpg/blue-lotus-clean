import { enforceActionGate } from "./twin/ActionGate";

export async function dispatchAction({ profile, actionRequest, handlers }) {
  enforceActionGate(profile, actionRequest);

  const { type, payload } = actionRequest || {};
  const handler = handlers?.[type];

  if (!type || !handler) {
    throw new Error(`ActionDispatcher: unknown action type: ${type}`);
  }

  return handler(payload);
}
