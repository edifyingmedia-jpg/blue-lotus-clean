import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Store, 
  Github, 
  Rocket, 
  Settings, 
  CreditCard, 
  AlertTriangle,
  CheckCircle2,
  Circle,
  ChevronRight
} from 'lucide-react';

// Note: Ensure you have these icons installed via: npm install lucide-react

export default function App() {
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
  const [currentProject, setCurrentProject] = useState("New Project");

  // Live TODO list (The "surprise" feature)
  const [todoList, setTodoList] = useState([
    { id: '1', text: 'Analyze requirements and plan architecture', status: 'done' },
    { id: '2', text: 'Design stunning UI with Tailwind', status: 'in-progress' },
    { id: '3', text: 'Generate React + TypeScript codebase', status: 'pending' },
    { id: '4', text: 'Implement real functionality', status: 'pending' },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isPayingMember = userContext.membership === 'builder' || userContext.membership === 'master';

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Connecting to your local or deployed backend
      const res = await fetch('http://localhost:3001/api/twin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userContext,
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);

      if (data.previewUrl) setPreviewUrl(data.previewUrl);
      if (data.todoUpdate) setTodoList(data.todoUpdate);

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I encountered an issue. Please check your connection."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-16 bg-zinc-950 border-r border-zinc-800 flex flex-col items-center py-8 gap-10">
        <div className="w-10 h-10 bg-violet-600 rounded-2xl flex items-center justify-center text-2xl font-bold">T</div>
        <div className="flex flex-col gap-8 text-zinc-400">
          <MessageSquare className="w-6 h-6 cursor-pointer hover:text-white" />
          <Store className="w-6 h-6 cursor-pointer hover:text-white" />
          <Rocket className="w-6 h-6 cursor-pointer hover:text-white" />
          <Github className="w-6 h-6 cursor-pointer hover:text-white" />
          <Settings className="w-6 h-6 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="w-5/12 border-r border-zinc-800 flex flex-col">
        <div className="h-14 border-b border-zinc-800 bg-zinc-900 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-semibold text-lg text-violet-400 font-mono tracking-tighter uppercase">TWIN.dev</div>
          </div>
          <div className="text-xs text-emerald-400 font-mono">CREDITS: {userContext.remainingCredits}</div>
        </div>

        {/* Building Progress (Todo) */}
        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Building Progress</div>
          <div className="space-y-3">
            {todoList.map((todo) => (
              <div key={todo.id} className="flex items-center gap-3 text-xs">
                {todo.status === 'done' ? (
                  <CheckCircle2 size={16} className="text-emerald-500" />
                ) : todo.status === 'in-progress' ? (
                  <div className="w-3 h-3 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Circle size={16} className="text-zinc-700" />
                )}
                <span className={todo.status === 'done' ? 'text-zinc-600 line-through' : 'text-zinc-300'}>{todo.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-violet-600' : 'bg-zinc-900 border border-zinc-800'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-zinc-800">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Describe what you want me to build..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
            />
            <button onClick={sendMessage} className="bg-violet-600 px-6 py-2 rounded-xl text-sm font-bold">SEND</button>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex-1 bg-white flex flex-col">
        <div className="h-14 border-b border-zinc-200 bg-white px-8 flex items-center justify-between text-black">
          <h2 className="font-semibold text-sm uppercase">{currentProject}</h2>
          <div className="flex gap-3">
             <button className="text-[10px] font-bold border border-zinc-200 px-3 py-1 rounded">REFRESH</button>
             <button className="text-[10px] font-bold bg-black text-white px-3 py-1 rounded">DEPLOY</button>
          </div>
        </div>
        <div className="flex-1 bg-zinc-100 p-8 flex items-center justify-center">
          {previewUrl ? (
            <iframe src={previewUrl} className="w-full h-full rounded-xl border-none shadow-2xl" />
          ) : (
            <div className="text-center text-zinc-400">
              <div className="text-4xl mb-4">✨</div>
              <p className="text-sm font-medium">Your app preview will appear here</p>
              <p className="text-[10px] uppercase mt-2 tracking-widest">Awaiting builder handshake</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
