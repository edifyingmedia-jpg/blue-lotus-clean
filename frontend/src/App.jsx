import SignInGate from "./auth/SignInGate";
import Workspace from "./builder/Workspace";

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* TWIN PANEL */}
      <div style={{ width: "420px", borderRight: "1px solid #ddd" }}>
        <SignInGate />
      </div>

      {/* WORKSPACE */}
      <div style={{ flex: 1 }}>
        <Workspace />
      </div>
    </div>
  );
}
