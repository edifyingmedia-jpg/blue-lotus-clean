import React, { createContext, useContext, useState, useCallback } from 'react';

const AppDefinitionContext = createContext();

export const AppDefinitionProvider = ({ children }) => {
  const [manifest, setManifest] = useState({ nodes: [] });
  const [history, setHistory] = useState([]); // THE TEMPORAL STACK
  
  // NEW: Empire Economy State
  const [userBalance, setUserBalance] = useState(10); // Start with 10 welcome credits

  // 1. Snapshot Helper (Deep clone to prevent reference corruption)
  const saveHistory = useCallback(() => {
    setHistory((prev) => [...prev, JSON.parse(JSON.stringify(manifest))]);
  }, [manifest]);

  // 2. Add New Nodes (Bulk Ingestion)
  const updateManifest = useCallback((newNodes) => {
    saveHistory();
    setManifest((prev) => ({
      ...prev,
      nodes: [...prev.nodes, ...newNodes],
    }));
  }, [saveHistory]);

  // 3. Update Specific Node (Targeted Actuation)
  const updateNode = useCallback((id, newProps) => {
    saveHistory();
    const deepUpdate = (nodes) => nodes.map(node => {
      if (node.id === id) {
        return { ...node, props: { ...node.props, ...newProps } };
      }
      if (node.children) {
        return { ...node, children: deepUpdate(node.children) };
      }
      return node;
    });
    setManifest(prev => ({ ...prev, nodes: deepUpdate(prev.nodes) }));
  }, [manifest, saveHistory]);

  // 4. Delete Node (Destructive Actuation)
  const deleteNode = useCallback((id) => {
    saveHistory();
    const deepFilter = (nodes) => nodes.filter(node => {
      if (node.id === id) return false;
      if (node.children) {
        node.children = deepFilter(node.children);
      }
      return true;
    });
    setManifest(prev => ({ ...prev, nodes: deepFilter(prev.nodes) }));
  }, [manifest, saveHistory]);

  // 5. Temporal Reversal (Undo)
  const undoActuation = useCallback(() => {
    if (history.length === 0) {
      console.warn("TEMPORAL_ERROR: No prior states detected.");
      return;
    }
    const previousState = history[history.length - 1];
    setManifest(previousState);
    setHistory((prev) => prev.slice(0, -1));
  }, [history]);

  // 6. Economy Actuators
  const purchaseCredits = useCallback((amount) => {
    // This will bridge to Stripe/Lemon Squeezy in the next stage
    setUserBalance(prev => prev + amount);
    console.log(`ECONOMY_UPDATE: ${amount} credits added to profile.`);
  }, []);

  const consumeCredits = useCallback((amount) => {
    if (userBalance < amount) {
      console.error("ECONOMY_FAILURE: Insufficient credits.");
      return false;
    }
    setUserBalance(prev => prev - amount);
    return true;
  }, [userBalance]);

  return (
    <AppDefinitionContext.Provider value={{
      manifest,
      updateManifest,
      updateNode,
      deleteNode,
      undoActuation,
      canUndo: history.length > 0,
      userBalance,
      purchaseCredits,
      consumeCredits
    }}>
      {children}
    </AppDefinitionContext.Provider>
  );
};

export const useAppDefinition = () => useContext(AppDefinitionContext);
