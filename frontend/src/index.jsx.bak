// frontend/src/index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import Workspace from "./builder/Workspace";
import "./index.css";

/**
 * Mount the builder Workspace into the page.
 * This file is a complete entry point you can paste into frontend/src/index.jsx.
 *
 * Notes:
 * - Ensure your HTML has a <div id="root"></div> (public/index.html).
 * - index.css can be minimal; if missing, create it or remove the import.
 */

function App() {
  return <Workspace />;
}

const ensureRoot = () => {
  const existing = document.getElementById("root");
  if (existing) return existing;
  const el = document.createElement("div");
  el.id = "root";
  document.body.appendChild(el);
  return el;
};

const rootEl = ensureRoot();
createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
