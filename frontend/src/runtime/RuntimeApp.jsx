import React, { useEffect, useState } from "react";
import RenderScreen from "./RenderScreen";

/**
 * RuntimeApp
 * ----------------------------------------------------
 * React host for a running app.
 * Subscribes to RuntimeEngine and renders the active screen.
 */

export default function RuntimeApp({ runtimeEngine }) {
  const [snapshot, setSnapshot] = useState(() =>
    runtimeEngine.getSnapshot()
  );

  useEffect(() => {
    // Subscribe to runtime updates
    const unsubscribe = runtimeEngine.subscribe((next) => {
      setSnapshot(next);
    });

    return unsubscribe;
  }, [runtimeEngine]);

  const { screen, params, appDefinition } = snapshot;

  if (!appDefinition) {
    return (
      <div style={{ padding: 20, color: "#999" }}>
        No app loaded.
      </div>
    );
  }

  if (!screen) {
    return (
      <div style={{ padding: 20, color: "#999" }}>
        No screen selected.
      </div>
    );
  }

  const screenDef = appDefinition.pages?.find((p) => p.id === screen);

  if (!screenDef) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        Screen not found: {screen}
      </div>
    );
  }

  return (
    <RenderScreen
      screen={{
        ...screenDef,
        params: params || {},
      }}
    />
  );
}
