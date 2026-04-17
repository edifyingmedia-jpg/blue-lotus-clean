import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight, Sparkles, Undo2, Github, Trash2, Save, Send, ShoppingCart, Share2, Database, CreditCard } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState("landing"); // 'landing' or 'workspace'
  const [prompt, setPrompt] = useState("");

  const LotusLogo = () => (
    <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5C53.75 20.75 62.5 31.25 76.25 36.25C90 41.25 96.25 50 93.75 62.5C91.25 75 80 83.75 66.25 88.75C52.5 93.75 50 96.25 50 96.25C50 96.25 47.5 93.75 33.75 88.75C20 83.75 8.75 75 6.25 62.5C3.75 50 10 41.25 23.75 36.25C37.5 31.25 46.25 20.75 50 5Z" fill="#2563EB" stroke="#1E40AF" strokeWidth="2"/>
    </svg>
  );

  return (
    <div className="min-h-screen font-sans overflow-hidden transition-colors duration-700">
      <AnimatePresence mode="wait">
        
        {stage === "landing" ? (
          /* --- LANDING PAGE: STARK WHITE --- */
          <motion.div 
            key="landing"
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen bg-white text-gray-900 flex flex-col items-center relative"
          >
            <nav className="w-full p-8 flex justify-end z-20">
              <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-6 py-2.5 rounded-full text-sm font-bold transition-all border border-gray-200">
                <User size={18} /> Sign In
              </button>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-6xl text-center">
              <div className="flex flex-col items-center gap-6 mb-12">
                <LotusLogo />
                <h1 className="text-8xl font-black italic uppercase tracking-tighter leading-none pb-2"
                    style={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #9ca3af 50%, #ffffff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }}>
                  Blue Lotus
                </h1>
                <p className="text-gray-400 font-medium tracking-wide">The Sovereign Forge Engine</p>
              </div>

              <div className="w-full max-w-4xl relative group">
                <div className="absolute -inset-1 bg-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                <div className="relative flex items-center bg-gray-50 rounded-2xl p-4 border border-gray-100 shadow-2xl">
                  <input 
                    type="text"
                    placeholder="Describe your vision..."
                    className="flex-1 bg-transparent px-6 py-4 text-2xl outline-none text-gray-800 placeholder:text-gray-300 font-light"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <button 
                    onClick={() => setStage("workspace")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
                  >
                    Build <ArrowRight size={20} />
                  </button>
                </div>
              </div>

              {/* Membership Tiers (Side-by-Side) */}
              <div className="grid grid-cols-3 gap-6 w-full max-w-5xl mt-24">
                {['Explorer (Free)', 'Sovereign ($29)', 'Refuel ($5)'].map((tier, i) => (
                  <div key={i} className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 text-left hover:border-blue-200 transition-colors">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{tier}</h3>
                    <div className="h-2 w-12 bg-blue-100 rounded-full mb-4" />
                    <div className="space-y-2 text-xs text-gray-500 font-medium">
                      <p>• Creation Protocol</p>
                      <p>• Neural Networking</p>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </motion.div>

        ) : (
          /* --- WORKSPACE: SILVER GRAY / DARK GRAY / SOFT PURPLE --- */
          <motion.div 
            key="workspace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-screen bg-[#e5e7eb] flex flex-col"
          >
            {/* Upper Command Bar */}
            <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-6 z-30 shadow-sm">
              <div className="flex items-center gap-4 text-gray-400">
                <button className="hover:text-blue-600 transition-colors"><Undo2 size={20} /></button>
                <div className="h-6 w-px bg-gray-200 mx-2" />
                <button className="hover:text-gray-900 transition-colors"><Github size={20} /></button>
                <button className="hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-200"><Save size={14}/> Save</button>
                <button className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg text-xs font-bold text-white hover:bg-blue-700"><Send size={14}/> Deploy</button>
                <button className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-xs font-bold text-white hover:bg-indigo-700"><Share2 size={14}/> Publish</button>
                <div className="h-6 w-px bg-gray-200 mx-2" />
                <button className="flex items-center gap-2 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-50"><ShoppingCart size={14}/> Buy Credits</button>
                <button className="flex items-center gap-2 text-gray-600 border border-gray-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-50"><Database size={14}/> Backend</button>
                <button className="flex items-center gap-2 text-gray-600 border border-gray-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-50"><CreditCard size={14}/> Payments</button>
              </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
              {/* TWIN AI Panel: Dark Gray */}
              <aside className="w-80 bg-[#1f2937] text-white p-6 flex flex-col shadow-xl">
                <div className="flex items-center gap-2 mb-8 border-b border-gray-700 pb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black tracking-widest uppercase text-gray-400">Twin AI Active</span>
                </div>
                <div className="flex-1 text-sm text-gray-400 font-light leading-relaxed">
                  The neural governor is standing by...
                </div>
                <div className="bg-gray-800 rounded-xl p-3 border border-gray-700 text-xs">
                  <input className="bg-transparent w-full outline-none text-white" placeholder="Message TWIN..." />
                </div>
              </aside>

              {/* Preview Panel: Soft Purple */}
              <main className="flex-1 bg-[#f5f3ff] m-4 rounded-3xl border border-indigo-100 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
                 <div className="absolute top-6 left-6 text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Sovereign Live Preview</div>
                 <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-20 rounded-3xl shadow-2xl border border-white"
                 >
                   <p className="text-indigo-200 font-black italic text-4xl uppercase opacity-20">Your Project Appears Here</p>
                 </motion.div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
