import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA5MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- THE VIBE-CODING ENGINE ---
const VibeBuilder = () => (
  <div style={{ width: '100%', height: '100%', background: '#000', border: '1px solid #38bdf8', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 0 40px rgba(56, 189, 248, 0.1)' }}>
    <div style={{ padding: '15px 25px', borderBottom: '1px solid #1e293b', background: '#050505', display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: '#38bdf8', fontSize: '0.8rem', letterSpacing: '2px' }}>VIBE_GENERATOR_v1.0</span>
      <div style={{ display: 'flex', gap: '8px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} /><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} /><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} /></div>
    </div>
    <div style={{ flex: 1, display: 'flex' }}>
      <div style={{ width: '200px', borderRight: '1px solid #1e293b', padding: '20px', fontSize: '0.7rem' }}>
        <p style={{ color: '#475569' }}>STRUCTURE</p>
        <ul style={{ listStyle: 'none', padding: 0, color: '#38bdf8' }}>
          <li style={{ marginBottom: '10px' }}>📦 Layout</li><li style={{ marginBottom: '10px' }}>🔐 Auth_Node</li><li style={{ marginBottom: '10px' }}>🗄️ Database</li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', border: '2px solid #38bdf8', borderRadius: '50%', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 2s infinite' }}>🪷</div>
        <h2 style={{ color: '#fff', margin: '0 0 10px 0' }}>Sovereign App Manifested</h2>
        <p style={{ color: '#475569', fontSize: '0.8rem' }}>The AI has constructed the backend and frontend logic.<br/>Ready for Master deployment.</p>
        <button style={{ marginTop: '30px', padding: '12px 30px', background: '#38bdf8', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>LAUNCH_REALITY</button>
      </div>
    </div>
  </div>
);

const CommandCenter = ({ onCommand, consoleLog }) => {
  const [input, setInput] = useState("");
  const logEndRef = useRef(null);
  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [consoleLog]);
  const handleSubmit = (e) => { e.preventDefault(); if (!input.trim()) return; onCommand(input); setInput(""); };
  return (
    <div style={{ width: '400px', borderRight: '1px solid rgba(56, 189, 248, 0.1)', display: 'flex', flexDirection: 'column', backgroundColor: '#000' }}>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', fontSize: '0.85rem', lineHeight: '1.6', color: '#38bdf8' }}>
        {consoleLog.map((log, i) => (<div key={i} style={{ marginBottom: '8px', borderLeft: log.startsWith('>') ? '2px solid #38bdf8' : 'none', paddingLeft: log.startsWith('>') ? '10px' : '0' }}>{log}</div>))}
        <div ref={logEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '20px', borderTop: '1px solid rgba(56, 189, 248, 0.1)' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Describe the vibe of your app..." autoFocus style={{ width: '100%', backgroundColor: '#0a0a0a', border: '1px solid #1e293b', padding: '12px', color: '#fff', outline: 'none', fontFamily: 'monospace' }} />
      </form>
    </div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [isVibeActive, setIsVibeActive] = useState(false);
  const [consoleLog, setConsoleLog] = useState(["// TWIN_CORE: ONLINE", "// VIBE_MODE: LISTENING"]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { if (session) { setUser(session.user); setView('workspace'); } });
  }, []);

  const handleNewCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`]);
    const lower = cmd.toLowerCase();
    setTimeout(() => {
      // Fuzzy matching for 'vibe coding' style
      if (lower.includes('builder') || lower.includes('create') || lower.includes('app')) {
        setConsoleLog(prev => [...prev, "// TWIN: Detecting intent...", "// TWIN: Initiating Vibe-Coding sequence...", "// TWIN: Constructing Sovereign Architecture..."]);
        setIsVibeActive(true);
      } else {
        setConsoleLog(prev => [...prev, "// TWIN: Analyzing request... Vibe logged."]);
      }
    }, 600);
  };

  const handleLogin = async () => { await supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: window.location.origin } }); };

  if (view === 'landing') return (
    <div style={{ backgroundColor: '#010204', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
      <h1 style={{ fontSize: '5rem', fontWeight: '900' }}><span style={{ color: '#38bdf8' }}>Blue</span> Lotus</h1>
      <button onClick={handleLogin} style={{ padding: '15px 40px', background: '#38bdf8', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>AUTHORIZE_MASTER</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#010204', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'monospace', overflow: 'hidden' }}>
      <div style={{ height: '60px', borderBottom: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', padding: '0 25px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: '#38bdf8' }}>🪷</span><span style={{ fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '3px' }}>BLUE_LOTUS_CORE</span></div>
        <div style={{ fontSize: '0.7rem', color: '#38bdf8' }}>MASTER: {user?.email}</div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <CommandCenter onCommand={handleNewCommand} consoleLog={consoleLog} />
        <div style={{ flex: 1, backgroundColor: '#020408', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!isVibeActive ? <p style={{ color: '#1e293b' }}>// DESCRIBE YOUR VISION TO COMMENCE</p> : <VibeBuilder />}
        </div>
      </div>
    </div>
  );
}

export default App;
