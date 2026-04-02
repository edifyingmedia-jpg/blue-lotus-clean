import { useState } from "react";
import SignInGate from "./auth/SignInGate";
import Workspace from "./builder/Workspace";
import "./global.css";

export default function App() {
  const [authorized, setAuthorized] = useState(false);

  return (
    <div className="app-frame">
      <div className="left-panel">
        <SignInGate onAuthorized={() => setAuthorized(true)} />
      </div>

      <div className="right-panel">
        {authorized ? <Workspace /> : null}
      </div>
    </div>
  );
}
