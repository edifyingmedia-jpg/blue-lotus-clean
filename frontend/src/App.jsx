import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// TYPO FIXED: Added the missing 'n' to ehbpmjknjmgroucacsru
const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA9MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [buildPlan, setBuildPlan] = useState([]);
  const [manifest, setManifest] = useState({ active: false, type: '', stage: 'idle' });

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setUser(session.user);
      setLoading(false);
    };
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        window.history.replaceState({}, document.title, window.location.origin);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("Syncing with Neural Core...");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    });
    if (error) setStatus(error.message);
    else setStatus("Neural Key sent. Check your inbox.");
  };

  const handleCommand = async (cmd) => {
    setManifest({ active: true, type: cmd.toUpperCase(), stage: 'planning' });
    const steps = ["Analyzing Intent", "Mapping Sovereign Schema", "Injecting TWIN Logic", "Materializing Luxury UI"];
    setBuildPlan([]);
    for (const step of steps) {
      setBuildPlan(prev => [...prev, { name: step, done: false }]);
      await new Promise(r => setTimeout(r, 800));
      setBuildPlan(prev => prev.map(s => s.name === step ? { ...s, done: true } : s));
    }
    setManifest(prev => ({ ...prev, stage: 'live' }));
  };

  if (loading) return <div style={{ background: '#020617', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>💎</div>;

  if (!user) return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '70px', height: '70px', border: '2px solid #6366f1', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 0 40px rgba(99, 102, 241, 0.3)' }} />
      <h1 style={{ fontSize: '6rem', fontWeight: '900', letterSpacing: '-6px', background: 'linear-gradient(to bottom, #fff, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>Blue Lotus</h1>
      <p style={{ letterSpacing: '12px', color: '#475569', fontSize: '0.7rem', fontWeight: '900', marginBottom: '40px' }}>SOVEREIGN_STUDIO_v1.0</p>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '340px' }}>
        <input 
          type="email" 
          placeholder="Enter email for access..." 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '22px', borderRadius: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', textAlign: 'center' }}
        />
        <button style={{ padding: '22px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '18px', fontWeight: '900', cursor: 'pointer', fontSize: '0.9rem', letterSpacing: '2px' }}>
          REQUEST_ACCESS
        </button>
        {status && <p style={{ color: '#94a3b8', fontSize: '0.8rem', textAlign: 'center', marginTop: '10px' }}>{status}</p>}
      </form>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#010413', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ height: '80px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between', background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(30px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><div style={{ width: '22px', height: '22px', border: '2px solid #6366f1', borderRadius: '5px' }} /><span style={{ fontWeight: '900', letterSpacing: '6px', fontSize: '0.8rem' }}>LOTUS_STUDIO</span></div>
        <button onClick={() => supabase.auth.signOut()} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '8px 20px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.7rem' }}>LOGOUT</button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: '400px', borderRight: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', background: 'rgba(2, 6, 23, 0.5)' }}>
          <div style={{ flex: 1, padding: '40px' }}>
            <div style={{ color: '#6366f1', fontWeight: '900', fontSize: '0.65rem', letterSpacing: '4px', marginBottom: '35px' }}>NEURAL_PLAN</div>
            {buildPlan.map((step, i) => (
              <div key={i} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', opacity: step.done ? 1 : 0.4 }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: step.done ? '#6366f1' : '#1e293b' }} />
                <span style={{ fontSize: '0.85rem' }}>{step.name}</span>
              </div>
            ))}
          </div>
          <form style={{ padding: '40px' }} onSubmit={(e) => { e.preventDefault(); handleCommand(e.target.cmd.value); e.target.cmd.value = ''; }}>
            <input name="cmd" placeholder="Command Reality..." autoFocus style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '22px', color: '#fff', borderRadius: '15px', outline: 'none' }} />
          </form>
        </div>

        <div style={{ flex: 1, padding: '60px', background: 'radial-gradient(circle at center, #0a112c 0%, #010413 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {manifest.stage === 'idle' ? <div style={{ opacity: 0.05, fontSize: '18rem' }}>💎</div> : 
            <div style={{ width: '100%', height: '100%', background: manifest.stage === 'live' ? '#fff' : 'transparent', borderRadius: '40px', color: '#000', padding: '100px', textAlign: 'center', boxShadow: '0 80px 160px rgba(0,0,0,0.5)' }}>
                {manifest.stage === 'live' ? <h2>{manifest.type}</h2> : <div style={{ color: '#6366f1', letterSpacing: '10px', fontWeight: '900' }}>MANIFESTING...</div>}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
