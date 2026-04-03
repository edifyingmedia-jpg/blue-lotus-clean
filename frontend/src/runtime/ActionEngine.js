export function runAction(action, context) {
  if (!action) return null;
  if (typeof action !== "function") return null;
  return action(context);
}
