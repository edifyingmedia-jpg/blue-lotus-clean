import React, { useState } from 'react';
import { 
  ArrowRight, Leaf, Sprout, Trees, Crown, RefreshCw, 
  Zap, Database, Send, Save, Trash2, Undo2, 
  Github, Rocket, Sparkles, ShieldCheck 
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState("garden"); 
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState('SOVEREIGN');
  const [prompt, setPrompt] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [consoleLogs, setConsoleLogs] = useState([]);

  const plans = [
    { n: 'SPROUT', i: <Leaf size={32}/>, p: 0, c: 10, d: "Basic generation via TWIN." },
    { n: 'SAPLING', i: <Sprout size={32}/>, p: 9.99, c: 100, d: "TWIN Prime Healing V1." },
    { n: 'OAK', i: <Trees size={32}/>, p: 19.99, c: 200, d: "Advanced Sovereign Shielding." },
    { n: 'SOVEREIGN', i: <Crown size={32}/>, p: 29.99, c: 300, d: "Full Governess & Prime Access." }
  ];

  const handleBeginCultivation = async () => {
    if (!prompt) return;
    setView("forge");
    setIsBuilding(true);
    setConsoleLogs([
      { sender: "TWIN", msg: `Prime, initiating architectural scan: "${prompt.substring(0, 30)}..."` },
      { sender: "PRIME", msg: "Scanning patterns. Authority engaged. Healing protocols on standby." }
    ]);
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setGeneratedCode(data.code || "");
      setConsoleLogs(prev => [...prev, { sender: "PRIME", msg: "Cultivation authorized. Healing complete." }]);
    } catch (err) {
      setConsoleLogs(prev => [...prev, { sender: "PRIME", msg: "CRITICAL: Prime Authority requires rest." }]);
    } finally {
      setIsBuilding(false);
    }
  };

  if (view === "garden") {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 4rem', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '900' }}>BLUE LOTUS</div>
          <button onClick={() => setView("forge")} style={{ background: '#4F46E5', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>Enter Forge</button>
        </nav>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '900' }}>Plant a <span style={{ color: '#4F46E5' }}>new idea.</span></h1>
          <div style={{ width: '100%', maxWidth: '700px', background: '#f8faff', border: '2px solid #4F46E5', borderRadius: '30px', padding: '2rem' }}>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your vision..." style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: '1.5rem', minHeight: '100px' }} />
            <button onClick={handleBeginCultivation} style={{ float: 'right', background: '#4F46E5', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '15px', cursor: 'pointer' }}>BEGIN CULTIVATION</button>
          </div>
        </main>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', paddingBottom: '4rem' }}>
          {plans.map((p) => (
            <div key={p.n} onClick={() => setSelectedPlan(p.n)} style={{ padding: '2rem', border: selectedPlan === p.n ? '3px solid #4F46E5' : '1px solid #eee', borderRadius: '20px', cursor: 'pointer', textAlign: 'center', width: '180px' }}>
              <div style={{ color: '#4F46E5' }}>{p.i}</div>
              <div style={{ fontWeight: 'bold' }}>{p.n}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{p.d}</div>
            </div>
          ))}
        </div>

        <footer style={{ background: '#020617', color: 'white', padding: '2rem', textAlign: 'center' }}>
          <p>© 2026 SOVEREIGN // TWIN PRIME AUTHORITY</p>
        </footer>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#020617', color: 'white', fontFamily: 'monospace' }}>
      <nav style={{ height: '70px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <RefreshCw className={isBuilding ? "animate-spin" : ""} color="#818CF8" />
          <span style={{ fontWeight: 'bold' }}>FORGE MODE</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Undo2 size={20} style={{ cursor: 'pointer' }} />
          <Trash2 size={20} color="#EF4444" style={{ cursor: 'pointer' }} />
          <Save size={20} color="#10B981" style={{ cursor: 'pointer' }} />
          <Github size={20} style={{ cursor: 'pointer' }} />
          <button style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px' }}>DEPLOY</button>
          <button onClick={() => setView("garden")} style={{ background: 'transparent', color: '#94A3B8', border: 'none', cursor: 'pointer' }}>EXIT</button>
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: '400px', borderRight: '1px solid #1E293B', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
          <h3 style={{ color: '#818CF8', display: 'flex', alignItems: 'center', gap: '10px' }}><ShieldCheck size={18} /> TWIN INTERFACE</h3>
          <div style={{ flex: 1, marginTop: '1rem', overflowY: 'auto' }}>
            {consoleLogs.map((log, i) => (
              <div key={i} style={{ marginBottom: '1rem', borderLeft: log.sender === 'PRIME' ? '2px solid #4F46E5' : '2px solid #818CF8', paddingLeft: '10px' }}>
                <small style={{ color: log.sender === 'PRIME' ? '#4F46E5' : '#818CF8' }}>{log.sender}</small>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{log.msg}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', background: '#1E293B', borderRadius: '10px', padding: '0.5rem', display: 'flex' }}>
            <input placeholder="Message TWIN Prime..." style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none' }} />
            <Send size={18} />
          </div>
        </div>
        <div style={{ flex: 1, padding: '1rem' }}>
          <iframe srcDoc={generatedCode || "<html><body style='color:white; font-family:sans-serif; display:flex; justify-content:center; align-items:center; height:100vh;'><h2>Prime Authority is resting...</h2></body></html>"} style={{ width: '100%', height: '100%', background: 'white', borderRadius: '20px', border: 'none' }} />
        </div>
      </div>
    </div>
  );
};

export default App;
