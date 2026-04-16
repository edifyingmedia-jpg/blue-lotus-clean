// frontend/src/runtime/Face.jsx
import React, { useEffect, useRef } from "react";
import "./Face.css";

// Note: You would typically npm install 'react-markdown' for this
// For now, I'll keep it standard but structured for easy integration.

export default function Face({ messages, isThinking }) {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div className="face-root">
      <div className="face-wrapper">
        {messages.map((msg, index) => (
          <div 
            key={msg.id || index} 
            className={`face-message ${msg.role === "user" ? "user" : "ai"}`}
          >
            <div className="face-bubble">
              {msg.text}
            </div>
          </div>
        ))}
        
        {/* Thinking indicator for 2026 UX feel */}
        {isThinking && (
          <div className="face-message ai thinking">
            <div className="face-bubble italic opacity-70">
              Twin is thinking...
            </div>
          </div>
        )}
        
        <div ref={scrollRef} />
      </div>
    </div>
  );
}
