// frontend/src/builder/Builder.jsx
import React, { useState } from 'react';
import twinClient from '../api/twinClient';
import { TWIN_PRIME_SYSTEM_CONTRACT } from '../contracts/TWIN_PRIME_SYSTEM_CONTRACT';
// New Imports for the integrated workspace
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
    <div className="h-screen bg-[#020202] text-zinc-400 font-sans flex overflow-hidden">
      
      {/* LEFT COLUMN: INTENT & COMPONENTS */}
      <div className="w-[350px] border-r border-white/5 bg-black flex flex-col p-6 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase">Blue Lotus Prime</h2>
          <p className="text-[9px] text-zinc-600 mt-1">AI-DRIVEN_WORKBENCH_V2</p>
        </div>

        <form onSubmit={handleActuation} className="space-y-4 mb-8">
          <textarea 
            className="w-full bg-[#050505] border border-white/10 p-4 text-xs h-32 outline-none focus:border-blue-500/40 text-white rounded-xl transition-all"
            placeholder="Describe your app's soul..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-3 text-[10px] font-black uppercase tracking-widest text-white rounded-lg transition-all shadow-lg shadow-blue-900/20">
            {loading ? 'MANIFESTING...' : 'Manifest App'}
          </button>
        </form>

        <ComponentPanel />
        
        <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-2">
          {logs.slice(-3).map((log, i) => (
            <div key={i} className="text-[9px] font-mono opacity-40">{log}</div>
          ))}
        </div>
      </div>

      {/* CENTER COLUMN: LIVE CANVAS */}
      <div className="flex-1 bg-[#0a0a0a] relative overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto p-12">
           {appDefinition ? (
             <div className="bg-white rounded-2xl shadow-2xl min-h-full overflow-hidden">
                <LivePreview tree={appDefinition.root || appDefinition} />
             </div>
           ) : (
             <div className="h-full flex items-center justify-center text-zinc-800 text-8xl font-black italic tracking-tighter opacity-10">
               LOTUS
             </div>
           )}
        </div>
      </div>

      {/* RIGHT COLUMN: INSPECTOR */}
      <div className="w-[300px] border-l border-white/5 bg-black">
        <Inspector />
      </div>

      <AppStatusPanel app={appDefinition} activeScreen={appDefinition?.root} />
    </div>
  );
};

export default Builder;
