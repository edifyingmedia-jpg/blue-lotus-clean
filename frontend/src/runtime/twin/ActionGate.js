export function enforceActionGate(profile, actionRequest) {
  const requiresApproval =
    profile.authority?.owner_approval_required_for_execution === true;

  const approved = actionRequest?.approved === true;

  if (requiresApproval && !approved) {
    throw new Error("ActionGate: owner approval required");
  }

  if (actionRequest?.silent === true) {
    throw new Error("ActionGate: silent actions forbidden");
  }

  return true;
}
