import React from 'react';
import { ActionCard, ActionButton } from '../rxgui/primitives';

export const PropertyPanel = ({ selectedNode, onUpdate }) => {
  if (!selectedNode) {
    return (
      <div className="p-8 text-center border-l border-white/5 h-full bg-[#09090B]">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          Select_a_Node_to_Actuate
        </p>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-white/5 bg-[#09090B] h-full p-6 space-y-6 overflow-y-auto">
      <header className="space-y-1">
        <h3 className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em]">Inspector</h3>
        <p className="text-white/40 text-[9px] font-mono">{selectedNode.id}</p>
      </header>

      <ActionCard title="Appearance">
        <div className="space-y-4">
          <label className="block">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Label_Content</span>
            <input 
              className="w-full bg-black/40 border border-white/10 p-2 mt-1 text-white text-xs rounded"
              value={selectedNode.props.label || ''}
              onChange={(e) => onUpdate(selectedNode.id, { label: e.target.value })}
            />
          </label>
        </div>
      </ActionCard>

      <ActionCard title="Logic & Revenue">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-mono text-slate-500">INTENT:</span>
            <span className="text-[9px] font-mono text-cyan-400">{selectedNode.intent || 'DISPLAY'}</span>
          </div>
          {selectedNode.intent === 'REVENUE_SETTLEMENT' && (
            <div className="p-2 bg-cyan-500/5 border border-cyan-500/20 rounded text-[8px] text-cyan-200 font-mono">
              10% ARCHITECT TAX ACTIVE
            </div>
          )}
        </div>
      </ActionCard>

      <ActionButton 
        label="DELETE_NODE" 
        variant="secondary" 
        onClick={() => onUpdate(selectedNode.id, null, true)} 
      />
    </div>
  );
};
