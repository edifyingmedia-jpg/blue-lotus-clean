// frontend/src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Enforcing the Ink & Cyan baseline

/**
 * System Ignition (Empire Edition)
 * -------------------------------
 * The primary entry point for the Blue Lotus Monolith.
 * Hardened for high-density neural actuation and 10% Revenue tracking.
 */

const mountElement = document.getElementById('root');

if (!mountElement) {
  // Industrial Fallback: Prevents silent failure if the DOM is compromised
  console.error("ACTUATION_FAILURE: Root container 'root' not found.");
} else {
  ReactDOM.createRoot(mountElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  
  // Confirms the Empire is live in the console
  console.log("SYSTEM_ONLINE: Blue Lotus Neural Bridge Initialized.");
}
