import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * BLUE LOTUS LOADER - THE ENTRANCE TO THE KINGDOM
 * High-contrast, bold visuals for the initial boot-up.
 */
export default function BlueLotusLoader({ onComplete }) {
  
  useEffect(() => {
    // Automatically finish loading after 2.5 seconds
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] bg-[#05050a] flex flex-col items-center justify-center"
    >
      {/* The Pulsing Core */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-24 h-24 rounded-full bg-blue-500/20 border-2 border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.3)] mb-12"
      />

      {/* High-Contrast Bold Text */}
      <div className="text-center">
        <h2 className="text-white text-3xl font-black uppercase tracking-[0.5em] mb-4">
          Blue Lotus
        </h2>
        <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase animate-pulse">
          Initializing Neural Presence...
        </p>
      </div>

      {/* Progress Bar (Visual Only) */}
      <div className="mt-12 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
        />
      </div>
    </motion.div>
  );
}
