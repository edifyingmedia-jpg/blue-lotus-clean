import React, { useState } from 'react';

const animationKeyframes = `
  @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: 0%; } }
  @keyframes warning { 0%, 100% { color: #38bdf8; } 50% { color: #ef4444; } }
`;

function App() {
  const [view, setView] = useState('landing'); 
  const [credits, setCredits] = useState(10);
  const [masterVault, setMasterVault] = useState(0.00);
  const [backendDrain, setBackendDrain] = useState(42); // Percentage of personal cap used
  const [isOwner, setIsOwner] = useState(true);

  const theme = {
    bg: '#010204', blue: '#38bdf8', purple: '#a78bfa', gold: '#fbbf24', red: '#ef4444',
    border: '1px solid rgba(56, 189, 248, 0.12)', fontMono: '"JetBrains Mono", monospace'
  };

  const Workspace = () => (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: theme.fontMono }}>
      <style>{animationKeyframes}</style>

      {/* HEADER WITH DRAIN MONITOR */}
      <div style={{ height: '65px', borderBottom: theme.border, display: 'flex', alignItems: 'center', padding: '0 25px', justifyContent: 'space-between', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '1.5rem' }}>🪷</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px', color: theme.blue }}>BLUE_LOTUS_CORE</span>
            <span style={{ fontSize: '0.6rem', color: theme.purple }}>TWIN_WARDEN: ACTIVE</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          {/* HOSTED RESOURCE MONITOR */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '150px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#64748b', marginBottom: '4px' }}>
              <span>BACKEND_DRAIN</span>
              <span style={{ color: backendDrain > 80 ? theme.red : theme.blue }}>{backendDrain}%</span>
            </div>
            <div style={{ height: '4px', width: '100%', backgroundColor: '#111827', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${backendDrain}%`, backgroundColor: backendDrain > 80 ? theme.red : theme.blue, transition: 'width 0.5s' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.6rem', color: '#475569' }}>VAULT_SHARE</span>
            <span style={{ color: theme.blue, fontWeight: 'bold' }}>${masterVault.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* CONSOLE */}
        <div style={{ width: '450px', borderRight: theme.border, display: 'flex', flexDirection: 'column', backgroundColor: '#010204', padding: '20px' }}>
          <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '15px', color: theme.blue, fontSize: '0.85rem', position: 'relative', overflowY: 'auto' }}>
            <div>// TWIN_WARDEN: MONITORING RESIDENT APPS...</div>
            {backendDrain > 90 && <div style={{ color: theme.red, animation: 'warning 1s infinite' }}>!! CRITICAL: RESOURCE_CAP_REACHED.</div>}
            <div style={{ marginTop: '10px' }}>&gt; TWIN: 'I am protecting the Master's infrastructure from unauthorized drain.'</div>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: theme.blue, opacity: 0.2, animation: 'scanline 4s linear infinite' }} />
          </div>

          <div style={{ marginTop: '20px' }}>
             <button 
                onClick={() => setBackendDrain(d => Math.min(d + 15, 100))}
                style={{ width: '100%', marginBottom: '10px', padding: '8px', border: `1px solid ${theme.red}`, color: theme.red, background: 'none', fontSize: '0.6rem', cursor: 'pointer' }}>
                [ SIMULATE_CLIENT_TRAFFIC_SPIKE ]
             </button>
             <textarea placeholder="Direct TWIN to build..." style={{ width: '100%', height: '80px', padding: '15px', backgroundColor: '#0a0f1d', border: theme.border, borderRadius: '4px', color: '#fff' }} />
             <button style={{ width: '100%', marginTop: '10px', padding: '15px', backgroundColor: theme.blue, color: '#000', fontWeight: '900', border: 'none', borderRadius: '4px' }}>
               EXECUTE_BUILD
             </button>
          </div>
        </div>

        {/* PREVIEW */}
        <div style={{ flex: 1, backgroundColor: '#020408', padding: '30px' }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             {backendDrain >= 100 && (
               <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.red, fontWeight: 'bold' }}>
                 SYSTEM_THROTTLED: PURCHASE_TRAFFIC_BRIDGE_TO_RESUME
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );

  return view === 'landing' ? (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '7rem', fontWeight: '900' }}><span style={{ color: theme.blue }}>Blue</span> Lotus</h1>
      <button onClick={() => setView('workspace')} style={{ marginTop: '30px', padding: '20px 60px', background: 'none', border: `1px solid ${theme.blue}`, color: theme.blue, fontWeight: 'bold', cursor: 'pointer' }}>ENTER_CORE</button>
    </div>
  ) : <Workspace />;
}

export default App;
