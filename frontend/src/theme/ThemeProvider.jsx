// frontend/src/theme/ThemeProvider.jsx
import React, { useEffect, useMemo, createContext, useContext } from "react";
import { tokens as defaultTokens, injectCssVars } from "../tokens/tokens";

/**
 * ThemeProvider (Empire Edition)
 * ----------------------------
 * The primary atmospheric processor for Blue Lotus.
 * Enforces the Ink & Cyan palette and industrial visual laws.
 */
const ThemeContext = createContext({
  tokens: defaultTokens,
  setTokens: () => {},
});

export function ThemeProvider({ children, customTokens }) {
  const mergedTokens = useMemo(() => {
    // Rigid Merge: Protects the core Empire palette from being "wiped out"
    return { 
      ...defaultTokens, 
      ...(customTokens || {}),
      platform_fee: "0.10" // Hard-coded revenue anchor in the theme layer
    };
  }, [customTokens]);

  useEffect(() => {
    // Industrial Actuation: Injecting variables into the root
    try {
      injectCssVars(document.documentElement, mergedTokens);
      console.log("ATMOSPHERE_STABILIZED: Ink & Cyan palette applied.");
    } catch (err) {
      console.error("ATMOSPHERIC_FAILURE: Could not actuate design tokens.", err);
    }
  }, [mergedTokens]);

  // Hardened Setter for Runtime Adjustments
  const setTokens = (patch = {}) => {
    const next = { ...mergedTokens, ...patch };
    try {
      injectCssVars(document.documentElement, next);
    } catch (e) {
      console.error("THEME_MUTATION_FAILURE:", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ tokens: mergedTokens, setTokens }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ARCHITECT_ERROR: useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
