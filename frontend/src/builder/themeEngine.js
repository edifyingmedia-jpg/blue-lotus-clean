// frontend/src/builder/themeEngine.js

export const BlueLotusTheme = {
  // Primary Empire Palette
  colors: {
    bg: "bg-[#09090B]",           // Deepest Zinc
    surface: "bg-[#0F0F14]",      // Industrial Slate
    border: "border-white/5",     // Subtle luxury borders
    accent: "text-cyan-500",      // Signature Cyan
    primaryBtn: "bg-white text-black hover:bg-cyan-400 shadow-xl", 
  },

  // Layout Presets for Storefront-Ready Apps
  spacing: {
    container: "max-w-6xl mx-auto px-6 lg:px-12",
    card: "p-8 rounded-[2rem] border border-white/5 bg-[#0F0F14] shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
  },

  // Typography (Elite Architect Style)
  fonts: {
    heading: "text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500",
    body: "text-xs text-slate-400 font-sans leading-relaxed",
    mono: "text-[9px] font-mono tracking-widest uppercase text-slate-600"
  }
};

/**
 * Injects the global empire theme into a generated template string.
 * Now includes a data-attribute to track the 10% Architect Tax.
 */
export function wrapInTheme(content, userTier = "ACOLYTE") {
  return `
    <div 
      class="${BlueLotusTheme.colors.bg} ${BlueLotusTheme.fonts.body} min-h-screen selection:bg-cyan-500/30"
      data-architect-fee="0.10"
      data-user-tier="${userTier}"
    >
      ${content}
    </div>
  `;
}
