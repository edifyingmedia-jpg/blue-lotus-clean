import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- NEURAL BRIDGE CONFIGURATION ---
const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA5MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- SEPARATE COMPONENT TO PREVENT FOCUS LOSS ---
const CommandCenter = ({ onCommand, consoleLog }) => {
  const [input, setInput] = useState("");
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onCommand(input);
    setInput("");
  };

  return (
    <div style={{ width: '400px', borderRight: '1px solid rgba(56, 189, 248, 0.1)', display: 'flex', flexDirection: 'column', backgroundColor: '#000' }}>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', fontSize: '0.85rem', lineHeight: '1.6', color: '#38bdf8' }}>
        {consoleLog.map((log, i) => (
          <div key={i} style={{ marginBottom: '8px', borderLeft: log.startsWith('>') ? '2px solid #38bdf8' : 'none', paddingLeft: log.startsWith('>') ? '10px' : '0' }}>
            {log}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} style={{ padding: '20px', borderTop: '1px solid rgba(56, 189, 248, 0.1)' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span style={{ position: 'absolute', left: '10px', color: '#38bdf8' }}>&gt;</span>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command..."
            autoFocus
            style={{ width: '100%', backgroundColor: '#0a0a0a', border: '1px solid #1e293b', padding: '12px 12px 12px 30px', color: '#fff', outline: 'none', fontFamily: 'monospace' }}
          />
        </div>
      </form>
    </div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [consoleLog, setConsoleLog] = useState(["// TWIN_CORE: ONLINE", "// AUTH_LEVEL: MASTER_OWNER", "// WAITING_FOR_COMMAND..."]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { setUser(session.user); setView('workspace'); }
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session) setView('workspace');
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleNewCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`]);
    setTimeout(() => {
      setConsoleLog(prev => [...prev, "// TWIN: Processing neural request..."]);
    }, 600);
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin }
    });
  };

  if (view === 'landing') {
    return (
      <div style={{ backgroundColor: '#010204', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
        <h1 style={{ fontSize: '5rem', fontWeight: '900', letterSpacing: '-2px' }}><span style={{ color: '#38bdf8' }}>Blue</span> Lotus</h1>
        <p style={{ color: '#475569', marginBottom: '40px', fontSize: '0.8rem', letterSpacing: '4px' }}>CORE_V5.1 // RESTRICTED_ACCESS</p>
        <button onClick={handleLogin} style={{ padding: '15px 40px', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '2px', fontWeight: '900', cursor: 'pointer', letterSpacing: '1px' }}>
          AUTHORIZE_MASTER
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#010204', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'monospace', overflow: 'hidden' }}>
      <div style={{ height: '60px', borderBottom: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', padding: '0 25px', justifyContent: 'space-between', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '1.2rem', color: '#38bdf8' }}>🪷</span>
          <span style={{ fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '3px', color: '#f8fafc' }}>BLUE_LOTUS_CORE</span>
        </div>
        <div style={{ fontSize: '0.7rem', color: '#38bdf8', opacity: 0.8 }}>
          MASTER: <span style={{ color: '#fff' }}>{user?.email}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <CommandCenter onCommand={handleNewCommand} consoleLog={consoleLog} />
        <div style={{ flex: 1, backgroundColor: '#020408', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.6rem', color: '#1e293b' }}>PREVIEW_MODE_ACTIVE</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px', opacity: 0.2 }}>🪷</div>
            <p style={{ color: '#1e293b', letterSpacing: '1px', fontSize: '0.8rem' }}>// WAITING_FOR_SOVEREIGN_DATA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
