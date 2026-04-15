import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA5MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- THE FUTURE-PROOF PREVIEW STAGE ---
const AppManifestation = ({ type }) => {
  const isBuilder = type === 'builder';
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: '24px', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
      <div style={{ height: '70px', background: '#fff', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', padding: '0 30px', justifyContent: 'space-between' }}>
        <div style={{ color: '#0f172a', fontWeight: '800', fontSize: '0.9rem', letterSpacing: '1px' }}>{isBuilder ? "SOVEREIGN_BUILDER_v5.0" : "GENERATED_APPLICATION"}</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>👤</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '40px', background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '40px', border: '1px solid #fff', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{isBuilder ? "🏗️" : "✨"}</div>
            <h1 style={{ color: '#1e293b', fontSize: '2rem', marginBottom: '10px', fontWeight: '800' }}>{isBuilder ? "The Workspace is Live" : "Vibe Materialized"}</h1>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>The AI has architected a functional {isBuilder ? "builder environment" : "interface"} based on your intent. Database nodes and frontend logic are synchronized.</p>
            <button style={{ marginTop: '30px', padding: '15px 40px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(14, 165, 233, 0.3)', cursor: 'pointer' }}>
                {isBuilder ? "CONFIGURE_CORE" : "EXPLORE_APP"}
            </button>
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
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto', fontSize: '0.85rem', lineHeight: '1.8', color: '#94a3b8', fontFamily: '"JetBrains Mono", monospace' }}>
        {consoleLog.map((log, i) => (
          <div key={i} style={{ marginBottom: '12px', color: log.startsWith('>') ? '#38bdf8' : log.includes('//') ? '#4ade80' : '#94a3b8' }}>
            {log.startsWith('>') ? <span style={{ marginRight: '10px' }}>⚡</span> : null}
            {log}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '30px', background: '#020617' }}>
        <div style={{ position: 'relative' }}>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Command the reality..." 
            autoFocus 
            style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '18px', color: '#fff', borderRadius: '14px', outline: 'none', fontSize: '0.9rem' }} 
          />
        </div>
      </form>
    </div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [manifestType, setManifestType] = useState(null);
  const [consoleLog, setConsoleLog] = useState(["// BLUE_LOTUS: ONLINE", "// NEURAL_LINK: ESTABLISHED"]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { if (session) { setUser(session.user); setView('workspace'); } });
  }, []);

  const handleNewCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`]);
    const lower = cmd.toLowerCase();
    setTimeout(() => {
      setConsoleLog(prev => [...prev, "// ANALYZING_VIBE: " + cmd.toUpperCase(), "// ARCHITECTING_LOGIC_MODELS...", "// SYNCING_SUPABASE_NODES..."]);
      setTimeout(() => {
        if (lower.includes('builder')) setManifestType('builder');
        else setManifestType('app');
        setConsoleLog(prev => [...prev, "// MANIFESTATION_COMPLETE: RENDERED_IN_STAGE"]);
      }, 1000);
    }, 500);
  };

  if (view === 'landing') return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '4rem', fontWeight: '900', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Blue Lotus</div>
        <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })} style={{ marginTop: '20px', padding: '14px 40px', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '12px', fontWeight: '900', cursor: 'pointer' }}>AUTHORIZE_MASTER</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <div style={{ height: '70px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: '#38bdf8', fontSize: '1.4rem' }}>🪷</span><span style={{ fontWeight: '900', fontSize: '0.9rem', letterSpacing: '3px' }}>BLUE_LOTUS_CORE</span></div>
        <div style={{ fontSize: '0.75rem', color: '#475569' }}>MASTER: <span style={{ color: '#38bdf8' }}>{user?.email}</span></div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <CommandCenter onCommand={handleNewCommand} consoleLog={consoleLog} />
        <div style={{ flex: 1, backgroundColor: '#0f172a', padding: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!manifestType ? (
            <div style={{ textAlign: 'center', opacity: 0.2 }}>
              <div style={{ fontSize: '4rem', marginBottom: '15px' }}>✨</div>
              <p style={{ letterSpacing: '4px', fontSize: '0.7rem' }}>DESCRIBE_YOUR_REALITY</p>
            </div>
          ) : <AppManifestation type={manifestType} />}
        </div>
      </div>
    </div>
  );
}

export default App;
