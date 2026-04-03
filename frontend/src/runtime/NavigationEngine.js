// frontend/src/runtime/NavigationEngine.js

/**
 * NavigationEngine
 * ----------------------------------------------------
 * Minimal but modern navigation engine for runtime apps.
 * Tracks the current screen and optional params.
 *
 * Works with:
 *  - ActionEngine (navigate action)
 *  - RuntimeEngine
 *  - RenderScreen
 *  - ScreenRenderer.component.jsx
 */

export default class NavigationEngine {
  constructor() {
    this.current = {
      screen: null,
      params: {},
    };

    this.listeners = new Set();
  }

  /**
   * Navigate to a screen by name.
   */
  navigate(screen, params = {}) {
    if (!screen || typeof screen !== "string") {
      console.warn("NavigationEngine.navigate: invalid target:", screen);
      return;
    }

    this.current = {
      screen,
      params: params || {},
    };

    this.emit();
  }

  /**
   * Subscribe to navigation changes.
   */
  subscribe(fn) {
    if (typeof fn !== "function") return;
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  /**
   * Notify listeners.
   */
  emit() {
    for (const fn of this.listeners) {
      try {
        fn(this.current);
      } catch (err) {
        console.error("NavigationEngine listener error:", err);
      }
    }
  }

  /**
   * Get the current screen name.
   */
  getCurrentScreen() {
    return this.current.screen;
  }

  /**
   * Get current params.
   */
  getParams() {
    return this.current.params;
  }
}
