import React, { useState, useEffect } from 'react';
import { 
  Leaf, Sprout, Crown, Plus, Send, Terminal, Globe, 
  Github, ChevronRight, Loader2, CheckCircle2, AlertCircle 
} from 'lucide-react';

const plans = [
  { id: 'sprout', name: 'Lotus Sprout', icon: Leaf, cost: '5 Velocity', desc: 'Single component generation' },
  { id: 'bloom', name: 'Lotus Bloom', icon: Sprout, cost: '15 Velocity', desc: 'Full page architecture' },
  { id: 'crown', name: 'Lotus Crown', icon: Crown, cost: '50 Velocity', desc: 'Multi-page application suite' }
];

export default function App() {
  const [view, setView] = useState('garden');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [logs, setLogs] = useState([]);
  const [isCultivating, setIsCultivating] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState(null);
  const [deployedUrl, setDeployedUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [provider, setProvider] = useState('vercel');

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { id: Date.now(), message, type }]);
  };

  const handleBeginCultivation = async () => {
    if (!prompt) return;
    setIsCultivating(true);
    setView('forge');
    setLogs([]);
    addLog('Initiating Sovereign Architect...', 'info');

    const fallbackHTML = `<html><script src="https://cdn.tailwindcss.com"></script><body class="bg-[#020617] text-white p-12 flex flex-col items-center justify-center h-screen border-4 border-cyan-500/20"><div class="text-center space-y-6"><div class="w-20 h-20 bg-cyan-500/10 border border-cyan-500/30 rounded-3xl mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.2)]"><div class="w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div></div><h1 class="text-5xl font-black tracking-tighter italic">BLUE LOTUS CLEAN</h1><p class="text-cyan-500/60 font-mono text-sm tracking-[0.3em] uppercase">Sovereign Asset Manifested</p></div></body></html>`;

    try {
      const response = await fetch('/api/twin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, plan: selectedPlan?.id }),
      });
      const data = await response.json();
      if (data.ok) {
        addLog('Blueprint synthesized by TWIN.', 'success');
        setGeneratedFiles(data.files);
        const blob = new Blob([data.files[0].content], { type: 'text/html' });
        setPreviewUrl(URL.createObjectURL(blob));
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      addLog(`Sovereign Link Restricted: Using Local Forge Logic.`, 'error');
      const blob = new Blob([fallbackHTML], { type: 'text/html' });
      setPreviewUrl(URL.createObjectURL(blob));
      setGeneratedFiles([{ path: 'index.html', content: fallbackHTML }]);
    } finally {
      setIsCultivating(false);
    }
  };

  const handleManifest = async (targetProvider) => {
    if (!generatedFiles) return;
    addLog(`Deploying Sovereign Asset to ${targetProvider.toUpperCase()}...`, 'info');
    try {
      const repoName = `lotus-build-${Date.now()}`;
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: generatedFiles, repoName, provider: targetProvider }),
      });
      const result = await response.json();
      if (result.success) {
        addLog(`Manifestation complete on ${targetProvider}!`, 'success');
        setDeployedUrl(result.repoUrl);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      addLog(`Manifestation failed: ${err.message}`, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      <nav className="border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setView('garden')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tight text-lg text-white uppercase italic">Blue Lotus Clean</span>
          </div>

          {/* TOP BAR HARBOR BUTTONS */}
          <div className="flex items-center gap-2">
            {['vercel', 'netlify', 'cloudflare'].map((p) => (
              <button 
                key={p} 
                onClick={() => handleManifest(p)}
                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Ready</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {view === 'garden' ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="max-w-2xl">
              <h2 className="text-4xl font-bold text-white mb-4">Blue Lotus Garden</h2>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">Select a blueprint tier to begin the sovereign cultivation process.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <button key={plan.id} onClick={() => setSelectedPlan(plan)} className={`relative group p-8 rounded-3xl border transition-all text-left ${selectedPlan?.id === plan.id ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.1)]' : 'bg-slate-900/40 border-white/5 hover:border-white/10' }`} >
                  <plan.icon className={`w-10 h-10 mb-6 ${selectedPlan?.id === plan.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <h3 className="font-bold text-white text-xl mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">{plan.desc}</p>
                  <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em]">{plan.cost}</span>
                </button>
              ))}
            </div>
            {selectedPlan && (
              <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-sm animate-in zoom-in-95 duration-300">
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="What shall we manifest today?" className="w-full h-32 bg-transparent text-2xl text-white placeholder:text-slate-700 border-none focus:ring-0 resize-none font-medium" />
                <div className="flex justify-end pt-8 border-t border-white/5">
                  <button onClick={handleBeginCultivation} className="group px-10 py-5 bg-white text-slate-950 rounded-full font-black flex items-center gap-3 hover:bg-cyan-400 transition-all active:scale-95"> BEGIN CULTIVATION <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-14rem)] animate-in fade-in duration-500">
            <div className="flex flex-col bg-slate-950 rounded-[2rem] border border-white/5 overflow-hidden">
              <div className="p-5 border-b border-white/5 bg-slate-900/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Forge Console</span>
                </div>
              </div>
              <div className="flex-1 p-8 font-mono text-xs space-y-4 overflow-y-auto">
                {logs.map(log => (
                  <div key={log.id} className="flex gap-4">
                    <span className="text-slate-700">[{new Date(log.id).toLocaleTimeString([], {hour12: false})}]</span>
                    <span className={log.type === 'success' ? 'text-emerald-400' : log.type === 'error' ? 'text-rose-400' : 'text-cyan-400 font-bold'}> {log.message} </span>
                  </div>
                ))}
              </div>
              <div className="p-8 border-t border-white/5 bg-slate-900/20">
                <button disabled={!generatedFiles || isCultivating} onClick={() => handleManifest(provider)} className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-20 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-cyan-500/10">
                  {isCultivating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Globe className="w-5 h-5" />} Ready for Manifestation
                </button>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] border border-white/5 relative overflow-hidden shadow-2xl">
              {previewUrl ? (
                <iframe src={previewUrl} className="w-full h-full border-none" title="Preview" />
              ) : (
                <div className="flex items-center justify-center h-full text-center p-12 bg-slate-900/50">
                  <div className="space-y-6">
                    <Loader2 className="w-16 h-16 text-slate-800 mx-auto animate-spin" />
                    <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">Architectural synthesis in progress</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
