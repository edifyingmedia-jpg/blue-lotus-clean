import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Account created! Now click "LOG IN"');
  };

  // --- NEW DASHBOARD VIEW ---
  if (user) {
    return (
      <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '4rem', color: '#38bdf8', marginBottom: '10px' }}>🪷 Blue Lotus</h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '30px' }}>Dashboard for: {user.email}</p>
        
        <div style={{ display: 'grid', gap: '20px', width: '100%', maxWidth: '500px' }}>
          
          <button style={{ padding: '30px', backgroundColor: '#1e293b', color: '#38bdf8', border: '3px solid #38bdf8', borderRadius: '20px', fontSize: '1.8rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
            🍎 Diet Tracker
          </button>

          <button style={{ padding: '30px', backgroundColor: '#1e293b', color: '#38bdf8', border: '3px solid #38bdf8', borderRadius: '20px', fontSize: '1.8rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
            🤖 AI App Builder
          </button>

          <button onClick={() => supabase.auth.signOut()} style={{ marginTop: '20px', padding: '15px', color: '#e11d48', background: 'none', border: '2px solid #e11d48', borderRadius: '10px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}>
            Sign Out
          </button>
          
        </div>
      </div>
    );
  }

  // --- SIGN IN VIEW ---
  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '4.5rem', color: '#38bdf8', marginBottom: '20px' }}>🪷 Blue Lotus</h1>
      <div style={{ padding: '40px', backgroundColor: '#1e293b', borderRadius: '25px', border: '2px solid #38bdf8', width: '350px' }}>
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '8px', fontSize: '1.2rem' }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '100%', padding: '15px', marginBottom: '25px', borderRadius: '8px', fontSize: '1.2rem' }} 
        />
        <button onClick={handleLogin} style={{ width: '100%', padding: '15px', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '1.4rem', fontWeight: 'bold', cursor: 'pointer' }}>
          LOG IN
        </button>
      </div>
    </div>
  );
}

export default App;
