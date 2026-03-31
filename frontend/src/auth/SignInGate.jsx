import { useEffect, useState } from "react";
import TwinPanel from "../twin/TwinPanel";

/**
 * SignInGate
 * -----------
 * Enforces signed authority before TWIN is mounted.
 *
 * Authority rules:
 * - OWNER: full meta-builder access
 * - USER: app generation only
 *
 * This file assumes:
 * - You will later replace `mockSignIn()` with real auth
 * - Session object is authoritative
 */

export default function SignInGate({ onBuild }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this with real auth lookup later
    const existing = loadSession();
    if (existing) {
      setSession(existing);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Centered>Loading…</Centered>;
  }

  if (!session) {
    return <SignIn onSignedIn={setSession} />;
  }

  return (
    <TwinPanel
      onBuild={onBuild}
      authority={{
        isOwner: session.role === "owner",
        actorId: session.userId,
        ownerId: session.ownerId,
        scope: session.role
      }}
    />
  );
}

/* ============================
   SIGN IN UI
============================ */

function SignIn({ onSignedIn }) {
  const [email, setEmail] = useState("");

  const submit = () => {
    const session = mockSignIn(email);
    saveSession(session);
    onSignedIn(session);
  };

  return (
    <Centered>
      <div style={card}>
        <h2>Sign in</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={input}
        />
        <button onClick={submit} style={button}>
          Continue
        </button>
      </div>
    </Centered>
  );
}

/* ============================
   SESSION (TEMPORARY)
============================ */

function mockSignIn(email) {
  const isOwner = email.toLowerCase() === "tiffany@owner";

  return {
    userId: email,
    role: isOwner ? "owner" : "user",
    ownerId: isOwner ? email : "tiffany@owner",
    issuedAt: Date.now()
  };
}

function saveSession(session) {
  localStorage.setItem("bl_session", JSON.stringify(session));
}

function loadSession() {
  const raw = localStorage.getItem("bl_session");
  return raw ? JSON.parse(raw) : null;
}

/* ============================
   UI HELPERS
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
