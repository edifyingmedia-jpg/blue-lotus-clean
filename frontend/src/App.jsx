import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Store, 
  Github, 
  Rocket, 
  Settings, 
  CreditCard, 
  AlertTriangle 
} from 'lucide-react';

// NOTE: Since you're using your own UI components, make sure these paths 
// match where you store your Button/Card components or replace them with standard HTML tags.
import { Button } from './components/ui/button'; 
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

export default function Dashboard() {
  // Use your existing Supabase auth logic or pass user as a prop
  const [userContext, setUserContext] = useState({
    remainingCredits: 10,
    membership: 'free',
    isOwner: false,
  });

  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm TWIN, your master builder. Describe the app you'd like me to create beautifully today." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const isPayingMember = userContext.membership === 'builder' || userContext.membership === 'master';

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Logic for AI Handshake (Connect this to your OpenAI/Supabase backend)
      const res = await fetch('/api/twin/chat', { // Change to your actual endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      if (data.previewUrl) setPreviewUrl(data.previewUrl);

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I encountered an issue. Please check your connection or credits."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-mono">
      {/* Sidebar */}
      <div className="w-72 border-r border-zinc-800 bg-[#050505] flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="font-bold text-white">L</span>
            </div>
            <div>
              <h1 className="font-semibold text-xl tracking-tight">BLUE LOTUS</h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">App Builder Studio</p>
            </div>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-auto">
          <Button className="w-full justify-start gap-2 mb-8 bg-blue-600 hover:bg-blue-700">
            <Plus size={16} /> New App Architecture
          </Button>

          <nav className="space-y-1">
            {[
              { icon: MessageSquare, label: 'Studio Chat', active: true },
              { icon: Store, label: 'Asset Marketplace' },
              { icon: Rocket, label: 'Deployments' },
              { icon: Github, label: 'GitHub Sync' },
              { icon: Settings, label: 'System Config' },
            ].map((item) => (
              <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors">
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-800 mt-auto">
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-zinc-500">Credits Remaining</span>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">{userContext.remainingCredits}</span>
            </div>
            <p className="text-[10px] text-zinc-600 mb-3 uppercase">Plan: {userContext.membership}</p>
            {!isPayingMember && (
              <button className="w-full py-2 bg-white text-black text-xs font-bold rounded hover:bg-zinc-200 transition-colors">
                UPGRADE PLAN
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between bg-[#050505]">
          <div>
            <h2 className="font-semibold text-sm">ARCHITECT MODE</h2>
            <p className="text-xs text-zinc-500">System is ready for handshake.</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl rounded-2xl px-5 py-3 text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-900 border border-zinc-800 text-zinc-300'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-xs text-zinc-500 animate-pulse">
              Lotus is architecting...
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-zinc-800">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Describe the app architecture..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button 
              onClick={sendMessage} 
              disabled={isLoading || !input.trim()}
              className="bg-white text-black px-6 py-2 rounded-xl text-sm font-bold disabled:opacity-50"
            >
              EXECUTE
            </button>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-80 border-l border-zinc-800 bg-[#080808] hidden xl:flex flex-col p-4">
        <h3 className="text-xs font-bold text-zinc-500 mb-4 uppercase tracking-widest">Live Preview</h3>
        <div className="flex-1 border border-dashed border-zinc-800 rounded-2xl flex items-center justify-center text-center p-6">
          {previewUrl ? (
            <iframe src={previewUrl} className="w-full h-full rounded-lg" />
          ) : (
            <p className="text-[10px] text-zinc-700">PREVIEW_WAITING_FOR_HANDSHAKE</p>
          )}
        </div>
      </div>
    </div>
  );
}
