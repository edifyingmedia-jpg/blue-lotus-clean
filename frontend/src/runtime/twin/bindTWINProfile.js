export function bindTWINProfile(contract, { isOwner }) {
  const tierKey = isOwner ? "tier0_prime" : "tier1_assist";
  const tier = contract.tiers?.[tierKey];

  if (!tier) {
    throw new Error("TWIN contract invalid: missing tier definition");
  }

  if (!isOwner && tierKey === "tier0_prime") {
    throw new Error("ReplicationGate: Prime tier forbidden outside owner scope");
  }

  const profile = Object.freeze({
    contract_id: contract.contract_id,
    version: contract.version,
    scope: contract.scope,
    tier_key: tierKey,
    tier,
    authority: contract.authority,
    speaking_contract: contract.speaking_contract,
    derivative_constraints: contract.derivative_constraints
  });

  return profile;
}
