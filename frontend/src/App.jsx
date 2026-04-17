import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight, Sparkles, Undo2, Github, Trash2, Save, Send, ShoppingCart, Share2, Database, CreditCard } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState("landing");
  const [prompt, setPrompt] = useState("");

  const LotusLogo = () => (
    <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5C53.75 20.75 62.5 31.25 76.25 36.25C90 41.25 96.25 50 93.75 62.5C91.25 75 80 83.75 66.25 88.75C52.5 93.75 50 96.25 50 96.25C50 96.25 47.5 93.75 33.75 88.75C20 83.75 8.75 75 6.25 62.5C3.75 50 10 41.25 23.75 36.25C37.5 31.25 46.25 20.75 50 5Z" fill="#2563EB" stroke="#1E40AF" strokeWidth="2"/>
    </svg>
  );

  return (
    <div className="min-h-screen w-full bg-white font-sans overflow-x-hidden">
      <AnimatePresence mode="wait">
        {stage === "landing" ? (
          <motion.div key="landing" exit={{ opacity: 0 }} className="min-h-screen w-full flex flex-col">
            
            {/* TOP BAR: Logo Left, Sign In Right */}
            <nav className="w-full p-8 flex justify-between items-center bg-white border-b border-gray-50">
              <div className="flex items-center gap-4">
                <LotusLogo />
                <h1 className="text-4xl font-black italic uppercase tracking-tighter"
                    style={{ background: 'linear-gradient(135deg, #2563EB 0%, #9ca3af 50%, #6b7280 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Blue Lotus
                </h1>
              </div>
              <button className="flex items-center gap-2 bg-gray-50 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full text-sm font-black border border-gray-100 transition-all shadow-sm uppercase tracking-widest">
                <User size={18} /> Sign In
              </button>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
              {/* GIANT CREATION PROMPT */}
              <div className="w-full max-w-6xl text-center mb-32">
                <h2 className="text-6xl font-light text-gray-300 mb-12 italic tracking-tight">What are we building today?</h2>
                <div className="relative w-full flex items-center bg-gray-50 rounded-[2.5rem] p-5 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] focus-within:ring-4 ring-blue-50 transition-all">
                  <input 
                    type="text"
                    placeholder="Describe your vision (e.g., A luxury real estate platform for the future...)"
                    className="flex-1 bg-transparent px-8 py-8 text-4xl outline-none text-gray-800 placeholder:text-gray-200 font-light"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <button onClick={() => setStage("workspace")} className="bg-blue-600 hover:bg-blue-700 text-white px-16 py-8 rounded-[1.8rem] font-black text-2xl flex items-center gap-4 transition-all shadow-2xl shadow-blue-300 active:scale-95">
                    GENERATE <ArrowRight size={28} />
                  </button>
                </div>
              </div>

              {/* HORIZONTAL LIVELY PRICING */}
              <div className="flex flex-row flex-wrap lg:flex-nowrap gap-8 w-full max-w-7xl justify-center">
                {[
                  { name: 'Explorer', price: 'Free', color: 'bg-emerald-50 text-emerald-800 border-emerald-100', icon: <Sparkles size={20}/> },
                  { name: 'Sovereign', price: '$29/mo', color: 'bg-blue-600 text-white border-blue-600 shadow-2xl shadow-blue-200 scale-110', icon: <LotusLogo /> },
                  { name: 'Refuel', price: '$5/pack', color: 'bg-purple-50 text-purple-800 border-purple-100', icon: <CreditCard size={20}/> }
                ].map((tier, i) => (
                  <div key={i} className={`w-full min-w-[320px] p-12 rounded-[3rem] border ${tier.color} text-left transition-all hover:-translate-y-3 cursor-pointer relative overflow-hidden group`}>
                    <div className="mb-6 opacity-80">{tier.icon}</div>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-3 opacity-90">{tier.name}</h3>
                    <div className="text-5xl font-black italic mb-10 tracking-tighter">{tier.price}</div>
                    <ul className="space-y-4 text-[13px] font-bold opacity-90 uppercase tracking-wide">
                      <li className="flex items-center gap-2">✓ Full Forge Access</li>
                      <li className="flex items-center gap-2">✓ Neural Memory</li>
                      {i === 1 && <li className="flex items-center gap-2 text-blue-200">✓ GitHub Sync</li>}
                    </ul>
                  </div>
                ))}
              </div>
            </main>

            <footer className="p-12 text-center text-[10px] text-gray-300 tracking-[0.6em] uppercase font-black">
              Blue Lotus Sovereign Engine // 2026
            </footer>
          </motion.div>
        ) : (
          /* WORKSPACE VIEW */
          <div className="h-screen w-full bg-[#f3f4f6] flex flex-col">
            {/* The rest of workspace code... */}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
