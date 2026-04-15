import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (Ensure your env variables are in Vercel)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [input, setInput] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [output, setOutput] = useState('');

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Check your email for the confirmation link!');
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    // RESTORED: This triggers the actual build engine logic
    setIsBuilding(true);
    setOutput(input); // Visual feedback
    
    try {
      // Replace this with your actual OpenAI/Vercel edge function call
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      // Logic to render the "stupid looking apps" or real code goes here
    } catch (err) {
      console.error("Build failed:", err);
    } finally {
      setIsBuilding(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-4">
        <div className="w-full max-w-md space-y-4 border border-blue-900/30 p-8 rounded-lg bg-[#0a0a0a]">
          <h2 className="text-2xl font-bold mb-6 text-center tracking-widest">LOTUS_ACCESS</h2>
          <input 
            type="email" placeholder="Email" 
            className="w-full p-3 bg-black border border-gray-800 rounded focus:border-blue-500 outline-none"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-3 bg-black border border-gray-800 rounded focus:border-blue-500 outline-none"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <div className="flex gap-4 pt-4">
            <button onClick={handleSignIn} className="flex-1 bg-white text-black py-2 rounded font-bold hover:bg-gray-200">SIGN IN</button>
            <button onClick={handleSignUp} className="flex-1 border border-white py-2 rounded font-bold hover:bg-white/10">REGISTER</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar: Neural Plan */}
      <div className="w-64 border-r border-gray-900 p-6 space-y-8">
        <h3 className="text-blue-500 font-mono text-sm tracking-tighter">NEURAL_PLAN</h3>
        <ul className="space-y-4 text-sm text-gray-400">
          <li className={isBuilding ? "text-blue-400 animate-pulse" : ""}>● Analyzing Intent</li>
          <li>● Mapping Sovereign Schema</li>
          <li>● Injecting TWIN Logic</li>
          <li>● Materializing Luxury UI</li>
        </ul>
        <button onClick={() => supabase.auth.signOut()} className="text-xs text-gray-600 hover:text-white mt-20">SIGN_OUT</button>
      </div>

      {/* Main Builder Stage */}
      <div className="flex-1 flex flex-col p-10">
        <div className="flex-1 flex items-center justify-center border border-gray-900 rounded-xl relative overflow-hidden">
          {isBuilding ? (
            <div className="text-center animate-pulse">BUILDING REALITY...</div>
          ) : (
            <h1 className="text-4xl font-black uppercase tracking-tighter text-center max-w-2xl">
              {output || "Awaiting Command"}
            </h1>
          )}
        </div>

        <form onSubmit={handleCommand} className="mt-8">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Command Reality..."
            className="w-full bg-[#0a0a0a] border border-gray-800 p-6 rounded-xl text-xl outline-none focus:border-blue-900 transition-colors"
          />
        </form>
      </div>
    </div>
  );
}
