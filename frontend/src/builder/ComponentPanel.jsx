import React, { useState } from "react";

export function ComponentPanel({ onAICommand }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;

    // Send the user's natural language command to the parent
    onAICommand(input.trim());

    // Clear the input
    setInput("");
  };

  return (
    <div style={{ padding: 16, borderRight: "1px solid #ddd" }}>
      <h3>AI Builder</h3>

      <p style={{ fontSize: 14, opacity: 0.7 }}>
        Describe what you want to build.  
        The AI will update the app automatically.
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Example: Create a login screen with email and password fields..."
        style={{
          width: "100%",
          height: 120,
          padding: 8,
          marginTop: 8,
          borderRadius: 4,
          border: "1px solid #ccc",
          resize: "none"
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 12,
          width: "100%",
          padding: "10px 0",
          background: "#4a6cf7",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Build with AI
      </button>
    </div>
  );
}
