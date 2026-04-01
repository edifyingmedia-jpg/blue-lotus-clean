import SignInGate from "./auth/SignInGate";
import Workspace from "./builder/Workspace";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* TWIN PANEL (AUTH + CONTROL) */}
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
        <SignInGate />
      </div>

      {/* WORKSPACE (APP SURFACE) */}
      <Workspace />
    </div>
  );
}
