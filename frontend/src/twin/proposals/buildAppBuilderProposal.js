// frontend/src/twin/proposals/buildAppBuilderProposal.js

export function createBuildAppBuilderProposal(message) {
  return {
    id: 'build-app-builder',
    type: 'proposal',
    title: 'Build an app builder',
    description:
      'Create a visual app builder with a components sidebar, central canvas, and TWIN command panel.',
    sourceMessage: message,
    steps: [
      'Define base layout: sidebar, canvas, and TWIN panel regions.',
      'Wire the components sidebar to a component registry.',
      'Enable adding components to the canvas and persisting layout state.',
    ],
    meta: {
      kind: 'builder_scaffold',
    },
  };
}
