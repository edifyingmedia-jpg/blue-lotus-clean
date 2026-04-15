import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA5MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- THE HIGH-FIDELITY STUDIO ---
const SovereignStudio = () => (
  <div style={{ width: '100%', height: '100%', background: '#020617', borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(56, 189, 248, 0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
    {/* Studio Header */}
    <div style={{ height: '50px', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
      </div>
      <span style={{ color: '#94a3b8', fontSize: '0.65rem', fontWeight: 'bold', letterSpacing: '1px' }}>SOVEREIGN_STUDIO_V2</span>
      <button style={{ background: '#38bdf8', color: '#000', border: 'none', padding: '4px 12px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>DEPLOY</button>
    </div>

    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      {/* Tool Sidebar */}
      <div style={{ width: '64px', background: '#0f172a', borderRight: '1px solid rgba(56, 189, 248, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: '25px' }}>
        {['📂', '🎨', '⚙️', '🔗'].map(icon => <div key={icon} style={{ fontSize: '1.2rem', cursor: 'pointer', opacity: 0.6 }}>{icon}</div>)}
      </div>

      {/* Main Canvas Area */}
      <div style={{ flex: 1, background: '#020617', padding: '30px', position: 'relative', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto', background: '#fff', borderRadius: '8px', minHeight: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div style={{ height: '60px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }} />
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1 style={{ color: '#0f172a', margin: '0 0 10px 0' }}>Your New App</h1>
            <p style={{ color: '#64748b' }}>Start typing commands to build the UI...</p>
          </div>
        </div>
      </div>

      {/* Property Inspector */}
      <div style={{ width: '240px', background: '#0f172a', borderLeft: '1px solid rgba(56, 189, 248, 0.1)', padding: '20px' }}>
        <h4 style={{ color: '#38bdf8', fontSize: '0.7rem', margin: '0 0 20px 0' }}>PROPERTIES</h4>
        <div style={{ display: 'grid', gap: '15px' }}>
          {['Layout: Flex', 'Padding: 40px', 'Theme: Dark'].map(p => (
            <div key={p} style={{ fontSize: '0.65rem', color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.05)', pb: '5px' }}>{p}</div>
          ))}
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
    <div style={{ width: '380px', borderRight: '1px solid rgba(56, 189, 248, 0.1)', display: 'flex', flexDirection: 'column', backgroundColor: '#000' }}>
      <div style={{ flex: 1, padding: '25px', overflowY: 'auto', fontSize: '0.8rem', lineHeight: '1.7', color: '#38bdf8', fontFamily: '"Fira Code", monospace' }}>
        {consoleLog.map((log, i) => (
          <div key={i} style={{ marginBottom: '10px', opacity: log.startsWith('>') ? 1 : 0.7 }}>
            {log.startsWith('>') ? <span style={{ color: '#fff', marginRight: '8px' }}>➜</span> : null}
            {log}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '20px', background: '#050505', borderTop: '1px solid rgba(56, 189, 248, 0.1)' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter vibe command..." autoFocus style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '14px 18px', color: '#fff', borderRadius: '8px', outline: 'none' }} />
      </form>
    </div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [isVibeActive, setIsVibeActive] = useState(false);
  const [consoleLog, setConsoleLog] = useState(["// SYSTEM: BOOT_COMPLETE", "// MODE: SOVEREIGN_BUILDER"]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { if (session) { setUser(session.user); setView('workspace'); } });
  }, []);

  const handleNewCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`]);
    setTimeout(() => {
      setConsoleLog(prev => [...prev, "// ANALYZING_VIBE...", "// GENERATING_STUDIO_ENVIRONMENT..."]);
      setIsVibeActive(true);
    }, 600);
  };

  if (view === 'landing') return (
    <div style={{ backgroundColor: '#010204', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-2px' }}><span style={{ color: '#38bdf8' }}>Blue</span> Lotus</h1>
      <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })} style={{ padding: '12px 30px', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>AUTHORIZE_MASTER</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <div style={{ height: '60px', borderBottom: '1px solid rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', padding: '0 30px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: '#38bdf8', fontSize: '1.2rem' }}>🪷</span><span style={{ fontWeight: '800', fontSize: '0.8rem', letterSpacing: '2px' }}>BLUE_LOTUS_CORE</span></div>
        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>MASTER: <span style={{ color: '#38bdf8' }}>{user?.email}</span></div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <CommandCenter onCommand={handleNewCommand} consoleLog={consoleLog} />
        <div style={{ flex: 1, backgroundColor: '#020617', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!isVibeActive ? (
            <div style={{ textAlign: 'center', opacity: 0.3 }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🪷</div>
              <p style={{ letterSpacing: '2px', fontSize: '0.7rem' }}>WAITING_FOR_VIBE_INPUT</p>
            </div>
          ) : <SovereignStudio />}
        </div>
      </div>
    </div>
  );
}

export default App;
