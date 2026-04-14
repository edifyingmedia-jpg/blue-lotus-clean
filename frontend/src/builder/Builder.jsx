import React, { useState } from 'react';
import twinClient from '../api/twinClient';
import { TWIN_PRIME_SYSTEM_CONTRACT } from '../contracts/TWIN_PRIME_SYSTEM_CONTRACT';

const Builder = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [appDefinition, setAppDefinition] = useState(null);
  const [logs, setLogs] = useState(['[SYS] BLUE_LOTUS_VIBE_OS_INIT', '[SYS] NO_DRAG_DROP_ZONE_ACTIVE']);

  const handleActuation = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setLogs(prev => [...prev, `> VIBE_SYNC: ${prompt.substring(0, 20)}...`, `> ENFORCING_SYSTEM_CONTRACT_V1`]);

    try {
      const response = await twinClient.generate({
        prompt,
        // This includes the healing code and monetization instructions
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
    <div className="min-h-screen bg-[#020202] text-zinc-400 font-mono flex overflow-hidden">
      {/* COLUMN 1: INTENT ENGINE */}
      <div className="w-[450px] border-r border-white/5 bg-black flex flex-col p-10">
        <div className="mb-12">
          <h2 className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase">Blue Lotus Prime</h2>
          <p className="text-[9px] text-zinc-600 mt-2">AI-ONLY_VIBE_RUNTIME</p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 mb-8 scrollbar-hide">
          {logs.map((log, i) => (
            <div key={i} className={`text-[10px] ${log.startsWith('>') ? 'text-blue-400/60' : log.startsWith('✅') ? 'text-emerald-500' : 'text-zinc-800'}`}>
              {log}
            </div>
          ))}
        </div>

        <form onSubmit={handleActuation} className="space-y-6">
          <textarea 
            className="w-full bg-[#050505] border border-white/10 p-6 text-[12px] h-64 outline-none focus:border-blue-500/40 text-white rounded-2xl transition-all placeholder:text-zinc-800"
            placeholder="Describe the soul of your app..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600/10 border border-blue-500/20 py-5 text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_30px_rgba(37,99,235,0.1)]"
          >
            {loading ? 'SPLICING_REALITY...' : 'Manifest_App'}
          </button>
        </form>
      </div>

      {/* COLUMN 2: ARCHITECT VIEW (The Emergent Style) */}
      <div className="flex-1 p-16 bg-[#020202] overflow-y-auto">
        {appDefinition ? (
          <div className="max-w-5xl space-y-16 animate-in fade-in slide-in-from-right-10 duration-1000">
            <header className="space-y-4">
              <h1 className="text-7xl font-thin italic tracking-tighter text-white lowercase leading-none">{prompt}</h1>
              <div className="flex gap-4">
                <span className="text-[9px] bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">Monetization: Active</span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">Healing_Code: Enabled</span>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-12">
              <section className="space-y-6">
                <h3 className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.6em]">Infrastructure_Manifest</h3>
                <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem]">
                  <pre className="text-[11px] text-emerald-500/70 leading-relaxed overflow-x-auto">
                    {appDefinition.database_migration}
                  </pre>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.6em]">Component_Registry</h3>
                <div className="grid grid-cols-2 gap-4">
                  {appDefinition.ui_stack?.map((comp, i) => (
                    <div key={i} className="group p-8 border border-white/5 bg-black rounded-2xl hover:border-blue-500/30 transition-all">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Block_{i+1}</p>
                      <h4 className="text-xl text-white font-light">{comp.type || comp}</h4>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-[20rem] font-black italic text-white/[0.01] tracking-tighter select-none">LOTUS</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Builder;
