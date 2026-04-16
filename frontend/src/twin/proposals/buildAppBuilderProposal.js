/**
 * buildAppBuilderProposal.js
 * --------------------------
 * Strategic Analysis for the "Success Architect" flow.
 */

export function createBuildAppBuilderProposal(message, isPrime = false) {
  const baseProposal = {
    id: 'build-app-builder',
    type: 'proposal',
    title: 'Empire Builder Scaffold',
    description: 'Actuating a visual builder with centralized command via TWIN.',
    
    // Standard User Intelligence (Success Architect)
    successAnalysis: {
      score: 88,
      trendFactor: "High - AI-integrated platforms are 2026's leading market vertical.",
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
      engagementFee: 2 
    }
  };

  // PRIME OVERRIDE: The Partner's Voice (Architect Only)
  if (isPrime) {
    baseProposal.title = "TWIN_PRIME: Strategic Execution";
    baseProposal.primeDirectives = {
      businessConscience: "Architect, generic builders are flooding the market. Our 'Neural Bridge' is the unique IP—I suggest we lock the 10% Architect Tax into the protocol now to secure revenue."
    };
  }

  return baseProposal;
}
