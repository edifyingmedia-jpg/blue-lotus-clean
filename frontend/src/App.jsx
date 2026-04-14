import React, { useState } from 'react';

function App() {
  const [view, setView] = useState('landing'); 

  // --- PREMIUM THEME COLORS ---
  const theme = {
    bg: '#050a14',         // Deep Space Navy
    card: '#0f172a',       // Slate Card
    accent: '#38bdf8',     // Electric Cyan
    text: '#f8fafc',       // Ice White
    border: '1px solid rgba(56, 189, 248, 0.2)'
  };

  // --- 1. THE LANDING PAGE (The "Face") ---
  const LandingPage = () => (
    <div style={{ backgroundColor: theme.bg, color: theme.text, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '1.2rem', color: theme.accent, letterSpacing: '4px', marginBottom: '10px', fontWeight: 'bold' }}>INTRODUCING</div>
        <h1 style={{ fontSize: '6rem', fontWeight: '900', margin: '0', letterSpacing: '-3px', lineHeight: '1' }}>
          <span style={{ color: theme.accent }}>🪷 Blue</span> Lotus
        </h1>
        <p style={{ fontSize: '1.8rem', color: '#94a3b8', marginTop: '20px', fontWeight: '300' }}>
          Build software at the speed of thought.
        </p>
        
        <button 
          onClick={() => setView('workspace')}
          style={{ 
            marginTop: '50px', padding: '25px 60px', backgroundColor: theme.accent, color: theme.bg, 
            fontSize: '1.6rem', fontWeight: '900', border: 'none', borderRadius: '12px', 
            cursor: 'pointer', boxShadow: '0 0 40px rgba(56, 189, 248, 0.4)', transition: 'transform 0.2s'
          }}>
          LAUNCH WORKSPACE
        </button>
      </div>
    </div>
  );

  // --- 2. THE WORKSPACE (Emergent-Style 2-Column) ---
  const Workspace = () => (
    <div style={{ backgroundColor: theme.bg, color: theme.text, height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      
      {/* Sleek Top Header */}
      <div style={{ height: '70px', borderBottom: theme.border, display: 'flex', alignItems: 'center', padding: '0 30px', justifyContent: 'space-between', backgroundColor: '#020617' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '1.5rem' }}>🪷</span>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '2px' }}>BLUE LOTUS <span style={{color: theme.accent}}>CORE</span></span>
        </div>
        <button onClick={() => setView('landing')} style={{ background: 'none', border: `1px solid ${theme.accent}`, color: theme.accent, padding: '8px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9rem' }}>
          EXIT
        </button>
      </div>

      {/* Main Container */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* LEFT COLUMN: THE AI CONSOLE */}
        <div style={{ width: '450px', borderRight: theme.border, display: 'flex', flexDirection: 'column', backgroundColor: '#070e1b', padding: '25px' }}>
          <div style={{ fontSize: '0.8rem', color: theme.accent, marginBottom: '15px', fontWeight: 'bold' }}>[ STATUS: CONNECTED ]</div>
          
          <div style={{ flex: 1, backgroundColor: '#000', borderRadius: '15px', padding: '20px', border: '1px solid #1e293b', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)', color: '#38bdf8' }}>
            <div style={{ opacity: 0.5 }}>// System initialized...</div>
            <div style={{ opacity: 0.5 }}>// Ready for instructions...</div>
          </div>

          <div style={{ marginTop: '25px' }}>
            <textarea 
              placeholder="What are we building today?" 
              style={{ width: '100%', height: '120px', padding: '20px', backgroundColor: '#111827', border: `2px solid #1e293b`, borderRadius: '12px', color: '#fff', fontSize: '1.1rem', outline: 'none', resize: 'none' }} 
            />
            <button style={{ width: '100%', marginTop: '15px', padding: '15px', backgroundColor: theme.accent, color: theme.bg, border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
              GENERATE APP
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: THE LIVE PREVIEW */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#020617' }}>
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
