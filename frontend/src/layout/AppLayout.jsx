import React from "react";

export default function AppLayout({ children }) {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100vh",
      background: "#f8f8f8"
    }}>
      <header style={{
        padding: "10px 20px",
        background: "#222",
        color: "white",
        fontSize: 18
      }}>
        Blue Lotus App
      </header>

      <main style={{ 
        flex: 1, 
        overflow: "auto",
        padding: 20 
      }}>
        {children}
      </main>
    </div>
  );
}
