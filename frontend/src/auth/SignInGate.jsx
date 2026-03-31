import TwinPanel from "../twin/TwinPanel";

export default function SignInGate() {
  const session = {
    userId: "owner",
    email: "tiffany@owner"
  };

  return (
    <TwinPanel
      authority={{
        isOwner: true,
        actorId: session.userId,
        ownerId: session.userId,
        scope: "owner"
      }}
    />
  );
}
