import { useState } from "react";
import TwinPanel from "./components/TwinPanel";

export default function App() {
  const [activeArtifact, setActiveArtifact] = useState(null);

  /**
   * Temporary mount view for generated app builders.
   * This proves execution without breaking the runtime.
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
   * Default Blue Lotus UI
   */
  return (
    <TwinPanel
      onBuild={(result) => {
        if (result?.artifact?.kind === "app-builder") {
          setActiveArtifact(result.artifact);
        }
      }}
    />
  );
}
