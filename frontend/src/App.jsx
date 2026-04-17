import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// Local Blue Lotus Components
import BlueLotusLoader from './components/BlueLotusLoader'
import AIPanel from './components/AIPanel' 
import PreviewPanel from './components/PreviewPanel'

// Using your existing registry logic from blue-lotus-clean
const STORAGE_KEY = 'blue-lotus-presence-init'

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [isGoverning, setIsGoverning] = useState(false) // Track TWIN Prime state
  const [appState, setAppState] = useState({
    activeAppId: null,
    previewData: null, // This now holds the App JSON/Structure
    isGenerating: false,
    lastAction: 'Waiting for Governess...'
  })

  useEffect(() => {
    // Check if the "Presence" has already been initialized
    if (localStorage.getItem(STORAGE_KEY)) setShowLoader(false)
  }, [])

  const handlePresenceInit = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setShowLoader(false)
  }

  // Refactored to handle App building rather than raw string generation
  const handleBuildRequest = (appData, actionDescription) => {
    setAppState(prev => ({ ...prev, isGenerating: true }))
    setIsGoverning(true) 

    // Simulation of TWIN's "Self-Correction" and Build cycle
    setTimeout(() => {
      setAppState({
        activeAppId: appData.id || Date.now(),
        previewData: appData,
        isGenerating: false,
        lastAction: actionDescription
      })
      setIsGoverning(false)
    }, 800)
  }

  return (
    <div className="w-screen h-screen overflow-hidden flex bg-[#0a0b14]">
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
        {/* LEFT PANEL: TWIN / TWIN Prime (The Governess) */}
        <div className="w-1/2 h-full border-r border-white/5">
           <AIPanel 
             onGenerate={handleBuildRequest} 
             isGenerating={appState.isGenerating}
             governanceMode={isGoverning} // Passes the "Governess" state to the Face
           />
        </div>

        {/* RIGHT PANEL: Live App Preview (The Result) */}
        <div className="w-1/2 h-full bg-[#05050a]">
           <PreviewPanel 
             appData={appState.previewData} 
             isGenerating={appState.isGenerating} 
           />
        </div>
      </motion.div>
    </div>
  )
}
