import SignInGate from "./auth/SignInGate";
import Workspace from "./builder/Workspace";
import "./global.css";

export default function App() {
  return (
    <div className="app-frame">
      <div className="left-panel">
        <SignInGate />
      </div>

      <div className="right-panel">
        <Workspace />
      </div>
    </div>
  );
}
