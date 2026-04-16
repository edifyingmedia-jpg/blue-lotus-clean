import React from 'react';
import { ActionCard, ActionButton } from '../rxgui/primitives';
import { useAppDefinition } from '../state';

export const PropertyPanel = ({ selectedNodeId }) => {
  const { manifest, updateNode, deleteNode } = useAppDefinition();
  
  const findNode = (nodes, id) => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children && node.children.length > 0) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const node = selectedNodeId ? findNode(manifest.nodes, selectedNodeId) : null;

  if (!node) {
    return (
      <div className="w-80 border-l border-white/5 h-full bg-[#09090B] flex items-center justify-center p-8 text-center">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.4em] leading-relaxed">
          Select_Node_To_Actuate
        </p>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-white/5 bg-[#09090B] h-full p-6 space-y-6 overflow-y-auto">
      <header className="space-y-1 pb-4 border-b border-white/5">
        <h3 className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em]">Node_Inspector</h3>
        <p className="text-white/20 text-[9px] font-mono truncate">{node.id}</p>
      </header>

      {/* Appearance */}
      <ActionCard title="Appearance" icon="Layout">
        <div className="space-y-4 py-2">
          <label className="block space-y-2">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Content_Label</span>
            <input 
              className="w-full bg-black border border-white/10 p-3 text-white text-xs font-mono rounded-[0.5rem] focus:border-cyan-500/50 outline-none"
              value={node.props.label || ''}
              onChange={(e) => updateNode(node.id, { label: e.target.value })}
            />
          </label>
        </div>
      </ActionCard>

      {/* Logic & Monetization */}
      <ActionCard title="Monetization" icon="Zap">
        <div className="space-y-4 py-2">
          <div className="flex justify-between items-center bg-white/5 p-3 rounded-[0.5rem] border border-white/5">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Intent</span>
            <select 
              className="bg-transparent text-[9px] font-mono text-cyan-400 outline-none cursor-pointer"
              value={node.intent || 'DISPLAY'}
              onChange={(e) => updateNode(node.id, { intent: e.target.value })}
            >
              <option value="DISPLAY">DISPLAY</option>
              <option value="REVENUE_SETTLEMENT">ONE_TIME_SALE</option>
              <option value="RECURRING_SUBSCRIPTION">MEMBERSHIP</option>
            </select>
          </div>
          
          {(node.intent === 'REVENUE_SETTLEMENT' || node.intent === 'RECURRING_SUBSCRIPTION') && (
            <div className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-[0.5rem] space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                <span className="text-[9px] font-mono text-cyan-200 uppercase tracking-widest">
                  {node.intent === 'RECURRING_SUBSCRIPTION' ? 'SUBSCRIPTION_ACTIVE' : 'TAX_SETTLEMENT_LIVE'}
                </span>
              </div>
              <p className="text-[8px] font-mono text-cyan-500/50 leading-tight">
                {node.intent === 'RECURRING_SUBSCRIPTION' 
                  ? "Membership billing enabled. 10% infrastructure fee applied to all recurring cycles."
                  : "One-time purchase enabled. 10% architect tax applied at checkout."}
              </p>
            </div>
          )}
        </div>
      </ActionCard>

      <div className="pt-4 border-t border-white/5">
        <ActionButton label="DELETE_NODE" variant="secondary" onClick={() => deleteNode(node.id)} />
      </div>
    </div>
  );
};
