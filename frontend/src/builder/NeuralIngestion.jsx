import React, { useState } from 'react';
import { useAppDefinition } from '../state';
import { ActionButton, ActionCard } from '../rxgui/primitives';
import { ingestHtml } from './utils/htmlParser';
import { analyzeIntent } from './utils/intentAnalyzer';

/**
 * Neural Ingestion Node (Empire Edition)
 * -------------------------------------
 * The primary engine for site-cloning and semantic mapping.
 * Integrates: CORS Proxy, HTML Parser, Intent Analysis, and Temporal Undo.
 */
export const NeuralIngestion = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [isIngesting, setIsIngesting] = useState(false);
  
  // Pulling from our hardened AppDefinitionContext
  const { updateManifest, undoActuation, canUndo } = useAppDefinition();

  const handleIngest = async () => {
    if (!targetUrl) return;
    setIsIngesting(true);
    
    console.log(`INGESTION_ACTUATED: Suction active on ${targetUrl}`);
    
    try {
      // 1. THE BRIDGE: Using a public proxy to bypass CORS restrictions
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (data && data.contents) {
        // 2. THE ACTUATION: Parse raw HTML into base nodes
        const rawNodes = ingestHtml(data.contents);
        
        // 3. THE BRAIN: Analyze intent (Revenue, Leads, Layout)
        const intelligentManifest = analyzeIntent(rawNodes);
        
        // 4. THE INJECTION: Commit to global state
        updateManifest(intelligentManifest);
        
        console.log("ACTUATION_SUCCESS: Neural nodes manifested with intelligent intent.");
      }
    } catch (err) {
      console.error("INGESTION_CRITICAL_FAILURE:", err);
    } finally {
      setIsIngesting(false);
    }
  };

  return (
    <ActionCard title="Neural Ingestion Deck" icon="Zap">
      <div className="space-y-4">
        {/* Industrial Command Input */}
        <input 
          type="url" 
          placeholder="ENTER_TARGET_DOMAIN_FOR_CLONING..."
          className="w-full bg-[#09090B] border border-white/10 p-4 font-mono text-[10px] text-cyan-500 uppercase tracking-[0.3em] focus:outline-none focus:border-cyan-500/40 rounded-[1rem] transition-all"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleIngest()}
        />
        
        <div className="flex gap-3">
          <ActionButton 
            label={isIngesting ? "ANALYZING_DOM..." : "ACTUATE_CLONE"} 
            onClick={handleIngest}
            variant="primary"
            disabled={isIngesting || !targetUrl}
          />
          
          {/* The Lovable Safety Net: Reverting a bad clone */}
          {canUndo && (
            <ActionButton 
              label="REVERT" 
              onClick={undoActuation} 
              variant="secondary" 
            />
          )}
        </div>

        {/* The Ghosting Animation (Visual Feedback) */}
        {isIngesting && (
          <div className="mt-4 p-4 border border-cyan-500/20 bg-cyan-500/5 rounded-[1rem] animate-pulse">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Scanning_Neural_Nodes</span>
              <span className="text-[8px] font-mono text-cyan-400">STATUS: ACTIVE</span>
            </div>
            <div className="h-[2px] w-full bg-white/5 overflow-hidden">
              <div className="h-full bg-cyan-500 w-1/2 animate-[ingest-progress_1.5s_infinite_linear]"></div>
            </div>
            <p className="mt-2 text-[8px] font-mono text-slate-500 uppercase leading-tight">
              Mapping CSS tokens to Ink & Cyan... <br />
              Injecting 10% Architect Tax intent...
            </p>
          </div>
        )}
      </div>
    </ActionCard>
  );
};
