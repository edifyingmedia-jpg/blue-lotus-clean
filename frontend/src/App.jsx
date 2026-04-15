import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA5MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- THE ELITE PREVIEW ENGINE (MEMORIZED STATE) ---
const AppManifestation = ({ config }) => {
  const { themeColor, hasFace, appType } = config;
  
  return (
    <div style={{ 
      width: '100%', height: '100%', background: '#fff', borderRadius: '32px', 
      boxShadow: '0 40px 100px -20px rgba(0,0,0,0.2)', display: 'flex', 
      flexDirection: 'column', overflow: 'hidden', border: '1px solid #e2e8f0' 
    }}>
      {/* Sleek Header */}
      <div style={{ height: '80px', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '4px', color: '#0f172a' }}>
          {appType.toUpperCase()}_v8.4
        </div>
        {hasFace && (
          <div style={{ 
            width: '40px', height: '40px', borderRadius: '12px', 
            background: themeColor, display: 'flex', alignItems: 'center', 
            justifyContent: 'center', color: '#fff', fontSize: '1.2rem',
            boxShadow: `0 10px 20px ${themeColor}44`
          }}>👤</div>
        )}
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '60px', background: '#fcfcfd', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-block', padding: '12px 24px', borderRadius: '100px', 
            background: `${themeColor}11`, color: themeColor, fontSize: '0.65rem', 
            fontWeight: 'bold', letterSpacing: '2px', marginBottom: '30px' 
          }}>SYSTEM_FUNCTIONAL</div>
          
          <h1 style={{ color: '#0f172a', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px', marginBottom: '15px' }}>
            Executive Dashboard
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.8', fontWeight: '400' }}>
            Your enterprise-grade architecture has been manifested. All neural nodes are synchronized with the {themeColor} core.
          </p>
          
          <div style={{ marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button style={{ 
              padding: '16px 32px', background: themeColor, color: '#fff', 
              border: 'none', borderRadius: '14px', fontWeight: '600', 
              boxShadow: `0 20px 40px ${themeColor}33`, cursor: 'pointer' 
            }}>Launch Platform</button>
            <button style={{ 
              padding: '16px 32px', background: '#fff', color: '#0f172a', 
              border: '1px solid #e2e8f0', borderRadius: '14px', fontWeight: '600', cursor: 'pointer' 
            }}>View Analytics</button>
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onCommand(input);
    setInput("");
  };

  return (
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', backgroundColor: '#020617', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto', fontSize: '0.8rem', lineHeight: '1.8', color: '#64748b', fontFamily: '"JetBrains Mono", monospace' }}>
        {consoleLog.map((log, i) => (
          <div key={i} style={{ marginBottom: '15px', color: log.startsWith('>') ? '#38bdf8' : log.includes('//') ? '#4ade80' : '#64748b' }}>
            {log.startsWith('>') ? <span style={{ color: '#38bdf8', marginRight: '10px' }}>⚡</span> : null}
            {log}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '40px', background: '#020617' }}>
        <input 
          value={input} onChange={(e) => setInput(e.target.value)} 
          placeholder="Command the Vibe..." autoFocus 
          style={{ 
            width: '100%', backgroundColor: 'rgba(255,255,255,0.02)', 
            border: '1px solid rgba(56, 189, 248, 0.1)', padding: '20px', 
            color: '#fff', borderRadius: '16px', outline: 'none', fontSize: '0.9rem' 
          }} 
        />
      </form>
    </div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [consoleLog, setConsoleLog] = useState(["// BLUE_LOTUS: ONLINE", "// MEMORY_ENGINE: ENABLED"]);
  
  // RECURSIVE MEMORY STATE
  const [appConfig, setAppConfig] = useState({
    themeColor: '#0ea5e9',
    hasFace: false,
    appType: 'Sovereign',
    isManifested: false
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { 
      if (session) { setUser(session.user); setView('workspace'); } 
    });
  }, []);

  const handleNewCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`]);
    const lower = cmd.toLowerCase();
    
    setTimeout(() => {
      setConsoleLog(prev => [...prev, "// ANALYZING_VIBE: " + cmd.toUpperCase(), "// UPDATING_PERSISTENT_STATE..."]);
      
      // Memory Logic: Update existing config instead of resetting
      setAppConfig(prev => {
        let newConfig = { ...prev, isManifested: true };
        if (lower.includes('purple')) newConfig.themeColor = '#8b5cf6';
        if (lower.includes('blue')) newConfig.themeColor = '#0ea5e9';
        if (lower.includes('face')) newConfig.hasFace = true;
        if (lower.includes('builder')) newConfig.appType = 'Builder';
        return newConfig;
      });

      setTimeout(() => {
        setConsoleLog(prev => [...prev, "// STATE_SYNCHRONIZED: RENDERED_IN_STAGE"]);
      }, 800);
    }, 400);
  };

  if (view === 'landing') return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: '5rem', fontWeight: '900', letterSpacing: '-3px', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Blue Lotus</div>
        <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })} style={{ marginTop: '30px', padding: '16px 48px', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '16px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 20px 40px rgba(56, 189, 248, 0.2)' }}>AUTHORIZE_MASTER</button>
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
        <div style={{ flex: 1, backgroundColor: '#0f172a', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!appConfig.isManifested ? (
            <div style={{ textAlign: 'center', opacity: 0.15 }}>
              <div style={{ fontSize: '5rem', marginBottom: '20px' }}>✨</div>
              <p style={{ letterSpacing: '6px', fontSize: '0.8rem', fontWeight: 'bold' }}>AWAITING_MASTER_VIBE</p>
            </div>
          ) : <AppManifestation config={appConfig} />}
        </div>
      </div>
    </div>
  );
}

export default App;
