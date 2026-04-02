import { useState } from "react";

export default function SignInGate({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim().toLowerCase() === "tiffany@bluelotus.ai") {
      setAuthorized(true);
    } else {
      alert("Access restricted to owner.");
    }
  };

  if (authorized) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        zIndex: 9999,
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Owner Sign‑In</h2>

      <form
        onSubmit={handleSubmit}
        style={{ width: "300px", display: "flex", flexDirection: "column" }}
      >
        <input
          type="email"
          placeholder="Owner email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "6px",
            border: "1px solid #333",
            backgroundColor: "#111",
            color: "#fff",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            backgroundColor: "#4a7aff",
            border: "none",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Enter
        </button>
      </form>
    </div>
  );
}
