import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Initialize Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// INITIALIZE OPENAI SAFELY
// We use a fallback to an empty string so the app doesn't crash on load
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || "", 
  dangerouslyAllowBrowser: true 
});

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('SYSTEM_READY');

  const handleHandshake = async () => {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      setResponse("ERROR: Key 'VITE_OPENAI_API_KEY' not found in Environment Variables.");
      return;
    }

    setStatus('PROCESSING...');
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input }],
        model: "gpt-3.5-turbo",
      });
      setResponse(completion.choices[0].message.content);
      setStatus('SUCCESS');
    } catch (err) {
      console.error(err);
      setResponse("Handshake failed. Check console for details.");
      setStatus('ERROR');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-mono">
      <nav className="flex justify-between border-b border-blue-900/30 pb-4 mb-20">
        <div className="tracking-[0.4em] text-blue-500">LOTUS_STUDIO // {status}</div>
      </nav>

      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="text-6xl font-extralight tracking-tighter">BLUE_LOTUS</h1>
        
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
            className="mt-6 px-8 py-3 border border-blue-500 text-blue-500 text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all"
          >
            EXECUTE_HANDSHAKE
          </button>
        </div>

        {response && (
          <div className="p-6 border-l-2 border-blue-500 bg-blue-500/5">
            <p className="text-sm leading-relaxed text-gray-400">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
