import { useState } from "react";
import SignInGate from "./auth/SignInGate";
import Workspace from "./builder/Workspace";

export default function App() {
  const [workspaceContent, setWorkspaceContent] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* TWIN PANEL */}
      <div
        style={{
          width: "420px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRight: "1px solid #222",
          backgroundColor: "#000",
        }}
      >
        <SignInGate onSend={setWorkspaceContent} />
      </div>

      {/* WORKSPACE */}
      <Workspace content={workspaceContent} />
    </div>
  );
}
