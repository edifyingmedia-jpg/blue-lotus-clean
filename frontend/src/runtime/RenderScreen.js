/**
 * RenderScreen.js
 * ----------------------------------------------------
 * Selects and prepares the correct screen for rendering.
 *
 * Responsibilities:
 *  - Read current screen from NavigationEngine
 *  - Resolve screen definition from appDefinition
 *  - Pass resolved screen + engines to ScreenRenderer
 *  - Emit render lifecycle events
 *
 * Non‑Responsibilities:
 *  - Navigation logic
 *  - Component rendering (handled by ScreenRenderer)
 *  - State management
 */

import React from "react";
import ScreenRenderer from "./ScreenRenderer";
import eventBus from "./utils/eventBus";

export default function RenderScreen({
  appDefinition,
  navigationEngine,
  stateEngine,
  actionEngine,
}) {
  if (!appDefinition || !navigationEngine) {
    console.error("RenderScreen: missing required props");
    return null;
  }

  const screenName = navigationEngine.getScreen();

  if (!screenName) {
    console.warn("RenderScreen: no active screen");
    return null;
  }

  const screen = appDefinition.screens?.[screenName];

  if (!screen) {
    console.error(`RenderScreen: screen "${screenName}" not found`);
    return null;
  }

  eventBus.emit("screen:render", {
    screen: screenName,
    params: navigationEngine.getParams(),
  });

  return (
    <ScreenRenderer
      screen={screen}
      screenName={screenName}
      stateEngine={stateEngine}
      navigationEngine={navigationEngine}
      actionEngine={actionEngine}
    />
  );
}
