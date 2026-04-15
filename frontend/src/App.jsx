import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA9MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buildPlan, setBuildPlan] = useState([]);
  const [consoleLog, setConsoleLog] = useState(["// BLUE_LOTUS: READY"]);
  const [manifest, setManifest] = useState({ active: false, type: '', stage: 'idle' });

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
  }, []);

  const runBuildSequence = async (cmd) => {
    setManifest({ active: true, type: cmd.toUpperCase(), stage: 'planning' });
    const planSteps = [
      "Analyzing Intent & Archetype",
      "Drafting Recursive Backend Schema",
      "Injecting TWIN Logic & Healing Code",
      "Applying High-Fidelity Glassmorphism",
      "Synchronizing Sovereign Auth Gates",
      "Deploying to Edge Runtime"
    ];
    
    setBuildPlan([]);
    for (let i = 0; i < planSteps.length; i++) {
      setBuildPlan(prev => [...prev, { step: planSteps[i], status: 'loading' }]);
      await new Promise(r => setTimeout(r, 800));
      setBuildPlan(prev => {
        const newPlan = [...prev];
        newPlan[i].status = 'complete';
        return newPlan;
      });
      setConsoleLog(prev => [...prev, `// EXEC: ${planSteps[i]}`]);
    }
    setManifest(prev => ({ ...prev, stage: 'live' }));
  };

  if (loading) return <div style={{ background: '#020617', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>🪷</div>;

  if (!user) return (
    <div style={{ backgroundColor: '#020617', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '7rem', fontWeight: '900', letterSpacing: '-6px', background: 'linear-gradient(to bottom, #fff, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>Blue Lotus</h1>
      <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: window.location.origin } })} style={{ marginTop: '50px', padding: '20px 80px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '100px', fontWeight: '900', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 30px 60px rgba(99, 102, 241, 0.4)' }}>AUTHORIZE_MASTER</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#010413', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      {/* SOVEREIGN TOOLBAR */}
      <div style={{ height: '80px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between', background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(30px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ fontSize: '1.5rem' }}>🪷</span><span style={{ fontWeight: '900', letterSpacing: '4px', fontSize: '0.8rem' }}>BLUE_LOTUS_STUDIO</span></div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['⟲ UNDO', '☁ GITHUB', '↻ RESET', '🚀 DEPLOY'].map(btn => (
            <button key={btn} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#94a3b8', padding: '6px 12px', fontSize: '0.6rem', fontWeight: '900', cursor: 'pointer' }}>{btn}</button>
          ))}
          <button style={{ padding: '6px 20px', background: '#6366f1', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: '900', fontSize: '0.6rem' }}>PUBLISH</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* ARCHITECT PANEL (The "Emergent" Clone) */}
        <div style={{ width: '420px', borderRight: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', background: 'rgba(2, 6, 23, 0.5)', backdropFilter: 'blur(50px)' }}>
          <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: '900', color: '#6366f1', letterSpacing: '2px', marginBottom: '30px' }}>BUILD_PLAN</div>
            {buildPlan.map((step, i) => (
              <div key={i} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', color: step.status === 'complete' ? '#fff' : '#475569' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid', borderColor: step.status === 'complete' ? '#6366f1' : '#1e293b', background: step.status === 'complete' ? '#6366f1' : 'transparent' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: step.status === 'complete' ? '600' : '400' }}>{step.step}</span>
              </div>
            ))}
          </div>
          <form style={{ padding: '40px' }} onSubmit={(e) => { e.preventDefault(); runBuildSequence(e.target.cmd.value); e.target.cmd.value = ''; }}>
            <input name="cmd" placeholder="Request Manifestation..." autoFocus style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', color: '#fff', borderRadius: '15px', outline: 'none', fontSize: '0.9rem' }} />
          </form>
        </div>

        {/* CINEMATIC PREVIEW STAGE */}
        <div style={{ flex: 1, padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #0a0f29 0%, #010413 100%)' }}>
          {manifest.stage === 'idle' ? (
            <div style={{ opacity: 0.1, textAlign: 'center' }}><div style={{ fontSize: '10rem' }}>💎</div><p style={{ letterSpacing: '20px', fontWeight: '900', fontSize: '0.7rem' }}>STUDIO_IDLE</p></div>
          ) : (
            <div style={{ width: '100%', height: '100%', background: manifest.stage === 'live' ? '#fff' : 'transparent', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 80px 150px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', transition: '0.8s ease' }}>
                {manifest.stage === 'live' ? (
                    <div style={{ flex: 1, color: '#000', padding: '80px', textAlign: 'center' }}>
                        <div style={{ width: '50px', height: '50px', background: '#6366f1', borderRadius: '12px', margin: '0 auto 30px' }} />
                        <h2 style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-3px' }}>{manifest.type}</h2>
                        <p style={{ color: '#64748b' }}>Architecture Manifested with Sovereign Precision.</p>
                    </div>
                ) : (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontSize: '1rem', fontWeight: '900', letterSpacing: '10px', animation: 'pulse 2s infinite' }}>MANIFESTING...</div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
