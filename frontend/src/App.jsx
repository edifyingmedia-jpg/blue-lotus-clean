import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA9MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [consoleLog, setConsoleLog] = useState(["// BLUE_LOTUS: ONLINE", "// NEURAL_SYNC: ACTIVE"]);
  const [manifest, setManifest] = useState({ active: false, type: '' });

  useEffect(() => {
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
    setConsoleLog(prev => [...prev, `> ${cmd}`, "// ANALYZING_VIBE...", "// INJECTING_SOVEREIGN_LOGIC..."]);
    setTimeout(() => {
      setManifest({ active: true, type: cmd.toUpperCase() });
      setConsoleLog(prev => [...prev, "// MANIFEST_COMPLETE: 100% FIDELITY"]);
    }, 1000);
  };

  if (loading) return <div style={{ background: '#020617', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontSize: '3rem' }}>🪷</div>;

  if (!user) return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', width: '100vw', height: '100vh', background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #020617 70%)', opacity: 0.6, zIndex: 0 }} />
      <div style={{ zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: '6rem', filter: 'drop-shadow(0 0 30px #6366f1)', marginBottom: '20px' }}>🪷</div>
        <h1 style={{ fontSize: '9rem', fontWeight: '900', letterSpacing: '-10px', margin: 0, background: 'linear-gradient(to bottom, #fff, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Blue Lotus</h1>
        <p style={{ letterSpacing: '15px', color: '#475569', fontWeight: 'bold', fontSize: '0.8rem', margin: '30px 0 60px' }}>SOVEREIGN_SYSTEMS_v1.0</p>
        <button onClick={handleLogin} style={{ padding: '24px 80px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '100px', fontWeight: '900', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 30px 60px rgba(99, 102, 241, 0.4)' }}>AUTHORIZE_MASTER</button>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#010413', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      {/* ELITE HEADER */}
      <div style={{ height: '100px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', padding: '0 60px', justifyContent: 'space-between', background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(50px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 15px #6366f1)' }}>🪷</span>
          <span style={{ fontWeight: '900', fontSize: '1.2rem', letterSpacing: '10px' }}>BLUE_LOTUS_CORE</span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          {['⟲', '☁', '↻', '🚀'].map((icon, i) => (
            <button key={i} style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>{icon}</button>
          ))}
          <button style={{ padding: '0 30px', background: '#6366f1', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '900', fontSize: '0.7rem', letterSpacing: '2px' }}>PUBLISH_LIVE</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* NEURAL COMMAND CONSOLE */}
        <div style={{ width: '480px', borderRight: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', background: 'rgba(2, 6, 23, 0.4)', backdropFilter: 'blur(50px)' }}>
          <div style={{ flex: 1, padding: '50px', overflowY: 'auto', fontSize: '0.85rem', color: '#475569', fontFamily: 'monospace', lineHeight: '2.5' }}>
            {consoleLog.map((log, i) => (
              <div key={i} style={{ marginBottom: '15px', color: log.startsWith('>') ? '#fff' : '#475569' }}>
                {log.startsWith('>') ? <span style={{ color: '#6366f1', marginRight: '15px' }}>❯</span> : null}{log}
              </div>
            ))}
          </div>
          <form style={{ padding: '50px' }} onSubmit={(e) => { e.preventDefault(); handleCommand(e.target.cmd.value); e.target.cmd.value = ''; }}>
            <input name="cmd" placeholder="Command Reality..." autoFocus style={{ width: '100%', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', color: '#fff', borderRadius: '24px', outline: 'none', fontSize: '1rem' }} />
          </form>
        </div>

        {/* OUTPUT STAGE */}
        <div style={{ flex: 1, padding: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #0a0f29 0%, #010413 100%)' }}>
          {!manifest.active ? <div style={{ opacity: 0.1, fontSize: '15rem' }}>💎</div> : 
            <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: '50px', color: '#000', padding: '100px', textAlign: 'center', boxShadow: '0 100px 200px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
                <h2 style={{ fontSize: '6rem', fontWeight: '900', letterSpacing: '-5px' }}>{manifest.type}</h2>
                <p style={{ fontSize: '1.2rem', color: '#64748b' }}>Sovereign-Grade Infrastructure Manifested.</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
