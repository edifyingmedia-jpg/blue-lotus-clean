import React, { createContext, useContext, useState, useCallback } from 'react';

const AppDefinitionContext = createContext();

export const AppDefinitionProvider = ({ children }) => {
  const [manifest, setManifest] = useState({ nodes: [] });
  const [history, setHistory] = useState([]); // THE TEMPORAL STACK

  const updateManifest = useCallback((newNodes) => {
    // 1. Snapshot the current state before the change (Temporal Point)
    setHistory((prev) => [...prev, JSON.parse(JSON.stringify(manifest))]);
    
    // 2. Apply the new nodes to the manifest
    setManifest((prev) => ({
      ...prev,
      nodes: [...prev.nodes, ...newNodes],
    }));
  }, [manifest]);

  const undoActuation = useCallback(() => {
    if (history.length === 0) {
      console.warn("TEMPORAL_ERROR: No prior states detected in the stack.");
      return;
    }
    
    const previousState = history[history.length - 1];
    setManifest(previousState);
    setHistory((prev) => prev.slice(0, -1));
    console.log("TEMPORAL_REVERSAL: Successfully restored prior manifest.");
  }, [history]);

  return (
    <AppDefinitionContext.Provider value={{ 
      manifest, 
      updateManifest, 
      undoActuation, 
      canUndo: history.length > 0 
    }}>
      {children}
    </AppDefinitionContext.Provider>
  );
};

export const useAppDefinition = () => useContext(AppDefinitionContext);
