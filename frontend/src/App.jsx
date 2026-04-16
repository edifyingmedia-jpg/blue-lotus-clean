import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Rocket, 
  Github, 
  Settings, 
  Zap,
  RefreshCw,
  Send,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  const [userContext, setUserContext] = useState({
    remainingCredits: 47,
    membership: 'free',
    isOwner: false,
  });

  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Systems Online. I am TWIN, your master builder. Describe the application you want to build—I will execute the handshake and generate the codebase immediately." 
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentProject, setCurrentProject] = useState("New Architecture");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Connects to your backend builder logic
      const response = await fetch('http://localhost:3001/api/twin/chat', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userContext,
        }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);

      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);
        setCurrentProject(data.projectName || currentProject);
      }

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant', 
        content: "Handshake interrupted. System is self-correcting. Please re-issue command."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white font-mono overflow-hidden">
      
      {/* PANEL 1: TWIN BUILDER (LEFT) */}
      <div className="w-1/2 border-r border-zinc-800 flex flex-col bg-zinc-950">
        <div className="h-14 border-b border-zinc-800 bg-zinc-900 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)]">T</div>
            <span className="font-bold text-sm tracking-widest text-violet-400 uppercase">TWIN_STUDIO</span>
          </div>
          <div className="text-xs text-emerald-500 font-bold uppercase tracking-tighter">
            Credits: {userContext.remainingCredits}
          </div>
        </div>

        {/* Chat Console */}
        <div className="flex-1 overflow-auto p-6 space-y-6 bg-[#050505]">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-3 rounded-xl text-[14px] leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-violet-600/10 border border-violet-500/50 text-violet-100' 
                  : 'bg-zinc-900/50 border border-zinc-800 text-zinc-300'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-[10px] text-violet-500 animate-pulse uppercase tracking-[0.3em]">
              Executing_Build_Handshake...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Console */}
        <div className="p-6 border-t border-zinc-800 bg-[#080808]">
          <div className="flex gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-2 px-4 items-center focus-within:border-violet-500 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Describe architecture..."
              className="flex-1 bg-transparent border-none outline-none text-white py-2 text-sm"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-white text-black p-2 px-4 rounded-lg font-bold text-[10px] uppercase hover:bg-violet-500 hover:text-white transition-all disabled:opacity-50"
            >
              Execute
            </button>
          </div>
        </div>
      </div>

      {/* PANEL 2: LIVE PREVIEW (RIGHT) */}
      <div className="flex-1 flex flex-col bg-white text-black">
        <div className="h-14 border-b border-zinc-200 bg-white px-8 flex items-center justify-between">
          <h2 className="font-black text-sm tracking-tighter uppercase">{currentProject}</h2>
          <div className="flex gap-4">
            <button className="text-[10px] font-bold border border-black px-3 py-1 rounded hover:bg-zinc-100 transition">REFRESH</button>
            <button className="text-[10px] font-bold bg-black text-white px-3 py-1 rounded hover:shadow-lg transition">DEPLOY_LIVE</button>
          </div>
        </div>

        <div className="flex-1 p-8 bg-zinc-50 flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-2xl border border-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden relative">
            {previewUrl ? (
              <iframe src={previewUrl} className="w-full h-full border-0" title="TWIN Preview" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400">
                <Zap size={32} className="mb-4 opacity-20" />
                <p className="font-black uppercase tracking-[0.3em] text-[10px]">Awaiting_Execution</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
