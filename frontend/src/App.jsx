import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA5MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CommandCenter = ({ onCommand, consoleLog }) => {
  const [input, setInput] = useState("");
  const logEndRef = useRef(null);
  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [consoleLog]);
  const handleSubmit = (e) => { e.preventDefault(); if (!input.trim()) return; onCommand(input); setInput(""); };
  return (
    <div style={{ width: '400px', borderRight: '1px solid rgba(56, 189, 248, 0.1)', display: 'flex', flexDirection: 'column', backgroundColor: '#000' }}>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', fontSize: '0.85rem', lineHeight: '1.6', color: '#38bdf8' }}>
        {consoleLog.map((log, i) => (<div key={i} style={{ marginBottom: '8px', borderLeft: log.startsWith('>') ? '2px solid #38bdf8' : 'none', paddingLeft: log.startsWith('>') ? '10px' : '0' }}>{log}</div>))}
        <div ref={logEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '20px', borderTop: '1px solid rgba(56, 189, 248, 0.1)' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a component name (e.g. 'header', 'form', 'stats')..." autoFocus style={{ width: '100%', backgroundColor: '#0a0a0a', border: '1px solid #1e293b', padding: '12px', color: '#fff', outline: 'none', fontFamily: 'monospace' }} />
      </form>
    </div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [components, setComponents] = useState([]);
  const [consoleLog, setConsoleLog] = useState(["// TWIN_CORE: ONLINE", "// SOVEREIGN_BUILDER: ACTIVE"]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { if (session) { setUser(session.user); setView('workspace'); } });
  }, []);

  const handleNewCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`]);
    const lowerCmd = cmd.toLowerCase();
    
    setTimeout(() => {
      if (lowerCmd.includes('header')) {
        setComponents(prev => [...prev, { id: 'h', type: 'header', content: 'Sovereign Interface v1.0' }]);
        setConsoleLog(prev => [...prev, "// TWIN: Compiling Header Component..."]);
      } else if (lowerCmd.includes('form') || lowerCmd.includes('login')) {
        setComponents(prev => [...prev, { id: 'f', type: 'form' }]);
        setConsoleLog(prev => [...prev, "// TWIN: Generating Auth Module..."]);
      } else if (lowerCmd.includes('stats') || lowerCmd.includes('dashboard')) {
        setComponents(prev => [...prev, { id: 's', type: 'stats' }]);
        setConsoleLog(prev => [...prev, "// TWIN: Deploying Data Visualization..."]);
      } else if (lowerCmd.includes('clear')) {
        setComponents([]);
        setConsoleLog(prev => [...prev, "// TWIN: Preview Stage Cleared."]);
      } else {
        setConsoleLog(prev => [...prev, "// TWIN: Searching library for '" + cmd + "'..."]);
      }
    }, 500);
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
      {/* Header */}
      <div style={{ height: '60px', borderBottom: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', padding: '0 25px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: '#38bdf8' }}>🪷</span><span style={{ fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '3px' }}>BLUE_LOTUS_CORE</span></div>
        <div style={{ fontSize: '0.7rem', color: '#38bdf8' }}>MASTER: {user?.email}</div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <CommandCenter onCommand={handleNewCommand} consoleLog={consoleLog} />
        
        {/* THE LIVE PREVIEW STAGE */}
        <div style={{ flex: 1, backgroundColor: '#020408', padding: '40px', overflowY: 'auto' }}>
          {components.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b' }}>
              // TYPE 'HEADER', 'FORM', OR 'STATS' TO BUILD
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
              {components.map((comp, idx) => (
                <div key={idx} style={{ border: '1px solid #1e293b', background: '#000', padding: '20px', borderRadius: '4px' }}>
                  {comp.type === 'header' && <h1 style={{ color: '#38bdf8', margin: 0 }}>{comp.content}</h1>}
                  {comp.type === 'form' && (
                    <div style={{ display: 'grid', gap: '10px' }}>
                      <input placeholder="Email" style={{ background: '#111', border: '1px solid #334155', padding: '10px', color: '#fff' }} />
                      <button style={{ background: '#38bdf8', color: '#000', border: 'none', padding: '10px' }}>ACCESS_SECURE_NODE</button>
                    </div>
                  )}
                  {comp.type === 'stats' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ color: '#38bdf8' }}>Active Users: 1,024</div>
                      <div style={{ color: '#f472b6' }}>System Load: 12%</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
