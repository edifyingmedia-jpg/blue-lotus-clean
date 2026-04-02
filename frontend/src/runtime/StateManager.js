import StateEngine from "./StateEngine";

export default class StateManager {
  constructor() {
    this.engine = new StateEngine();
  }

  init(initialState = {}) {
    this.engine.init(initialState);
  }

  getState() {
    return this.engine.getState();
  }

  setState(partial) {
    this.engine.setState(partial);
  }

  subscribe(fn) {
    return this.engine.subscribe(fn);
  }
}
