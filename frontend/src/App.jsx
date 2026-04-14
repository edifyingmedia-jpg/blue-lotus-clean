import React, { useState, useEffect } from 'react';

const animationKeyframes = `
  @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: 0%; } }
  @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
  @keyframes slideRight { from { width: 0%; } to { width: 100%; } }
`;

function App() {
  const [view, setView] = useState('landing'); 
  const [booting, setBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [credits, setCredits] = useState(10);
  const [masterVault, setMasterVault] = useState(0.00);
  const [backendDrain, setBackendDrain] = useState(14); 

  const theme = {
    bg: '#010204', blue: '#38bdf8', purple: '#a78bfa', gold: '#fbbf24',
    border: '1px solid rgba(56, 189, 248, 0.12)', fontMono: '"JetBrains Mono", monospace'
  };

  // --- THE BOOT SEQUENCE TRIGGER ---
  const triggerBoot = () => {
    setBooting(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setBootProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setBooting(false);
          setView('workspace');
        }, 500);
      }
    }, 100);
  };

  // --- BOOT OVERLAY COMPONENT ---
  const BootSequence = () => (
    <div style={{ backgroundColor: '#000', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: theme.fontMono }}>
      <div style={{ color: theme.blue, fontSize: '0.8rem', marginBottom: '20px', letterSpacing: '4px' }}>INITIALIZING_TWIN_CORE...</div>
      <div style={{ width: '300px', height: '2px', backgroundColor: '#111827', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${bootProgress}%`, height: '100%', backgroundColor: theme.blue, transition: 'width 0.1s linear' }} />
      </div>
      <div style={{ marginTop: '15px', color: '#475569', fontSize: '0.6rem' }}>
        {bootProgress < 40 && "FETCHING_VAULT_INTEGRITY..."}
        {bootProgress >= 40 && bootProgress < 80 && "LOADING_HEURISTIC_ENGINE..."}
        {bootProgress >= 80 && "STABLIZING_BACKEND_BRIDGE..."}
      </div>
    </div>
  );

  const Workspace = () => (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: theme.fontMono }}>
      <style>{animationKeyframes}</style>

      {/* HEADER */}
      <div style={{ height: '65px', borderBottom: theme.border, display: 'flex', alignItems: 'center', padding: '0 25px', justifyContent: 'space-between', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '1.2rem', color: theme.blue }}>🪷</span>
          <span style={{ fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px' }}>BLUE_LOTUS_CORE</span>
        </div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.6rem', color: '#475569' }}>MASTER_VAULT_10%</span>
            <span style={{ color: theme.blue, fontWeight: 'bold' }}>${masterVault.toFixed(2)}</span>
          </div>
          <div style={{ backgroundColor: '#0a101f', padding: '5px 12px', border: '1px solid #1e293b', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>FUEL: </span>
            <span style={{ color: theme.gold, fontWeight: 'bold' }}>{credits}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* CONSOLE */}
        <div style={{ width: '450px', borderRight: theme.border, display: 'flex', flexDirection: 'column', backgroundColor: '#010204', padding: '20px' }}>
          <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '15px', color: theme.blue, fontSize: '0.85rem', position: 'relative', overflowY: 'auto' }}>
            <div>// TWIN_AUDIT_LOG: v4.8</div>
            <div style={{ color: '#475569', marginTop: '5px' }}>[04:44:51] SYSTEM_BOOT_SUCCESSFUL</div>
            <div style={{ color: '#475569' }}>[04:44:52] MONITORING_RESOURCE_DRAIN...</div>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: theme.blue, opacity: 0.2, animation: 'scanline 4s linear infinite' }} />
          </div>
          <textarea placeholder="Direct TWIN to build..." style={{ width: '100%', height: '80px', marginTop: '20px', padding: '15px', backgroundColor: '#0a0f1d', border: theme.border, borderRadius: '4px', color: '#fff' }} />
          <button style={{ width: '100%', marginTop: '10px', padding: '15px', backgroundColor: theme.blue, color: '#000', fontWeight: '900', border: 'none', borderRadius: '4px' }}>EXECUTE_BUILD</button>
        </div>

        {/* PREVIEW */}
        <div style={{ flex: 1, backgroundColor: '#020408', padding: '30px' }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: '4px' }} />
        </div>
      </div>
    </div>
  );

  if (booting) return <BootSequence />;

  return view === 'landing' ? (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '7rem', fontWeight: '900' }}><span style={{ color: theme.blue }}>Blue</span> Lotus</h1>
      <button onClick={triggerBoot} style={{ marginTop: '30px', padding: '20px 60px', background: 'none', border: `1px solid ${theme.blue}`, color: theme.blue, fontWeight: 'bold', cursor: 'pointer' }}>LAUNCH_CORE</button>
    </div>
  ) : <Workspace />;
}

export default App;
