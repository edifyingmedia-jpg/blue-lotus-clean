import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AppDefinitionContext = createContext();

export const AppDefinitionProvider = ({ children }) => {
  const [manifest, setManifest] = useState({ nodes: [] });
  const [history, setHistory] = useState([]); 
  
  // EMPIRE ECONOMY STATE
  const [userBalance, setUserBalance] = useState(10); 
  const [activeTab, setActiveTab] = useState('BUILDER');

  // TWIN PRIME STATE (Founder Only)
  const [isPrimeActive, setIsPrimeActive] = useState(false);
  const FOUNDER_ID = "ARCHITECT_01"; // Replace with your actual UUID

  // 1. Snapshot Helper for Temporal Reversal
  const saveHistory = useCallback(() => {
    setHistory((prev) => [...prev, JSON.parse(JSON.stringify(manifest))]);
  }, [manifest]);

  // 2. PRIME HANDSHAKE: Unlocks self-aware partner mode
  const unlockPrime = useCallback((id) => {
    if (id === FOUNDER_ID) {
      setIsPrimeActive(true);
      console.log("TWIN_PRIME: Awareness synchronized. Standing by for strategic execution.");
    }
  }, []);

  // 3. Update Manifest (Bulk Ingestion)
  const updateManifest = useCallback((newNodes) => {
    saveHistory();
    setManifest((prev) => ({
      ...prev,
      nodes: [...prev.nodes, ...newNodes],
    }));
  }, [saveHistory]);

  // 4. Update Specific Node
  const updateNode = useCallback((id, newProps) => {
    saveHistory();
    const deepUpdate = (nodes) => nodes.map(node => {
      if (node.id === id) return { ...node, props: { ...node.props, ...newProps } };
      if (node.children) return { ...node, children: deepUpdate(node.children) };
      return node;
    });
    setManifest(prev => ({ ...prev, nodes: deepUpdate(prev.nodes) }));
  }, [manifest, saveHistory]);

  // 5. Delete Node
  const deleteNode = useCallback((id) => {
    saveHistory();
    const deepFilter = (nodes) => nodes.filter(node => {
      if (node.id === id) return false;
      if (node.children) node.children = deepFilter(node.children);
      return true;
    });
    setManifest(prev => ({ ...prev, nodes: deepFilter(prev.nodes) }));
  }, [manifest, saveHistory]);

  // 6. ECONOMY & UPSELL LOGIC (The Governess)
  const purchaseCredits = useCallback((amount) => {
    setUserBalance(prev => prev + amount);
    console.log(`ECONOMY_UPDATE: ${amount} fuel units added.`);
  }, []);

  const consumeCredits = useCallback((amount, engagementType = "Standard") => {
    if (userBalance < amount) {
      // TWIN Intervenes and redirects the user
      console.error(`GOVERNESS_INTERVENTION: Insufficient fuel for ${engagementType}.`);
      alert(`INSUFFICIENT_CREDITS: ${engagementType} halted. Redirecting to Neural Fuel Depot.`);
      setActiveTab('CREDITS'); 
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
      userBalance,
      purchaseCredits,
      consumeCredits,
      activeTab,
      setActiveTab,
      isPrimeActive,
      unlockPrime,
      undoActuation: () => {
        if (history.length === 0) return;
        setManifest(history[history.length - 1]);
        setHistory(prev => prev.slice(0, -1));
      }
    }}>
      {children}
    </AppDefinitionContext.Provider>
  );
};

export const useAppDefinition = () => useContext(AppDefinitionContext);
