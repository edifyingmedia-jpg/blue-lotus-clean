import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tablet as Lotus, Sparkles, User, ArrowRight } from 'lucide-react';

const App = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2 italic font-black tracking-tighter text-xl">
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
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl text-center"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight italic">
            Create <span className="text-indigo-500">anything.</span>
          </h1>
          <p className="text-gray-400 mb-12 tracking-wide text-sm md:text-base">
            Type your vision. Watch the Sovereign Forge build it in real-time.
          </p>

          {/* THE PROMPT BOX */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-[#121215] rounded-xl p-2 border border-white/10">
              <input 
                type="text"
                placeholder="Describe the app you want to build..."
                className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-lg placeholder:text-gray-600"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-lg transition-all flex items-center gap-2 font-bold px-6">
                Build
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-6 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
            <span className="flex items-center gap-2"><Sparkles size={12}/> 10 Free Credits</span>
            <span className="flex items-center gap-2 border-l border-white/10 pl-6">No-Code Output</span>
          </div>
        </motion.div>
      </main>

      <footer className="p-8 text-center text-[9px] text-gray-600 tracking-[0.3em] uppercase">
        Powered by Lumora Neural Engine
      </footer>
    </div>
  );
};

export default App;
