import React, { useState } from "react";

export default function AICommandPanel() {
  const [input, setInput] = useState("");

  return (
    <div style={styles.panel}>
      <div style={styles.header}>TWIN</div>

      <div style={styles.body}>
        <div style={styles.instructions}>
          Describe what you want to build.
          <br />
          TWIN will interpret and update the app.
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Example: Create a login screen with email and password fields"
          style={styles.textarea}
        />

        <button style={styles.button} disabled>
          Build with AI
        </button>

        <div style={styles.note}>
          AI execution will be enabled in the next phase.
        </div>
      </div>
    </div>
  );
}

const styles = {
  panel: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#070a10",
    color: "#e5e7eb",
  },
  header: {
    padding: "14px 16px",
    borderBottom: "1px solid #1f2937",
    fontWeight: 600,
    letterSpacing: "0.2px",
  },
  body: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  instructions: {
    fontSize: "13px",
    color: "#9ca3af",
    lineHeight: 1.5,
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    resize: "none",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #1f2937",
    backgroundColor: "#0b0d12",
    color: "#e5e7eb",
    fontSize: "13px",
    outline: "none",
  },
  button: {
    padding: "10px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "not-allowed",
    opacity: 0.7,
  },
  note: {
    fontSize: "12px",
    color: "#6b7280",
  },
};
