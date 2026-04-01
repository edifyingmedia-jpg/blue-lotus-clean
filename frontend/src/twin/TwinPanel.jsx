import { useState } from "react";
import "./TwinPanel.css";

export default function TwinPanel({ artifact, onBuild }) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        onBuild(input.trim());
        setInput("");
      }
    }
  };

  return (
    <div className="twin-panel">
      {/* Messages */}
      <div className="twin-messages">
        {!artifact ? (
          <div className="twin-message">
            TWIN: Ready. Try: "Build an app builder called Lotus Forge".
          </div>
        ) : (
          <>
            <div className="twin-message">
              Generated Files:
            </div>
            {Object.keys(artifact.files || {}).map((name) => (
              <div key={name} className="twin-message">
                {name}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Input */}
      <div className="twin-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Try: "Build an app builder called Lotus Forge"'
        />
      </div>
    </div>
  );
}
