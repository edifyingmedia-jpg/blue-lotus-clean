import React, { useState } from 'react';

const animationKeyframes = `
  @keyframes modalFade { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: 0%; } }
`;

function App() {
  const [view, setView] = useState('landing'); 
  const [showPaywall, setShowPaywall] = useState(false);
  const [credits, setCredits] = useState(500);
  const [tier, setTier] = useState('MASTER'); // Options: FREE, PRO, MASTER

  const theme = {
    bg: '#010204',
    blue: '#38bdf8',
    purple: '#a78bfa',
    gold: '#fbbf24',
    border: '1px solid rgba(56, 189, 248, 0.12)',
    fontMono: '"JetBrains Mono", monospace'
  };

  // --- THE MEMBERSHIP OVERLAY (The Money Maker) ---
  const PaywallModal = () => (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: '#0f172a', border: `2px solid ${theme.blue}`, borderRadius: '12px', width: '100%', maxWidth: '800px', padding: '40px', animation: 'modalFade 0.3s ease-out' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff' }}>UPGRADE_AUTHORIZATION</h2>
          <p style={{ color: '#64748b' }}>Select a fueling plan to continue building with TWIN_CORE.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Pro Tier */}
          <div style={{ backgroundColor: '#020617', padding: '30px', borderRadius: '8px', border: '1px solid #1e293b', textAlign: 'center' }}>
            <h3 style={{ color: theme.blue, fontSize: '1.5rem' }}>PRO_BUILDER</h3>
            <p style={{ fontSize: '2rem', margin: '20px 0' }}>$29<span style={{ fontSize: '0.8rem', color: '#475569' }}>/mo</span></p>
            <ul style={{ list-style: 'none', padding: 0, color: '#94a3b8', fontSize: '0.8rem', textAlign: 'left', marginBottom: '30px' }}>
              <li>✓ 2,000 Credits Monthly</li>
              <li>✓ Private Backend Hosting</li>
              <li>✓ Standard TWIN Intelligence</li>
            </ul>
            <button style={{ width: '100%', padding: '12px', backgroundColor: theme.blue, color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px' }}>ACTIVATE</button>
          </div>

          {/* Master Tier */}
          <div style={{ backgroundColor: '#020617', padding: '30px', borderRadius: '8px', border: `1px solid ${theme.gold}`, textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: theme.gold, color: '#000', padding: '2px 10px', fontSize: '0.6rem', fontWeight: 'bold', borderRadius: '10px' }}>RECOMMENDED</div>
            <h3 style={{ color: theme.gold, fontSize: '1.5rem' }}>MASTER_ARCHITECT</h3>
            <p style={{ fontSize: '2rem', margin: '20px 0' }}>$99<span style={{ fontSize: '0.8rem', color: '#475569' }}>/mo</span></p>
            <ul style={{ list-style: 'none', padding: 0, color: '#94a3b8', fontSize: '0.8rem', textAlign: 'left', marginBottom: '30px' }}>
              <li>✓ Unlimited Build Credits</li>
              <li>✓ White-Label Deployment</li>
              <li>✓ Full TWIN_SOVEREIGN Mode</li>
            </ul>
            <button style={{ width: '100%', padding: '12px', backgroundColor: theme.gold, color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px' }}>ACTIVATE</button>
          </div>
        </div>
        <button onClick={() => setShowPaywall(false)} style={{ marginTop: '30px', background: 'none', border: 'none', color: '#475569', width: '100%', cursor: 'pointer' }}>[ CLOSE_SYSTEM_MENU ]</button>
      </div>
    </div>
  );

  const Workspace = () => (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: theme.fontMono, position: 'relative' }}>
      <style>{animationKeyframes}</style>
      
      {showPaywall && <PaywallModal />}

      {/* HEADER */}
      <div style={{ height: '60px', borderBottom: theme.border, display: 'flex', alignItems: 'center', padding: '0 25px', justifyContent: 'space-between', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 0 5px #38bdf8)' }}>🪷</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px' }}>BLUE_LOTUS_CORE</span>
            <span style={{ fontSize: '0.6rem', color: theme.purple }}>AUTH_LEVEL: {tier}_ARCHITECT</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div onClick={() => setShowPaywall(true)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#0a101f', padding: '5px 15px', borderRadius: '4px', border: '1px solid #1e293b' }}>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>FUEL:</span>
            <span style={{ color: theme.gold, fontWeight: 'bold' }}>{credits}</span>
            <span style={{ color: theme.blue, fontSize: '0.6rem' }}>[+]</span>
          </div>
          <button onClick={() => setView('landing')} style={{ color: '#475569', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem' }}>[ DISCONNECT ]</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* LEFT CONSOLE */}
        <div style={{ width: '450px', borderRight: theme.border, display: 'flex', flexDirection: 'column', backgroundColor: '#010204', padding: '20px' }}>
          <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '20px', position: 'relative', overflow: 'hidden' }}>
             <div style={{ color: theme.purple, fontSize: '0.85rem' }}>
                <div>[TWIN] Status: Active.</div>
                <div>[TWIN] Tier: {tier}.</div>
                <div style={{ marginTop: '10px', color: theme.blue }}>// Architecting for maximum profitability...</div>
             </div>
             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: theme.blue, opacity: 0.3, animation: 'scanline 3s linear infinite' }} />
          </div>
          <textarea placeholder="Direct TWIN to build..." style={{ width: '100%', height: '100px', marginTop: '20px', padding: '15px', backgroundColor: '#0a0f1d', border: theme.border, borderRadius: '4px', color: '#fff', outline: 'none' }} />
          <button style={{ width: '100%', marginTop: '10px', padding: '15px', backgroundColor: theme.blue, color: '#000', fontWeight: '900', border: 'none', borderRadius: '4px' }}>EXECUTE_BUILD</button>
        </div>

        {/* RIGHT PREVIEW */}
        <div style={{ flex: 1, backgroundColor: '#020408', display: 'flex', flexDirection: 'column', padding: '30px' }}>
          <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 50px 100px rgba(0,0,0,0.7)' }} />
        </div>
      </div>
    </div>
  );

  return view === 'landing' ? <LandingPage onEnter={() => setView('workspace')} /> : <Workspace />;
}

const LandingPage = ({ onEnter }) => (
  <div style={{ backgroundColor: '#010204', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ fontSize: '8rem', fontWeight: '900', letterSpacing: '-6px' }}><span style={{ color: '#38bdf8' }}>Blue</span> Lotus</h1>
    <button onClick={onEnter} style={{ marginTop: '40px', padding: '20px 80px', background: 'none', border: '1px solid #38bdf8', color: '#38bdf8', fontWeight: 'bold', cursor: 'pointer' }}>START_BUILD</button>
  </div>
);

export default App;
