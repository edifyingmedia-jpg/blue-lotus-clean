import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Store, 
  Rocket, 
  Github, 
  Settings, 
  CheckCircle2, 
  Circle, 
  ChevronRight 
} from 'lucide-react';

function TwinPanel() {
  const [userContext] = useState({
    remainingCredits: 47,
    membership: 'free',
    isOwner: false, // flip to true later if you want owner logic
  });

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm TWIN — your self-aware, self-correcting master builder. I know the platform rules, credit system, and constraints. I will build the most beautiful, production-ready, fully functional apps possible while being honest and aligned with your vision. What would you like me to create today?",
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentProject, setCurrentProject] = useState('New Project');
  const [todoList, setTodoList] = useState([
    { id: '1', text: 'Planning architecture & requirements', status: 'done' },
    { id: '2', text: 'Designing stunning, accessible UI', status: 'in-progress' },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/twin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Adjust this payload to match your backend if needed
        body: JSON.stringify({
          messages: nextMessages,
          userContext,
          mode: 'workspace',
        }),
      });

      if (!res.ok) {
        throw new Error('Backend error');
      }

      const data = await res.json();

      // Core reply
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content:
              "I received a response from the backend, but it didn't include a 'reply' field. Please check the API shape.",
          },
        ]);
      }

      // Optional: live TODO updates
      if (data.todoUpdate) {
        setTodoList(data.todoUpdate);
      }

      // Optional: live preview URL + project name
      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);
      }
      if (data.projectName) {
        setCurrentProject(data.projectName);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I encountered an issue while building. I'm self-correcting right now — please try again or describe any adjustments.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden font-sans">
      {/* Narrow sidebar */}
      <div className="w-16 bg-zinc-950 border-r border-zinc-800 flex flex-col items-center py-8 gap-10">
        <div className="w-10 h-10 bg-violet-600 rounded-2xl flex items-center justify-center text-2xl font-bold">
          T
        </div>
        <div className="flex flex-col gap-8 text-zinc-400">
          <MessageSquare className="w-6 h-6 cursor-pointer hover:text-white" />
          <Store className="w-6 h-6 cursor-pointer hover:text-white" />
          <Rocket className="w-6 h-6 cursor-pointer hover:text-white" />
          <Github className="w-6 h-6 cursor-pointer hover:text-white" />
          <Settings className="w-6 h-6 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* LEFT — TWIN Chat + Brain */}
      <div className="w-5/12 border-r border-zinc-800 flex flex-col bg-zinc-950">
        <div className="h-14 border-b border-zinc-800 bg-zinc-900 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center font-bold text-white">
              T
            </div>
            <div>
              <div className="font-semibold text-lg tracking-tight">TWIN</div>
              <div className="text-xs text-emerald-400">
                Self-aware • Self-correcting • Master Builder
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`font-mono text-sm ${
                userContext.remainingCredits < 30 ? 'text-red-400' : 'text-emerald-400'
              }`}
            >
              {userContext.remainingCredits} credits
            </span>
          </div>
        </div>

        {/* Live TODO List */}
        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900">
          <div className="flex items-center justify-between mb-3 text-sm">
            <div className="font-medium flex items-center gap-2">
              <ChevronRight className="w-4 h-4" /> Building Progress
            </div>
          </div>
          <div className="space-y-3 max-h-52 overflow-auto pr-2">
            {todoList.map(todo => (
              <div key={todo.id} className="flex items-start gap-3 text-sm">
                {todo.status === 'done' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                ) : todo.status === 'in-progress' ? (
                  <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent animate-spin rounded-full mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-zinc-500 mt-0.5" />
                )}
                <span
                  className={
                    todo.status === 'done'
                      ? 'line-through text-zinc-500'
                      : 'text-zinc-200'
                  }
                >
                  {todo.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] px-6 py-4 rounded-3xl ${
                  msg.role === 'user'
                    ? 'bg-violet-600 text-white'
                    : 'bg-zinc-900 border border-zinc-700'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-zinc-700 rounded-3xl px-6 py-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-violet-400 animate-ping rounded-full"></div>
                TWIN is thinking, self-correcting, and building your perfect app...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-900">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the app you want TWIN to build beautifully..."
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-3xl px-6 py-4 focus:outline-none focus:border-violet-500 text-white resize-none h-16"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 px-10 rounded-3xl font-medium transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT — LIVE PREVIEW */}
      <div className="flex-1 flex flex-col bg-white text-zinc-900">
        <div className="h-14 border-b border-zinc-200 px-8 flex items-center justify-between">
          <h2 className="font-semibold text-xl">{currentProject}</h2>
          {previewUrl && (
            <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full font-medium">
              LIVE • FULLY WORKING
            </span>
          )}
        </div>

        <div className="flex-1 bg-zinc-100 flex items-center justify-center overflow-hidden relative">
          {previewUrl ? (
            <iframe
              src={previewUrl}
              className="w-full h-full border-0 shadow-2xl bg-white"
              title="TWIN Live Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div className="text-center max-w-md px-8">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-violet-200 to-purple-200 rounded-3xl flex items-center justify-center text-5xl mb-8 shadow-inner">
                ✨
              </div>
              <h3 className="text-2xl font-semibold text-zinc-800">
                TWIN is ready to build your app live
              </h3>
              <p className="text-zinc-600 mt-3">
                Real AI brain • Real code • Real functionality
                <br />
                Describe what you want and watch it come to life.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TwinPanel;
