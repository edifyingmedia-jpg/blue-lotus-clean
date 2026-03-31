import { useEffect, useState } from "react";
import TwinPanel from "../twin/TwinPanel";

/**
 * OWNER-ONLY SIGN IN GATE
 * ----------------------
 * This forge is private.
 * Only the owner may enter.
 * No user mode exists here.
 */

const OWNER_EMAIL = "tiffany@owner";

export default function SignInGate({ onBuild }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existing = loadSession();
    if (existing && existing.role === "owner") {
      setSession(existing);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Centered>Loading…</Centered>;
  }

  if (!session) {
    return <OwnerSignIn onSignedIn={setSession} />;
  }

  return (
    <TwinPanel
      onBuild={onBuild}
      authority={{
        isOwner: true,
        actorId: session.userId,
        ownerId: session.userId,
        scope: "owner"
      }}
    />
  );
}

/* ============================
   OWNER SIGN IN
============================ */

function OwnerSignIn({ onSignedIn }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (email.toLowerCase() !== OWNER_EMAIL) {
      setError("Access denied.");
      return;
    }

    const session = {
      userId: email,
      role: "owner",
      issuedAt: Date.now()
    };

    saveSession(session);
    onSignedIn(session);
  };

  return (
    <Centered>
      <div style={card}>
        <h2>Blue Lotus Forge</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Owner email"
          style={input}
        />
        {error && <div style={errorText}>{error}</div>}
        <button onClick={submit} style={button}>
          Enter Forge
        </button>
      </div>
    </Centered>
  );
}

/* ============================
   SESSION
============================ */

function saveSession(session) {
  localStorage.setItem("bl_owner_session", JSON.stringify(session));
}

function loadSession() {
  const raw = localStorage.getItem("bl_owner_session");
  return raw ? JSON.parse(raw) : null;
}

/* ============================
   UI
============================ */

function Centered({ children }) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#020617",
        color: "#e5e7eb"
      }}
    >
      {children}
    </div>
  );
}

const card = {
  padding: "24px",
  borderRadius: "12px",
  border: "1px solid #1e293b",
  background: "#020617",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  minWidth: "280px"
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #1e293b",
  background: "#020617",
  color: "#e5e7eb"
};

const button = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #1e293b",
  background: "#2563eb",
  color: "#e5e7eb",
  cursor: "pointer"
};

const errorText = {
  color: "#f87171",
  fontSize: "12px"
};
