/**
 * Industrial HTML Parser (Atmospheric Edition)
 * Maps external DOM structures to the Blue Lotus Monolith.
 */

export const ingestHtml = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const walk = (el, index) => {
    const tag = el.tagName?.toLowerCase();
    // Filter out non-visual or dangerous nodes
    if (!tag || ['script', 'style', 'noscript', 'iframe'].includes(tag)) return null;

    const node = {
      id: `node-${tag}-${index}-${Math.random().toString(36).substr(2, 5)}`,
      type: mapTagToComponent(tag, el),
      props: {
        label: el.innerText?.trim().substring(0, 50) || '',
        style: interpretAtmosphere(el),
        // REVENUE_INJECTION: Every button carries the Architect Tax intent
        intent: tag === 'button' ? 'REVENUE_SETTLEMENT' : 'DISPLAY'
      },
      children: Array.from(el.children).map((child, i) => walk(child, i)).filter(Boolean)
    };

    return node;
  };

  return Array.from(doc.body.children).map((el, i) => walk(el, i)).filter(Boolean);
};

const mapTagToComponent = (tag, el) => {
  if (tag === 'button' || el.getAttribute('role') === 'button') return 'ActionButton';
  if (['section', 'header', 'footer', 'article'].includes(tag)) return 'ActionCard';
  return 'Container';
};

const interpretAtmosphere = (el) => {
  const styles = window.getComputedStyle(el);
  
  // SEMANTIC_MAPPING: We ignore the source's mess and force the visual law
  return {
    padding: '1.5rem',
    borderRadius: '40px', // Empire Standard
    backgroundColor: '#09090B', // Ink Baseline
    color: '#06B6D4', // Cyan Actuation
    border: '1px solid rgba(6, 182, 212, 0.1)',
    fontFamily: 'Inter, monospace',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };
};
