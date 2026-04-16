import React, { useState, useEffect, useRef } from "react";
import { useAppDefinition } from "../state/AppDefinitionContext";
import { createBuildAppBuilderProposal } from "./proposals/buildAppBuilderProposal";

export default function TWIN() {
  const { isPrimeActive, userBalance, consumeCredits } = useAppDefinition();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { 
      role: 'twin', 
      content: isPrimeActive 
        ? "TWIN_PRIME: Standing by for strategic execution, Architect. The markets are shifting—how shall we pivot?" 
        : "I am TWIN, your Governess. I am ready to help you manifest your Empire. What are we building today?" 
    }
  ]);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    // Logic: If user mentions "build" or "app", trigger the Success Architect Proposal
    if (input.toLowerCase().includes("build") || input.toLowerCase().includes("app")) {
      const proposal = createBuildAppBuilderProposal(input, isPrimeActive);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'twin', 
          content: isPrimeActive ? "PRIME_STRATEGY_GENERATED: Review the directives below." : "Proposal generated. My analysis shows a high probability of success.",
          proposal: proposal 
        }]);
      }, 600);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] border-l border-white/5 font-mono">
      {/* Header: Identity & Fuel Status */}
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/40">
        <span className={`text-[10px] tracking-[0.3em] ${isPrimeActive ? 'text-purple-400' : 'text-cyan-500'}`}>
          {isPrimeActive ? 'TWIN_PRIME_ACTIVE' : 'GOVERNESS_PROTOCOL'}
        </span>
        <span className="text-[10px] text-white/40 uppercase">Fuel: {userBalance} Credits</span>
      </div>

      {/* Message Feed */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg text-[11px] leading-relaxed ${
              msg.role === 'user' ? 'bg-white/5 text-white/70' : 'bg-cyan-950/20 text-cyan-50 border border-cyan-900/30'
            }`}>
              {msg.content}
            </div>
            
            {/* Proposal Rendering */}
            {msg.proposal && (
              <div className="mt-2 w-full p-3 bg-black border border-white/10 rounded-md space-y-2">
                <h4 className="text-[10px] text-cyan-400 font-bold uppercase">{msg.proposal.title}</h4>
                <p className="text-[9px] text-white/50 italic">{msg.proposal.description}</p>
                {isPrimeActive && msg.proposal.primeDirectives && (
                  <div className="mt-2 p-2 bg-purple-900/10 border border-purple-500/20 text-[9px] text-purple-300">
                    <strong>PRIME_DIRECTIVE:</strong> {msg.proposal.primeDirectives.businessConscience}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 bg-black/60 border-t border-white/5">
        <div className="relative">
          <input 
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-[11px] text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
            placeholder="Command TWIN..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
        </div>
      </div>
    </div>
  );
}
