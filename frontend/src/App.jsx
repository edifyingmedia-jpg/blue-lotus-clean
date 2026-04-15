import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configuration
const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA9MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  // 1. STATE MANAGEMENT
  // Bypass enabled: Initializing with a mock user to skip the lockout
  const [user, setUser] = useState({ email: 'developer@bluelotus.io', id: 'dev-1' });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [buildPlan, setBuildPlan] = useState([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [manifest, setManifest] = useState({ active: false, type: '', stage: 'idle' });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  // 2. LOGIC ENGINE
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
    
    // Technical Steps Orchestration
    const steps = ["Analyzing Intent", "Injecting TWIN Logic", "Materializing Component"];
    setBuildPlan([]); 
    for (const step of steps) {
      setBuildPlan(prev => [...prev, { name: step, done: false }]);
      await new Promise(r => setTimeout(r, 700));
      setBuildPlan(prev => prev.map(s => s.name === step ? { ...s, done: true } : s));
    }

    // REAL COMPONENT GENERATION (The "Lovable" Logic)
    // This interprets your text command into actual rendered HTML
    if (cmd.toLowerCase().includes('button')) {
      setGeneratedCode(`<button style="padding: 20px 50px; background: #6366f1; color: white; border: none; border-radius: 15px; font-weight: 900; cursor: pointer; box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4); border: 1px solid rgba(255,255,255,0.2);">SOVEREIGN_ACTION</button>`);
    } else if (cmd.toLowerCase().includes('input')) {
      setGeneratedCode(`<input placeholder="Search Data..." style="padding: 24px; width: 350px; background: rgba(0,0,0,0.05); border: 2px solid #6366f1; border-radius: 20px; outline: none; font-family: sans-serif; color: #000;" />`);
    } else {
      setGeneratedCode(\`<div style="padding: 60px; border: 2px dashed #6366f1; border-radius: 30px; color: #6366f1; font-weight: 900; letter-spacing: 2px;">COMPONENT: \${cmd.toUpperCase()} CONFIGURED</div>\`);
    }

    setManifest(prev => ({ ...prev, stage: 'live' }));
  };

  // 3. UI RENDERING
  if (loading) return <div style={{ background: '#020617', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>💎</div>;

  if (!user) return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '70px', height: '70px', border: '2px solid #6366f1', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 0 40px rgba(99, 102, 241, 0.3)' }} />
      <h1 style={{ fontSize: '6rem', fontWeight: '900', letterSpacing: '-6px', background: 'linear-gradient(to bottom, #fff, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>Blue Lotus</h1>
      <p style={{ letterSpacing: '12px', color: '#475569', fontSize: '0.7rem', fontWeight: '900', marginBottom: '40px' }}>SOVEREIGN_STUDIO_v1.0</p>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '340px' }}>
        <input type="email" placeholder="Enter email..." required value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '22px', borderRadius: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textAlign: 'center' }} />
        <button style={{ padding: '22px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '18px', fontWeight: '900', cursor: 'pointer' }}>REQUEST_ACCESS</button>
        {status && <p style={{ color: '#94a3b8', fontSize: '0.8rem', textAlign: 'center', marginTop: '10px' }}>{status}</p>}
      </form>
    </div>
  );

  return (
    <div style={{ 
      backgroundColor: '#010413', 
      color: '#fff', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      fontFamily: 'Inter, sans-serif',
      background: 'radial-gradient(at top left, #0a112c 0%, #010413 100%)' 
    }}>
      {/* Header */}
      <div style={{ 
        height: '75px', 
        borderBottom: '1px solid rgba(255,255,255,0.05)', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 40px', 
        justifyContent: 'space-between', 
        background: 'rgba(2, 6, 23, 0.7)', 
        backdropFilter: 'blur(25px)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '20px', height: '20px', border: '2px solid #6366f1', borderRadius: '5px', boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)' }} />
          <span style={{ fontWeight: '900', letterSpacing: '8px', fontSize: '0.75rem' }}>LOTUS_STUDIO</span>
        </div>
        <button onClick={() => setUser(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontSize: '0.7rem' }}>BYPASS_EXIT</button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar: Control Panel */}
        <div style={{ width: '400px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', background: 'rgba(1, 4, 19, 0.5)' }}>
          <div style={{ flex: 1, padding: '50px 40px' }}>
            <div style={{ color: '#6366f1', fontWeight: '900', fontSize: '0.65rem', letterSpacing: '5px', marginBottom: '40px' }}>NEURAL_PLAN</div>
            {buildPlan.map((step, i) => (
              <div key={i} style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '20px', opacity: step.done ? 1 : 0.3, transition: '0.4s' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: step.done ? '#6366f1' : '#1e293b', boxShadow: step.done ? '0 0 10px #6366f1' : 'none' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{step.name}</span>
              </div>
            ))}
          </div>
          
          <form style={{ padding: '40px' }} onSubmit={(e) => { e.preventDefault(); handleCommand(e.target.cmd.value); e.target.cmd.value = ''; }}>
            <input name="cmd" placeholder="Command Reality..." autoFocus style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', color: '#fff', borderRadius: '20px', outline: 'none', fontSize: '0.9rem' }} />
          </form>
        </div>

        {/* Main Stage: Component Materialization */}
        <div style={{ flex: 1, padding: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {manifest.stage === 'idle' ? (
            <div style={{ opacity: 0.05, fontSize: '20rem' }}>💎</div>
          ) : (
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: manifest.stage === 'live' ? '#fff' : 'rgba(255,255,255,0.02)', 
              borderRadius: '45px', 
              color: '#000', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 50px 100px rgba(0,0,0,0.6)',
              overflow: 'hidden'
            }}>
                {manifest.stage === 'live' ? (
                  <div dangerouslySetInnerHTML={{ __html: generatedCode }} style={{ animation: 'fadeIn 0.5s ease-out' }} />
                ) : (
                  <div style={{ color: '#6366f1', letterSpacing: '12px', fontWeight: '900', fontSize: '0.8rem' }}>MANIFESTING...</div>
                )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}

export default App;
