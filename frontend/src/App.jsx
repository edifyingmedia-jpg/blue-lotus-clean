import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Plus, 
  Store, 
  Rocket, 
  Github, 
  Settings, 
  CheckCircle, 
  Circle, 
  Loader2, 
  ChevronRight 
} from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm TWIN — your self-aware master builder. I know the platform rules, credit system, and every constraint. I'll build stunning, fully functional apps while explaining every decision, updating progress live, and self-correcting when needed. What beautiful app shall we create today?"
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentProject, setCurrentProject] = useState("Untitled Project");
  const [todoList, setTodoList] = useState([
    { id: '1', text: 'Analyze requirements and plan architecture', status: 'done' },
    { id: '2', text: 'Craft modern, accessible, pixel-perfect UI', status: 'in-progress' },
    { id: '3', text: 'Generate production-ready React + TypeScript code', status: 'pending' },
    { id: '4', text: 'Implement real backend logic & data flow', status: 'pending' },
    { id: '5', text: 'Self-review, test, and polish', status: 'pending' },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/twin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          userContext: { remainingCredits: 47, membership: 'free', isOwner: false },
          mode: 'workspace'
        }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || "I've built the next piece beautifully." }]);

      if (data.todoUpdate) setTodoList(data.todoUpdate);
      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);
        setCurrentProject(data.projectName || currentProject);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I ran into an issue while building. I'm self-correcting now — please give me another try or refine the request."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden select-none">
      {/* Ultra-minimal left sidebar */}
      <div className="w-14 bg-zinc-950 border-r border-zinc-800 flex flex-col items-center py-6 gap-8">
        <div className="w-9 h-9 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
          T
        </div>
        <div className="flex flex-col gap-7 text-zinc-400">
          <Send className="w-5 h-5 cursor-pointer hover:text-violet-400 transition" />
          <Store className="w-5 h-5 cursor-pointer hover:text-violet-400 transition" />
          <Rocket className="w-5 h-5 cursor-pointer hover:text-violet-400 transition" />
          <Github className="w-5 h-5 cursor-pointer hover:text-violet-400 transition" />
          <Settings className="w-5 h-5 cursor-pointer hover:text-violet-400 transition" />
        </div>
        <div className="mt-auto text-[10px] text-zinc-500 tracking-widest">TWIN</div>
      </div>

      {/* Main TWIN Workspace - Left Chat + Progress */}
      <div className="w-5/12 border-r border-zinc-800 flex flex-col bg-zinc-950">
        {/* Top bar */}
        <div className="h-14 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="text-xl font-semibold tracking-tight">TWIN</div>
            <div className="text-xs px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">Master Builder</div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Online
            </div>
            <span className="text-zinc-400">47 credits remaining</span>
          </div>
        </div>

        {/* Live Progress / TODO */}
        <div className="border-b border-zinc-800 bg-zinc-900 px-6 py-4">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-zinc-300">
            <ChevronRight className="w-4 h-4" />
            Building Progress • Real-time
          </div>
          <div className="space-y-3 max-h-56 overflow-y-auto pr-2 custom-scroll">
            {todoList.map((item) => (
              <div key={item.id} className="flex gap-3 items-start text-sm">
                {item.status === 'done' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                ) : item.status === 'in-progress' ? (
                  <Loader2 className="w-5 h-5 text-violet-400 animate-spin mt-0.5 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-zinc-600 mt-0.5 flex-shrink-0" />
                )}
                <span className={`${item.status === 'done' ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scroll">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[82%] px-6 py-4 rounded-3xl text-[15.2px] leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-violet-600 text-white'
                    : 'bg-zinc-900 border border-zinc-700/80 text-zinc-100'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-zinc-700 rounded-3xl px-6 py-4 flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
                TWIN is thinking, designing, and self-correcting...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar - Premium feel */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-900">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Describe the app you want TWIN to build... Be as detailed or as visionary as you like"
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-7 py-5 text-base placeholder-zinc-400 focus:outline-none transition"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 p-3 rounded-2xl transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-[10px] text-zinc-500 mt-4 tracking-wide">
            TWIN builds real, production-ready apps • Explains every choice • Self-corrects automatically
          </p>
        </div>
      </div>

      {/* Right Side — Large Live Preview (the star of the show) */}
      <div className="flex-1 flex flex-col bg-zinc-50 text-zinc-900">
        <div className="h-14 border-b bg-white px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-xl tracking-tight">{currentProject}</h1>
            {previewUrl && (
              <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                LIVE • FULLY FUNCTIONAL
              </div>
            )}
          </div>

          <div className="flex items-center gap-5 text-sm">
            <button className="hover:text-black transition">Refresh</button>
            <button className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-2 rounded-2xl hover:bg-black transition">
              <Rocket className="w-4 h-4" />
              Deploy Now
            </button>
          </div>
        </div>

        {/* Preview Canvas */}
        <div className="flex-1 relative bg-zinc-100 flex items-center justify-center overflow-hidden">
          {previewUrl ? (
            <iframe
              src={previewUrl}
              className="w-full h-full border-0 shadow-2xl bg-white"
              title="TWIN Live Preview"
            />
          ) : (
            <div className="text-center max-w-lg px-10">
              <div className="mx-auto mb-10 w-28 h-28 bg-gradient-to-br from-violet-100 via-fuchsia-100 to-pink-100 rounded-3xl flex items-center justify-center text-7xl shadow-inner">
                ✨
              </div>
              <h2 className="text-3xl font-semibold text-zinc-800 mb-4">Your masterpiece is being crafted</h2>
              <p className="text-zinc-600 text-lg leading-relaxed">
                TWIN is working on the left while building a real, beautiful, and fully functional application here.<br />
                Every step is explained. Every detail is intentional.
              </p>
            </div>
          )}
        </div>

        {/* Subtle footer bar */}
        <div className="h-9 bg-white border-t flex items-center px-8 text-xs text-zinc-400">
          Powered by OpenAI • React 19 • Tailwind • Real backend logic • Self-aware &amp; self-correcting
        </div>
      </div>
    </div>
  );
}

export default App;
