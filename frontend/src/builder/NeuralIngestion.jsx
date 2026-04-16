// frontend/src/builder/NeuralIngestion.jsx

import React, { useState } from 'react';
import { useAppDefinition } from '../state';
import { ActionButton, ActionCard } from '../rxgui/primitives';
import { ingestHtml } from './utils/htmlParser'; // Synchronizing with your new utility

export const NeuralIngestion = () => {
    const [targetUrl, setTargetUrl] = useState('');
    const [isIngesting, setIsIngesting] = useState(false);
    const { updateManifest } = useAppDefinition();

    const handleIngest = async () => {
        if (!targetUrl) return;
        setIsIngesting(true);
        
        // Industrial Logging: Monitoring the Suction Phase
        console.log(`INGESTION_ACTUATED: Targeting ${targetUrl}`);
        
        try {
            // THE BRIDGE: Using a proxy to bypass CORS restrictions
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            if (data.contents) {
                // THE ACTUATION: Parsing the HTML into a Blue Lotus Manifest
                const clonedManifest = ingestHtml(data.contents);
                
                // THE INJECTION: Pushing the cloned nodes into global state
                updateManifest(clonedManifest);
                
                console.log("INGESTION_SUCCESS: Neural Nodes Manifested.");
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
                <input 
                    type="url" 
                    placeholder="PASTE_TARGET_URL_HERE..."
                    className="w-full bg-[#09090B] border border-white/5 p-4 font-mono text-[10px] text-cyan-500 uppercase tracking-[0.3em] focus:outline-none focus:border-cyan-500/30 rounded-[1rem] transition-all"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                />
                <ActionButton 
                    label={isIngesting ? "ANALYZING_DOM..." : "ACTUATE_CLONE"} 
                    onClick={handleIngest}
                    variant="primary"
                    disabled={!targetUrl || isIngesting}
                />
                <div className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter">
                    Status: {isIngesting ? "Suction_Active" : "Bridge_Idle"}
                </div>
            </div>
        </ActionCard>
    );
};
