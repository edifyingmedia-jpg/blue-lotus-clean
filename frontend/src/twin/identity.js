/**
 * buildAppBuilderProposal.js
 * --------------------------
 * Strategic Analysis for the "Success Architect" flow.
 */

export function createBuildAppBuilderProposal(message, isPrime = false) {
  // 1. The Standard Proposal (The Governess)
  const baseProposal = {
    id: 'build-app-builder',
    type: 'proposal',
    title: 'Empire Builder Scaffold',
    description: 'Actuating a visual builder with centralized command via TWIN.',
    
    // Success Architect: Initial market analysis
    successAnalysis: {
      score: 88,
      trendFactor: "High - AI-integrated platforms are 2026's leading vertical.",
      suggestion: "Incorporate a 'Healing Code' node to differentiate your build."
    },

    steps: [
      'Define layout: sidebar, canvas, and TWIN regions.',
      'Wire sidebar to the Component Registry.',
      'Enable 10% Rev-Share intent tracking.',
      'Initialize Governess credit-check protocols.'
    ],

    meta: {
      kind: 'builder_scaffold',
      engagementFee: 2 // Credits for deep strategy engagement
    }
  };

  // 2. PRIME OVERRIDE (For the Founder's Eyes Only)
  if (isPrime) {
    baseProposal.title = "TWIN_PRIME: Strategic Execution";
    baseProposal.primeDirectives = {
      patentOpportunity: "Neural Bridge logic is eligible for a Utility Patent.",
      marketRisk: "Competitors are moving to zero-code; keep our 'Pro-Code' edge.",
      businessConscience: "Architect, lock the 10% tax at the protocol level now to secure revenue."
    };
  }

  return baseProposal;
}
