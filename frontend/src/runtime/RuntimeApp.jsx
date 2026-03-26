/**
 * RuntimeApp.jsx
 * ----------------------------------------------------
 * Root React entry point for the Blue Lotus runtime.
 *
 * Responsibilities:
 *  - Initialize RuntimeEngine once
 *  - Load the appDefinition into the engine
 *  - Render the active screen through RenderScreen
 *  - Bridge runtime events into React
 */

import React, { useEffect, useState } from "react";

import StateEngine from "./StateEngine";
import NavigationEngine from "./NavigationEngine";
import ActionEngine from "./ActionEngine";
import RenderScreen from "./RenderScreen";

export default function RuntimeApp({ appDefinition }) {
  const [stateEngine] = useState(() => new StateEngine({}));
  const [navigationEngine] = useState(() => new NavigationEngine());
  const [actionEngine] = useState(
    () =>
      new ActionEngine({
        stateEngine,
        navigationEngine,
      })
  );

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!appDefinition) return;

    // Initialize navigation to the app's start screen
    const start = appDefinition?.navigation?.start;
    if (start) {
      navigationEngine.navigate(start);
    }

    setReady(true);
  }, [appDefinition, navigationEngine]);

  if (!ready) {
    return <div>Loading…</div>;
  }

  return (
    <div className="bl-runtime-app">
      <RenderScreen
        appDefinition={appDefinition}
        stateEngine={stateEngine}
        navigationEngine={navigationEngine}
        actionEngine={actionEngine}
      />
    </div>
  );
}
