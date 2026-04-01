// frontend/src/theme/ThemeProvider.jsx
import React, { useEffect, useMemo } from "react";
import { tokens as defaultTokens, injectCssVars } from "../tokens/tokens";

/**
 * ThemeProvider
 *
 * - Injects CSS variables from tokens so templates and components use a single source of truth.
 * - Exposes a lightweight context with the active tokens and a method to update them at runtime.
 * - Non-invasive: call once at the root of the preview/workspace to enable theming for all components.
 *
 * Usage:
 *   import ThemeProvider from '../theme/ThemeProvider';
 *   <ThemeProvider customTokens={maybeTokens}>
 *     <App />
 *   </ThemeProvider>
 */

const ThemeContext = React.createContext({
  tokens: defaultTokens,
  setTokens: () => {},
});

export function ThemeProvider({ children, customTokens }) {
  const mergedTokens = useMemo(() => {
    // shallow merge: allow templates to override parts of the token object
    return { ...defaultTokens, ...(customTokens || {}) };
  }, [customTokens]);

  useEffect(() => {
    // Inject CSS variables on mount and whenever tokens change
    try {
      injectCssVars(document.documentElement, mergedTokens);
    } catch (e) {
      // ignore in non-browser environments
    }
  }, [mergedTokens]);

  // setTokens is a simple setter that callers can use to update theme at runtime
  const setTokens = (patch = {}) => {
    const next = { ...mergedTokens, ...patch };
    try {
      injectCssVars(document.documentElement, next);
    } catch (e) {}
  };

  return (
    <ThemeContext.Provider value={{ tokens: mergedTokens, setTokens }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
export { ThemeContext };
