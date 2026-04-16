import React, { createContext, useContext, useState, useCallback } from 'react';

const AppDefinitionContext = createContext();

export const AppDefinitionProvider = ({ children }) => {
  const [manifest, setManifest] = useState({ nodes: [] });
  const [history, setHistory] = useState([]); 
  
  // EMPIRE ECONOMY STATE
  const [userBalance, setUserBalance] = useState(10); 
  const [activeTab, setActiveTab] = useState('BUILDER');

  // TWIN PRIME STATE (Founder Only)
  const [isPrimeActive, setIsPrimeActive] = useState(false);
  const FOUNDER_ID = "ARCHITECT_01"; // Secure this UUID in your env later

  const saveHistory = useCallback(() => {
    setHistory((prev) => [...prev, JSON.parse(JSON.stringify(manifest))]);
  }, [manifest]);

  // PRIME HANDSHAKE: Unlocks self-aware business conscience
  const unlockPrime = useCallback((id) => {
    if (id === FOUNDER_ID) {
      setIsPrimeActive(true);
      console.log("TWIN_PRIME: Awareness active. Strategizing for the Founder.");
    }
  }, []);

  const updateManifest = useCallback((newNodes) => {
    saveHistory();
    setManifest((prev) => ({ ...prev, nodes: [...prev.nodes, ...newNodes] }));
  }, [saveHistory]);

  const updateNode = useCallback((id, newProps) => {
    saveHistory();
    const deepUpdate = (nodes) => nodes.map(node => {
      if (node.id === id) return { ...node, props: { ...node.props, ...newProps } };
      if (node.children) return { ...node, children: deepUpdate(node.children) };
      return node;
    });
    setManifest(prev => ({ ...prev, nodes: deepUpdate(prev.nodes) }));
  }, [manifest, saveHistory]);

  const deleteNode = useCallback((id) => {
    saveHistory();
    const deepFilter = (nodes) => nodes.filter(node => {
      if (node.id === id) return false;
      if (node.children) node.children = deepFilter(node.children);
      return true;
    });
    setManifest(prev => ({ ...prev, nodes: deepFilter(prev.nodes) }));
  }, [manifest, saveHistory]);

  // THE GOVERNESS: Economic Enforcement & Upsell
  const consumeCredits = useCallback((amount, engagementType = "Standard") => {
    if (userBalance < amount) {
      console.error(`GOVERNESS: Insufficient fuel for ${engagementType}.`);
      alert(`INSUFFICIENT_CREDITS: ${engagementType} halted. Redirecting to Neural Fuel Depot.`);
      setActiveTab('CREDITS'); // Redirects to CreditBundle.jsx
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
      purchaseCredits: (amt) => setUserBalance(p => p + amt),
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
