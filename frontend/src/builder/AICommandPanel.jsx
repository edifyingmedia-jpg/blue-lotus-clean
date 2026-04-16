// frontend/src/builder/AICommandPanel.jsx
import React, { useState } from "react";
import { useAppDefinition } from "../state/AppDefinitionContext";
import interpretCommand from "../twin/interpretCommand";
import executeProposal from "../twin/executeProposal";

export default function AICommandPanel() {
  const [input, setInput] = useState("");
  const [proposal, setProposal] = useState(null);
  const [error, setError] = useState(null);
  const { appDefinition, setAppDefinition } = useAppDefinition();

  function handleInterpret() {
    setError(null);
    const result = interpretCommand(input);
    setProposal(result);
  }

  function handleApproveAndApply() {
    if (!proposal) return;
    try {
      const updated = executeProposal(proposal, appDefinition);
      setAppDefinition(updated);
      setProposal(null);
      setInput("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#0F0F14] text-slate-200 border-l border-white/5 shadow-2xl">
      {/* Premium Header */}
      <div className="p-6 border-b border-white/5 bg-white/[0.02]">
        <h2 className="text-sm font-black tracking-[0.3em] text-cyan-500 uppercase">Neural Bridge</h2>
      </div>

      <div className="p-6 flex flex-col gap-6">
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-relaxed">
          Input Architectural Intent
        </div>

        <div className="relative group">
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="e.g., 'Architect a premium storefront hero'..." 
            className="w-full min-h-[160px] p-4 bg-black/40 border border-white/10 rounded-2xl text-sm outline-none focus:border-cyan-500/50 transition-all resize-none shadow-inner placeholder:text-slate-700" 
          />
        </div>

        <button 
          onClick={handleInterpret} 
          className="py-4 px-6 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all active:scale-[0.98] shadow-lg shadow-cyan-900/10"
        >
          Interpret Command
        </button>

        {proposal && (
          <div className="mt-4 p-5 bg-white/[0.03] border border-white/10 rounded-2xl space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Proposed Actuation</div>
            </div>

            <div className="text-sm font-mono text-cyan-300">
              <span className="opacity-40 mr-2">{">"}</span>{proposal.type}
            </div>

            {proposal.explanation && (
              <div className="text-xs text-slate-500 italic leading-relaxed">
                "{proposal.explanation}"
              </div>
            )}

            {proposal.type === "UNRECOGNIZED" ? (
              <div className="p-3 bg-red-900/10 border border-red-500/20 text-red-400 text-[10px] font-mono rounded-lg">
                SYSTEM_ERROR: Command parity not found.
              </div>
            ) : (
              <button 
                onClick={handleApproveAndApply} 
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-cyan-900/20"
              >
                Execute & Build
              </button>
            )}
          </div>
        )}

        {error && (
          <div className="text-red-500 text-[10px] font-mono mt-2 px-1 flex items-center gap-2 uppercase tracking-tighter">
            <span className="h-1 w-1 rounded-full bg-red-500" /> Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}
