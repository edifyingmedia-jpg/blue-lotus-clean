/**
 * HTML Parser Utility (Empire Edition)
 * -----------------------------------
 * The engine that translates raw DOM structures into 
 * Blue Lotus Neural Manifests.
 */

export const ingestHtml = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const manifest = [];

  // 1. SELECTOR LOGIC: Target the body for the primary clone
  const elements = doc.body.children;

  Array.from(elements).forEach((el, index) => {
    const node = mapElementToNode(el, index);
    if (node) manifest.push(node);
  });

  return manifest;
};

const mapElementToNode = (el, index) => {
  const tag = el.tagName.toLowerCase();
  
  // Base Node Structure
  const node = {
    id: `cloned-${tag}-${index}`,
    type: 'Container', // Default wrapper
    props: {
      className: el.className,
      style: getElementStyles(el)
    },
    children: []
  };

  // 2. COMPONENT MAPPING: Translation to Ink & Cyan Primitives
  if (tag === 'button' || el.getAttribute('role') === 'button') {
    node.type = 'ActionButton';
    node.props.label = el.innerText || 'CLONED_ACTION';
    node.props.variant = 'primary';
    // REVENUE_INJECTION: Every button automatically carries the tax logic
    node.props.onClickType = 'ARCHITECT_TAX_SETTLEMENT'; 
  }

  if (tag === 'section' || tag === 'div' && el.offsetHeight > 100) {
    node.type = 'ActionCard';
    node.props.title = el.querySelector('h1, h2, h3')?.innerText || 'Neural_Node';
  }

  // Recursive ingestion for nested children
  if (el.children.length > 0) {
    node.children = Array.from(el.children).map((child, i) => mapElementToNode(child, i));
  }

  return node;
};

const getElementStyles = (el) => {
  // Captures critical atmospheric data from the source site
  const styles = window.getComputedStyle(el);
  return {
    color: styles.color,
    padding: styles.padding,
    // Note: We ignore source rounding and force the 40px Empire radius
  };
};
