import React, { createContext, useContext, useState, useCallback } from 'react';

const AppDefinitionContext = createContext();

export const AppDefinitionProvider = ({ children }) => {
  const [manifest, setManifest] = useState({ nodes: [] });
  const [history, setHistory] = useState([]); 
  const [userBalance, setUserBalance] = useState(10); // Start with 10 welcome credits
  
  // NEW: UI Control for TWIN to redirect the user
  const [activeTab, setActiveTab] = useState('BUILDER');

  const saveHistory = useCallback(() => {
    setHistory((prev) => [...prev, JSON.parse(JSON.stringify(manifest))]);
  }, [manifest]);

  const updateManifest = useCallback((newNodes) => {
    saveHistory();
    setManifest((prev) => ({
      ...prev,
      nodes: [...prev.nodes, ...newNodes],
    }));
  }, [saveHistory]);

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

  const undoActuation = useCallback(() => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setManifest(previousState);
    setHistory((prev) => prev.slice(0, -1));
  }, [history]);

  // ECONOMY & UPSELL LOGIC
  const purchaseCredits = useCallback((amount) => {
    setUserBalance(prev => prev + amount);
    console.log(`ECONOMY_UPDATE: ${amount} credits added.`);
  }, []);

  const consumeCredits = useCallback((amount) => {
    if (userBalance < amount) {
      // TWIN Intervenes: Stops the build and redirects the user
      console.error("GOVERNESS_INTERVENTION: Insufficient Fuel.");
      alert("INSUFFICIENT_FUEL: Actuation halted. Redirecting to Neural Fuel Depot.");
      setActiveTab('CREDITS'); // Forces the UI to show the Credit Bundle page
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
      consumeCredits,
      activeTab,
      setActiveTab
    }}>
      {children}
    </AppDefinitionContext.Provider>
  );
};

export const useAppDefinition = () => useContext(AppDefinitionContext);
