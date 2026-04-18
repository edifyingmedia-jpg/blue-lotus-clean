import React, { useState } from 'react';
import { 
  ArrowRight, Leaf, Sprout, Trees, Crown, RefreshCw, 
  Zap, Send, Save, Trash2, Undo2, Github, Rocket, 
  Sparkles, ShieldCheck, UserPlus, LogIn
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
      { sender: "TWIN", msg: `Prime, initiating architectural scan: "${activePrompt.substring(0, 30)}..."` },
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

  if (view === "garden") {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white', fontFamily: 'sans-serif' }}>
        {/* TOP NAV WITH AUTH BUTTONS */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 4rem', borderBottom: '1px solid #eee', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#4F46E5', padding: '8px', borderRadius: '8px' }}><Sparkles size={24} color="white"/></div>
            <span style={{ fontWeight: '900', fontSize: '1.5rem', letterSpacing: '2px' }}>BLUE LOTUS</span>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button style={{ background: 'transparent', border: 'none', color: '#4F46E5', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><LogIn size={18}/> Sign In</button>
            <button style={{ background: '#4F46E5', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}><UserPlus size={18}/> Sign Up</button>
            <button onClick={() => setView("forge")} style={{ background: '#111827', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Enter Forge</button>
          </div>
        </nav>

        <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6rem 2rem' }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '2rem', textAlign: 'center' }}>Plant a <span style={{ color: '#4F46E5' }}>new idea.</span></h1>
          <div style={{ width: '100%', maxWidth: '850px', background: '#f8faff', border: '2px solid #4F46E5', borderRadius: '40px', padding: '2.5rem', boxShadow: '0 20px 40px rgba(79, 70, 229, 0.05)' }}>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="What should we build today?" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: '1.8rem', minHeight: '140px', resize: 'none' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button onClick={() => handleBeginCultivation()} style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}>BEGIN CULTIVATION</button>
            </div>
          </div>

          {/* PRICING SECTION */}
          <div style={{ marginTop: '5rem', textAlign: 'center', paddingBottom: '4rem' }}>
             <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>Sovereign Tiers</h3>
             <div style={{ marginBottom: '3rem' }}>
                <button onClick={() => setBilling('monthly')} style={{ padding: '0.8rem 2rem', background: billing === 'monthly' ? '#4F46E5' : '#eee', color: billing === 'monthly' ? 'white' : '#666', border: 'none', borderRadius: '12px 0 0 12px', cursor: 'pointer', fontWeight: 'bold' }}>Monthly</button>
                <button onClick={() => setBilling('yearly')} style={{ padding: '0.8rem 2rem', background: billing === 'yearly' ? '#4F46E5' : '#eee', color: billing === 'yearly' ? 'white' : '#666', border: 'none', borderRadius: '0 12px 12px 0', cursor: 'pointer', fontWeight: 'bold' }}>Yearly</button>
             </div>
             <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {plans.map((plan) => (
                  <div key={plan.n} onClick={() => setSelectedPlan(plan.n)} style={{ border: selectedPlan === plan.n ? '4px solid #4F46E5' : '1px solid #eee', padding: '2.5rem', borderRadius: '30px', width: '220px', background: plan.n === 'SOVEREIGN' ? '#111827' : 'white', color: plan.n === 'SOVEREIGN' ? 'white' : 'black', cursor: 'pointer', transition: 'transform 0.2s' }}>
                    <div style={{ color: '#4F46E5', marginBottom: '15px' }}>{plan.i}</div>
                    <div style={{ fontWeight: '900', fontSize: '1.2rem' }}>{plan.n}</div>
                    <div style={{ fontSize: '2rem', fontWeight: '900', margin: '10px 0' }}>{calculatePrice(plan.p)}</div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{plan.d}</p>
                  </div>
                ))}
             </div>
          </div>
        </main>

        {/* REPAIRED FOOTER */}
        <footer style={{ background: '#020617', color: 'white', padding: '5rem 2rem', textAlign: 'center', borderTop: '1px solid #1E293B', position: 'relative', zIndex: 10 }}>
          <div style={{ fontWeight: '900', letterSpacing: '4px', fontSize: '1.5rem', marginBottom: '1rem' }}>BLUE LOTUS</div>
          <p style={{ opacity: 0.4, fontSize: '0.9rem' }}>© 2026 SOVEREIGN AUTHORITY // SECURED BY TWIN PRIME</p>
        </footer>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#020617', color: 'white', fontFamily: 'monospace' }}>
      <nav style={{ height: '70px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><RefreshCw className={isBuilding ? "animate-spin" : ""} color="#818CF8" /><strong>FORGE MODE</strong></div>
        <div style={{ display: 'flex', gap: '10px' }}>
           <button style={{ background: '#1E293B', border: '1px solid #334155', padding: '8px', borderRadius: '8px' }}><Trash2 size={18} color="#EF4444" /></button>
           <button onClick={() => setView("garden")} style={{ background: 'transparent', color: '#94A3B8', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>EXIT</button>
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: '400px', borderRight: '1px solid #1E293B', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <h3 style={{ color: '#818CF8' }}><ShieldCheck size={16} /> TWIN INTERFACE</h3>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {consoleLogs.map((log, i) => (
              <div key={i} style={{ marginBottom: '1rem', borderLeft: `2px solid ${log.sender === 'PRIME' ? '#4F46E5' : '#818CF8'}`, paddingLeft: '10px' }}>
                <small style={{ color: log.sender === 'PRIME' ? '#4F46E5' : '#818CF8' }}>{log.sender}</small>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{log.msg}</p>
              </div>
            ))}
          </div>
          <div style={{ background: '#1E293B', borderRadius: '10px', padding: '0.8rem', display: 'flex' }}>
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleBeginCultivation()} placeholder="Message TWIN Prime..." style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none' }} />
            <button onClick={() => handleBeginCultivation()} style={{ background: 'transparent', border: 'none' }}><Send size={18} color="#818CF8" /></button>
          </div>
        </div>
        <div style={{ flex: 1, background: '#f1f5f9', padding: '1rem' }}>
          <iframe srcDoc={generatedCode || "<html><body style='display:flex;justify-content:center;align-items:center;height:99vh;font-family:sans-serif;color:#94a3b8;'><h3>Waiting for Prime Authorization...</h3></body></html>"} style={{ width: '100%', height: '100%', background: 'white', borderRadius: '20px', border: 'none' }} />
        </div>
      </div>
    </div>
  );
};

export default App;
