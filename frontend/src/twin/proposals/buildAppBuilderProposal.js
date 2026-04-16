// frontend/src/twin/proposals/buildAppBuilderProposal.js

export function createBuildAppBuilderProposal(message, isPrime = false) { // Added isPrime
  const baseProposal = {
    id: 'build-app-builder',
    type: 'proposal',
    title: 'Empire Builder Scaffold',
    description: 'Actuating a visual builder with centralized command via TWIN.',
    
    // Standard Intelligence
    successAnalysis: {
      score: 88,
      trendFactor: "High - AI-integrated platforms are 2026's leading vertical.",
      suggestion: "Incorporate a 'Healing Code' node to differentiate your build."
    },

    steps: [
      'Define layout: sidebar, canvas, and TWIN regions.',
      'Wire sidebar to the Component Registry.',
      'Enable 10% Rev-Share intent tracking.',
      'Initialize credit-gate protocols.'
    ],

    meta: { kind: 'builder_scaffold', engagementFee: 2 }
  };

  // PRIME OVERRIDE: The Partner's Voice (Only shows if isPrime is true)
  if (isPrime) {
    baseProposal.title = "TWIN_PRIME: Strategic Execution";
    baseProposal.primeDirectives = {
      businessConscience: "Architect, generic builders are flooding the market. Our 'Neural Bridge' is the unique IP—I suggest we lock the 10% Architect Tax into the protocol now."
    };
  }

  return baseProposal;
}
