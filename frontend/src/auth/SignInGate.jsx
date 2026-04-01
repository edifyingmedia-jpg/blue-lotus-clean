import TwinPanel from "../twin/TwinPanel";

export default function SignInGate({ onSend }) {
  const session = {
    userId: "owner",
    email: "tiffany@owner",
  };

  return (
    <TwinPanel
      authority={{
        isOwner: true,
        actorId: session.userId,
        ownerId: session.userId,
        scope: "owner",
      }}
      onSend={onSend}
    />
  );
}
