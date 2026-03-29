// frontend/src/builder/ai/layoutEngine.js

/**
 * Layout Intelligence Engine
 * --------------------------
 * This module transforms flat component lists into structured layouts.
 * It supports:
 *  - row/column grouping
 *  - card wrapping
 *  - section grouping
 *  - spacing insertion
 *  - auto-container logic
 */

export function applyLayoutIntelligence(components, command) {
  const lower = command.toLowerCase();

  // 1. Side-by-side → Row
  if (
    lower.includes("side by side") ||
    lower.includes("next to each other") ||
    lower.includes("two columns")
  ) {
    return [
      {
        id: `row_${Date.now()}`,
        type: "row",
        props: { gap: 16 },
        children: components
      }
    ];
  }

  // 2. Wrap in card
  if (lower.includes("in a card") || lower.includes("wrap in card")) {
    return [
      {
        id: `card_${Date.now()}`,
        type: "card",
        props: {},
        children: components
      }
    ];
  }

  // 3. Wrap in section
  if (lower.includes("section")) {
    const title = extractSectionTitle(command);
    return [
      {
        id: `section_${Date.now()}`,
        type: "section",
        props: { title },
        children: components
      }
    ];
  }

  // 4. Add spacing
  if (lower.includes("spacing") || lower.includes("space between")) {
    const spaced = [];
    components.forEach((c, i) => {
      spaced.push(c);
      if (i < components.length - 1) {
        spaced.push({
          id: `spacer_${Date.now()}_${i}`,
          type: "spacer",
          props: { size: 16 },
          children: []
        });
      }
    });
    return spaced;
  }

  // 5. Default: wrap in container for cleaner layout
  return [
    {
      id: `container_${Date.now()}`,
      type: "container",
      props: { padding: 12 },
      children: components
    }
  ];
}

function extractSectionTitle(command) {
  const match = command.match(/section called ([^.,!?]+)/i);
  if (match && match[1]) return match[1].trim();

  const match2 = command.match(/section named ([^.,!?]+)/i);
  if (match2 && match2[1]) return match2[1].trim();

  return "Section";
}
