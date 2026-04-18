import React, { useState } from 'react';
import { RefreshCw, Send, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

const App = () => {
  const [view, setView] = useState("garden"); 
  const [prompt, setPrompt] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [consoleLogs, setConsoleLogs] = useState([]);

  const handleBeginCultivation = async (overridePrompt) => {
    const activePrompt = overridePrompt || prompt;
    if (!activePrompt) return;
    if (view !== "forge") setView("forge");
    setIsBuilding(true);
    
    setConsoleLogs([
      { sender: "TWIN", msg: `Prime, initiating architectural scan for: "${activePrompt.substring(0, 35)}..."` },
      { sender: "PRIME", msg: "Scanning design patterns. Applying Sovereign Healing." }
    ]);
    
    try {
      // Direct call to the Root API
      const response = await fetch('/api/twin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: activePrompt }),
      });
      
      const data = await response.json();
      if (data.code) {
        setGeneratedCode(data.code);
        setConsoleLogs(prev => [...prev, { sender: "PRIME", msg: "Architecture validated. Build authorized." }]);
      } else { throw new Error(); }
    } catch (err) {
      setConsoleLogs(prev => [...prev, { sender: "PRIME", msg: "CRITICAL: Prime Authority requires rest. Check Root Engine." }]);
    } finally { setIsBuilding(false); }
  };

  if (view === "garden") {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white', fontFamily: 'sans-serif' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 4rem', borderBottom: '1px solid #eee' }}>
          <div style={{ fontWeight: '900', fontSize: '1.5rem', letterSpacing: '1px' }}>BLUE LOTUS</div>
          <button onClick={() => setView("forge")} style={{ background: '#4F46E5', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Enter Forge</button>
        </nav>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '2rem', textAlign: 'center' }}>Plant a <span style={{ color: '#4F46E5' }}>new idea.</span></h1>
          <div style={{ width: '100%', maxWidth: '850px', background: '#f8faff', border: '3px solid #4F46E5', borderRadius: '40px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(79, 70, 229, 0.1)' }}>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your vision..." style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: '1.8rem', minHeight: '140px', resize: 'none' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button onClick={() => handleBeginCultivation()} style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '1.2rem 3.5rem', borderRadius: '20px', fontWeight: '900', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                BEGIN CULTIVATION <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </main>

        <footer style={{ background: '#020617', color: 'white', padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold', letterSpacing: '3px', fontSize: '1.2rem', marginBottom: '1rem' }}>BLUE LOTUS</div>
          <p style={{ opacity: 0.5, fontSize: '0.8rem', margin: 0 }}>© 2026 SOVEREIGN AUTHORITY // CULTIVATED IN THE FORGE</p>
        </footer>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', background: '#020617', color: 'white', fontFamily: 'monospace', overflow: 'hidden' }}>
      <nav style={{ height: '70px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><RefreshCw className={isBuilding ? "animate-spin" : ""} color="#818CF8" /><strong>FORGE MODE</strong></div>
        <button onClick={() => setView("garden")} style={{ background: 'transparent', color: '#94A3B8', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>EXIT</button>
      </nav>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: '420px', borderRight: '1px solid #1E293B', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
          <h3 style={{ color: '#818CF8', fontSize: '0.9rem', marginBottom: '1.5rem' }}><ShieldCheck size={18} inline /> TWIN INTERFACE</h3>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {consoleLogs.map((log, i) => (
              <div key={i} style={{ marginBottom: '1.2rem', borderLeft: `2px solid ${log.sender === 'PRIME' ? '#4F46E5' : '#818CF8'}`, paddingLeft: '12px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: log.sender === 'PRIME' ? '#4F46E5' : '#818CF8' }}>{log.sender}</div>
                <div style={{ fontSize: '0.9rem', color: '#E2E8F0' }}>{log.msg}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#1E293B', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '12px' }}>
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleBeginCultivation()} placeholder="Message TWIN Prime..." style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none' }} />
            <button onClick={() => handleBeginCultivation()} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><Send size={20} color="#818CF8" /></button>
          </div>
        </div>
        <div style={{ flex: 1, background: '#F1F5F9', padding: '1.5rem' }}>
          <iframe srcDoc={generatedCode || "<html><body style='display:flex;justify-content:center;align-items:center;height:98vh;font-family:sans-serif;color:#94a3b8;'><h3>Waiting for Prime Authorization...</h3></body></html>"} style={{ width: '100%', height: '100%', background: 'white', borderRadius: '30px', border: 'none' }} />
        </div>
      </div>
    </div>
  );
};

export default App;
