// frontend/src/runtime/NavigationEngine.js

/**
 * Minimal navigation engine for runtime apps.
 * Handles page switching inside a running app.
 */

export default class NavigationEngine {
  constructor() {
    this.currentPage = null;
  }

  /**
   * Navigate to a page by ID or name.
   */
  go(to) {
    if (!to || typeof to !== "string") {
      console.warn("NavigationEngine.go: invalid target:", to);
      return;
    }

    this.currentPage = to;
  }

  /**
   * Get the current page identifier.
   */
  getCurrentPage() {
    return this.currentPage;
  }
}
