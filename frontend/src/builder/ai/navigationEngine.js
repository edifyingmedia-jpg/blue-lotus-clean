// frontend/src/builder/ai/navigationEngine.js

/**
 * Navigation Engine
 * -----------------
 * This module handles:
 *  - Auto-detecting navigation type from user commands
 *  - Creating tab bars, sidebars, or top nav structures
 *  - Adding screens to navigation
 *  - Linking screens
 *  - Setting initialRoute
 *  - Updating the app.navigation object
 *
 * Default navigation type: "tabs"
 */

export function detectNavigationType(command) {
  const lower = command.toLowerCase();

  if (lower.includes("tab")) return "tabs";
  if (lower.includes("sidebar") || lower.includes("side bar")) return "sidebar";
  if (lower.includes("top nav") || lower.includes("top navigation")) return "top";

  // Default (your choice)
  return "tabs";
}

/**
 * Creates a navigation structure if one does not exist.
 */
export function ensureNavigation(app, command) {
  if (!app.navigation) {
    app.navigation = {
      type: detectNavigationType(command),
      items: [],
      initialRoute: null
    };
  }
  return app.navigation;
}

/**
 * Adds a screen to the navigation structure.
 */
export function addScreenToNavigation(app, screenName) {
  if (!app.navigation) return;

  const route = normalizeRoute(screenName);

  // Avoid duplicates
  if (!app.navigation.items.some((i) => i.route === route)) {
    app.navigation.items.push({
      label: screenName,
      route
    });
  }

  // Set initial route if none exists
  if (!app.navigation.initialRoute) {
    app.navigation.initialRoute = route;
  }
}

/**
 * Creates a navigation bar with explicit items.
 * Example command:
 *   "Create a tab bar with Home, Explore, Profile"
 */
export function createExplicitNavigation(app, command) {
  const navType = detectNavigationType(command);
  const items = extractListFromCommand(command);

  app.navigation = {
    type: navType,
    items: items.map((label) => ({
      label,
      route: normalizeRoute(label)
    })),
    initialRoute: normalizeRoute(items[0] || "Home")
  };
}

/**
 * Handles linking commands:
 *  "Link login to dashboard"
 *  "Go to profile screen"
 */
export function linkScreens(app, command) {
  if (!app.navigation) return;

  const lower = command.toLowerCase();

  const match = lower.match(/go to ([^.,!?]+)/i);
  if (match && match[1]) {
    const target = match[1].trim();
    const route = normalizeRoute(target);

    // Ensure the target exists in navigation
    addScreenToNavigation(app, target);

    // Set as initial route (builder preview)
    app.navigation.initialRoute = route;
  }
}

/**
 * Utility: extract comma-separated list from commands.
 */
function extractListFromCommand(command) {
  const match = command.match(/with (.+)/i);
  if (!match || !match[1]) return [];

  return match[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Utility: convert screen names to routes.
 */
function normalizeRoute(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}
