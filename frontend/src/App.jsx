import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA5MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- THE CINEMATIC PREVIEW ENGINE ---
const ManifestedApp = ({ features, theme }) => {
  return (
    <div style={{ 
      width: '100%', height: '100%', background: '#000', borderRadius: '32px', 
      boxShadow: '0 40px 100px rgba(0,0,0,0.4)', display: 'flex', 
      flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' 
    }}>
      {/* High-End Navigation */}
      <div style={{ height: '70px', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(20px)' }}>
        <div style={{ color: theme, fontWeight: '900', letterSpacing: '2px', fontSize: '0.7rem' }}>PREMIUM_MEDIA_OS</div>
        <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </div>

      <div style={{ flex: 1, padding: '40px', overflowY: 'auto', background: '#050505' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* VIDEO PLAYER COMPONENT */}
          {(features.includes('video') || features.includes('youtube')) && (
            <div style={{ width: '100%', aspectRatio: '16/9', background: '#111', borderRadius: '20px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: theme, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 0 30px ${theme}44` }}>
                    <div style={{ width: 0, height: 0, borderTop: '15px solid transparent', borderBottom: '15px solid transparent', borderLeft: '25px solid white', marginLeft: '8px' }} />
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                    <div style={{ width: '40%', height: '100%', background: theme, borderRadius: '10px' }} />
                </div>
            </div>
          )}

          {/* DYNAMIC CONTENT GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '25px' }}>
                <h4 style={{ color: '#fff', margin: '0 0 10px 0', fontSize: '1rem', textTransform: 'capitalize' }}>{f.replace('_', ' ')}</h4>
                <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: '1.6' }}>Functional enterprise node successfully deployed. Latency 12ms. Status: Synchronized.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CommandCenter = ({ onCommand, consoleLog }) => {
  const [input, setInput] = useState("");
  const logEndRef = useRef(null);
  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [consoleLog]);
  const handleSubmit = (e) => { e.preventDefault(); if (!input.trim()) return; onCommand(input); setInput(""); };
  return (
    <div style={{ width: '420px', display: 'flex', flexDirection: 'column', backgroundColor: '#020617', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto', fontSize: '0.8rem', lineHeight: '2', color: '#475569', fontFamily: '"JetBrains Mono", monospace' }}>
        {consoleLog.map((log, i) => (
          <div key={i} style={{ marginBottom: '15px', color: log.startsWith('>') ? '#38bdf8' : log.includes('//') ? '#4ade80' : '#475569' }}>
            {log.startsWith('>') ? <span style={{ color: '#38bdf8', marginRight: '10px' }}>❯</span> : null}
            {log}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '40px' }}>
        <input 
          value={input} onChange={(e) => setInput(e.target.value)} 
          placeholder="Manifest Intent..." autoFocus 
          style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(56, 189, 248, 0.1)', padding: '20px', color: '#fff', borderRadius: '16px', outline: 'none' }} 
        />
      </form>
    </div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [consoleLog, setConsoleLog] = useState(["// BLUE_LOTUS: ONLINE", "// NEURAL_MANIFEST: READY"]);
  const [appState, setAppState] = useState({ theme: '#38bdf8', features: [], isLive: false });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { if (session) { setUser(session.user); setView('workspace'); } });
  }, []);

  const handleNewCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`]);
    const lower = cmd.toLowerCase();
    setTimeout(() => {
      setConsoleLog(prev => [...prev, "// ANALYZING_VIBE...", "// CONSTRUCTING_REAL_TIME_MODULES..."]);
      setAppState(prev => {
        let next = { ...prev, isLive: true };
        if (lower.includes('youtube') || lower.includes('video') || lower.includes('player')) {
          if (!next.features.includes('video')) next.features.push('video');
        }
        if (lower.includes('chat')) next.features.push('chat_module');
        if (lower.includes('profile')) next.features.push('user_identity');
        return next;
      });
      setTimeout(() => { setConsoleLog(prev => [...prev, "// SYNC_COMPLETE: MANIFESTED_ON_STAGE"]); }, 800);
    }, 400);
  };

  if (view === 'landing') return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '5rem', fontWeight: '900', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Blue Lotus</div>
        <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })} style={{ marginTop: '30px', padding: '16px 48px', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '16px', fontWeight: '900', cursor: 'pointer' }}>AUTHORIZE_MASTER</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <div style={{ height: '80px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 50px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: '#38bdf8', fontSize: '1.6rem' }}>🪷</span><span style={{ fontWeight: '900', fontSize: '1rem', letterSpacing: '4px' }}>BLUE_LOTUS_CORE</span></div>
        <div style={{ fontSize: '0.75rem', color: '#475569' }}>MASTER: <span style={{ color: '#38bdf8' }}>{user?.email}</span></div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <CommandCenter onCommand={handleNewCommand} consoleLog={consoleLog} />
        <div style={{ flex: 1, backgroundColor: '#000', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!appState.isLive ? (
            <div style={{ textAlign: 'center', opacity: 0.1 }}>
              <div style={{ fontSize: '5rem', marginBottom: '20px' }}>💎</div>
              <p style={{ letterSpacing: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>WAITING_FOR_SOVEREIGN_VIBE</p>
            </div>
          ) : <ManifestedApp features={appState.features} theme={appState.state?.theme || '#38bdf8'} />}
        </div>
      </div>
    </div>
  );
}

export default App;
