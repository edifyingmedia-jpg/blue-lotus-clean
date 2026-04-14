import React from 'react';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#1a1a2e', 
      color: '#e94560', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>🪷 Blue Lotus</h1>
      <div style={{ 
        padding: '20px', 
        border: '2px solid #e94560', 
        borderRadius: '15px',
        backgroundColor: '#16213e'
      }}>
        <p style={{ color: '#fff' }}>The system is officially running on React + Vite.</p>
        <button style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#e94560',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Enter Dashboard
        </button>
      </div>
    </div>
  );
}

export default App;
