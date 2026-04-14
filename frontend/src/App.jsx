import React, { useState, useRef } from 'react';

const animationKeyframes = `
  @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: 0%; } }
  @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
`;

function App() {
  const [view, setView] = useState('landing'); 
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastState, setLastState] = useState(null); // TWIN's Memory
  const [consoleLog, setConsoleLog] = useState(["// TWIN_SOVEREIGN: v5.0", "// SAFETY_FIREWALL: ARMED"]);
  const [prompt, setPrompt] = useState("");

  const theme = {
    bg: '#010204', blue: '#38bdf8', purple: '#a78bfa', red: '#ef4444',
    border: '1px solid rgba(56, 189, 248, 0.12)', fontMono: '"JetBrains Mono", monospace'
  };

  // --- INTERRUPT & PIVOT LOGIC ---
  const handleHalt = () => {
    setIsGenerating(false);
    setConsoleLog(prev => [...prev, "!! INTERRUPT_RECEIVED.", `> TWIN: 'Halt successful. Memory cached at state: ${lastState || "ARCH_INIT"}. Awaiting pivot instructions.'`]);
  };

  const handleExecute = () => {
    // 1. Safety Check (Strictly Non-Sexual/Perverse)
    const safetyTriggers = ["nsfw", "sexy", "perverse", "porn"]; 
    if (safetyTriggers.some(word => prompt.toLowerCase().includes(word))) {
      setConsoleLog(prev => [...prev, "!! VIOLATION_DETECTED.", "> TWIN: 'Request denied. I do not produce perverse content. This incident has been logged for the Master.'"]);
      return;
    }

    setIsGenerating(true);
    setLastState("BUILDING_LOGIC");
    setConsoleLog(prev => [...prev, "> TWIN: 'Resuming architecture. Balancing new parameters...'"]);
    
    // Simulate smart build
    setTimeout(() => {
      if (isGenerating) {
        setIsGenerating(false);
        setConsoleLog(prev => [...prev, "> MODULE_REFINED. BALANCE_OPTIMAL."]);
      }
    }, 4000);
  };

  const Workspace = () => (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: theme.fontMono }}>
      <style>{animationKeyframes}</style>

      {/* HEADER */}
      <div style={{ height: '65px', borderBottom: theme.border, display: 'flex', alignItems: 'center', padding: '0 25px', justifyContent: 'space-between', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '1.2rem', color: theme.blue }}>🪷</span>
          <span style={{ fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px' }}>BLUE_LOTUS_CORE</span>
        </div>
        <div style={{ fontSize: '0.65rem', color: isGenerating ? theme.purple : theme.blue }}>
          {isGenerating ? "● TWIN_CONSTRUCTING..." : "○ TWIN_AWAITING_COMMAND"}
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* CONSOLE */}
        <div style={{ width: '450px', borderRight: theme.border, display: 'flex', flexDirection: 'column', backgroundColor: '#010204', padding: '20px' }}>
          <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '15px', color: theme.blue, fontSize: '0.85rem', position: 'relative', overflowY: 'auto' }}>
            {consoleLog.map((line, i) => <div key={i} style={{ marginBottom: '5px' }}>{line}</div>)}
            {isGenerating && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: theme.blue, animation: 'scanline 3s linear infinite' }} />}
          </div>

          <div style={{ marginTop: '20px' }}>
             <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="Pivot TWIN's focus..." 
               style={{ width: '100%', height: '80px', padding: '15px', backgroundColor: '#0a0f1d', border: theme.border, borderRadius: '4px', color: '#fff', outline: 'none' }} 
             />
             <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={handleExecute} style={{ flex: 2, padding: '15px', backgroundColor: theme.blue, color: '#000', fontWeight: '900', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  {isGenerating ? "REFINING..." : "EXECUTE"}
                </button>
                {isGenerating && (
                  <button onClick={handleHalt} style={{ flex: 1, padding: '15px', backgroundColor: theme.red, color: '#fff', fontWeight: '900', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    HALT
                  </button>
                )}
             </div>
          </div>
        </div>

        {/* SMART PREVIEW */}
        <div style={{ flex: 1, backgroundColor: '#020408', padding: '30px' }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: '4px', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(0,0,0,0.8)', color: theme.blue, padding: '5px 12px', fontSize: '0.6rem', borderRadius: '20px' }}>
               UI_STABILITY: BALANCED
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return view === 'landing' ? (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '7rem', fontWeight: '900' }}><span style={{ color: theme.blue }}>Blue</span> Lotus</h1>
      <button onClick={() => setView('workspace')} style={{ marginTop: '30px', padding: '20px 80px', background: 'none', border: `1px solid ${theme.blue}`, color: theme.blue, fontWeight: 'bold', cursor: 'pointer' }}>ENTER_CORE</button>
    </div>
  ) : <Workspace />;
}

export default App;
