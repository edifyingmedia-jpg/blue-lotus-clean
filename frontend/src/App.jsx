import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tablet as Lotus, Sparkles, User, ArrowRight } from 'lucide-react';

const App = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2 italic font-black tracking-tighter text-xl text-white">
          <Lotus className="text-indigo-500" size={24} />
          <span>BLUE LOTUS</span>
        </div>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all text-sm font-medium">
          <User size={16} />
          Sign In
        </button>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {/* Background Glows */}
        <div className="absolute w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] -z-10" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl text-center"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight italic uppercase">
            Create <span className="text-indigo-500">anything.</span>
          </h1>
          <p className="text-gray-400 mb-12 tracking-wide text-sm md:text-base max-w-xl mx-auto">
            Type your vision. Watch the Sovereign Forge build it in real-time.
          </p>

          {/* THE PROMPT BOX */}
          <div className="relative group max-w-2xl mx-auto mb-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-[#121215] rounded-xl p-2 border border-white/10">
              <input 
                type="text"
                placeholder="Describe the app you want to build..."
                className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-lg placeholder:text-gray-600 text-white outline-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-lg transition-all flex items-center gap-2 font-bold px-6">
                Build
                <ArrowRight size={18} />
              </button>
            </div>
            
            <div className="mt-6 flex justify-center gap-6 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
              <span className="flex items-center gap-2"><Sparkles size={12} className="text-indigo-400"/> 10 Free Credits</span>
              <span className="flex items-center gap-2 border-l border-white/10 pl-6">No-Code Output</span>
            </div>
          </div>

          {/* MEMBERSHIP TIERS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left">
            {/* Free Tier */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Explorer</h3>
              <div className="text-2xl font-black mb-4 italic">Free</div>
              <ul className="text-[11px] text-gray-400 space-y-3">
                <li className="flex items-center gap-2">✓ 10 Initial Credits</li>
                <li className="flex items-center gap-2">✓ Sovereign Forge Access</li>
                <li className="text-indigo-400/30 italic">✕ No Custom Deployment</li>
              </ul>
            </div>

            {/* Paid Tier - The "Sovereign" */}
            <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/30 backdrop-blur-md relative overflow-hidden ring-1 ring-indigo-500/20">
              <div className="absolute top-0 right-0 p-2 bg-indigo-500 text-[8px] font-bold uppercase tracking-tighter text-white">Recommended</div>
              <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-2">Sovereign</h3>
              <div className="text-2xl font-black mb-4 italic">$29<span className="text-sm">/mo</span></div>
              <ul className="text-[11px] text-gray-200 space-y-3">
                <li className="flex items-center gap-2">✓ Unlimited Forge Credits</li>
                <li className="flex items-center gap-2">✓ Command Deck (Profile)</li>
                <li className="flex items-center gap-2 text-indigo-300">✓ Push to GitHub & Vercel</li>
              </ul>
            </div>

            {/* Credit Pack */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Refuel</h3>
              <div className="text-2xl font-black mb-4 italic">$5<span className="text-sm">/pack</span></div>
              <ul className="text-[11px] text-gray-400 space-y-3">
                <li className="flex items-center gap-2">✓ 50 Extra Credits</li>
                <li className="flex items-center gap-2">✓ Instant Refill</li>
                <li className="flex items-center gap-2">✓ No Commitment</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="p-8 text-center text-[9px] text-gray-600 tracking-[0.4em] uppercase font-bold">
        Powered by Lumora Neural Engine // Est. 2026
      </footer>
    </div>
  );
};

export default App;
