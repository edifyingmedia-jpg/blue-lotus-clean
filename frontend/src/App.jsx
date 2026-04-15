import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Initialize with your Vercel variables
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// This uses the key currently in your Vercel settings
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleHandshake = async () => {
    setLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input }],
        model: "gpt-3.5-turbo",
      });
      setResponse(completion.choices[0].message.content);
    } catch (err) {
      console.error("Handshake Failed:", err);
      setResponse("Connection Error: Check Vercel Keys");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-mono">
      <nav className="flex justify-between border-b border-blue-900/30 pb-4 mb-20">
        <div className="tracking-[0.4em] text-blue-500">LOTUS_STUDIO // ACTIVE</div>
        <div className="text-[10px] opacity-40 uppercase">Neural_Link_Established</div>
      </nav>

      <div className="max-w-3xl mx-auto space-y-12">
        <section>
          <h1 className="text-6xl font-extralight tracking-tighter mb-2">BLUE_LOTUS</h1>
          <p className="text-blue-400/50 text-xs tracking-widest uppercase">AI-Integrated Diet Architecture</p>
        </section>

        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-sm">
          <textarea 
            className="w-full bg-transparent border-none outline-none text-lg text-gray-300 resize-none"
            placeholder="Initialize command..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
          />
          <button 
            onClick={handleHandshake}
            disabled={loading}
            className="mt-6 px-8 py-3 border border-blue-500 text-blue-500 text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all disabled:opacity-20"
          >
            {loading ? 'PROCESSING...' : 'EXECUTE_HANDSHAKE'}
          </button>
        </div>

        {response && (
          <div className="p-6 border-l-2 border-blue-500 bg-blue-500/5 animate-in fade-in duration-500">
            <p className="text-sm leading-relaxed text-gray-400">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
