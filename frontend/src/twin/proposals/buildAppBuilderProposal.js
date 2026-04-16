/**
 * buildAppBuilderProposal.js
 * --------------------------
 * TWIN's Strategic Analysis for the "Success Architect" flow.
 */

export function createBuildAppBuilderProposal(message, isPrime = false) {
  // 1. Base Proposal Structure
  const baseProposal = {
    id: 'build-app-builder',
    type: 'proposal',
    title: 'The Empire Builder Scaffold',
    description: 'Actuating a visual builder with centralized command via TWIN.',
    
    // 2. Success Architect (Standard TWIN logic)
    successAnalysis: {
      score: 88,
      trendFactor: "High - AI-integrated platforms are currently 2026's leading market vertical.",
      suggestion: "Incorporate a 'Healing Code' node to differentiate from standard builders."
    },

    steps: [
      'Define base layout: sidebar, canvas, and TWIN panel regions.',
      'Wire the components sidebar to the Registry.',
      'Enable node persistence with 10% Rev-Share intent tracking.',
      'Initialize Governess credit-check protocols.'
    ],

    meta: {
      kind: 'builder_scaffold',
      engagementFee: 2 // Credits required for deep strategy engagement
    }
  };

  // 3. PRIME OVERRIDE (For the Founder's Eyes Only)
  if (isPrime) {
    baseProposal.title = "TWIN_PRIME: Strategic Monolith Execution";
    baseProposal.primeDirectives = {
      patentOpportunity: "The 'Neural Bridge' logic is eligible for a Utility Patent.",
      marketRisk: "Competitors are moving toward zero-code; maintain our 'Pro-Code' edge.",
      businessConscience: "Architect, I suggest we lock the 10% tax at the protocol level now."
    };
  }

  return baseProposal;
}
