import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA5MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- THE BILLION-DOLLAR DYNAMIC RENDERER ---
const SovereignCanvas = ({ features, theme }) => (
  <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: '40px', boxShadow: '0 60px 120px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
    <div style={{ height: '80px', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9' }}>
      <div style={{ fontWeight: '900', fontSize: '0.75rem', letterSpacing: '4px', color: '#0f172a' }}>SOVEREIGN_GENERATION_v9.2</div>
      <div style={{ width: '40px', height: '40px', borderRadius: '14px', background: theme }} />
    </div>
    <div style={{ flex: 1, padding: '40px', background: 'radial-gradient(at top left, #fff, #f8fafc)', overflowY: 'auto' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {features.map((f, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(25px)', padding: '40px', borderRadius: '24px', border: '1px solid #fff', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', color: '#0f172a', textTransform: 'capitalize' }}>{f.replace('_', ' ')}</h3>
            {f.includes('input') ? (
              <input placeholder="Type here..." style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }} />
            ) : f.includes('panel') ? (
              <div style={{ height: '150px', border: '2px dashed #e2e8f0', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>AI_INTERACTION_ZONE</div>
            ) : (
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>Sovereign logic manifested. Feature is now functional and synchronized with core.</p>
            )}
          </div>
        ))}
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
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', backgroundColor: '#020617', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto', fontSize: '0.8rem', lineHeight: '2', color: '#475569', fontFamily: '"JetBrains Mono", monospace' }}>
        {consoleLog.map((log, i) => (
          <div key={i} style={{ marginBottom: '15px', color: log.startsWith('>') ? '#38bdf8' : log.includes('//') ? '#4ade80' : '#475569' }}>
            {log.startsWith('>') ? <span style={{ marginRight: '10px' }}>❯</span> : null}{log}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '40px' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Manifest Intent..." autoFocus style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(56, 189, 248, 0.1)', padding: '20px', color: '#fff', borderRadius: '18px', outline: 'none' }} />
      </form>
    </div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [consoleLog, setConsoleLog] = useState(["// BLUE_LOTUS: ONLINE", "// NEURAL_MANIFEST: READY"]);
  const [appState, setAppState] = useState({ theme: '#0ea5e9', features: [], isLive: false });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { if (session) { setUser(session.user); setView('workspace'); } });
  }, []);

  const handleNewCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`]);
    const lower = cmd.toLowerCase();
    setTimeout(() => {
      setConsoleLog(prev => [...prev, "// ANALYZING_VIBE...", "// CONSTRUCTING_SOVEREIGN_ASSETS..."]);
      setAppState(prev => {
        let next = { ...prev, isLive: true };
        if (lower.includes('panel')) next.features.push('ai_intelligence_panel');
        if (lower.includes('input')) next.features.push('secure_input_box');
        if (lower.includes('builder')) next.features.push('app_architect');
        if (lower.includes('purple')) next.theme = '#8b5cf6';
        return next;
      });
      setTimeout(() => { setConsoleLog(prev => [...prev, "// SYNC_COMPLETE: MANIFESTED"]); }, 800);
    }, 400);
  };

  if (view === 'landing') return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '6rem', fontWeight: '900', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Blue Lotus</div>
        <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })} style={{ marginTop: '40px', padding: '20px 60px', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '20px', fontWeight: '900', cursor: 'pointer' }}>AUTHORIZE_MASTER</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <div style={{ height: '80px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', padding: '0 50px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><span style={{ color: '#38bdf8', fontSize: '1.8rem' }}>🪷</span><span style={{ fontWeight: '900', fontSize: '1rem', letterSpacing: '5px' }}>BLUE_LOTUS_CORE</span></div>
        <div style={{ fontSize: '0.8rem', color: '#475569' }}>MASTER: <span style={{ color: '#38bdf8' }}>{user?.email}</span></div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <CommandCenter onCommand={handleNewCommand} consoleLog={consoleLog} />
        <div style={{ flex: 1, backgroundColor: '#0f172a', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!appState.isLive ? (
            <div style={{ textAlign: 'center', opacity: 0.1 }}><div style={{ fontSize: '6rem', marginBottom: '20px' }}>💎</div><p style={{ letterSpacing: '8px', fontSize: '0.8rem', fontWeight: '900' }}>NEURAL_IDLE</p></div>
          ) : <SovereignCanvas features={appState.features} theme={appState.theme} />}
        </div>
      </div>
    </div>
  );
}

export default App;
