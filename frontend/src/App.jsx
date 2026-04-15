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
    // 1. Check for an existing session immediately
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setUser(session.user);
      setLoading(false);
    };
    getInitialSession();

    // 2. Listen for ANY auth change (including the redirect landing)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({ 
      provider: 'github', 
      options: { redirectTo: window.location.origin } 
    });
  };

  const handleCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`, "// GENERATING_LUXURY_ASSETS..."]);
    setTimeout(() => setManifest({ active: true, type: cmd.toLowerCase() }), 600);
  };

  if (loading) return <div style={{ background: '#020617', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontSize: '2rem' }}>💎</div>;

  if (!user) return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ position: 'relative', marginBottom: '30px' }}>
        <div style={{ position: 'absolute', width: '150px', height: '150px', background: '#6366f1', filter: 'blur(60px)', opacity: 0.3, top: '-50px', left: '-50px' }} />
        <span style={{ fontSize: '5rem', zIndex: 2, position: 'relative' }}>🪷</span>
      </div>
      <h1 style={{ fontSize: '7rem', fontWeight: '900', letterSpacing: '-6px', margin: '0', background: 'linear-gradient(to bottom, #fff, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Blue Lotus</h1>
      <p style={{ color: '#475569', letterSpacing: '10px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '50px' }}>SOVEREIGN_BUILDER_v1.0</p>
      <button onClick={handleLogin} style={{ padding: '24px 80px', background: '#fff', color: '#000', border: 'none', borderRadius: '100px', fontWeight: '900', cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 30px 60px rgba(255,255,255,0.1)' }}>AUTHORIZE_CORE</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#010413', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ height: '100px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', padding: '0 60px', justifyContent: 'space-between', background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(40px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '2rem' }}>🪷</span>
          <span style={{ fontWeight: '900', fontSize: '1.2rem', letterSpacing: '8px' }}>BLUE_LOTUS_CORE</span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
           <button onClick={() => supabase.auth.signOut()} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>TERMINATE_SESSION</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: '450px', borderRight: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', background: 'rgba(2, 6, 23, 0.4)', backdropFilter: 'blur(50px)' }}>
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
        <div style={{ flex: 1, padding: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #0a0f29 0%, #010413 100%)' }}>
          {!manifest.active ? <div style={{ opacity: 0.1, fontSize: '12rem' }}>💎</div> : 
            <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: '50px', color: '#000', padding: '80px', textAlign: 'center', boxShadow: '0 100px 200px rgba(0,0,0,0.5)' }}>
                <h2 style={{ fontSize: '5rem', fontWeight: '900', letterSpacing: '-4px' }}>{manifest.type}</h2>
                <p style={{ fontSize: '1.2rem', color: '#64748b' }}>Manifestation Complete.</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
