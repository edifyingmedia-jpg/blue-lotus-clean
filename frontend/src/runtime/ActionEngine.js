export default class ActionEngine {
  constructor(actions = {}) {
    this.actions = actions;
  }

  register(name, fn) {
    this.actions[name] = fn;
  }

  run(name, payload) {
    const action = this.actions[name];
    if (!action) {
      console.warn(`ActionEngine: action "${name}" not found`);
      return;
    }
    try {
      return action(payload);
    } catch (err) {
      console.error(`ActionEngine: error running "${name}"`, err);
    }
  }
}
