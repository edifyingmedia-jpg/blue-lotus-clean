import React from 'react';
import { ActionCard, ActionButton } from '../rxgui/primitives';
import { useAppDefinition } from '../state';

/**
 * Property Panel (The Hand)
 * ------------------------
 * Tactical interface for real-time node actuation.
 * Synchronized with the Empire's recursive state manager.
 */
export const PropertyPanel = ({ selectedNodeId }) => {
  const { manifest, updateNode, deleteNode } = useAppDefinition();
  
  // RECURSIVE_SEARCH: Locate the specific node within the potentially deep manifest tree
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

  // EMPTY_STATE: When no node is selected in the workspace
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

      {/* 1. Appearance Configuration */}
      <ActionCard title="Appearance" icon="Layout">
        <div className="space-y-4 py-2">
          <label className="block space-y-2">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">Content_Label</span>
            <input 
              className="w-full bg-black border border-white/10 p-3 text-white text-xs font-mono rounded-[0.5rem] focus:border-cyan-500/50 outline-none transition-all"
              value={node.props.label || ''}
              placeholder="Enter_label..."
              onChange={(e) => updateNode(node.id, { label: e.target.value })}
            />
          </label>
        </div>
      </ActionCard>

      {/* 2. Logic & Revenue Intelligence */}
      <ActionCard title="Logic_Intelligence" icon="Zap">
        <div className="space-y-4 py-2">
          <div className="flex justify-between items-center bg-white/5 p-3 rounded-[0.5rem] border border-white/5">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Current_Intent</span>
            <span className="text-[9px] font-mono text-cyan-400">{node.intent || 'DISPLAY'}</span>
          </div>
          
          {/* Revenue Contextual Feedback */}
          {node.intent === 'REVENUE_SETTLEMENT' && (
            <div className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-[0.5rem] space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                <span className="text-[9px] font-mono text-cyan-200 uppercase tracking-widest">10%_Architect_Tax_Live</span>
              </div>
              <p className="text-[8px] font-mono text-cyan-500/50 leading-tight">
                This component is programmatically bound to the settlement layer. 
                Any transactions processed via this node incur a 10% infrastructure fee.
              </p>
            </div>
          )}
        </div>
      </ActionCard>

      {/* 3. Destructive Actuation */}
      <div className="pt-4 border-t border-white/5">
        <ActionButton 
          label="DELETE_NODE" 
          variant="secondary" 
          onClick={() => deleteNode(node.id)} 
        />
        <p className="mt-2 text-[7px] font-mono text-slate-700 text-center uppercase tracking-widest">
          Action_is_Reversible_via_Undo
        </p>
      </div>
    </div>
  );
};
