import React, { useState } from 'react';

// --- NEW LUXE ANIMATIONS (Paste this before function App) ---
const animationKeyframes = `
  @keyframes luxeBloom {
    0% { transform: scale(0.3) translateY(30px); opacity: 0; filter: blur(8px); }
    100% { transform: scale(1) translateY(0); opacity: 1; filter: blur(0); }
  }
  @keyframes petalPulsate {
    0%, 100% { filter: drop-shadow(0 0 5px rgba(56, 189, 248, 0.4)); opacity: 0.9; }
    50% { filter: drop-shadow(0 0 20px rgba(56, 189, 248, 0.8)); opacity: 1; }
  }
`;

function App() {
  const [view, setView] = useState('landing'); 

  // --- "BLUE AMETHYST" LUXE THEME COLORS ---
  const theme = {
    bg: '#02040a',         // Deep Amethyst Black (Luxe)
    card: '#0f172a',       // Slate Amethyst Card
    blue: '#38bdf8',       // Electric Cyan Blue (for "Blue")
    purple: '#a78bfa',     // Vibrant Soft Amethyst (for petals)
    border: '2px solid rgba(56, 189, 248, 0.3)', // Cyan Border
    text: '#f8fafc'        // Ice White Text
  };

  // --- THE BLUE & AMETHYST LUXE LOTUS ---
  const LuxeLotusLogo = () => (
    <div style={{ 
      animation: 'luxeBloom 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards, petalPulsate 6s infinite ease-in-out',
      display: 'inline-block',
      marginBottom: '15px'
    }}>
      <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{animationKeyframes}</style>
        
        {/* Deep Core (Luxe Purple) */}
        <path d="M50 20C60 40 90 50 50 90C10 50 40 40 50 20Z" fill={theme.purple} fillOpacity="0.4" />
        <path d="M50 25C75 45 85 75 50 90C15 75 25 45 50 25Z" fill={theme.purple} fillOpacity="0.6" />
        
        {/* Spreading Tips (Electric Blue) */}
        <path d="M50 90C70 70 95 60 85 40C75 20 55 50 50 90Z" fill={theme.blue} fillOpacity="0.7" stroke={theme.blue} strokeWidth="0.5"/>
        <path d="M50 90C30 70 5 60 15 40C25 20 45 50 50 90Z" fill={theme.blue} fillOpacity="0.7" stroke={theme.blue} strokeWidth="0.5"/>
        
        {/* Front Bud (Glowing Core) */}
        <path d="M50 90C55 75 65 65 50 45C35 65 45 75 50 90Z" fill="#ffffff" fillOpacity="0.95" />
      </svg>
    </div>
  );

  // --- 1. THE LUXE LANDING PAGE (The "Face") ---
  const LandingPage = () => (
    <div style={{ backgroundColor: theme.bg, color: theme.text, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        
        <LuxeLotusLogo />

        <div style={{ fontSize: '1rem', color: theme.blue, letterSpacing: '8px', marginBottom: '10px', fontWeight: 'bold' }}>ESTABLISHED 2026</div>
        
        <h1 style={{ fontSize: '7rem', fontWeight: '900', margin: '0', letterSpacing: '-4px', lineHeight: '0.9' }}>
          <span style={{ color: theme.blue }}>Blue</span> Lotus
        </h1>
        
        <p style={{ fontSize: '1.8rem', color: '#94a3b8', marginTop: '20px', fontWeight: '300', maxWidth: '700px' }}>
          An organic fusion of luxury design and cognitive intelligence.
        </p>
        
        <button 
          onClick={() => setView('workspace')}
          style={{ 
            marginTop: '60px', padding: '25px 70px', backgroundColor: theme.blue, color: theme.bg, 
            fontSize: '1.6rem', fontWeight: '900', border: 'none', borderRadius: '12px', 
            cursor: 'pointer', boxShadow: '0 0 50px rgba(56, 189, 248, 0.5)', transition: 'transform 0.1s'
          }}>
          LAUNCH CORE
        </button>
      </div>
    </div>
  );

  // --- 2. THE WORKSPACE (Emergent-Style 2-Column) ---
  const Workspace = () => (
    <div style={{ backgroundColor: theme.bg, color: theme.text, height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      
      {/* Luxe Header */}
      <div style={{ height: '70px', borderBottom: `1px solid rgba(56, 189, 248, 0.1)`, display: 'flex', alignItems: 'center', padding: '0 30px', justifyContent: 'space-between', backgroundColor: '#010205' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 0 5px #38bdf8)' }}>🪷</span>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '2px' }}>
            <span style={{color: theme.blue}}>BLUE</span> LOTUS <span style={{color: theme.purple}}>CORE</span>
          </span>
        </div>
        <button onClick={() => setView('landing')} style={{ background: 'none', border: `1px solid ${theme.blue}`, color: theme.blue, padding: '8px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9rem' }}>
          EXIT
        </button>
      </div>

      {/* Main Container */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* LEFT COLUMN: THE AI CONSOLE (Narrower, Focused) */}
        <div style={{ width: '400px', borderRight: `1px solid rgba(56, 189, 248, 0.1)`, display: 'flex', flexDirection: 'column', backgroundColor: '#040710', padding: '25px' }}>
          <div style={{ fontSize: '0.8rem', color: theme.blue, marginBottom: '15px', fontWeight: 'bold' }}>[ STATUS: CONNECTED ]</div>
          
          <div style={{ flex: 1, backgroundColor: '#000', borderRadius: '15px', padding: '20px', border: '1px solid #111827', color: theme.blue, overflowY: 'auto' }}>
            <div>// Ready...</div>
          </div>

          <div style={{ marginTop: '25px' }}>
            <textarea 
              placeholder="Describe your vision..." 
              style={{ width: '100%', height: '110px', padding: '18px', backgroundColor: theme.card, border: `2px solid #1e293b`, borderRadius: '12px', color: '#fff', fontSize: '1.1rem', outline: 'none', resize: 'none' }} 
            />
            <button style={{ width: '100%', marginTop: '15px', padding: '18px', backgroundColor: theme.blue, color: theme.bg, border: 'none', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}>
              GENERATE
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: THE LIVE PREVIEW */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#010205' }}>
          <div style={{ padding: '10px 30px', fontSize: '0.7rem', color: '#475569', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            LIVE PREVIEW RENDER
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{ color: '#cbd5e1', fontSize: '1.5rem', fontWeight: 'bold' }}>APPLICATION PREVIEW</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return view === 'landing' ? <LandingPage /> : <Workspace />;
}

export default App;
