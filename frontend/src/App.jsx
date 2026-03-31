import { useState } from "react";
import AppRouter from "./AppRouter";
import RuntimeApp from "./runtime/RuntimeApp";

/**
 * Root application shell.
 *
 * Default behavior:
 *   - Renders Blue Lotus (RuntimeApp)
 *
 * New behavior:
 *   - If an app-builder artifact is mounted, render it instead
 */
export default function App() {
  const [activeArtifact, setActiveArtifact] = useState(null);

  /**
   * Called by RuntimeApp when a build completes.
   * If the artifact is an app-builder, we mount it.
   */
  function handleBuildResult(result) {
    if (result?.artifact?.kind === "app-builder") {
      setActiveArtifact(result.artifact);
    }
  }

  /**
   * If a builder is active, render its App.jsx dynamically.
   * For now, this is a simple placeholder shell that proves mounting works.
   * (We will wire real execution next.)
   */
  if (activeArtifact?.kind === "app-builder") {
    return (
      <div style={{ padding: 24 }}>
        <h1>{activeArtifact.appName}</h1>
        <p>App Builder Mounted Successfully.</p>
        <p>Template: {activeArtifact.templateId}</p>

        <button
          onClick={() => setActiveArtifact(null)}
          style={{ marginTop: 16 }}
        >
          Exit Builder
        </button>
      </div>
    );
  }

  /**
   * Default: render Blue Lotus runtime
   */
  return (
    <RuntimeApp onBuildResult={handleBuildResult}>
      <AppRouter />
    </RuntimeApp>
  );
}
