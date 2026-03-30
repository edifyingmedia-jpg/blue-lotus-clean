import React, { createContext, useContext, useState } from "react";
import initialAppDefinition from "./appDefinition";

const AppDefinitionContext = createContext(null);

export function AppDefinitionProvider({ children }) {
  const [appDefinition, setAppDefinition] = useState(initialAppDefinition);

  return (
    <AppDefinitionContext.Provider
      value={{ appDefinition, setAppDefinition }}
    >
      {children}
    </AppDefinitionContext.Provider>
  );
}

export function useAppDefinition() {
  const context = useContext(AppDefinitionContext);

  if (!context) {
    throw new Error(
      "useAppDefinition must be used within an AppDefinitionProvider"
    );
  }

  return context;
}
