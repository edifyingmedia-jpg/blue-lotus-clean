import React from "react";
import ScreenRenderer from "../rxgui/components/ScreenRenderer.component";

/**
 * RenderScreen
 * ------------
 * Modern runtime entry point for rendering a screen object.
 * Delegates to ScreenRenderer, which handles component resolution.
 */

export default function RenderScreen({ screen }) {
  if (!screen) {
    console.warn("RenderScreen: No screen provided.");
    return null;
  }

  return (
    <ScreenRenderer screen={screen} />
  );
}
