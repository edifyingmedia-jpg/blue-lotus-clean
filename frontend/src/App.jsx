import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("Thinking...");

    try {
      const res = await fetch("/api/twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      setResponse(data.output || "No response");
    } catch (err) {
      setResponse("Error connecting to TWIN.");
    }
  };

  return (
    <div className="app-container">
      {/* ---------------- TOP BAR ---------------- */}
      <header className="top-bar">
        <h1 className="title">Blue Lotus Clean</h1>

        {/* ⭐ ADDED DEPLOYMENT OPTIONS — NO STYLE CHANGES */}
        <div className="deploy-options">
          <button
            className="deploy-btn"
            onClick={() =>
              window.open("https://app.netlify.com/start", "_blank")
            }
          >
            Netlify
          </button>

          <button
            className="deploy-btn"
            onClick={() =>
              window.open("https://dash.cloudflare.com", "_blank")
            }
          >
            Cloudflare
          </button>

          <button
            className="deploy-btn"
            onClick={() => window.open("https://vercel.com/new", "_blank")}
          >
            Vercel
          </button>
        </div>
      </header>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="main-content">
        <form onSubmit={handleSubmit} className="input-form">
          <textarea
            className="input-box"
            placeholder="Ask TWIN something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit" className="submit-btn">
            Send
          </button>
        </form>

        <div className="response-box">{response}</div>
      </main>
    </div>
  );
}

export default App;
