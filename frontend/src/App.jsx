import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- NEURAL BRIDGE CONFIGURATION ---
const supabaseUrl = 'https://ehbpmjknjmgroucacsru.supabase.co';
const supabaseAnonKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnBtamtuam1ncm91Y2Fjc3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzc4NzUsImV4cCI6MjA5MTYxMzg3NX0.13spZuJdIWBVVSIhLvdO9uYmGVEzi70oBsObBwVJiOo''; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const animationKeyframes = `
  @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: 0%; } }
  @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
`;

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [consoleLog, setConsoleLog] = useState(["// TWIN_CORE: ONLINE", "// AUTH_LEVEL: MASTER_OWNER"]);

  useEffect(() => {
    // Check for active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setView('workspace');
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session) setView('workspace');
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin }
    });
  };

  const Workspace = () => (
    <div style={{ backgroundColor: '#010204', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      <style>{animationKeyframes}</style>
      <div style={{ height: '65px', borderBottom: '1px solid rgba(56, 189, 248, 0.12)', display: 'flex', alignItems: 'center', padding: '0 25px', justifyContent: 'space-between', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '1.2rem', color: '#38bdf8' }}>🪷</span>
          <span style={{ fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px' }}>BLUE_LOTUS_CORE</span>
        </div>
        <div style={{ fontSize: '0.65rem', color: '#38bdf8' }}>
          AUTHENTICATED_MASTER: {user?.email}
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: '450px', borderRight: '1px solid rgba(56, 189, 248, 0.12)', padding: '20px' }}>
          <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '15px', color: '#38bdf8', fontSize: '0.85rem' }}>
            {consoleLog.map((log, i) => <div key={i}>{log}</div>)}
          </div>
          <button style={{ width: '100%', marginTop: '20px', padding: '15px', backgroundColor: '#38bdf8', color: '#000', fontWeight: '900', border: 'none', cursor: 'pointer' }}>
            EXECUTE_SOVEREIGN_BUILD
          </button>
        </div>
        <div style={{ flex: 1, backgroundColor: '#020408', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#475569' }}>// PREVIEW_ENGINE: READY</p>
        </div>
      </div>
    </div>
  );

  return view === 'landing' ? (
    <div style={{ backgroundColor: '#010204', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '7rem', fontWeight: '900' }}><span style={{ color: '#38bdf8' }}>Blue</span> Lotus</h1>
      <p style={{ color: '#475569', marginBottom: '40px' }}>TWIN_CORE_v5.0 // MASTER_ACCESS_REQUIRED</p>
      <button onClick={handleLogin} style={{ padding: '20px 60px', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
        AUTHORIZE_MASTER_VIA_GITHUB
      </button>
    </div>
  ) : <Workspace />;
}

export default App;
