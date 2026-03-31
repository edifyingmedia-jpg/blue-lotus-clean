import SignInGate from "./auth/SignInGate";

/**
 * App Root
 * --------
 * This is the authoritative entry point.
 *
 * Rules:
 * - SignInGate ALWAYS mounts first
 * - TWIN never renders without a verified session
 * - Authority is injected downward
 */

export default function App() {
  const handleBuild = (payload) => {
    // This is where your builder/app payloads land
    // You already have this wired elsewhere — this keeps it centralized
    console.log("BUILD OUTPUT:", payload);
  };

  return <SignInGate onBuild={handleBuild} />;
}
