// frontend/src/tokens/tokens.js

/**
 * Design Tokens (Empire Edition)
 * ----------------------------
 * The primary visual law for the Blue Lotus ecosystem.
 * Hardened for Ink & Cyan aesthetics and 10% Revenue visibility.
 */
export const tokens = {
  color: {
    background: "#09090B", // True Ink
    surface: "#0F0F14",    // Industrial Slate
    text: "#E2E8F0",       // Off-White Data
    muted: "#64748B",      // Terminal Grey
    primary: "#06B6D4",    // Cyan Actuation
    primaryAlt: "#0891B2", // Deep Cyan
    success: "#10B981",    // Green Actuation
    danger: "#EF4444",     // Alert Red
    border: "rgba(255,255,255,0.05)",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 48, // Increased for "Monolith" breathing room
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 40,   // "Empire" radius for cards/sections
    pill: 9999,
  },
  type: {
    base: 12, // Switched to 12px for high-density industrial look
    scale: {
      xs: 10,
      sm: 11,
      md: 12,
      lg: 14,
      xl: 18,
      display: 32,
    },
    family: {
      ui: "Inter, -apple-system, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
  },
  elevation: {
    low: "0 2px 8px rgba(0,0,0,0.4)",
    med: "0 10px 30px rgba(0,0,0,0.6)",
    high: "0 20px 60px rgba(0,0,0,0.8)",
  },
};

/**
 * injectCssVars
 * - Hardened for the Blue Lotus 10% Tax environment.
 */
export function injectCssVars(root = document.documentElement, t = tokens) {
  if (!root || typeof root.style === "undefined") return;

  const vars = {
    "--bl-ink": t.color.background,
    "--bl-cyan": t.color.primary,
    "--bl-surface": t.color.surface,
    "--bl-text": t.color.text,
    "--bl-border": t.color.border,
    "--bl-radius-empire": `${t.radius.lg}px`,
    "--bl-font-mono": t.type.family.mono,
    "--bl-architect-tax": "0.10", // Global tax constant in CSS
  };

  Object.entries(vars).forEach(([k, v]) => {
    try {
      root.style.setProperty(k, v);
    } catch (e) {
      console.error("TOKEN_INJECTION_FAILURE");
    }
  });
}

export default { tokens, injectCssVars };
