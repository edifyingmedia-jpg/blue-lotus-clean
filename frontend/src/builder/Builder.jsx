// frontend/src/builder/Builder.jsx
import React, { useState } from 'react';
import twinClient from '../api/twinClient';
import { TWIN_PRIME_SYSTEM_CONTRACT } from '../contracts/TWIN_PRIME_SYSTEM_CONTRACT';
import { LivePreview, ComponentPanel, Inspector, AppStatusPanel } from '../components';

const Builder = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [appDefinition, setAppDefinition] = useState(null);
  const [logs, setLogs] = useState(['[SYS] BLUE_LOTUS_VIBE_OS_INIT', '[SYS] READY_FOR_ACTUATION']);

  const handleActuation = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    setLoading(true);
    setLogs(prev => [...prev, `> VIBE_SYNC: ${prompt.substring(0, 20)}...`, `> ENFORCING_SYSTEM_CONTRACT_V1`]);
    
    try {
      const response = await twinClient.generate({
        prompt, 
        contract: TWIN_PRIME_SYSTEM_CONTRACT.content 
      });
      if (response?.blueprint) {
        setAppDefinition(response.blueprint);
        setLogs(prev => [...prev, '✅ ACTUATION_COMPLETE', '> STANDING_UP_INFRASTRUCTURE']);
      }
    } catch (err) {
      setLogs(prev => [...prev, `!! SPLICING_ERROR: ${err.message}`]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#09090B] text-slate-300 font-sans flex overflow-hidden selection:bg-cyan-500/30">
      
      {/* LEFT COLUMN: THE ARCHITECT'S TOOLS */}
      <aside className="w-[380px] border-r border-white/5 bg-[#0F0F14] flex flex-col p-8 overflow-y-auto shadow-2xl z-20">
        <div className="mb-10">
          <h2 className="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase">Blue Lotus Prime</h2>
          <p className="text-[9px] text-slate-600 mt-2 font-mono tracking-widest uppercase">Actuation_Workbench_v2.1</p>
        </div>

        <form onSubmit={handleActuation} className="space-y-6 mb-10">
          <div className="relative group">
            <textarea 
              className="w-full bg-black/40 border border-white/10 p-5 text-sm h-40 outline-none focus:border-cyan-500/50 text-slate-200 rounded-2xl transition-all resize-none shadow-inner placeholder:text-slate-800" 
              placeholder="Describe the architectural soul..." 
              value={prompt} 
              onChange={e => setPrompt(e.target.value)} 
            />
            <div className="absolute bottom-4 right-4 text-[9px] font-mono text-slate-700">
              {loading ? "SYNCING..." : "READY"}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white hover:bg-cyan-400 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black rounded-xl transition-all active:scale-[0.98] shadow-xl shadow-cyan-900/10 disabled:opacity-50"
          >
            {loading ? 'MANIFESTING...' : 'Manifest Architecture'}
          </button>
        </form>

        <ComponentPanel />

        {/* LOG CONSOLE */}
        <div className="mt-auto pt-8 border-t border-white/5 space-y-2">
          {logs.slice(-3).map((log, i) => (
            <div key={i} className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter flex gap-2">
              <span className="text-cyan-950">[{i}]</span> {log}
            </div>
          ))}
        </div>
      </aside>

      {/* CENTER COLUMN: THE RENDERING VOID */}
      <main className="flex-1 bg-[#09090B] relative overflow-hidden flex flex-col p-6 lg:p-12">
        <div className="flex-1 relative group">
          {/* Decorative Glow behind the preview */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/10 to-transparent blur-3xl rounded-[3rem] opacity-50" />
          
          <div className="relative h-full w-full bg-[#121217] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl shadow-black">
            {appDefinition ? (
              <div className="h-full w-full transition-all duration-1000">
                <LivePreview tree={appDefinition.root || appDefinition} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="text-white/5 text-[12vw] font-black italic tracking-tighter select-none">
                  LOTUS
                </div>
                <p className="text-[10px] font-mono text-slate-700 tracking-[1em] uppercase -mt-4">Waiting for Intent</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* RIGHT COLUMN: THE INSPECTOR */}
      <aside className="w-[320px] border-l border-white/5 bg-[#0F0F14] hidden xl:block shadow-2xl">
        <Inspector />
      </aside>

      <AppStatusPanel app={appDefinition} activeScreen={appDefinition?.root} />
    </div>
  );
};

export default Builder;
