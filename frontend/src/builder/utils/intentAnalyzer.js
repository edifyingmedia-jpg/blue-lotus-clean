/**
 * Intent Analyzer (Empire Edition)
 * --------------------------------
 * Analyzes parsed nodes to identify business logic opportunities.
 */

export const analyzeIntent = (nodes) => {
  return nodes.map(node => {
    let identifiedIntent = 'DISPLAY';
    let metadata = {};

    // 1. Detect Revenue Triggers
    const label = node.props.label?.toLowerCase() || '';
    if (label.includes('buy') || label.includes('cart') || label.includes('subscribe')) {
      identifiedIntent = 'REVENUE_SETTLEMENT';
      metadata = { taxRate: 0.10, provider: 'STRIPE_AUTO' };
    }

    // 2. Detect Data Capture (Leads)
    if (node.type === 'Container' && label.includes('email')) {
      identifiedIntent = 'LEAD_CAPTURE';
    }

    // 3. Recursive Analysis for children
    const children = node.children ? analyzeIntent(node.children) : [];

    return {
      ...node,
      intent: identifiedIntent,
      metadata,
      children
    };
  });
};
