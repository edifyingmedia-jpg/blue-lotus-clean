import CONTRACT from "../../contracts/TWIN_PRIME_SYSTEM_CONTRACT";

export function loadTWINContract() {
  if (!CONTRACT || CONTRACT.contract_id !== "twin_prime") {
    throw new Error("TWIN contract missing or invalid: contract_id");
  }

  if (!CONTRACT.version) {
    throw new Error("TWIN contract missing or invalid: version");
  }

  return CONTRACT;
}

