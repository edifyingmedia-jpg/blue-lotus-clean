import React from "react";
import { createRoot } from "react-dom/client";
import BuilderApp from "./BuilderApp";

/**
 * Entry point for the Blue Lotus Builder.
 * This mounts the builder UI into the DOM.
 */

const container = document.getElementById("root");

if (!container) {
  throw new Error("Missing #root element for Builder");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BuilderApp />
  </React.StrictMode>
);
