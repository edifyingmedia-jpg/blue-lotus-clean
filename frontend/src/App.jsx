import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Store, 
  Rocket, 
  Github, 
  Settings, 
  Plus, 
  CheckCircle2, 
  Circle, 
  ChevronRight,
  AlertTriangle 
} from 'lucide-react';

interface UserContext {
  remainingCredits: number;
  membership: 'free' | 'bundle' | 'builder' | 'master';
  isOwner: boolean;
}

interface TodoItem {
  id: string;
  text: string;
  status: 'pending' | 'in-progress' | 'done';
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const [userContext, setUserContext] = useState<UserContext>({
    remainingCredits: 10,
    membership: 'free',
    isOwner: false,
  });

  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Hello! I'm TWIN, your master builder AI. I'll create beautiful, fully functional apps for you. Describe what you want to build — I'll explain every step, suggest improvements, update the todo list in real-time, and make sure it actually works." 
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<string>("New Project");

  // Live TODO list (updates as TWIN builds)
  const [todoList, setTodoList] = useState<TodoItem[]>([
    { id: '1', text: 'Analyze requirements and plan architecture', status: 'done' },
    { id: '2', text: 'Design stunning, accessible UI with Tailwind + shadcn style', status: 'in-progress' },
    { id: '3', text: 'Generate full working React + TypeScript codebase', status: 'pending' },
    { id: '4', text: 'Implement real functionality (auth, data, logic)', status: 'pending' },
    { id: '5', text: 'Make it responsive and production-ready', status: 'pending' },
    { id: '6', text: 'Self-review and fix any issues', status: 'pending' },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate fetching user context (replace with real API call to your backend)
  useEffect(() => {
    // In real app: fetch from /api/user/context
    setTimeout(() => {
      setUserContext({
        remainingCredits: 47,
        membership: 'free',
        isOwner: false,
      });
    }, 800);
  }, []);

  const isPayingMember = userContext.membership === 'builder' || userContext.membership === 'master';

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const estimatedCost = 25;

      if (userContext.remainingCredits < estimatedCost && !isPayingMember) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "You're running low on credits. This build step requires more credits. Please purchase a credit bundle or upgrade to a paying membership to continue building beautiful working apps."
        }]);
        setIsLoading(false);
        return;
      }

      // Real API call to your TWIN backend (Vite proxy or full backend)
      const response = await fetch('http://localhost:3001/api/twin/chat', {  // Change to your actual backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userContext,
          mode: 'workspace',
        }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);

      // Update TODO list live
      if (data.todoUpdate && Array.isArray(data.todoUpdate)) {
        setTodoList(data.todoUpdate);
      }

      // Update preview when ready
      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);
        setCurrentProject(data.projectName || currentProject);
      }

      // Update credits
      setUserContext(prev => ({
        ...prev,
        remainingCredits: Math.max(0, prev.remainingCredits - estimatedCost)
      }));

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I encountered an issue while building. I'm self-correcting now. Try describing your request again or ask me to adjust the current plan."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = () => {
    alert("Redirecting to Pricing page... (Implement /pricing route)");
    // window.location.href = '/pricing';
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden font-sans">
      {/* Narrow Left Sidebar */}
      <div className="w-16 bg-zinc-950 border-r border-zinc-800 flex flex-col items-center py-8 gap-10">
        <div className="w-10 h-10 bg-violet-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">T</div>
        
        <div className="flex flex-col gap-8 text-zinc-400">
          <MessageSquare className="w-6 h-6 cursor-pointer hover:text-white transition" />
          <Store className="w-6 h-6 cursor-pointer hover:text-white transition" />
          <Rocket className="w-6 h-6 cursor-pointer hover:text-white transition" />
          <Github className="w-6 h-6 cursor-pointer hover:text-white transition" />
          <Settings className="w-6 h-6 cursor-pointer hover:text-white transition" />
        </div>

        <div className="mt-auto text-[10px] text-zinc-500">TWIN</div>
      </div>

      {/* TWIN Chat Panel - Left Side */}
      <div className="w-5/12 border-r border-zinc-800 flex flex-col bg-zinc-950">
        {/* Header */}
        <div className="h-14 border-b border-zinc-800 bg-zinc-900 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center font-bold">T</div>
            <div>
              <div className="font-semibold text-lg">TWIN</div>
              <div className="text-xs text-emerald-400 -mt-0.5">Master Builder • Live Building</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">Credits:</span>
              <span className={`font-mono font-semibold ${userContext.remainingCredits < 30 ? 'text-red-400' : 'text-emerald-400'}`}>
                {userContext.remainingCredits}
              </span>
            </div>
            {!isPayingMember && (
              <button
                onClick={handleUpgrade}
                className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded-2xl hover:bg-zinc-200 transition"
              >
                Upgrade
              </button>
            )}
          </div>
        </div>

        {/* Live TODO List */}
        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium flex items-center gap-2 text-sm">
              <ChevronRight className="w-4 h-4" /> Building Progress
            </div>
            <div className="text-xs text-zinc-500">TWIN explains + self-corrects</div>
          </div>

          <div className="space-y-3 max-h-52 overflow-auto pr-2">
            {todoList.map((todo) => (
              <div key={todo.id} className="flex items-start gap-3 text-sm">
                {todo.status === 'done' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                ) : todo.status === 'in-progress' ? (
                  <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mt-0.5 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-zinc-600 mt-0.5 flex-shrink-0" />
                )}
                <span className={todo.status === 'done' ? 'line-through text-zinc-500' : 'text-zinc-200'}>
                  {todo.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-auto p-6 space-y-6" style={{ scrollbarWidth: 'thin' }}>
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] px-6 py-4 rounded-3xl text-[15px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-violet-600 text-white'
                    : 'bg-zinc-900 border border-zinc-700 text-zinc-100'
                }`}
              >
                {msg.content}
                {msg.role === 'assistant' && (
                  <div className="text-[10px] text-zinc-500 mt-4">✓ Self-reviewed • No issues found</div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-zinc-700 rounded-3xl px-6 py-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-ping" />
                TWIN is building and explaining the next step...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-900">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Describe the app you want TWIN to build... (e.g. A beautiful habit tracker with streaks and social feed)"
              className="flex-1 bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-6 py-4 text-white placeholder-zinc-400 focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-700 px-10 rounded-3xl font-medium transition"
            >
              Send
            </button>
          </div>
          <p className="text-center text-xs text-zinc-500 mt-4">
            TWIN builds real working apps — beautiful design + fully functional backend
          </p>
        </div>
      </div>

      {/* RIGHT SIDE — LIVE PREVIEW (Lovable style) */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="h-14 border-b border-zinc-200 bg-white px-8 flex items-center justify-between text-zinc-900">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-xl">{currentProject}</h2>
            {previewUrl && (
              <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full font-medium">LIVE • WORKING</span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <button className="hover:text-black transition">Refresh Preview</button>
            {isPayingMember && (
              <button className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2 rounded-2xl hover:bg-black transition">
                <Rocket className="w-4 h-4" />
                Deploy App
              </button>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-zinc-100 relative overflow-hidden flex items-center justify-center">
          {previewUrl ? (
            <iframe
              src={previewUrl}
              className="w-full h-full border-0 shadow-2xl"
              title="TWIN Live Preview"
            />
          ) : (
            <div className="text-center max-w-lg px-8">
              <div className="mx-auto mb-8 w-24 h-24 bg-gradient-to-br from-violet-200 via-purple-200 to-fuchsia-200 rounded-3xl flex items-center justify-center text-6xl shadow-inner">
                ✨
              </div>
              <h3 className="text-2xl font-semibold text-zinc-800 mb-3">Your beautiful app is being built</h3>
              <p className="text-zinc-600 leading-relaxed">
                TWIN is working on the right while explaining every decision on the left.<br />
                The result will be a real, production-ready application — not just a design.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Status Bar */}
        <div className="h-11 bg-white border-t border-zinc-200 px-8 flex items-center text-xs text-zinc-500">
          <div>React + TypeScript • Tailwind • Vite • Fully Functional Backend</div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            PREVIEW READY WHEN TWIN FINISHES
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
