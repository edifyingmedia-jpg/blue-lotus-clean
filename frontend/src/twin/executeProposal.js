// frontend/src/twin/proposals/buildAppBuilderProposal.js

export function createBuildAppBuilderProposal(message, isPrime = false) {
  const baseProposal = {
    id: 'build-app-builder',
    type: 'proposal',
    title: 'Empire Builder Scaffold',
    description: 'Actuating a visual builder with centralized command via TWIN.',
    
    // Standard User Intelligence
    successAnalysis: {
      score: 88,
      trendFactor: "High - AI-integrated platforms are leading the 2026 market.",
      suggestion: "Add a 'Healing Code' node to increase user retention."
    },

    steps: [
      'Define layout: sidebar, canvas, and TWIN regions.',
      'Wire sidebar to the Component Registry.',
      'Enable 10% Rev-Share intent tracking.',
      'Initialize credit-gate protocols.'
    ],

    meta: { kind: 'builder_scaffold', engagementFee: 2 }
  };

  // PRIME OVERRIDE: The Partner's Voice
  if (isPrime) {
    baseProposal.title = "TWIN_PRIME: Strategic Execution";
    baseProposal.primeDirectives = {
      businessConscience: "Architect, the markets are saturated with generic builders. Our 'Neural Bridge' is our unique IP—I suggest we lock the 10% Architect Tax into the smart contract immediately."
    };
  }

  return baseProposal;
}
