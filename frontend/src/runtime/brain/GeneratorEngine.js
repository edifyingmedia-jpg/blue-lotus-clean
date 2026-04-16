/**
 * Generates output and injects global Blue Lotus theme tokens.
 */
generate(templateName, context = {}) {
  const template = this.registry.get(templateName);
  
  if (!template) {
    throw new Error(`[SYS_ERR]: Template '${templateName}' not found.`);
  }

  // Ensure context includes our global Tailwind spacing/color tokens
  const refinedContext = {
    ...context,
    theme: "dark", // Defaulting to the Blue Lotus aesthetic
  };

  const output = template.render(refinedContext);
  const passed = this.quality.validate(output);

  if (!passed) {
    throw new Error(`[SYS_ERR]: QualityGate failed for: ${templateName}`);
  }

  return output;
}
