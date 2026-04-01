import { useState } from "react";
import TwinPanel from "../twin/TwinPanel";

export default function SignInGate() {
  const [authorized, setAuthorized] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can change this to whatever you want as the "owner" email
    if (email.trim().toLowerCase() === "tiffany@bluelotus.ai") {
      setAuthorized(true);
    } else {
      alert("Access restricted to owner.");
    }
  };

  if (authorized) {
    return <TwinPanel />;
  }

  return (
    <div style={{ color: "#fff", marginTop: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Owner Sign‑In</h2>

      <form onSubmit={handleSubmit}>
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
