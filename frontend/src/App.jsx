import React, { useState } from 'react';

const animationKeyframes = `
  @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: 0%; } }
  @keyframes vaultGlow { 0%, 100% { text-shadow: 0 0 5px #38bdf8; } 50% { text-shadow: 0 0 15px #38bdf8; } }
`;

function App() {
  const [view, setView] = useState('landing'); 
  const [credits, setCredits] = useState(10);
  const [isMember, setIsMember] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [masterVault, setMasterVault] = useState(0.00); // 10% Platform Fee Accumulator
  const [consoleLog, setConsoleLog] = useState([
    "// TWIN_SOVEREIGN_CORE: v4.5",
    "// ECONOMY_PROTOCOL: 10%_TAX_ENABLED",
    "// Awaiting master command..."
  ]);

  const theme = {
    bg: '#010204', blue: '#38bdf8', purple: '#a78bfa', gold: '#fbbf24',
    border: '1px solid rgba(56, 189, 248, 0.15)', fontMono: '"JetBrains Mono", monospace'
  };

  // --- TWIN'S ECONOMIC ENFORCEMENT ---
  const handleSaleSimulation = (amount) => {
    const tax = amount * 0.10;
    const sellerShare = amount * 0.90;
    setMasterVault(prev => prev + tax);
    setConsoleLog(prev => [...prev, 
      `> TRANSACTION_DETECTED: $${amount.toFixed(2)}`,
      `> TWIN: 'Deducting 10% Sovereign Tax ($${tax.toFixed(2)}).'`,
      `> SELLER_CREDIT: $${sellerShare.toFixed(2)} distributed.`
    ]);
  };

  const Workspace = () => (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: theme.fontMono }}>
      <style>{animationKeyframes}</style>

      {/* HEADER WITH MASTER VAULT */}
      <div style={{ height: '60px', borderBottom: theme.border, display: 'flex', alignItems: 'center', padding: '0 25px', justifyContent: 'space-between', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '1.5rem' }}>🪷</span>
          <span style={{ fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px', color: theme.blue }}>BLUE_LOTUS_CORE</span>
        </div>

        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          {/* THE MASTER VAULT (Visible only to you/system) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.6rem', color: '#475569' }}>MASTER_VAULT_SHARE (10%)</span>
            <span style={{ color: theme.blue, fontWeight: 'bold', animation: 'vaultGlow 2s infinite' }}>${masterVault.toFixed(2)}</span>
          </div>
          <div style={{ backgroundColor: '#0a101f', padding: '5px 12px', border: '1px solid #1e293b', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>FUEL: </span>
            <span style={{ color: theme.gold, fontWeight: 'bold' }}>{credits}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* TWIN CONSOLE */}
        <div style={{ width: '450px', borderRight: theme.border, display: 'flex', flexDirection: 'column', backgroundColor: '#010204', padding: '20px' }}>
          <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '15px', color: theme.blue, fontSize: '0.85rem', position: 'relative', overflowY: 'auto' }}>
            {consoleLog.map((line, i) => <div key={i} style={{ marginBottom: '5px' }}>{line}</div>)}
            {isGenerating && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: theme.blue, animation: 'scanline 4s linear infinite' }} />}
          </div>

          <div style={{ marginTop: '20px' }}>
             <button 
                onClick={() => handleSaleSimulation(100)}
                style={{ width: '100%', marginBottom: '10px', padding: '8px', border: `1px solid ${theme.gold}`, color: theme.gold, background: 'none', fontSize: '0.6rem', cursor: 'pointer' }}>
                [ SIMULATE_STORE_SALE_$100 ]
             </button>
             <textarea placeholder="Direct TWIN to build..." style={{ width: '100%', height: '80px', padding: '15px', backgroundColor: '#0a0f1d', border: theme.border, borderRadius: '4px', color: '#fff' }} />
             <button style={{ width: '100%', marginTop: '10px', padding: '15px', backgroundColor: theme.blue, color: '#000', fontWeight: '900', border: 'none', borderRadius: '4px' }}>
               EXECUTE_BUILD
             </button>
          </div>
        </div>

        {/* PREVIEW */}
        <div style={{ flex: 1, backgroundColor: '#020408', padding: '30px' }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: '4px' }} />
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
