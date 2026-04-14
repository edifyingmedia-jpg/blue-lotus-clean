import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE CONFIGURATION ---
// These use your existing environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [user, setUser] = useState(null);

  // Check if a user is already logged in when the page loads
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Function to handle Google Login
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  // Function to handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ 
      backgroundColor: '#1a1a2e', 
      color: '#fff', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3.5rem', color: '#e94560', marginBottom: '10px' }}>🪷 Blue Lotus</h1>
      
      <div style={{ 
        padding: '30px', 
        border: '1px solid #e94560', 
        borderRadius: '20px',
        backgroundColor: '#16213e',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        {!user ? (
          <>
            <p style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Welcome to the next generation of Blue Lotus.</p>
            <button 
              onClick={handleLogin}
              style={{
                padding: '12px 30px',
                backgroundColor: '#e94560',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
              Login with Google
            </button>
          </>
        ) : (
          <>
            <p style={{ marginBottom: '20px' }}>Logged in as: <strong>{user.email}</strong></p>
            <button 
              style={{
                padding: '10px 20px',
                backgroundColor: '#0f3460',
                color: 'white',
                border: '1px solid #e94560',
                borderRadius: '8px',
                cursor: 'pointer',
                marginRight: '10px'
              }}>
              Enter Dashboard
            </button>
            <button 
              onClick={handleLogout}
              style={{ color: '#e94560', background: 'none', border: 'none', cursor: 'pointer' }}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
