import SignInGate from "./auth/SignInGate";
import Workspace from "./builder/Workspace";
import "./global.css";

export default function App() {
  return (
    <SignInGate>
      <Workspace />
    </SignInGate>
  );
}
