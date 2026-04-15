import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA5MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- THE ENTERPRISE PREVIEW ENGINE ---
const ManifestedApp = ({ features, theme }) => {
  return (
    <div style={{ 
      width: '100%', height: '100%', background: '#fff', borderRadius: '40px', 
      boxShadow: '0 60px 120px -20px rgba(0,0,0,0.12)', display: 'flex', 
      flexDirection: 'column', overflow: 'hidden', border: '1px solid #f1f5f9' 
    }}>
      <div style={{ height: '90px', padding: '0 50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ fontWeight: '900', fontSize: '0.8rem', letterSpacing: '5px', color: '#0f172a' }}>ENTERPRISE_OS_v9.0</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          {features.includes('profile') && <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: theme, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>JD</div>}
        </div>
      </div>

      <div style={{ flex: 1, padding: '60px', background: 'radial-gradient(circle at top left, #fff 0%, #f8fafc 100%)', overflowY: 'auto' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {features.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '100px', opacity: 0.2 }}>// INITIALIZING_REALITY...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {features.map((f, i) => (
                <div key={i} style={{ 
                  background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', 
                  padding: '40px', borderRadius: '24px', border: '1px solid #f1f5f9',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ color: theme, fontWeight: '900', fontSize: '0.6rem', letterSpacing: '2px', marginBottom: '15px' }}>MODULE_STABLE</div>
                  <h3 style={{ margin: '0 0 10px 0', color: '#0f172a', textTransform: 'capitalize' }}>{f.replace('_', ' ')}</h3>
                  <div style={{ height: '4px', width: '40px', background: theme, borderRadius: '10px', marginBottom: '20px' }} />
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>Functional enterprise node successfully deployed and synced with global state.</p>
                </div>
              ))}
            </div>
          )}
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
    <div style={{ width: '480px', display: 'flex', flexDirection: 'column', backgroundColor: '#020617', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ flex: 1, padding: '50px', overflowY: 'auto', fontSize: '0.8rem', lineHeight: '2', color: '#475569', fontFamily: '"JetBrains Mono", monospace' }}>
        {consoleLog.map((log, i) => (
          <div key={i} style={{ marginBottom: '20px', color: log.startsWith('>') ? '#38bdf8' : log.includes('//') ? '#4ade80' : '#475569' }}>
            {log.startsWith('>') ? <span style={{ color: '#38bdf8', marginRight: '15px' }}>❯</span> : null}
            {log}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '50px', background: '#020617' }}>
        <input 
          value={input} onChange={(e) => setInput(e.target.value)} 
          placeholder="Manifest Intent..." autoFocus 
          style={{ 
            width: '100%', backgroundColor: 'rgba(255,255,255,0.01)', 
            border: '1px solid rgba(56, 189, 248, 0.1)', padding: '24px', 
            color: '#fff', borderRadius: '20px', outline: 'none', fontSize: '0.95rem' 
          }} 
        />
      </form>
    </div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [consoleLog, setConsoleLog] = useState(["// BLUE_LOTUS: ONLINE", "// AUTONOMOUS_LOGIC: ENABLED"]);
  
  // DEEP STATE PERSISTENCE
  const [appState, setAppState] = useState({
    theme: '#0ea5e9',
    features: [],
    isLive: false
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
      setConsoleLog(prev => [
        ...prev, 
        "// DECODING_INTENT...", 
        "// MAPPING_NEURAL_INFRASTRUCTURE...",
        "// GENERATING_PRODUCTION_CODE..."
      ]);
      
      setAppState(prev => {
        let next = { ...prev, isLive: true };
        if (lower.includes('blue')) next.theme = '#0ea5e9';
        if (lower.includes('purple')) next.theme = '#8b5cf6';
        if (lower.includes('gold')) next.theme = '#f59e0b';
        
        // Dynamic Feature Addition
        const words = lower.split(' ');
        words.forEach(word => {
            if (['profile', 'chat', 'feed', 'stats', 'map', 'crypto', 'health'].includes(word)) {
                if (!next.features.includes(word)) next.features.push(word);
            }
        });
        
        return next;
      });

      setTimeout(() => {
        setConsoleLog(prev => [...prev, "// SYNC_COMPLETE: MANIFESTED_ON_STAGE"]);
      }, 1000);
    }, 400);
  };

  if (view === 'landing') return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: '6rem', fontWeight: '900', letterSpacing: '-4px', background: 'linear-gradient(to bottom right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Blue Lotus</div>
        <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })} style={{ marginTop: '40px', padding: '20px 60px', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '20px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 30px 60px rgba(56, 189, 248, 0.2)' }}>AUTHORIZE_MASTER</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <div style={{ height: '90px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', padding: '0 60px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><span style={{ color: '#38bdf8', fontSize: '2rem' }}>🪷</span><span style={{ fontWeight: '900', fontSize: '1.1rem', letterSpacing: '6px' }}>BLUE_LOTUS_CORE</span></div>
        <div style={{ fontSize: '0.8rem', color: '#475569', letterSpacing: '1px' }}>MASTER: <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{user?.email}</span></div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <CommandCenter onCommand={handleNewCommand} consoleLog={consoleLog} />
        <div style={{ flex: 1, backgroundColor: '#0f172a', padding: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!appState.isLive ? (
            <div style={{ textAlign: 'center', opacity: 0.1 }}>
              <div style={{ fontSize: '6rem', marginBottom: '30px' }}>⚡</div>
              <p style={{ letterSpacing: '10px', fontSize: '0.9rem', fontWeight: '900' }}>NEURAL_IDLE</p>
            </div>
          ) : <ManifestedApp features={appState.features} theme={appState.theme} />}
        </div>
      </div>
    </div>
  );
}

export default App;
