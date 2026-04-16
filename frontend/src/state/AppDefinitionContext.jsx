// frontend/src/state/AppDefinitionContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import initialAppDefinition from "./appDefinition";
import { safeSet } from "../utils/safeSet";

const AppDefinitionContext = createContext(null);

/**
 * AppDefinitionProvider (Empire Edition)
 * -------------------------------------
 * The master state vessel for Blue Lotus applications.
 * Features hardened mutation logic to prevent project corruption.
 */
export function AppDefinitionProvider({ children }) {
  const [appDefinition, setAppDefinition] = useState(initialAppDefinition);

  // Hardened Update Logic: Prevents "Wiping Out" the manifest
  const updateManifest = useCallback((path, value) => {
    setAppDefinition((prev) => {
      const updated = safeSet(prev, path, value);
      // Industrial Logging for manifest mutations
      console.log(`MANIFEST_MUTATION_SUCCESS: Path [${path}] updated.`);
      return { ...updated };
    });
  }, []);

  // Global Revenue Anchor (10% Architect Fee)
  const architectFee = 0.10;

  return (
    <AppDefinitionContext.Provider 
      value={{ 
        appDefinition, 
        setAppDefinition, 
        updateManifest,
        architectFee 
      }}
    >
      {children}
    </AppDefinitionContext.Provider>
  );
}

export function useAppDefinition() {
  const context = useContext(AppDefinitionContext);
  if (!context) {
    throw new Error("ARCHITECT_ERROR: useAppDefinition must be used within an AppDefinitionProvider");
  }
  return context;
}
