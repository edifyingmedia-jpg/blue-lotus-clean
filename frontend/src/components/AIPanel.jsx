import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * AI PANEL - THE VOICE OF THE GOVERNESS
 * This is the left-side command center.
 */
export default function AIPanel({ onGenerate, isGenerating, presenceState }) {
  const [prompt, setPrompt] = useState('');

  // Colors for the "Face" of the Presence based on the state
  const presenceColors = {
    weaving: 'text-blue-400 border-blue-500/30',
    pivoting: 'text-purple-400 border-purple-500/30',
    conflict: 'text-amber-400 border-amber-500/30'
  };

  const currentColor = presenceColors[presenceState] || presenceColors.weaving;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate({ id: Date.now(), prompt }, prompt);
      setPrompt('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0b14] p-8">
      
      {/* HEADER: THE PRESENCE IDENTITY */}
      <div className="mb-12">
        <h1 className={`text-2xl font-black uppercase tracking-[0.3em] ${currentColor}`}>
          {presenceState === 'conflict' ? 'TWIN PRIME' : 'TWIN'}
        </h1>
        <p className="text-gray-500 text-[10px] tracking-[0.2em] mt-2 font-bold uppercase">
          Neural Presence Engine
        </p>
      </div>

      {/* CHAT / INTERACTION AREA */}
      <div className="flex-1 overflow-y-auto mb-8 space-y-6">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
          <p className="text-gray-300 text-lg leading-relaxed italic">
            {presenceState === 'conflict' 
              ? "Architect, your logic is conflicting. Revise your intent so we may continue."
              : "What shall we weave today? The forge is ready."}
          </p>
        </div>
      </div>

      {/* INPUT AREA: THE COMMAND LINE */}
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your vision here..."
          className="w-full bg-[#05050a] border-2 border-white/10 rounded-2xl p-6 text-white text-lg focus:border-blue-500 outline-none transition-all resize-none min-h-[150px] font-medium"
        />
        
        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className={`mt-4 w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${
            isGenerating 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
          }`}
        >
          {isGenerating ? 'BUILDING...' : 'DIRECT PRESENCE'}
        </button>
      </form>

      {/* FOOTER: SYSTEM STATUS */}
      <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          Sovereign Tier Active
        </span>
        <div className={`w-2 h-2 rounded-full animate-pulse ${presenceState === 'conflict' ? 'bg-amber-500' : 'bg-blue-500'}`} />
      </div>

    </div>
  );
}
