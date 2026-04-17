import React from 'react';
import { motion } from 'framer-motion';
import { Tablet as Lotus, Sparkles, Activity } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Animated Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 text-center"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ 
              filter: ["drop-shadow(0 0 10px #4f46e5)", "drop-shadow(0 0 20px #818cf8)", "drop-shadow(0 0 10px #4f46e5)"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Lotus size={64} className="text-indigo-400" />
          </motion.div>
        </div>

        <h1 className="text-6xl font-bold tracking-tighter mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent italic">
          BLUE LOTUS
        </h1>
        
        <div className="flex items-center justify-center gap-3 text-indigo-300/80 tracking-[0.2em] text-xs font-medium uppercase mb-12">
          <Activity size={14} className="animate-pulse" />
          <span>Neural Presence Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {[
            { label: "TWIN Governor", desc: "Autonomous AI Logic" },
            { label: "Sovereign Forge", desc: "No-Code Architecture" },
            { label: "The Lounge", desc: "Community Testing" }
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + (i * 0.2) }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer group"
            >
              <h3 className="text-sm font-bold text-indigo-400 mb-1 group-hover:text-indigo-300 transition-colors">{item.label}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <footer className="absolute bottom-8 text-[10px] text-gray-600 uppercase tracking-widest">
        Est. 2026 // Lumora Ecosystem
      </footer>
    </div>
  );
};

export default App;
