import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA9MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buildPlan, setBuildPlan] = useState([]);
  const [manifest, setManifest] = useState({ active: false, type: '', status: 'idle' });

  useEffect(() => {
    // 1. Force check for session immediately on mount
    const getInitialAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setUser(session.user);
      setLoading(false);
    };
    getInitialAuth();

    // 2. Listen for the redirect event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        // Clean URL to keep the 'Sovereign' aesthetic
        window.history.replaceState({}, document.title, window.location.origin);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleManifest = async (cmd) => {
    setManifest({ active: true, type: cmd.toUpperCase(), status: 'building' });
    const steps = ["Decoding Sovereign Intent", "Mapping Data Schema", "Injecting TWIN Logic", "Materializing Luxury UI", "Synchronizing Edge"];
    setBuildPlan([]);
    for (const step of steps) {
      setBuildPlan(prev => [...prev, { name: step, done: false }]);
      await new Promise(r => setTimeout(r, 800));
      setBuildPlan(prev => prev.map(s => s.name === step ? { ...s, done: true } : s));
    }
    setManifest(prev => ({ ...prev, status: 'live' }));
  };

  if (loading) return <div style={{ background: '#020617', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontSize: '2rem' }}>💎</div>;

  if (!user) return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '80px', height: '80px', border: '3px solid #6366f1', borderRadius: '20px', marginBottom: '30px', boxShadow: '0 0 50px rgba(99, 102, 241, 0.2)', background: 'rgba(99, 102, 241, 0.05)' }} />
      <h1 style={{ fontSize: '8rem', fontWeight: '900', letterSpacing: '-8px', background: 'linear-gradient(to bottom, #fff, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>Blue Lotus</h1>
      <p style={{ letterSpacing: '15px', color: '#475569', fontSize: '0.7rem', fontWeight: '900', marginTop: '10px' }}>SOVEREIGN_STUDIO_v1.0</p>
      <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: window.location.origin } })} style={{ marginTop: '50px', padding: '24px 80px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '100px', fontWeight: '900', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)' }}>AUTHORIZE_CORE</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#010413', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ height: '80px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between', background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(30px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><div style={{ width: '25px', height: '25px', border: '2px solid #6366f1', borderRadius: '6px' }} /><span style={{ fontWeight: '900', letterSpacing: '6px', fontSize: '0.85rem' }}>LOTUS_STUDIO</span></div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['⟲', '☁', '↻', '🚀'].map(icon => (
            <button key={icon} style={{ width: '42px', height: '42px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: '#94a3b8', cursor: 'pointer', fontSize: '1.1rem' }}>{icon}</button>
          ))}
          <button style={{ padding: '0 30px', background: '#6366f1', border: 'none', borderRadius: '100px', color: '#fff', fontWeight: '900', fontSize: '0.7rem', letterSpacing: '1px' }}>PUBLISH</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: '400px', borderRight: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', background: 'rgba(2, 6, 23, 0.5)' }}>
          <div style={{ flex: 1, padding: '40px' }}>
            <div style={{ color: '#6366f1', fontWeight: '900', fontSize: '0.65rem', letterSpacing: '3px', marginBottom: '35px' }}>NEURAL_PLAN</div>
            {buildPlan.map((step, i) => (
              <div key={i} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', opacity: step.done ? 1 : 0.4 }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: step.done ? '#6366f1' : '#1e293b', boxShadow: step.done ? '0 0 10px #6366f1' : 'none' }} />
                <span style={{ fontSize: '0.85rem', color: step.done ? '#fff' : '#94a3b8' }}>{step.name}</span>
              </div>
            ))}
          </div>
          <form style={{ padding: '40px' }} onSubmit={(e) => { e.preventDefault(); handleManifest(e.target.cmd.value); e.target.cmd.value = ''; }}>
            <input name="cmd" placeholder="Request Architecture..." autoFocus style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '22px', color: '#fff', borderRadius: '14px', outline: 'none' }} />
          </form>
        </div>

        <div style={{ flex: 1, padding: '60px', background: 'radial-gradient(circle at center, #0a112c 0%, #010413 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {manifest.status === 'idle' ? <div style={{ opacity: 0.05, fontSize: '18rem' }}>💎</div> : 
            <div style={{ width: '100%', height: '100%', background: manifest.status === 'live' ? '#fff' : 'transparent', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.05)', color: '#000', padding: '100px', textAlign: 'center', boxShadow: '0 80px 150px rgba(0,0,0,0.6)', transition: '0.5s' }}>
                {manifest.status === 'live' ? (
                  <div>
                    <div style={{ width: '60px', height: '60px', background: '#6366f1', borderRadius: '18px', margin: '0 auto 40px' }} />
                    <h2 style={{ fontSize: '5rem', fontWeight: '900', letterSpacing: '-4px' }}>{manifest.type}</h2>
                    <p style={{ color: '#64748b', fontSize: '1.2rem' }}>Sovereign-grade node manifested.</p>
                  </div>
                ) : <div style={{ color: '#6366f1', letterSpacing: '15px', fontWeight: '900', fontSize: '0.9rem', animation: 'pulse 2s infinite' }}>MANIFESTING_ARCHITECTURE...</div>}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
