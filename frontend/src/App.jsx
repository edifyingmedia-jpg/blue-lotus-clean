import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * SOVEREIGN APP CORE - PATH HARDENED VERSION
 * Direct imports to bypass Vercel case-sensitivity glitches.
 */
import BlueLotusLoader from './components/BlueLotusLoader.jsx'
import AIPanel from './components/AIPanel.jsx'
import PreviewPanel from './components/PreviewPanel.jsx'

const STORAGE_KEY = 'blue-lotus-presence-init'

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [presenceState, setPresenceState] = useState('weaving')
  const [failCount, setFailCount] = useState(0)

  const [appState, setAppState] = useState({
    activeAppId: null,
    previewData: null,
    isGenerating: false,
    lastAction: 'Waiting for Governess...',
    isVerified: false
  })

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) setShowLoader(false)
  }, [])

  const handlePresenceInit = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setShowLoader(false)
  }

  const handleBuildRequest = (appData, actionDescription) => {
    setAppState(prev => ({ ...prev, isGenerating: true }))
    
    setTimeout(() => {
      if (failCount >= 2) {
        setPresenceState('conflict')
        setAppState(prev => ({ ...prev, isGenerating: false }))
        return;
      }

      if (failCount === 1) {
        setPresenceState('pivoting')
        setFailCount(2)
        setAppState(prev => ({ 
          ...prev, 
          isGenerating: false, 
          lastAction: "Alternative logic applied." 
        }))
        return;
      }

      setPresenceState('weaving')
      setAppState({
        activeAppId: appData.id || Date.now(),
        previewData: appData,
        isGenerating: false,
        lastAction: actionDescription,
        isVerified: true
      })
    }, 1500);
  }

  return (
    <div className="w-screen h-screen overflow-hidden flex bg-[#0a0b14] text-white">
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
        {/* LEFT PANEL: TWIN PRESENCE */}
        <div className="w-1/2 h-full border-r border-white/5">
          <AIPanel 
            onGenerate={handleBuildRequest} 
            isGenerating={appState.isGenerating}
            presenceState={presenceState}
          />
        </div>

        {/* RIGHT PANEL: THE FORGE */}
        <div className="w-1/2 h-full bg-[#05050a]">
          <PreviewPanel 
            appState={appState} 
            isGenerating={appState.isGenerating} 
            presenceState={presenceState}
          />
        </div>
      </motion.div>
    </div>
  )
}
