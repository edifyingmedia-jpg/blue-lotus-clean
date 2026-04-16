/**
 * Intent Analyzer (Empire Edition)
 * --------------------------------
 * Identifies business logic opportunities, now including Membership paths.
 */

export const analyzeIntent = (nodes) => {
  return nodes.map(node => {
    let identifiedIntent = node.intent || 'DISPLAY';
    let metadata = node.metadata || {};

    const label = node.props.label?.toLowerCase() || '';
    const textContent = node.props.textContent?.toLowerCase() || '';

    // 1. Detect Membership/Subscription Triggers
    if (label.includes('join') || label.includes('membership') || label.includes('subscribe') || label.includes('monthly')) {
      identifiedIntent = 'RECURRING_SUBSCRIPTION';
      metadata = { 
        taxRate: 0.10, 
        billingCycle: 'monthly',
        tier: 'Standard',
        provider: 'STRIPE_BILLING' 
      };
    } 
    // 2. Detect One-Time Revenue Triggers
    else if (label.includes('buy') || label.includes('checkout') || label.includes('purchase')) {
      identifiedIntent = 'REVENUE_SETTLEMENT';
      metadata = { taxRate: 0.10, provider: 'STRIPE_CHECKOUT' };
    }

    // Recursive Analysis for children
    const children = node.children ? analyzeIntent(node.children) : [];

    return {
      ...node,
      intent: identifiedIntent,
      metadata,
      children
    };
  });
};
