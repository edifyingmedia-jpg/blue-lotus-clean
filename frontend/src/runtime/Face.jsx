import React from "react";
import "./Face.css";

export default function Face({ messages }) {
  return (
    <div className="face-root">
      <div className="face-wrapper">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`face-message ${msg.role === "user" ? "user" : "ai"}`}
          >
            <div className="face-bubble">{msg.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
