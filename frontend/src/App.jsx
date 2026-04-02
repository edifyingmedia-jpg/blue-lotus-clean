import React from "react";
import SignInGate from "./auth/SignInGate";
import TwinPanel from "./components/TwinPanel";

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <SignInGate>
        <TwinPanel />
      </SignInGate>
    </div>
  );
}
