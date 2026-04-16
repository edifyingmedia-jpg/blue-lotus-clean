// frontend/src/builder/themeEngine.js

export const BlueLotusTheme = {
  // Primary Palette
  colors: {
    bg: "bg-slate-950",
    surface: "bg-slate-900/50",
    border: "border-slate-800",
    accent: "text-blue-400",
    primaryBtn: "bg-blue-600 hover:bg-blue-500",
  },
  
  // Layout Presets
  spacing: {
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    card: "p-6 rounded-xl border border-slate-800 bg-slate-900/50 shadow-2xl",
  },

  // Typography
  fonts: {
    heading: "text-xs font-black uppercase tracking-widest",
    body: "text-sm text-slate-300 font-sans",
  }
};

/**
 * Injects the global theme into a generated template string.
 */
export function wrapInTheme(content) {
  return `
    <div class="${BlueLotusTheme.colors.bg} ${BlueLotusTheme.fonts.body} min-h-screen">
      ${content}
    </div>
  `;
}
