// GeneratorEngine.js
// Responsible for generating code or structures based on templates.

import TemplateRegistry from "./TemplateRegistry";
import QualityGate from "./QualityGate";

export default class GeneratorEngine {
  constructor() {
    this.registry = new TemplateRegistry();
    this.quality = new QualityGate();
  }

  /**
   * Generates output from a named template.
   */
  generate(templateName, context = {}) {
    const template = this.registry.get(templateName);

    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    const output = template.render(context);

    const passed = this.quality.validate(output);
    if (!passed) {
      throw new Error(`QualityGate failed for template: ${templateName}`);
    }

    return output;
  }
}

