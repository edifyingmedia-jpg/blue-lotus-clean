// frontend/src/runtime/NavigationEngine.js

export default class NavigationEngine {
  constructor() {
    this.current = { screen: null, params: {} };
    this.history = []; // Added for "Back" button support
    this.listeners = new Set();
  }

  /**
   * Navigate to a screen with logic to prevent redundant jumps.
   */
  navigate(screen, params = {}, pushToHistory = true) {
    if (!screen || typeof screen !== "string") {
      console.warn("[Navigation] Invalid target:", screen);
      return;
    }

    // Prevent redundant navigation to the same screen with same params
    if (this.current.screen === screen && JSON.stringify(this.current.params) === JSON.stringify(params)) {
      return;
    }

    if (pushToHistory && this.current.screen) {
      this.history.push({ ...this.current });
    }

    this.current = { screen, params: params || {} };
    this.emit();
  }

  /**
   * Go back to the previous screen.
   */
  goBack() {
    if (this.history.length > 0) {
      const previous = this.history.pop();
      this.navigate(previous.screen, previous.params, false);
    }
  }

  subscribe(fn) {
    if (typeof fn !== "function") return;
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  emit() {
    for (const fn of this.listeners) {
      try { fn(this.current); } catch (err) { console.error("[Navigation] Error:", err); }
    }
  }

  getCurrentScreen() { return this.current.screen; }
  getParams() { return this.current.params; }
}
