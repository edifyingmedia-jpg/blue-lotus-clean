import React, { useState } from 'react';
import twinClient from '../api/twinClient';
import { TWIN_PRIME_SYSTEM_CONTRACT } from '../contracts/TWIN_PRIME_SYSTEM_CONTRACT';

const Builder = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState(['[SYS] BLUE_LOTUS_CLEAN_V1.0', '[SYS] READY_FOR_ACTUATION']);
  const [appDefinition, setAppDefinition] = useState(null);

  const handleActuation = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setLogs(prev => [...prev, `> INITIATING_CONTRACT: ${TWIN_PRIME_SYSTEM_CONTRACT.id}`, `> ARCHITECTING: ${prompt}`]);

    try {
      // Calls the Twin AI via your specialized client
      const response = await twinClient.generate({
        prompt,
        contract: TWIN_PRIME_SYSTEM_CONTRACT.content
      });

      if (response && response.blueprint) {
        setAppDefinition(response.blueprint);
        setLogs(prev => [...prev, '✅ MANIFEST_SUCCESS', '> BLUEPRINT_READY_FOR_RUNTIME']);
      } else {
        throw new Error("EMPTY_MANIFEST");
      }
    } catch (err) {
      setLogs(prev => [...prev, `!! ACTUATION_FAILED: ${err.message}`]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex">
      {/* ACTUATOR PANEL */}
      <div className="w-96 border-r border-white/10 flex flex-col p-8 bg-black">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]" />
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-400">Builder_V1</span>
        </div>

        <div className="flex-1 text-[9px] space-y-2 text-blue-400/40 overflow-y-auto mb-6 scrollbar-hide">
          {logs.map((log, i) => (
            <div key={i} className={log.startsWith('>') ? 'text-blue-300/80' : log.startsWith('✅') ? 'text-emerald-400' : ''}>
              {log}
            </div>
          ))}
        </div>

        <form onSubmit={handleActuation} className="space-y-4">
          <textarea 
            className="w-full bg-[#0a0a0a] border border-white/5 p-4 text-[11px] h-48 outline-none focus:border-blue-500/50 text-zinc-300 rounded-xl"
            placeholder="Describe the application architecture..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'SYNTHESIZING...' : 'Manifest_Intent'}
          </button>
        </form>
      </div>

      {/* ARCHITECT CANVAS */}
      <div className="flex-1 p-12 bg-[#020202]">
        <div className="h-full border border-white/5 bg-black/40 rounded-[2rem] p-12 flex flex-col relative overflow-hidden shadow-2xl">
          <div className="absolute top-10 left-12 text-[9px] text-zinc-800 tracking-[1em] uppercase font-black">System_Output</div>
          
          {appDefinition ? (
            <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="space-y-2">
                <h1 className="text-6xl italic font-thin tracking-tighter text-white uppercase">{prompt}</h1>
                <div className="h-px w-24 bg-blue-500/50" />
              </div>

              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-black">Component_Registry</span>
                  <div className="grid grid-cols-1 gap-2">
                    {appDefinition.ui_stack?.map((comp, i) => (
                      <div key={i} className="p-4 border border-white/5 bg-white/[0.01] rounded-lg text-[10px] text-zinc-400 flex justify-between items-center">
                        <span className="font-bold">{comp.type || comp}</span>
                        <span className="text-[8px] text-emerald-500/50 tracking-tighter">READY</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-black">Data_Schema</span>
                  <pre className="text-[10px] text-emerald-500/60 bg-black/60 p-6 border border-white/5 rounded-2xl overflow-x-auto">
                    {appDefinition.database_migration || '-- No SQL Data --'}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
               <div className="text-[15rem] font-black italic text-white/[0.01] select-none tracking-tighter">BLUE</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Builder;
