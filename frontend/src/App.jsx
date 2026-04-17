import React from 'react';
import { motion } from 'framer-motion';
import { Tablet as Lotus, Activity, Zap, ShieldCheck, Cpu } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 text-center w-full max-w-5xl"
      >
        <div className="flex justify-center mb-10">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              filter: ["drop-shadow(0 0 15px #a855f7)", "drop-shadow(0 0 30px #6366f1)", "drop-shadow(0 0 15px #a855f7)"],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Lotus size={80} className="text-indigo-400" strokeWidth={1.5} />
            <div className="absolute -top-2 -right-2">
              <SparkleIcon />
            </div>
          </motion.div>
        </div>

        <h1 className="text-7xl font-black tracking-[0.15em] mb-2 bg-gradient-to-r from-indigo-300 via-purple-400 to-indigo-300 bg-clip-text text-transparent italic uppercase">
          Blue Lotus
        </h1>
        
        <div className="flex items-center justify-center gap-4 text-indigo-300/60 tracking-[0.4em] text-[10px] font-bold uppercase mb-16">
          <span className="w-8 h-[1px] bg-indigo-500/30" />
          <Activity size={12} className="text-purple-500 animate-pulse" />
          <span>Neural Presence Synced</span>
          <span className="w-8 h-[1px] bg-indigo-500/30" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <FeatureCard 
            icon={<Cpu size={20}/>} 
            title="TWIN Governor" 
            desc="The central AI authority managing memory and node networking."
          />
          <FeatureCard 
            icon={<Zap size={20}/>} 
            title="Sovereign Forge" 
            desc="Rapid application synthesis with zero-latency deployment."
          />
          <FeatureCard 
            icon={<ShieldCheck size={20}/>} 
            title="The Lounge" 
            desc="Secure ecosystem for creator testing and bug-bounty credits."
          />
        </div>
      </motion.div>

      <footer className="absolute bottom-10 flex flex-col items-center gap-2">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-2" />
        <p className="text-[9px] text-gray-500 uppercase tracking-[0.3em] font-medium">
          Powered by Lumora // 2026 Edition
        </p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
    className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl text-left transition-all group cursor-pointer"
  >
    <div className="text-purple-500 mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <h3 className="text-sm font-bold text-gray-200 mb-3 tracking-wide">{title}</h3>
    <p className="text-xs text-gray-500 leading-relaxed font-medium">{desc}</p>
  </motion.div>
);

const SparkleIcon = () => (
  <motion.div
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="text-purple-400"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  </motion.div>
);

export default App;
