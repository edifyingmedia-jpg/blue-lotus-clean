import { useState } from "react";
import SignInGate from "./auth/SignInGate";
import Workspace from "./builder/Workspace";

export default function App() {
  const [workspaceContent, setWorkspaceContent] = useState(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "420px 1fr",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* LEFT: TWIN PANEL (FIXED WIDTH) */}
      <div
        style={{
          height: "100%",
          backgroundColor: "#000",
          borderRight: "1px solid #222",
        }}
      >
        <SignInGate onSend={setWorkspaceContent} />
      </div>

      {/* RIGHT: WORKSPACE (FULL REMAINING WIDTH) */}
      <Workspace content={workspaceContent} />
    </div>
  );
}
