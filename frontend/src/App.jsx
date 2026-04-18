import React, { useState } from 'react';
import { 
  ArrowRight, Leaf, Sprout, Trees, Crown, RefreshCw, 
  Zap, Send, Save, Trash2, Undo2, Github, Rocket, 
  Sparkles, ShieldCheck, HelpCircle 
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

  const calculatePrice = (base) => {
    if (base === 0) return "Free";
    const price = billing === "monthly" ? base : (base * 12 * 0.85).toFixed(0);
    return billing === "monthly" ? `$${price}` : `$${price}/yr`;
  };

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

  // --- GARDEN VIEW ---
  if (view === "garden") {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white', color: '#111827', fontFamily: 'sans-serif' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#4F46E5', padding: '8px', borderRadius: '8px' }}>
               <Sparkles size={24} color="white" />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '2px' }}>BLUE LOTUS</span>
          </div>
          <button onClick={() => setView("forge")} style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Enter Forge</button>
        </nav>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '2rem', textAlign: 'center' }}>Plant a <span style={{ color: '#4F46E5' }}>new idea.</span></h2>
          <div style={{ width: '100%', maxWidth: '850px', background: '#f8faff', border: '3px solid #4F46E5', borderRadius: '40px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(79, 70, 229, 0.1)' }}>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your vision..." style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.8rem', minHeight: '140px', background: 'transparent', resize: 'none' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button onClick={() => handleBeginCultivation()} style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '1.2rem 3.5rem', borderRadius: '20px', fontWeight: '900', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                BEGIN CULTIVATION <ArrowRight size={24} />
              </button>
            </div>
          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <div style={{ background: '#F3F4F6', display: 'inline-flex', padding: '6px', borderRadius: '14px', border: '1px solid #E5E7EB', marginBottom: '2rem' }}>
              <button onClick={() => setBilling('monthly')} style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'monthly' ? '#4F46E5' : 'transparent', color: billing === 'monthly' ? 'white' : '#6B7280' }}>Monthly</button>
              <button onClick={() => setBilling('yearly')} style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'yearly' ? '#4F46E5' : 'transparent', color: billing === 'yearly' ? 'white' : '#6B7280' }}>Yearly (-15%)</button>
            </div>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {plans.map((plan, idx) => (
                <div key={idx} onClick={() => setSelectedPlan(plan.n)} style={{ padding: '2rem', borderRadius: '30px', width: '200px', border: selectedPlan === plan.n ? '4px solid #4F46E5' : '1px solid #eee', cursor: 'pointer', background: plan.n === 'SOVEREIGN' ? '#111827' : 'white', color: plan.n === 'SOVEREIGN' ? 'white' : '#111827' }}>
                  <div style={{ color: '#4F46E5', marginBottom: '10px' }}>{plan.i}</div>
                  <div style={{ fontWeight: '900' }}>{plan.n}</div>
                  <div style={{ fontSize: '2rem', fontWeight: '900' }}>{calculatePrice(plan.p)}</div>
                  <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>{plan.d}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer style={{ background: '#020617', color: 'white', padding: '4rem 2rem', textAlign: 'center', marginTop: 'auto' }}>
          <div style={{ fontWeight: '900', letterSpacing: '2px', marginBottom: '10px' }}>BLUE LOTUS</div>
          <p style={{ opacity: 0.5, fontSize: '0.8rem' }}>© 2026 SOVEREIGN AUTHORITY // VERSION 1.07</p>
        </footer>
      </div>
    );
  }

  // --- FORGE VIEW ---
  return (
    <div style={{ height: '100vh', width: '100vw', background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'monospace', overflow: 'hidden' }}>
      <nav style={{ height: '75px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <RefreshCw className={isBuilding ? "animate-spin" : ""} color="#818CF8" />
          <strong style={{ fontSize: '1.1rem' }}>FORGE MODE</strong>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
           <button style={{ background: '#1E293B', color: '#94A3B8', border: '1px solid #334155', padding: '8px', borderRadius: '8px' }}><Undo2 size={18}/></button>
           <button style={{ background: '#1E293B', color: '#EF4444', border: '1px solid #334155', padding: '8px', borderRadius: '8px' }}><Trash2 size={18}/></button>
           <button style={{ background: '#1E293B', color: '#10B981', border: '1px solid #334155', padding: '8px', borderRadius: '8px' }}><Save size={18}/></button>
           <button style={{ background: '#1E293B', color: 'white', border: '1px solid #334155', padding: '8px', borderRadius: '8px' }}><Github size={18}/></button>
           <button style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '8px', fontWeight: 'bold' }}><Rocket size={18} /> DEPLOY</button>
           <button onClick={() => setView("garden")} style={{ background: 'transparent', color: '#94A3B8', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>EXIT</button>
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: '400px', borderRight: '1px solid #1E293B', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <h3 style={{ color: '#818CF8', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} /> TWIN INTERFACE
          </h3>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem' }}>
            {consoleLogs.map((log, i) => (
              <div key={i} style={{ marginBottom: '1rem', borderLeft: `2px solid ${log.sender === 'PRIME' ? '#4F46E5' : '#818CF8'}`, paddingLeft: '12px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: log.sender === 'PRIME' ? '#4F46E5' : '#818CF8' }}>{log.sender}</div>
                <div style={{ fontSize: '0.85rem', color: '#E2E8F0' }}>{log.msg}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#1E293B', borderRadius: '12px', padding: '0.8rem', display: 'flex', gap: '10px' }}>
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleBeginCultivation()} placeholder="Message TWIN Prime..." style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none' }} />
            <button onClick={() => handleBeginCultivation()} style={{ background: 'transparent', border: 'none' }}><Send size={18} color="#818CF8" /></button>
          </div>
        </div>
        
        <div style={{ flex: 1, background: '#F1F5F9', padding: '1rem' }}>
          <div style={{ width: '100%', height: '100%', background: 'white', borderRadius: '25px', overflow: 'hidden' }}>
            <iframe srcDoc={generatedCode || "<html><body style='display:flex;justify-content:center;align-items:center;height:98vh;font-family:sans-serif;color:#94a3b8;'><h3>Waiting for Prime Authorization...</h3></body></html>"} style={{ width: '100%', height: '100%', border: 'none' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
