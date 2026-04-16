// frontend/src/runtime/brain/TemplateRegistry.js

export default class TemplateRegistry {
  constructor() {
    this.templates = {};
  }

  /**
   * Registers a template with a "protected" check.
   */
  register(name, template, isSystem = false) {
    if (!name || !template) {
      throw new Error("[SYS_ERR]: TemplateRegistry.register requires name and template");
    }

    // Prevent AI from overwriting critical system blueprints
    if (this.templates[name]?.isSystem && !isSystem) {
      console.warn(`[SYS_GATE]: Blocked attempt to overwrite system template: ${name}`);
      return;
    }

    this.templates[name] = {
      ...template,
      isSystem,
      registeredAt: new Date().toISOString()
    };
  }

  get(name) {
    return this.templates[name] || null;
  }

  list() {
    return Object.keys(this.templates);
  }
}
