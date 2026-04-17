import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Local Blue Lotus Components
import BlueLotusLoader from './components/BlueLotusLoader'
import AIPanel from './components/AIPanel'
import PreviewPanel from './components/PreviewPanel'

const STORAGE_KEY = 'blue-lotus-presence-init'

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  
  // --- SOVEREIGN STATE LOGIC ---
  // presenceState can be: 'weaving' (Blue), 'pivoting' (Purple), or 'conflict' (Amber)
  const [presenceState, setPresenceState] = useState('weaving')
  const [failCount, setFailCount] = useState(0)

  const [appState, setAppState] = useState({
    activeAppId: null,
    previewData: null,
    isGenerating: false,
    lastAction: 'Waiting for Governess...',
    isVerified: false // Prime's stamp of approval
  })

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) setShowLoader(false)
  }, [])

  const handlePresenceInit = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setShowLoader(false)
  }

  /**
   * THE FORGE LOGIC
   * Handles build requests, self-corrections, and the "Refund Game" safety valve.
   */
  const handleBuildRequest = (appData, actionDescription) => {
    // 1. Start the Build
    setAppState(prev => ({ ...prev, isGenerating: true }))
    
    // 2. Logic to simulate AI behavior
    setTimeout(() => {
      
      // SIMULATION: If the user keeps asking for the same thing (failCount logic)
      if (failCount >= 2) {
        // TRIGGER REGENT MEDIATION (Amber State)
        setPresenceState('conflict')
        setAppState(prev => ({ ...prev, isGenerating: false }))
        return; // Stop building until they revise
      }

      // SIMULATION: A "Soft Glitch" that triggers a pivot (Purple State)
      if (failCount === 1) {
        setPresenceState('pivoting')
        setFailCount(2) // Move to next stage
        setAppState(prev => ({ 
          ...prev, 
          isGenerating: false,
          lastAction: "Alternative logic applied." 
        }))
        return;
      }

      // SUCCESS PATH (Standard Blue State)
      setPresenceState('weaving')
      setAppState({
        activeAppId: appData.id || Date.now(),
        previewData: appData,
        isGenerating: false,
        lastAction: actionDescription,
        isVerified: true // Mark as sound architecture
      })
      
    }, 1500); // 1.5 seconds for a "solid" feel
  }

  return (
    <div className="w-screen h-screen overflow-hidden flex bg-[#0a0b14]">
      
      {/* INITIALIZATION LOADER */}
      <AnimatePresence>
        {showLoader && (
          <BlueLotusLoader key="presence-loader" onComplete={handlePresenceInit} />
        )}
      </AnimatePresence>

      <motion.div 
        className="flex w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: showLoader ? 0 : 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* LEFT PANEL: THE GOVERNESS (TWIN/PRIME) */}
        <div className="w-1/2 h-full border-r border-white/5">
          <AIPanel 
            onGenerate={handleBuildRequest} 
            isGenerating={appState.isGenerating}
            presenceState={presenceState} // Controls the "Face" colors
          />
        </div>

        {/* RIGHT PANEL: THE SOVEREIGN FORGE (RESULT) */}
        <div className="w-1/2 h-full bg-[#05050a]">
          <PreviewPanel 
            appState={appState} 
            isGenerating={appState.isGenerating} 
            presenceState={presenceState} // Controls the "Forge" colors
          />
        </div>

      </motion.div>
    </div>
  )
}
