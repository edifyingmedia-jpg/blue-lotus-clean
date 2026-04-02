// TemplateRegistry.js
// Loads and manages code-generation templates.

export default class TemplateRegistry {
  constructor() {
    this.templates = {};
  }

  /**
   * Registers a template by name.
   */
  register(name, template) {
    if (!name || !template) {
      throw new Error("TemplateRegistry.register requires name and template");
    }
    this.templates[name] = template;
  }

  /**
   * Retrieves a template by name.
   */
  get(name) {
    return this.templates[name] || null;
  }

  /**
   * Lists all registered template names.
   */
  list() {
    return Object.keys(this.templates);
  }
}
