// frontend/src/runtime/RuntimeContext.js

import React, { createContext, useContext, useState, useCallback } from "react";

/**
 * RuntimeContext provides state, actions, and data
 * to all components rendered by the Blue Lotus runtime.
 *
 * This allows components to interact with the app definition
 * (e.g., buttons triggering actions, inputs updating state).
 */

const RuntimeContext = createContext(null);

export function RuntimeProvider({ children, initialState = {} }) {
  const [state, setState] = useState(initialState);

  /**
   * updateState merges new values into the existing state.
   */
  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
