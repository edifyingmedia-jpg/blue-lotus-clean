import { loadTWINContract } from "./loadTWINContract";
import { bindTWINProfile } from "./bindTWINProfile";

export function initTWINSession({ isOwner }) {
  const contract = loadTWINContract();
  const profile = bindTWINProfile(contract, { isOwner });

  return Object.freeze({
    contract,
    profile
  });
}
