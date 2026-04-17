import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PreviewPanel({ appState, isGenerating }) {
  return (
    /* Use bl-panel-split here instead of w-full to match AIPanel exactly */
    <div className="relative bl-panel-split flex flex-col bg-[#05050a] overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,30,80,0.1),transparent)] pointer-events-none" />

      {/* Header / Status Bar */}
      <div className="flex items-center justify-between px-6 h-14 border-b border-white/5 bg-[#0a0b14]/50 backdrop-blur-md z-10 text-gray-400">
        <div className="flex items-center gap-3">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50">Workspace</div>
          <div className="h-1 w-1 rounded-full bg-white/10" />
          <div className="text-xs text-blue-400/80 font-medium">
            {appState?.previewTitle || 'Ready for build'}
          </div>
        </div>
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
              className="absolute inset-0 flex items-center justify-center bg-[#05050a]/80 backdrop-blur-sm z-20"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={i} 
                      className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-dot" 
                      style={{ animationDelay: `${i * 0.2}s` }} 
                    />
                  ))}
                </div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-blue-500/60 font-black">
                  Governess Reconstructing
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full p-8 flex items-center justify-center"
            >
              {/* This is the placeholder for the Twin-generated apps */}
              <div className="w-full h-full rounded-2xl border border-white/5 bg-[#0a0b14]/30 flex flex-col items-center justify-center text-center space-y-4">
                 <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center opacity-20">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                 </div>
                 <p className="text-gray-700 text-sm italic font-light tracking-wide">
                   {appState?.previewHtml ? "Component Tree Rendered" : "Direct the Presence to begin..."}
                 </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
