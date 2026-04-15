import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA5MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- PRE-BUILT SOVEREIGN MODULES ---
const DietAppModule = () => (
  <div style={{ padding: '40px', color: '#fff', background: '#0a0a0a', border: '1px solid #38bdf8', borderRadius: '8px', width: '80%' }}>
    <h2 style={{ color: '#38bdf8', borderBottom: '1px solid #38bdf8', paddingBottom: '10px' }}>DIET_TRACKER_v1.0</h2>
    <div style={{ marginTop: '20px', display: 'grid', gap: '15px' }}>
      <div style={{ background: '#111', padding: '15px', borderRadius: '4px' }}>🔥 Calories: 1,850 / 2,200</div>
      <div style={{ background: '#111', padding: '15px', borderRadius: '4px' }}>💧 Hydration: 1.5L / 3.0L</div>
      <button style={{ padding: '10px', background: '#38bdf8', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>LOG_MEAL</button>
    </div>
  </div>
);

const AppBuilderModule = () => (
  <div style={{ padding: '40px', color: '#fff', background: '#0a0a0a', border: '1px solid #f472b6', borderRadius: '8px', width: '80%' }}>
    <h2 style={{ color: '#f472b6', borderBottom: '1px solid #f472b6', paddingBottom: '10px' }}>AI_APP_FACTORY</h2>
    <p style={{ margin: '20px 0', fontSize: '0.9rem' }}>Select a template to begin generation:</p>
    <div style={{ display: 'flex', gap: '10px' }}>
      {['E-COMMERCE', 'DASHBOARD', 'PORTFOLIO'].map(t => (
        <div key={t} style={{ border: '1px solid #334155', padding: '10px', fontSize: '0.7rem', cursor: 'pointer' }}>{t}</div>
      ))}
    </div>
  </div>
);

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
    <div style={{ width: '400px', borderRight: '1px solid rgba(56, 189, 248, 0.1)', display: 'flex', flexDirection: 'column', backgroundColor: '#000' }}>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', fontSize: '0.85rem', lineHeight: '1.6', color: '#38bdf8' }}>
        {consoleLog.map((log, i) => (
          <div key={i} style={{ marginBottom: '8px', borderLeft: log.startsWith('>') ? '2px solid #38bdf8' : 'none', paddingLeft: log.startsWith('>') ? '10px' : '0' }}>{log}</div>
        ))}
        <div ref={logEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '20px', borderTop: '1px solid rgba(56, 189, 248, 0.1)' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter command..." autoFocus style={{ width: '100%', backgroundColor: '#0a0a0a', border: '1px solid #1e293b', padding: '12px', color: '#fff', outline: 'none', fontFamily: 'monospace' }} />
      </form>
    </div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [consoleLog, setConsoleLog] = useState(["// TWIN_CORE: ONLINE", "// AUTH_LEVEL: MASTER_OWNER"]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { if (session) { setUser(session.user); setView('workspace'); } });
  }, []);

  const handleNewCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`]);
    const lowerCmd = cmd.toLowerCase();
    
    setTimeout(() => {
      if (lowerCmd.includes('diet')) {
        setConsoleLog(prev => [...prev, "// TWIN: Materializing Diet Tracker module..."]);
        setActiveModule('diet');
      } else if (lowerCmd.includes('app builder')) {
        setConsoleLog(prev => [...prev, "// TWIN: Initializing Factory environment..."]);
        setActiveModule('builder');
      } else {
        setConsoleLog(prev => [...prev, "// TWIN: Command logged. No matching module found."]);
      }
    }, 800);
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: window.location.origin } });
  };

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
        <div style={{ flex: 1, backgroundColor: '#020408', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!activeModule ? (
            <p style={{ color: '#1e293b' }}>// WAITING_FOR_SOVEREIGN_DATA</p>
          ) : activeModule === 'diet' ? (
            <DietAppModule />
          ) : (
            <AppBuilderModule />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
