import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PREVIEW PANEL - THE SOVEREIGN FORGE
 * Handles the visual states of TWIN and TWIN PRIME.
 * Includes logic for: Standard Build, Alternatives, and Regent Mediation.
 */
export default function PreviewPanel({ appState, isGenerating, presenceState = 'weaving' }) {
  
  // Configuration for the different AI "Presences"
  const presenceConfigs = {
    weaving: {
      color: 'bg-blue-500',
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
      text: 'Governess Reconstructing',
      subtext: 'The weave is in progress...'
    },
    pivoting: {
      color: 'bg-purple-500',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
      text: 'Sovereign Alternative Found',
      subtext: 'Adjusting logic for better stability.'
    },
    conflict: {
      color: 'bg-amber-500',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.6)]',
      text: 'Regent Mediation Required',
      subtext: 'Revise your intent to continue.'
    }
  };

  const currentPresence = presenceConfigs[presenceState] || presenceConfigs.weaving;

  return (
    <div className="relative bl-panel-split flex flex-col bg-[#05050a] overflow-hidden min-h-[500px]">
      
      {/* Background Atmosphere - Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,30,80,0.15),transparent)] pointer-events-none" />

      {/* Header / Status Bar */}
      <div className="flex items-center justify-between px-6 h-14 border-b border-white/5 bg-[#0a0b14]/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500">Workspace</div>
          <div className="h-1 w-1 rounded-full bg-white/20" />
          <div className={`text-xs font-bold tracking-wide ${presenceState === 'conflict' ? 'text-amber-400' : 'text-blue-400'}`}>
            {appState?.previewTitle || 'Ready for build'}
          </div>
        </div>
        
        {/* Prime Verification Badge */}
        {appState?.isVerified && (
          <div className="text-[9px] px-2 py-0.5 rounded-full border border-blue-500/30 text-blue-400 uppercase font-black tracking-tighter bg-blue-500/5">
            Regent Certified
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-[#05050a]/90 backdrop-blur-md z-20"
            >
              <div className="flex flex-col items-center gap-6">
                {/* Animated Presence Dots */}
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        delay: i * 0.2
                      }}
                      className={`w-2 h-2 rounded-full ${currentPresence.color} ${currentPresence.glow}`}
                    />
                  ))}
                </div>
                
                {/* Presence Text Labels */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <span className={`text-[11px] uppercase tracking-[0.4em] font-black ${presenceState === 'conflict' ? 'text-amber-500' : 'text-blue-500'}`}>
                    {currentPresence.text}
                  </span>
                  <span className="text-[9px] text-gray-500 italic tracking-widest">
                    {currentPresence.subtext}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full p-8 flex items-center justify-center"
            >
              {/* App Preview Container */}
              <div className="w-full h-full rounded-2xl border border-white/5 bg-[#0a0b14]/40 flex flex-col items-center justify-center text-center p-12 relative overflow-hidden">
                
                {/* If App is Ready */}
                {appState?.previewHtml ? (
                  <div className="text-white">
                    {/* The Actual Rendered App would go here */}
                    <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">Architecture Synchronized</p>
                  </div>
                ) : (
                  /* Initial State */
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center mx-auto bg-white/[0.02]">
                      <div className="w-2 h-2 rounded-full bg-blue-500/40" />
                    </div>
                    <p className="text-gray-600 text-sm italic font-light tracking-[0.1em] max-w-xs">
                      "Direct the Presence to begin the weave..."
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
