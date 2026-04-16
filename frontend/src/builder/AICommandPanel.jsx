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
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 border-l border-slate-800">
      <div className="p-4 border-b border-slate-800 font-semibold tracking-tight text-blue-400">
        TWIN AI
      </div>
      
      <div className="p-4 flex flex-col gap-4">
        <div className="text-xs text-slate-500 leading-relaxed">
          Describe what you want to build. <br /> 
          TWIN will propose changes for your approval.
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Example: Add a welcome text to the home screen"
          className="w-full min-h-[120px] p-3 bg-slate-900 border border-slate-800 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none"
        />

        <button 
          onClick={handleInterpret}
          className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-blue-900/20"
        >
          Interpret Command
        </button>

        {proposal && (
          <div className="mt-2 p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Proposed Action</div>
            
            <div className="text-sm">
              <span className="text-blue-400 font-mono mr-2">TYPE:</span> 
              {proposal.type}
            </div>

            {proposal.explanation && (
              <div className="text-sm text-slate-400 italic">
                "{proposal.explanation}"
              </div>
            )}

            {proposal.type === "UNRECOGNIZED" ? (
              <div className="p-2 bg-yellow-900/20 border border-yellow-700/50 text-yellow-500 text-xs rounded">
                TWIN could not confidently interpret this request.
              </div>
            ) : (
              <button 
                onClick={handleApproveAndApply}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-emerald-900/20"
              >
                Approve & Apply
              </button>
            )}
          </div>
        )}

        {error && <div className="text-red-400 text-xs mt-2 px-1">✕ {error}</div>}
      </div>
    </div>
  );
}
