// frontend/.storybook/manager.js
import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

/**
 * Blue Lotus Manager Configuration
 * ----------------------------------------------------
 * Customizing the Storybook shell to act as a high-end 
 * development laboratory for AI-driven components.
 */
addons.setConfig({
  theme: create({
    base: "dark",
    
    // Branding & Identity
    brandTitle: "BLUE LOTUS // DESIGN SYSTEM",
    brandUrl: "https://bluelotusapp.netlify.app",
    brandImage: null, // Pro Tip: Add a 24x24 SVG logo here for a top-tier look

    // 2026 Core Palette (Modern Slate & Electric Cyan)
    colorPrimary: "#06b6d4",
    colorSecondary: "#38bdf8",

    // UI Surface Levels (Matches your Runtime/Theme.css)
    appBg: "#0f172a",           /* Deep slate background */
    appContentBg: "#1e293b",    /* Main panel background */
    appBorderColor: "rgba(255, 255, 255, 0.08)",
    appBorderRadius: 16,        /* Matching your runtime curvature */

    // Typography & Text
    fontBase: '"Inter", sans-serif',
    fontCode: '"Fira Code", monospace',
    textColor: "#f8fafc",
    textInverseColor: "#0f172a",

    // Toolbar & Sidebar aesthetics
    barBg: "#1e293b",
    barTextColor: "#94a3b8",
    barSelectedColor: "#38bdf8",
  }),

  // Advanced UI Organization (Crucial for performance/scalability)
  sidebar: {
    showRoots: true,           /* Automatically groups components into folders */
    collapsedRoots: ["legacy", "internal"],
    renderLabel: (item) => {
      // Logic to add status indicators to components (e.g., 'Beta', 'Stable')
      return item.name;
    },
  },

  // Performance & UX Hardening
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: true },    /* Hiding clutter for a cleaner AI workspace */
    copy: { hidden: false },
  },

  enableShortcuts: true,
  showToolbar: true,
});
