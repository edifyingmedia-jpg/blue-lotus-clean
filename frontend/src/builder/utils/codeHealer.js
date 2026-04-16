/**
 * Code Healer (The Governess's Surgeon)
 * ------------------------------------
 * Repairs broken nodes and throttles processing based on member credits.
 */

export const healNode = (node, userCredits) => {
  if (userCredits <= 0) {
    console.error("HEAL_FAILURE: Insufficient credits for code restoration.");
    return node;
  }

  // 1. Repair Broken Assets (Placeholder for missing images)
  const healedProps = { ...node.props };
  if (node.type === 'Image' && !healedProps.src) {
    healedProps.src = 'https://placehold.co/600x400/09090B/06B6D4?text=Empire_Restoring...';
  }

  // 2. Syntax Sanitization
  const healedLabel = node.props.label?.replace(/[<>]/g, '') || 'Restored_Node';

  return {
    ...node,
    props: { ...healedProps, label: healedLabel },
    status: 'HEALED'
  };
};
