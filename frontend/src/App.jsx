import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA9MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [consoleLog, setConsoleLog] = useState(["// BLUE_LOTUS: ONLINE", "// NEURAL_MANIFEST: READY"]);
  const [state, setState] = useState({ isLive: false, appName: '', theme: '#6366f1' });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { if (session) { setUser(session.user); setView('workspace'); } });
  }, []);

  const handleNewCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`]);
    setTimeout(() => {
      setConsoleLog(prev => [...prev, "// SYNCING_MANIFEST...", "// DEPLOYING_HIGH_FIDELITY_LOGIC..."]);
      setState(prev => ({ ...prev, isLive: true, appName: cmd.includes('builder') ? 'Manifest Studio Pro' : 'Sovereign Node' }));
    }, 400);
  };

  const colors = {
    bg: isDarkMode ? '#020617' : '#f8fafc',
    text: isDarkMode ? '#fff' : '#0f172a',
    glass: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)',
    subtle: isDarkMode ? '#475569' : '#94a3b8'
  };

  const Logo = () => (
    <div style={{ position: 'relative', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: '50%', filter: 'blur(12px)', opacity: 0.5 }} />
        <span style={{ fontSize: '2.2rem', zIndex: 2, filter: 'drop-shadow(0 0 15px rgba(99, 102, 241, 0.8))' }}>🪷</span>
    </div>
  );

  const ControlButton = ({ label, icon, primary }) => (
    <button style={{ 
      background: primary ? '#6366f1' : colors.glass, 
      color: primary ? '#fff' : colors.text,
      border: `1px solid ${colors.border}`,
      padding: '8px 16px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: primary ? '0 10px 20px rgba(99, 102, 241, 0.2)' : 'none'
    }}>
      <span>{icon}</span> {label}
    </button>
  );

  if (view === 'landing') return (
    <div style={{ backgroundColor: colors.bg, color: colors.text, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        <Logo />
        <h1 style={{ fontSize: '7rem', fontWeight: '900', letterSpacing: '-6px', background: `linear-gradient(to bottom, ${colors.text}, ${colors.subtle})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginTop: '20px' }}>Blue Lotus</h1>
        <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })} style={{ marginTop: '40px', padding: '22px 60px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '100px', fontWeight: '900', cursor: 'pointer', fontSize: '1.1rem' }}>AUTHORIZE_CORE</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text, height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      {/* BILLION-DOLLAR WORKSPACE HEADER */}
      <div style={{ height: '90px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between', background: colors.glass, backdropFilter: 'blur(30px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Logo />
            <span style={{ fontWeight: '900', fontSize: '1rem', letterSpacing: '8px' }}>BLUE_LOTUS</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ControlButton icon="⟲" label="UNDO" />
          <ControlButton icon="☁" label="GITHUB" />
          <ControlButton icon="↻" label="REFRESH" />
          <ControlButton icon="🚀" label="DEPLOY" />
          <ControlButton icon="✦" label="PUBLISH" primary />
          <div style={{ width: '1px', height: '30px', background: colors.border, margin: '0 10px' }} />
          <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>{isDarkMode ? '☀️' : '🌙'}</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* NEURAL CONSOLE */}
        <div style={{ width: '450px', background: colors.glass, borderRight: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '40px', overflowY: 'auto', fontSize: '0.8rem', lineHeight: '2.5', color: colors.subtle, fontFamily: '"JetBrains Mono", monospace' }}>
            {consoleLog.map((log, i) => (
              <div key={i} style={{ marginBottom: '15px', color: log.startsWith('>') ? (isDarkMode ? '#fff' : '#000') : colors.subtle }}>
                {log.startsWith('>') ? <span style={{ color: '#6366f1', marginRight: '15px' }}>❯</span> : null}{log}
              </div>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleNewCommand(e.target.cmd.value); e.target.cmd.value = ''; }} style={{ padding: '40px' }}>
            <input name="cmd" placeholder="Manifest Intent..." autoFocus style={{ width: '100%', background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', border: `1px solid ${colors.border}`, padding: '20px', color: colors.text, borderRadius: '16px', outline: 'none' }} />
          </form>
        </div>

        {/* PRODUCTION STAGE */}
        <div style={{ flex: 1, padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDarkMode ? '#010309' : '#f1f5f9' }}>
          {!state.isLive ? (
            <div style={{ textAlign: 'center', opacity: 0.1 }}><div style={{ fontSize: '12rem' }}>💎</div><p style={{ letterSpacing: '20px', fontWeight: '900' }}>NEURAL_IDLE</p></div>
          ) : (
            <div style={{ width: '100%', height: '100%', background: colors.bg, borderRadius: '40px', border: `1px solid ${colors.border}`, boxShadow: '0 100px 200px -50px rgba(0,0,0,0.5)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '80px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '900', fontSize: '0.7rem', letterSpacing: '4px' }}>{state.appName.toUpperCase()}</span>
                <div style={{ width: '35px', height: '35px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #a855f7)' }} />
              </div>
              <div style={{ flex: 1, padding: '80px', textAlign: 'center', background: isDarkMode ? 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)' : '#fff' }}>
                <h1 style={{ fontSize: '4.5rem', fontWeight: '900', letterSpacing: '-3px' }}>{state.appName}</h1>
                <p style={{ color: colors.subtle, fontSize: '1.2rem' }}>Production infrastructure successfully manifested.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
