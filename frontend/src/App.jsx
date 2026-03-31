import SignInGate from "./auth/SignInGate";
import TwinPanel from "./twin/TwinPanel";

export default function App() {
  return (
    <SignInGate>
      {(auth) => (
        <TwinPanel
          authority={{
            isOwner: !!auth?.isOwner,
            actorId: auth?.actorId ?? null,
            ownerId: auth?.ownerId ?? null,
            scope: auth?.isOwner ? "owner" : "user"
          }}
        />
      )}
    </SignInGate>
  );
}
