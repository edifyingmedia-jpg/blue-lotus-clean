import React, { useState } from 'react';

const animationKeyframes = `
  @keyframes lotusBloom {
    0% { transform: scale(0.4) translateY(20px); opacity: 0; filter: blur(5px); }
    100% { transform: scale(1) translateY(0); opacity: 1; filter: blur(0); }
  }
  @keyframes petalGlow {
    0%, 100% { filter: drop-shadow(0 0 5px rgba(255, 182, 193, 0.3)); }
    50% { filter: drop-shadow(0 0 15px rgba(255, 182, 193, 0.6)); }
  }
`;

function App() {
  const [view, setView] = useState('landing'); 

  const theme = {
    bg: '#050a14',
    accent: '#ff85a2', // Soft Pink Accent
    text: '#f8fafc',
    border: '1px solid rgba(255, 133, 162, 0.2)'
  };

  const OrganicPinkLotus = () => (
    <div style={{ 
      animation: 'lotusBloom 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards, petalGlow 4s infinite ease-in-out',
      display: 'inline-block',
      marginBottom: '20px'
    }}>
      <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{animationKeyframes}</style>
        {/* Back Petals */}
        <path d="M50 20C60 40 90 50 50 90C10 50 40 40 50 20Z" fill="#ffb6c1" fillOpacity="0.4" />
        <path d="M50 25C75 45 85 75 50 90C15 75 25 45 50 25Z" fill="#ffc0cb" fillOpacity="0.6" />
        {/* Main Spreading Petals */}
        <path d="M50 90C70 70 95 60 85 40C75 20 55 50 50 90Z" fill="#ff85a2" fillOpacity="0.8" />
        <path d="M50 90C30 70 5 60 15 40C25 20 45 50 50 90Z" fill="#ff85a2" fillOpacity="0.8" />
        {/* Front Center Bud */}
        <path d="M50 90C55 75 65 65 50 45C35 65 45 75 50 90Z" fill="#ffffff" fillOpacity="0.9" />
      </svg>
    </div>
  );

  const LandingPage = () => (
    <div style={{ backgroundColor: theme.bg, color: theme.text, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <OrganicPinkLotus />
        <div style={{ fontSize: '1rem', color: theme.accent, letterSpacing: '6px', marginBottom: '10px', fontWeight: 'bold' }}>ESTABLISHED 2026</div>
        <h1 style={{ fontSize: '6rem', fontWeight: '900', margin: '0', letterSpacing: '-3px', lineHeight: '1' }}>
          <span style={{ color: theme.accent }}>Blue</span> Lotus
        </h1>
        <p style={{ fontSize: '1.6rem', color: '#94a3b8', marginTop: '20px', fontWeight: '300' }}>
          Where elegance meets intelligence.
        </p>
        <button 
          onClick={() => setView('workspace')}
          style={{ 
            marginTop: '50px', padding: '22px 55px', backgroundColor: theme.accent, color: '#fff', 
            fontSize: '1.4rem', fontWeight: '800', border: 'none', borderRadius: '50px', 
            cursor: 'pointer', boxShadow: '0 10px 30px rgba(255, 133, 162, 0.3)' 
          }}>
          OPEN WORKSPACE
        </button>
      </div>
    </div>
  );

  const Workspace = () => (
    <div style={{ backgroundColor: theme.bg, color: theme.text, height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      <div style={{ height: '70px', borderBottom: theme.border, display: 'flex', alignItems: 'center', padding: '0 30px', justifyContent: 'space-between', backgroundColor: '#020617' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 0 5px #ff85a2)' }}>🌸</span>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '2px' }}>BLUE LOTUS <span style={{color: theme.accent}}>CORE</span></span>
        </div>
        <button onClick={() => setView('landing')} style={{ background: 'none', border: `1px solid ${theme.accent}`, color: theme.accent, padding: '8px 20px', borderRadius: '5px', cursor: 'pointer' }}>
          EXIT
        </button>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: '450px', borderRight: theme.border, display: 'flex', flexDirection: 'column', backgroundColor: '#070e1b', padding: '25px' }}>
          <div style={{ fontSize: '0.8rem', color: theme.accent, marginBottom: '15px', fontWeight: 'bold' }}>[ STATUS: ACTIVE ]</div>
          <div style={{ flex: 1, backgroundColor: '#000', borderRadius: '15px', padding: '20px', border: '1px solid #1e293b', color: theme.accent }}>
            <div>// Ready to build...</div>
          </div>
          <textarea placeholder="Describe your vision..." style={{ width: '100%', height: '100px', marginTop: '20px', padding: '15px', backgroundColor: '#111827', border: `1px solid #1e293b`, borderRadius: '10px', color: '#fff' }} />
          <button style={{ width: '100%', marginTop: '15px', padding: '15px', backgroundColor: theme.accent, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>GENERATE</button>
        </div>
        <div style={{ flex: 1, backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '90%', height: '90%', backgroundColor: '#fff', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>PREVIEW WINDOW</div>
        </div>
      </div>
    </div>
  );

  return view === 'landing' ? <LandingPage /> : <Workspace />;
}

export default App;
