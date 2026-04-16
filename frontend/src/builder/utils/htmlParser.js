// Update your getElementStyles function to include Atmospheric Mapping
const getElementStyles = (el) => {
  const styles = window.getComputedStyle(el);
  const rawColor = styles.color;
  
  // SEMANTIC_INTERPRETER: Convert source colors to Empire Tokens
  // If the source color is dark, map it to our "Ink" (#09090B)
  // If the source color is bright/vibrant, map it to our "Cyan" (#06B6D4)
  const isDark = (color) => {
    /* Logic to detect luminance would go here */
    return true; 
  };

  return {
    color: isDark(rawColor) ? 'var(--color-ink)' : 'var(--color-cyan)',
    padding: styles.padding,
    // THE LOVABLE GUARDRAIL: We force the Empire's high-density spacing
    gap: '1.5rem',
    borderRadius: '40px', 
  };
};
