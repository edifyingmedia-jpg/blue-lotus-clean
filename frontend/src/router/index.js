// frontend/src/router/index.js

/** * BLUE LOTUS ROUTE REGISTRY 
 * --------------------------
 * Managing the neural paths of the Empire.
 * Connects the Workspace, Storefront, and Revenue nodes.
 */

// Core Router Actuator
export { default as AppRouter } from "./AppRouter.jsx";

/**
 * ARCHITECT NOTE:
 * All new navigation paths (e.g., /storefront, /profile) 
 * must be registered in the AppRouter and exported here 
 * to ensure they inherit the 10% Tax tracking logic.
 */
