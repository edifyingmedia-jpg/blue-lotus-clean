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

  if (user) {
    return (
      <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '4rem', color: '#38bdf8' }}>🪷 Blue Lotus</h1>
        <p style={{ fontSize: '1.5rem' }}>Logged in as: <strong>{user.email}</strong></p>
        <button onClick={() => supabase.auth.signOut()} style={{ marginTop: '30px', padding: '15px 40px', backgroundColor: '#e11d48', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.2rem', cursor: 'pointer' }}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '4rem', color: '#38bdf8', marginBottom: '20px' }}>🪷 Blue Lotus</h1>
      <div style={{ padding: '40px', backgroundColor: '#1e293b', borderRadius: '20px', border: '2px solid #38bdf8', width: '350px' }}>
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '8px', fontSize: '1.1rem' }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '100%', padding: '15px', marginBottom: '20px', borderRadius: '8px', fontSize: '1.1rem' }} 
        />
        <button onClick={handleLogin} style={{ width: '100%', padding: '15px', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '1.3rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}>
          LOG IN
        </button>
        <button onClick={handleSignUp} style={{ width: '100%', background: 'none', color: '#38bdf8', border: '1px solid #38bdf8', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
          Create New Account
        </button>
      </div>
    </div>
  );
}

export default App;
