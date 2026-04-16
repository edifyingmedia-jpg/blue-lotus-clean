import React, { createContext, useContext, useState, useCallback } from 'react';

const AppDefinitionContext = createContext();

export const AppDefinitionProvider = ({ children }) => {
  const [manifest, setManifest] = useState({ nodes: [] });
  const [history, setHistory] = useState([]); 

  const updateManifest = useCallback((newNodes) => {
    // SAVE_TEMPORAL_POINT: Deep clone current state into history before update
    setHistory((prev) => [...prev, JSON.parse(JSON.stringify(manifest))]);
    
    setManifest((prev) => ({
      ...prev,
      nodes: [...prev.nodes, ...newNodes],
    }));
  }, [manifest]);

  const undoActuation = useCallback(() => {
    if (history.length === 0) return;
    
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
