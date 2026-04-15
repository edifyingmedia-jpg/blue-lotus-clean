import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA5MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- THE ELITE PREVIEW STAGE ---
const SovereignStage = ({ config }) => (
  <div style={{ 
    width: '100%', height: '100%', background: '#fff', borderRadius: '48px', 
    boxShadow: '0 80px 150px -30px rgba(0,0,0,0.3)', display: 'flex', 
    flexDirection: 'column', overflow: 'hidden', border: '1px solid #f1f5f9' 
  }}>
    <div style={{ height: '100px', padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc' }}>
      <div style={{ fontWeight: '900', fontSize: '0.7rem', letterSpacing: '6px', color: '#0f172a' }}>{config.appName || 'UNNAMED_REALITY'}</div>
      <div style={{ width: '45px', height: '45px', borderRadius: '16px', background: config.theme, boxShadow: `0 10px 25px ${config.theme}33` }} />
    </div>
    <div style={{ flex: 1, padding: '80px', background: 'radial-gradient(at center, #fff, #f8fafc)', overflowY: 'auto' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-2px', marginBottom: '20px' }}>
            {config.appName || "Future Manifest"}
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto' }}>
            Your enterprise-grade architecture is now synchronized and live.
        </p>
        <div style={{ marginTop: '50px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <div style={{ padding: '20px 40px', background: config.theme, color: '#fff', borderRadius: '100px', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '1px', cursor: 'pointer' }}>INITIATE_CORE</div>
            <div style={{ padding: '20px 40px', border: '1px solid #e2e8f0', color: '#0f172a', borderRadius: '100px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer' }}>ANALYTICS</div>
        </div>
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
    <div style={{ width: '480px', display: 'flex', flexDirection: 'column', background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(40px)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ flex: 1, padding: '60px', overflowY: 'auto', fontSize: '0.85rem', lineHeight: '2.2', color: '#475569', fontFamily: '"JetBrains Mono", monospace' }}>
        {consoleLog.map((log, i) => (
          <div key={i} style={{ marginBottom: '20px', color: log.startsWith('>') ? '#38bdf8' : '#475569', opacity: log.startsWith('>') ? 1 : 0.6 }}>
            {log.startsWith('>') ? <span style={{ marginRight: '15px' }}>❯</span> : null}{log}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '50px' }}>
        <input 
          value={input} onChange={(e) => setInput(e.target.value)} 
          placeholder="Manifest Intent..." autoFocus 
          style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(56, 189, 248, 0.1)', padding: '24px', color: '#fff', borderRadius: '24px', outline: 'none', fontSize: '1rem', letterSpacing: '1px' }} 
        />
      </form>
    </div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [consoleLog, setConsoleLog] = useState(["// BLUE_LOTUS: ONLINE", "// SOVEREIGN_BUILDER: READY"]);
  const [state, setState] = useState({ isLive: false, appName: '', theme: '#38bdf8' });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { if (session) { setUser(session.user); setView('workspace'); } });
  }, []);

  const handleNewCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`]);
    const lower = cmd.toLowerCase();
    setTimeout(() => {
      setConsoleLog(prev => [...prev, "// ANALYZING_VIBE...", "// MANIFESTING_ELITE_STUDIO..."]);
      setState(prev => ({
        ...prev, 
        isLive: true,
        appName: lower.includes('youtube') ? 'YouTube Prime' : lower.includes('builder') ? 'Blue Lotus Pro' : prev.appName,
        theme: lower.includes('purple') ? '#8b5cf6' : '#38bdf8'
      }));
    }, 400);
  };

  if (view === 'landing') return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: '8rem', fontWeight: '900', letterSpacing: '-6px', background: 'linear-gradient(to bottom right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Blue Lotus</div>
        <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })} style={{ marginTop: '40px', padding: '24px 80px', background: '#fff', color: '#000', border: 'none', borderRadius: '100px', fontWeight: '900', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 30px 60px rgba(56, 189, 248, 0.3)' }}>AUTHORIZE_MASTER</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      {/* ELITE HEADER */}
      <div style={{ height: '100px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', padding: '0 60px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><span style={{ color: '#38bdf8', fontSize: '2.4rem' }}>🪷</span><span style={{ fontWeight: '900', fontSize: '1.2rem', letterSpacing: '8px' }}>BLUE_LOTUS_CORE</span></div>
        <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 'bold', letterSpacing: '2px' }}>SESSION: <span style={{ color: '#38bdf8' }}>MASTER_ROOT</span></div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <CommandCenter onCommand={handleNewCommand} consoleLog={consoleLog} />
        <div style={{ flex: 1, backgroundColor: '#050a18', padding: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!state.isLive ? (
            <div style={{ textAlign: 'center', opacity: 0.1 }}>
              <div style={{ fontSize: '8rem', marginBottom: '30px' }}>⚡</div>
              <p style={{ letterSpacing: '12px', fontSize: '1rem', fontWeight: '900' }}>NEURAL_IDLE</p>
            </div>
          ) : <SovereignStage config={state} />}
        </div>
      </div>
    </div>
  );
}

export default App;
