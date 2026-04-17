import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ArrowRight, Sparkles } from 'lucide-react';

const App = () => {
  const [prompt, setPrompt] = useState("");

  // Placeholder SVG for the Lotus Logo (can be replaced with your specific design)
  const LotusLogo = () => (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5C53.75 20.75 62.5 31.25 76.25 36.25C90 41.25 96.25 50 93.75 62.5C91.25 75 80 83.75 66.25 88.75C52.5 93.75 50 96.25 50 96.25C50 96.25 47.5 93.75 33.75 88.75C20 83.75 8.75 75 6.25 62.5C3.75 50 10 41.25 23.75 36.25C37.5 31.25 46.25 20.75 50 5Z" fill="#3B82F6" stroke="#4F46E5" strokeWidth="2"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0c] via-[#121215] to-[#1a1a20] text-gray-200 flex flex-col font-sans overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Sparkling Particle Background (Very Subtle) */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full w-px h-px"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Navigation */}
      <nav className="p-6 flex justify-end items-center z-20">
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 transition-all text-sm font-medium tracking-wide">
          <User size={18} />
          Sign In
        </button>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full max-w-6xl text-center z-10"
        >
          {/* Lotus Logo & Title */}
          <div className="flex flex-col items-center gap-5 mb-14">
            <motion.div
              animate={{ filter: ["drop-shadow(0 0 10px #3B82F6)", "drop-shadow(0 0 20px #818CF8)", "drop-shadow(0 0 10px #3B82F6)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <LotusLogo />
            </motion.div>
            <div className="relative group">
              {/* Shimmering Gradient Title with Animation */}
              <motion.h1 
                className="text-7xl md:text-8xl font-black italic uppercase tracking-[-0.03em] leading-none"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #E5E7EB 50%, #FFFFFF 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 6,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                Blue Lotus
              </motion.h1>
              {/* Subtle Sparkling Overlay for the Text */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                animate={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%)',
                  backgroundSize: '200% 100%',
                }}
                transition={{
                  duration: 4,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            </div>
            <p className="text-gray-500 tracking-wide text-sm md:text-base max-w-lg mx-auto">
              Type your vision. Watch the Sovereign Forge build it in real-time.
            </p>
          </div>

          {/* THE PROMPT BOX - Much Wider and Larger */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative group w-full max-w-4xl mx-auto mb-28"
          >
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative flex items-center bg-[#1a1a20]/80 rounded-2xl p-3 border border-white/[0.03] backdrop-blur-xl">
              <input 
                type="text"
                placeholder="Describe the application you want to build in a few words..."
                className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-5 text-xl md:text-2xl text-white placeholder:text-gray-700 outline-none font-medium tracking-tight"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button className="bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white p-5 rounded-xl transition-all flex items-center gap-3 font-bold px-10 text-lg shadow-xl shadow-blue-900/20">
                Build
                <ArrowRight size={22} />
              </button>
            </div>
            
            <div className="mt-8 flex justify-center gap-8 text-xs uppercase tracking-[0.25em] text-gray-600 font-semibold">
              <span className="flex items-center gap-2.5"><Sparkles size={14} className="text-blue-400"/> 10 Free Credits</span>
              <span className="flex items-center gap-2.5 border-l border-white/5 pl-8">Sovereign Forge Technology</span>
              <span className="flex items-center gap-2.5 border-l border-white/5 pl-8">Instant Real-Time Preview</span>
            </div>
          </motion.div>

          {/* MEMBERSHIP TIERS - Horizontal (Side-by-Side) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto text-left">
            {/* Free Tier */}
            <TierCard 
              name="Explorer"
              price="Free"
              features={[
                "10 Initial Credits",
                "Sovereign Forge Access",
                "Real-Time Preview",
              ]}
              exclusive={false}
            />

            {/* Paid Tier - The "Sovereign" */}
            <TierCard 
              name="Sovereign"
              price="$29"
              unit="/mo"
              features={[
                "Unlimited Forge Credits",
                "Command Deck (Profile)",
                "Custom Node Networking",
                "Push to GitHub & Vercel",
                "Lumora Ecosystem Access",
              ]}
              exclusive={true}
            />

            {/* Credit Pack */}
            <TierCard 
              name="Refuel"
              price="$5"
              unit="/pack"
              features={[
                "50 Extra Credits",
                "Instant Refill",
                "No Commitment",
                "Carry Over Balance",
              ]}
              exclusive={false}
            />
          </div>
        </motion.div>
      </main>

      <footer className="p-10 text-center text-[10px] text-gray-700 tracking-[0.5em] uppercase font-semibold">
        Sovereign Forge Engine // Powered by Lumora Neural // Est. 2026
      </footer>
    </div>
  );
};

// Reusable TierCard Component for Cleaner Code
const TierCard = ({ name, price, unit, features, exclusive }) => (
  <motion.div
    whileHover={{ y: -6, backgroundColor: exclusive ? "rgba(59, 130, 246, 0.08)" : "rgba(255, 255, 255, 0.04)" }}
    className={`p-8 rounded-3xl backdrop-blur-md transition-all duration-300 relative group cursor-pointer
      ${exclusive ? "bg-blue-600/5 border border-blue-500/30 ring-1 ring-blue-500/20 shadow-2xl shadow-blue-950/20" : "bg-white/[0.02] border border-white/5"}
    `}
  >
    {exclusive && (
      <div className="absolute top-0 right-0 p-3 bg-gradient-to-br from-blue-600 to-indigo-700 text-[9px] font-bold uppercase tracking-widest text-white rounded-bl-xl shadow-md">
        Recommended
      </div>
    )}
    <h3 className={`text-xs font-semibold uppercase tracking-[0.3em] mb-3 
      ${exclusive ? "text-blue-400" : "text-gray-500"}
    `}>
      {name}
    </h3>
    <div className="text-3xl font-black mb-6 italic text-gray-100 flex items-end gap-1">
      {price}
      {unit && <span className="text-base text-gray-600 font-medium tracking-tight ml-0.5">{unit}</span>}
    </div>
    <ul className="text-xs text-gray-500 space-y-3.5 font-medium tracking-wide">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2.5">
          <svg className={`w-4 h-4 
            ${exclusive ? "text-blue-500" : "text-gray-700"}
          `} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
  </motion.div>
);

export default App;
