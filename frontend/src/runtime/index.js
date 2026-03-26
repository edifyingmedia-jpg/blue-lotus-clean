/**
 * index.js
 * ----------------------------------------------------
 * Public runtime entrypoint.
 *
 * Exports:
 *  - RuntimeApp (React root)
 *  - RuntimeProvider + useRuntime (context)
 *  - Engines (State, Navigation, Action)
 *  - Utilities for embedding the runtime
 */

import RuntimeApp from "./RuntimeApp.jsx";
import { RuntimeProvider, useRuntime } from "./RuntimeContext";

import StateEngine from "./StateEngine";
import NavigationEngine from "./NavigationEngine";
import ActionEngine from "./ActionEngine";

import RenderScreen from "./RenderScreen";
import ScreenRenderer from "./ScreenRenderer";
import AppRenderer from "./AppRenderer";

export {
  RuntimeApp,
  RuntimeProvider,
  useRuntime,
  StateEngine,
  NavigationEngine,
  ActionEngine,
  RenderScreen,
  ScreenRenderer,
  AppRenderer,
};
