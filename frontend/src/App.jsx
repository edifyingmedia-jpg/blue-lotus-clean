import React, { useState, useEffect } from 'react';
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
    supabase.auth.getSession().then(({ data: { session } }) => { 
      if (session) { setUser(session.user); setView('workspace'); } 
    });
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin }
    });
    if (error) console.error("Auth error:", error.message);
  };

  const colors = {
    bg: isDarkMode ? '#020617' : '#f8fafc',
    text: isDarkMode ? '#fff' : '#0f172a',
    glass: isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
    subtle: isDarkMode ? '#64748b' : '#94a3b8'
  };

  const Logo = () => (
    <div style={{ position: 'relative', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', width: '120%', height: '120%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: '50%', filter: 'blur(18px)', opacity: 0.4 }} />
      <span style={{ fontSize: '2.4rem', zIndex: 2, filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.6))' }}>🪷</span>
    </div>
  );

  if (view === 'landing') return (
    <div style={{ backgroundColor: colors.bg, color: colors.text, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        <Logo />
        <h1 style={{ fontSize: '6rem', fontWeight: '900', letterSpacing: '-5px', background: `linear-gradient(to bottom, ${colors.text}, ${colors.subtle})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginTop: '20px' }}>Blue Lotus</h1>
        <button onClick={handleLogin} style={{ marginTop: '50px', padding: '20px 60px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '100px', fontWeight: '900', cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)' }}>AUTHORIZE_CORE</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text, height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <div style={{ height: '90px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between', background: colors.glass, backdropFilter: 'blur(40px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><Logo /><span style={{ fontWeight: '900', fontSize: '1rem', letterSpacing: '8px' }}>BLUE_LOTUS</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {['⟲ UNDO', '☁ GITHUB', '↻ REFRESH', '🚀 DEPLOY'].map(txt => (
            <button key={txt} style={{ background: colors.glass, color: colors.text, border: `1px solid ${colors.border}`, padding: '8px 16px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: '900', cursor: 'pointer' }}>{txt}</button>
          ))}
          <button style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: '900', cursor: 'pointer' }}>✦ PUBLISH</button>
          <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', marginLeft: '10px' }}>{isDarkMode ? '☀️' : '🌙'}</button>
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: '450px', borderRight: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column', background: colors.glass }}>
          <div style={{ flex: 1, padding: '40px', overflowY: 'auto', fontSize: '0.8rem', color: colors.subtle, fontFamily: 'monospace' }}>
            {consoleLog.map((log, i) => <div key={i} style={{ marginBottom: '10px' }}>{log}</div>)}
          </div>
          <form style={{ padding: '40px' }} onSubmit={(e) => { e.preventDefault(); setConsoleLog([...consoleLog, `> ${e.target.cmd.value}`]); setState({...state, isLive: true, appName: e.target.cmd.value}); e.target.cmd.value = ''; }}>
            <input name="cmd" placeholder="Command Reality..." style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: `1px solid ${colors.border}`, padding: '20px', color: colors.text, borderRadius: '16px', outline: 'none' }} />
          </form>
        </div>
        <div style={{ flex: 1, padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDarkMode ? '#010309' : '#f8fafc' }}>
          {!state.isLive ? <div style={{ opacity: 0.1, fontSize: '10rem' }}>💎</div> : 
          <div style={{ width: '100%', height: '100%', background: colors.bg, borderRadius: '40px', border: `1px solid ${colors.border}`, boxShadow: '0 80px 150px rgba(0,0,0,0.5)', overflow: 'hidden', textAlign: 'center', paddingTop: '100px' }}>
            <h1 style={{ fontSize: '5rem', fontWeight: '900' }}>{state.appName}</h1>
            <p style={{ color: colors.subtle }}>Manifestation successful.</p>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
