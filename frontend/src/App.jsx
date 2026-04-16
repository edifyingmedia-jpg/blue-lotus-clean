import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, Plus, Store, Github, Rocket, Settings, 
  CheckCircle2, Circle, ChevronRight, Layout, Zap, Search,
  Terminal,Layers, Cpu
} from "lucide-react";

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Systems live. I am TWIN. Give me an architecture to execute." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const [todoList, setTodoList] = useState([
    { id: '1', text: 'Initialize Handshake Protocol', status: 'done' },
    { id: '2', text: 'Architecting React + Vite Core', status: 'in-progress' },
    { id: '3', text: 'Injecting Supabase Logic', status: 'pending' },
    { id: '4', text: 'Finalizing Edge Deployment', status: 'pending' },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: "Handshake received. Modifying codebase in real-time." }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-mono overflow-hidden">
      {/* 1. ULTRA-NARROW NAV */}
      <div className="w-14 bg-[#080808] border-r border-white/5 flex flex-col items-center py-6 gap-8">
        <div className="w-8 h-8 bg-violet-600 rounded flex items-center justify-center font-black shadow-[0_0_20px_rgba(124,58,237,0.5)]">T</div>
        <div className="flex flex-col gap-6 text-zinc-600">
          <MessageSquare size={18} className="hover:text-violet-400 cursor-pointer transition-colors" />
          <Layers size={18} className="hover:text-violet-400 cursor-pointer transition-colors" />
          <Cpu size={18} className="hover:text-violet-400 cursor-pointer transition-colors" />
          <Github size={18} className="hover:text-violet-400 cursor-pointer transition-colors" />
        </div>
        <div className="mt-auto pb-4">
          <Settings size={18} className="text-zinc-700 hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* 2. THE BUILD ENGINE (MIDDLE) */}
      <div className="w-[450px] flex flex-col border-r border-white/5 bg-[#050505]">
        <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-[#080808]/50">
          <span className="text-[9px] tracking-[.4em] font-bold text-violet-500 uppercase">Twin_Architect_v1</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] text-zinc-500 uppercase">System_Nominal</span>
          </div>
        </div>

        {/* BUILD LOG SECTION */}
        <div className="p-5 border-b border-white/5 bg-[#0a0a0a]">
          <h3 className="text-[10px] text-zinc-500 font-bold uppercase mb-4 tracking-widest flex items-center gap-2">
            <Terminal size={12} className="text-violet-500" /> Build_Sequence
          </h3>
          <div className="space-y-3">
            {todoList.map(todo => (
              <div key={todo.id} className="flex items-center gap-3 text-[11px]">
                {todo.status === 'done' ? (
                   <CheckCircle2 size={14} className="text-violet-500" />
                ) : todo.status === 'in-progress' ? (
                   <div className="w-3 h-3 border border-violet-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                   <Circle size={14} className="text-zinc-800" />
                )}
                <span className={todo.status === 'done' ? 'text-zinc-600 line-through' : 'text-zinc-400'}>{todo.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MESSAGES AREA */}
        <div className="flex-1 overflow-auto p-5 space-y-4 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] px-4 py-3 rounded-lg text-[13px] leading-relaxed ${msg.role === 'user' ? 'bg-violet-600/10 border border-violet-500/50 text-violet-100' : 'bg-zinc-900/40 border border-white/5 text-zinc-300'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-[10px] text-violet-500 animate-pulse uppercase tracking-widest">Architecting_Next_Step...</div>}
        </div>

        {/* COMMAND INPUT */}
        <div className="p-4 border-t border-white/5 bg-[#080808]">
          <div className="flex gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Execute build command..."
              className="flex-1 bg-zinc-900/50 border border-white/10 rounded-md px-4 py-2 text-[12px] focus:border-violet-500 outline-none transition-all placeholder:text-zinc-700"
            />
            <button onClick={sendMessage} className="bg-white text-black px-4 py-2 rounded-md text-[10px] font-black uppercase hover:bg-violet-500 hover:text-white transition-all shadow-lg">Run</button>
          </div>
        </div>
      </div>

      {/* 3. THE PREVIEW (RIGHT) */}
      <div className="flex-1 bg-[#FDFDFD] flex flex-col relative">
        <div className="h-12 border-b border-zinc-200 bg-white px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
             </div>
             <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-4">Live_Production_Sandbox</span>
          </div>
          <button className="text-[10px] font-bold bg-zinc-900 text-white px-4 py-1.5 rounded-full hover:bg-black transition-all">Deploy_To_Vercel</button>
        </div>
        
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="w-full h-full border border-zinc-100 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center justify-center relative overflow-hidden">
            {previewUrl ? (
              <iframe src={previewUrl} className="w-full h-full" />
            ) : (
              <div className="text-center">
                 <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center mx-auto mb-4 border border-zinc-100">
                    <Zap size={20} className="text-zinc-300" />
                 </div>
                 <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-[.2em]">Awaiting_Handshake</p>
                 <p className="text-[10px] text-zinc-300 mt-1 uppercase tracking-tighter">Preview will render upon execution</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
