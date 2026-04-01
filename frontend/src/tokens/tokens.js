// frontend/src/tokens/tokens.js
/**
 * Design tokens for Blue Lotus
 *
 * - Small, opinionated set to keep spacing, color, type, radii, and elevation consistent.
 * - Export both the token object and a helper to inject CSS variables at runtime.
 *
 * Usage:
 *   import { tokens, injectCssVars } from '../tokens/tokens';
 *   injectCssVars(document.documentElement, tokens);
 */

export const tokens = {
  color: {
    background: "#071018",
    surface: "#0b1220",
    text: "#e6eef2",
    muted: "#9aa6b2",
    primary: "#06b6d4",
    primaryAlt: "#0ea5a4",
    success: "#10b981",
    danger: "#ef4444",
    border: "rgba(255,255,255,0.06)",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
  },
  radius: {
    sm: 6,
    md: 8,
    lg: 12,
    pill: 9999,
  },
  type: {
    base: 14,
    scale: {
      xs: 12,
      sm: 13,
      md: 14,
      lg: 16,
      xl: 20,
      display: 24,
    },
    family: {
      ui: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
  },
  elevation: {
    low: "0 4px 10px rgba(2,6,10,0.35)",
    med: "0 6px 18px rgba(2,6,10,0.45)",
    high: "0 12px 40px rgba(2,6,10,0.55)",
  },
};

/**
 * injectCssVars
 * - Injects tokens as CSS variables on the provided root element (defaults to document.documentElement).
 * - Keeps variable names short and predictable (prefixed with --bl-).
 */
export function injectCssVars(root = document.documentElement, t = tokens) {
  if (!root || typeof root.style === "undefined") return;

  const vars = {
    "--bl-color-background": t.color.background,
    "--bl-color-surface": t.color.surface,
    "--bl-color-text": t.color.text,
    "--bl-color-muted": t.color.muted,
    "--bl-color-primary": t.color.primary,
    "--bl-color-primary-alt": t.color.primaryAlt,
    "--bl-color-success": t.color.success,
    "--bl-color-danger": t.color.danger,
    "--bl-border-color": t.color.border,
    "--bl-spacing-xs": `${t.spacing.xs}px`,
    "--bl-spacing-sm": `${t.spacing.sm}px`,
    "--bl-spacing-md": `${t.spacing.md}px`,
    "--bl-spacing-lg": `${t.spacing.lg}px`,
    "--bl-spacing-xl": `${t.spacing.xl}px`,
    "--bl-radius-sm": `${t.radius.sm}px`,
    "--bl-radius-md": `${t.radius.md}px`,
    "--bl-radius-lg": `${t.radius.lg}px`,
    "--bl-radius-pill": `${t.radius.pill}px`,
    "--bl-type-base": `${t.type.base}px`,
    "--bl-type-xs": `${t.type.scale.xs}px`,
    "--bl-type-sm": `${t.type.scale.sm}px`,
    "--bl-type-md": `${t.type.scale.md}px`,
    "--bl-type-lg": `${t.type.scale.lg}px`,
    "--bl-type-xl": `${t.type.scale.xl}px`,
    "--bl-type-display": `${t.type.scale.display}px`,
    "--bl-elevation-low": t.elevation.low,
    "--bl-elevation-med": t.elevation.med,
    "--bl-elevation-high": t.elevation.high,
    "--bl-font-family-ui": t.type.family.ui,
  };

  Object.entries(vars).forEach(([k, v]) => {
    try {
      root.style.setProperty(k, v);
    } catch (e) {
      // ignore failures in non-browser environments
    }
  });
}

export default { tokens, injectCssVars };
