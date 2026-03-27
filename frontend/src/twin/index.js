/**
 * twin/index.js
 * ----------------------------------------------------
 * Public export hub for the TWIN subsystem.
 *
 * This keeps imports clean and ensures all TWIN-related
 * modules are discoverable from a single entrypoint.
 *
 * TWIN architecture:
 *  - twin.js        → internal owner-only server interface
 *  - twinClient.js  → safe frontend wrapper for API calls
 *  - TWIN.jsx       → React hook + integration layer
 */

export { default as twin } from "./twin";
export { default as twinClient } from "./twinClient";
export { default as useTWIN } from "./TWIN.jsx";
