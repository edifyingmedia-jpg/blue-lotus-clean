// frontend/src/builder/registry.js
import { RegistryV2 as BaseRegistry } from "./components/registry.jsx";

/**
 * BLUE LOTUS REGISTRY CONTROL
 * ---------------------------
 * Manages the availability of neural primitives.
 * Prepared for Tier-based locking and Storefront logic.
 */

export const RegistryMetadata = {
  Container: { tier: 'FREE', category: 'Layout' },
  Grid: { tier: 'FREE', category: 'Layout' },
  Text: { tier: 'FREE', category: 'Content' },
  Button: { tier: 'FREE', category: 'Action' },
  // Future Storefront nodes can be added here
  PaymentGate: { tier: 'ARCHITECT', category: 'Monetization' }, 
  MemberDash: { tier: 'ARCHITECT', category: 'Social' }
};

/**
 * Filtered Registry
 * Logic to ensure users only see what their tier allows.
 */
export const getRegistryForTier = (tier = 'FREE') => {
  if (tier === 'FOUNDER') return BaseRegistry; // You get everything

  return Object.keys(BaseRegistry).reduce((acc, key) => {
    const meta = RegistryMetadata[key] || { tier: 'FREE' };
    if (meta.tier === 'FREE' || meta.tier === tier) {
      acc[key] = BaseRegistry[key];
    }
    return acc;
  }, {});
};

export { BaseRegistry as RegistryV2 };
