import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA9MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [consoleLog, setConsoleLog] = useState(["// BLUE_LOTUS_CORE: ONLINE", "// NEURAL_BRIDGE: LISTENING"]);
  const [manifest, setManifest] = useState({ active: false, type: '', data: {} });

  useEffect(() => {
    // 1. Instant Session Check
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setView('workspace');
      }
    };
    checkUser();

    // 2. Real-time Bridge Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth Event:", event);
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
        setUser(session.user);
        setView('workspace');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    // Force the redirect to stay on the Vercel Origin
    const targetOrigin = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: targetOrigin }
    });
  };

  const handleCommand = (cmd) => {
    setConsoleLog(prev => [...prev, `> ${cmd}`, "// DECODING_INTENT...", "// GENERATING_HIGH_FIDELITY_NODES..."]);
    setTimeout(() => {
      setManifest({ active: true, type: cmd.toLowerCase() });
      setConsoleLog(prev => [...prev, "// SYNC_COMPLETE: MANIFESTED_IN_STAGE"]);
    }, 800);
  };

  const Logo = () => (
    <div style={{ position: 'relative', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', width: '140%', height: '140%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: '50%', filter: 'blur(25px)', opacity: 0.5 }} />
      <span style={{ fontSize: '3rem', zIndex: 2, filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.9))' }}>🪷</span>
    </div>
  );

  if (view === 'landing') return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <Logo />
      <h1 style={{ fontSize: '8rem', fontWeight: '900', letterSpacing: '-8px', background: 'linear-gradient(to bottom, #fff, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginTop: '20px' }}>Blue Lotus</h1>
      <button 
        onClick={handleLogin} 
        style={{ marginTop: '50px', padding: '24px 80px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '100px', fontWeight: '900', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 30px 60px rgba(99, 102, 241, 0.4)' }}
      >
        AUTHORIZE_CORE
      </button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#010413', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <div style={{ height: '100px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', padding: '0 60px', justifyContent: 'space-between', background: 'rgba(2, 6, 23, 0.6)', backdropFilter: 'blur(50px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><Logo /><span style={{ fontWeight: '900', fontSize: '1.1rem', letterSpacing: '10px' }}>BLUE_LOTUS</span></div>
        <div style={{ display: 'flex', gap: '15px' }}>
          {['⟲', '☁', '↻', '🚀'].map((icon, i) => (
            <button key={i} style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>{icon}</button>
          ))}
          <button style={{ padding: '0 30px', background: '#6366f1', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '900', fontSize: '0.7rem', letterSpacing: '2px' }}>PUBLISH_LIVE</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: '480px', borderRight: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', background: 'rgba(2, 6, 23, 0.4)', backdropFilter: 'blur(40px)' }}>
          <div style={{ flex: 1, padding: '50px', overflowY: 'auto', fontSize: '0.85rem', color: '#475569', fontFamily: '"JetBrains Mono", monospace', lineHeight: '2.5' }}>
            {consoleLog.map((log, i) => (
              <div key={i} style={{ marginBottom: '15px', color: log.startsWith('>') ? '#fff' : '#475569' }}>
                {log.startsWith('>') ? <span style={{ color: '#6366f1', marginRight: '15px' }}>❯</span> : null}{log}
              </div>
            ))}
          </div>
          <form style={{ padding: '50px' }} onSubmit={(e) => { e.preventDefault(); handleCommand(e.target.cmd.value); e.target.cmd.value = ''; }}>
            <input name="cmd" placeholder="Command Reality..." autoFocus style={{ width: '100%', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', color: '#fff', borderRadius: '20px', outline: 'none', fontSize: '1rem' }} />
          </form>
        </div>

        <div style={{ flex: 1, padding: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #0a0f29 0%, #010413 100%)' }}>
          {!manifest.active ? (
            <div style={{ textAlign: 'center', opacity: 0.05 }}><div style={{ fontSize: '15rem' }}>💎</div><p style={{ letterSpacing: '30px', fontWeight: '900' }}>NEURAL_IDLE</p></div>
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: '50px', boxShadow: '0 100px 200px rgba(0,0,0,0.6)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '100px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', padding: '0 60px', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: '900', fontSize: '0.8rem', letterSpacing: '5px', color: '#0f172a' }}>MANIFESTATION_v1.0</div>
                <div style={{ width: '45px', height: '45px', borderRadius: '15px', background: 'linear-gradient(135deg, #6366f1, #a855f7)' }} />
              </div>
              <div style={{ flex: 1, background: 'radial-gradient(circle at center, #fff 0%, #f8fafc 100%)', padding: '80px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '5rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-4px' }}>{manifest.type}</h2>
                <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '500px', margin: '20px auto' }}>The Sovereign Architect has generated a real-time responsive node based on your vibe.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
