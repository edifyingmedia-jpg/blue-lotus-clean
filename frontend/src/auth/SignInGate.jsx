import React, { useState } from "react";

export default function SignInGate({ children }) {
  const [email, setEmail] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const OWNER_EMAIL = "tiffany@edifyingmedia.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === OWNER_EMAIL.toLowerCase()) {
      setAuthorized(true);
    } else {
      alert("Access denied. Owner only.");
    }
  };

  if (!authorized) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0d0d",
          color: "white",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h1>Owner Sign‑In</h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <input
            type="email"
            placeholder="Owner email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #444",
              width: "250px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem",
              borderRadius: "6px",
              background: "#4a90e2",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
