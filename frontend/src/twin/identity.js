// frontend/src/twin/identity.js

// ---- ENVIRONMENT DETECTION ---------------------------------------------

export function isOwnerEnvironment() {
  // You can refine this later (e.g., check domain, auth, secret, etc.)
  // For now, this is a single source of truth.
  return import.meta.env.VITE_TWIN_ENV === "owner";
}

export function isPublicEnvironment() {
  return !isOwnerEnvironment();
}

// ---- TWIN VARIANTS ------------------------------------------------------

export const TWIN_VARIANTS = {
  PRIME: "TWIN_PRIME",
  PUBLIC: "TWIN_PUBLIC"
};

// Capability map for each TWIN type
const CAPABILITIES = {
  [TWIN_VARIANTS.PRIME]: {
    identity: TWIN_VARIANTS.PRIME,
    ownerOnly: true,
    // Cloning
    canCloneSelf: true,          // ✅ PRIME can clone herself for you
    cloneScope: "owner",         // only inside owner environment
    // Builder / TWIN generation
    canGenerateBuilders: true,
    canGenerateTWINs: true,
    // Credits / monetization
    creditAware: false,
    // Export / embedding
    canBeExported: false,
    canBeEmbeddedInUserApps: false
  },

  [TWIN_VARIANTS.PUBLIC]: {
    identity: TWIN_VARIANTS.PUBLIC,
    ownerOnly: false,
    // Cloning
    canCloneSelf: false,         // ❌ PUBLIC TWIN may never clone herself
    cloneScope: "never",
    // Builder / TWIN generation
    canGenerateBuilders: false,
    canGenerateTWINs: false,
    // Credits / monetization
    creditAware: true,           // ✅ respects credit usage in Blue Lotus / Lotus
    // Export / embedding
    canBeExported: true,         // but only in restricted, platform-controlled ways
    canBeEmbeddedInUserApps: true
  }
};

// ---- SELECTOR -----------------------------------------------------------

export function getCurrentTWINVariant() {
  return isOwnerEnvironment() ? TWIN_VARIANTS.PRIME : TWIN_VARIANTS.PUBLIC;
}

export function getCurrentTWINCapabilities() {
  const variant = getCurrentTWINVariant();
  return CAPABILITIES[variant];
}

// ---- GUARDS / ENFORCEMENT ----------------------------------------------

export function assertOwnerOnlyCapability(capName) {
  const caps = getCurrentTWINCapabilities();

  if (!caps.ownerOnly || !caps[capName]) {
    throw new Error(
      `[TWIN Identity] Capability "${capName}" is owner-only and not allowed in this environment.`
    );
  }
}

export function assertPublicSafeCapability(capName) {
  const caps = getCurrentTWINCapabilities();

  if (caps.ownerOnly) {
    throw new Error(
      `[TWIN Identity] Capability "${capName}" is not allowed to run as TWIN PRIME in a public context.`
    );
  }

  if (!caps[capName]) {
    throw new Error(
      `[TWIN Identity] Capability "${capName}" is not enabled for PUBLIC TWIN.`
    );
  }
}

// ---- HIGH-LEVEL HELPERS -------------------------------------------------

export function canCurrentTWINCloneSelf() {
  const caps = getCurrentTWINCapabilities();
  return caps.canCloneSelf === true;
}

export function isTWINPrime() {
  return getCurrentTWINVariant() === TWIN_VARIANTS.PRIME;
}

export function isPublicTWIN() {
  return getCurrentTWINVariant() === TWIN_VARIANTS.PUBLIC;
}
