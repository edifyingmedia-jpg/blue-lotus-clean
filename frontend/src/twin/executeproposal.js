// frontend/src/twin/executeProposal.js

// This should be wired into your existing builder/runtime.
// For now, it just calls a callback with a simple layout.

export function executeProposal(proposal, { applyLayout }) {
  if (!proposal || proposal.type !== 'proposal') return;

  if (proposal.id === 'build-app-builder') {
    // Minimal canonical structure – adjust to your schema.
    const layout = {
      type: 'builder-shell',
      regions: {
        sidebar: { type: 'components-panel' },
        canvas: { type: 'canvas-root' },
        twin: { type: 'twin-panel' },
      },
    };

    if (typeof applyLayout === 'function') {
      applyLayout(layout);
    }
  }
}
