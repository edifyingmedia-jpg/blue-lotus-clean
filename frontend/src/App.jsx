import SignInGate from "./auth/SignInGate";
import Workspace from "./builder/Workspace";

export default function App() {
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
      {/* LEFT: TWIN PANEL (AUTH + CONTROL) */}
      <div
        style={{
          height: "100%",
          backgroundColor: "#000",
          borderRight: "1px solid #222",
        }}
      >
        <SignInGate />
      </div>

      {/* RIGHT: WORKSPACE (APP SURFACE) */}
      <Workspace />
    </div>
  );
}
