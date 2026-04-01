import SignInGate from "./auth/SignInGate";
import Workspace from "./builder/Workspace";

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* TWIN PANEL CONTAINER */}
      <div
        style={{
          width: "420px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRight: "1px solid #ddd",
          background: "#000"
        }}
      >
        <SignInGate />
      </div>

      {/* WORKSPACE */}
      <div style={{ flex: 1, height: "100%" }}>
        <Workspace />
      </div>
    </div>
  );
}
