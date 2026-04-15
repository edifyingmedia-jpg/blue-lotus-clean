import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA9MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [consoleLog, setConsoleLog] = useState(["// BLUE_LOTUS: ONLINE"]);
  const [manifest, setManifest] = useState({ active: false, type: '' });

  useEffect(() => {
    // Single source of truth for auth
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
  }, []);

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({ 
      provider: 'github', 
      options: { redirectTo: window.location.origin } 
    });
  };

  const handleCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`, "// GENERATING..."]);
    setTimeout(() => setManifest({ active: true, type: cmd.toLowerCase() }), 500);
  };

  if (loading) return <div style={{ background: '#020617', height: '100vh' }} />;

  // LANDING VIEW
  if (!user) return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <span style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 20px #6366f1)' }}>🪷</span>
      <h1 style={{ fontSize: '6rem', fontWeight: '900', letterSpacing: '-5px', margin: '20px 0' }}>Blue Lotus</h1>
      <button onClick={handleLogin} style={{ padding: '20px 60px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '100px', fontWeight: '900', cursor: 'pointer' }}>
        AUTHORIZE_CORE
      </button>
    </div>
  );

  // WORKSPACE VIEW
  return (
    <div style={{ backgroundColor: '#010413', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ height: '80px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span>🪷</span><span style={{ fontWeight: '900', letterSpacing: '5px' }}>BLUE_LOTUS</span></div>
        <button onClick={() => supabase.auth.signOut()} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem' }}>LOGOUT</button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: '400px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', background: 'rgba(2, 6, 23, 0.4)' }}>
          <div style={{ flex: 1, padding: '30px', overflowY: 'auto', fontSize: '0.8rem', color: '#475569', fontFamily: 'monospace' }}>
            {consoleLog.map((log, i) => <div key={i} style={{ marginBottom: '10px' }}>{log}</div>)}
          </div>
          <form style={{ padding: '30px' }} onSubmit={(e) => { e.preventDefault(); handleCommand(e.target.cmd.value); e.target.cmd.value = ''; }}>
            <input name="cmd" placeholder="Command Reality..." style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', padding: '15px', color: '#fff', borderRadius: '12px', outline: 'none' }} />
          </form>
        </div>
        <div style={{ flex: 1, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!manifest.active ? <div style={{ opacity: 0.1, fontSize: '10rem' }}>💎</div> : 
            <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: '30px', color: '#000', padding: '60px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '4rem', fontWeight: '900' }}>{manifest.type}</h2>
                <p>Manifestation Complete.</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
