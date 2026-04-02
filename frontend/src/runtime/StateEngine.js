export default class StateEngine {
  constructor() {
    this.state = {};
    this.listeners = new Set();
  }

  init(initialState = {}) {
    this.state = { ...initialState };
  }

  getState() {
    return this.state;
  }

  setState(partial) {
    if (typeof partial !== "object") return;

    this.state = {
      ...this.state,
      ...partial,
    };

    this.notify();
  }

  subscribe(fn) {
    if (typeof fn === "function") {
      this.listeners.add(fn);
      return () => this.listeners.delete(fn);
    }
  }

  notify() {
    for (const fn of this.listeners) {
      try {
        fn(this.state);
      } catch (err) {
        console.error("StateEngine listener error:", err);
      }
    }
  }
}
