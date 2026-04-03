// frontend/src/runtime/ActionDispatcher.js

export default class ActionDispatcher {
  constructor(engine) {
    this.engine = engine;
  }

  dispatch(name, payload) {
    if (!this.engine) {
      console.error("ActionDispatcher: no engine available");
      return;
    }
    return this.engine.run(name, payload);
  }
}
