import React, { useState } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, RefreshCw, Eye, Zap, Database, Loader2, Send, CheckCircle2 } from 'lucide-react';

const App = () => {
  const [view, setView] = useState("garden"); 
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState('SOVEREIGN');
  const [prompt, setPrompt] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [consoleLogs, setConsoleLogs] = useState([]);

  const plans = [
    { n: 'SPROUT', i: <Leaf size={32}/>, p: 0, c: 10, d: "Test your ideas." },
    { n: 'SAPLING', i: <Sprout size={32}/>, p: 9.99, c: 100, d: "Growing projects." },
    { n: 'OAK', i: <Trees size={32}/>, p: 19.99, c: 200, d: "Architectural power." },
    { n: 'SOVEREIGN', i: <Crown size={32}/>, p: 29.99, c: 300, d: "The ultimate builder." }
  ];

  const calculatePrice = (base) => {
    if (base === 0) return "Free";
    const price = billing === "monthly" ? base : (base * 12 * 0.85).toFixed(0);
    return billing === "monthly" ? `$${price}` : `$${price}/yr`;
  };

  const handleBeginCultivation = async (overridePrompt) => {
    const activePrompt = overridePrompt || prompt;
    if (!activePrompt) return;
    
    setView("forge");
    setIsBuilding(true);
    setConsoleLogs(prev => [...prev, `> Initializing cultivation for: "${activePrompt.substring(0, 30)}..."`, "> Connecting to Sovereign Engine..."]);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: activePrompt }),
      });
      const data = await response.json();
      if (data.code) {
        setConsoleLogs(prev => [...prev, "> UI elements sprouted successfully.", "> HEALING COMPLETE."]);
        setGeneratedCode(data.code);
      }
    } catch (err) {
      setConsoleLogs(prev => [...prev, "> ERROR: Sovereign connection interrupted."]);
    } finally {
      setIsBuilding(false);
    }
  };

  if (view === "garden") {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', background: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif', color: '#111827' }}>
        
        {/* HEADER */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#4F46E5', padding: '8px', borderRadius: '8px' }}>
               <svg width="24" height="24" viewBox="0 0 100 100" fill="white"><path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" /></svg>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '2px' }}>BLUE LOTUS</span>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button onClick={() => setView("forge")} style={{ background: 'transparent', border: 'none', fontWeight: 'bold', color: '#6B7280', cursor: 'pointer' }}>Sign In</button>
            <button onClick={() => setView("forge")} style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Join</button>
          </div>
        </nav>

        {/* HERO */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '2rem' }}>Plant a <span style={{ color: '#4F46E5' }}>new idea.</span></h2>
          <div style={{ width: '100%', maxWidth: '850px', background: '#f8faff', border: '3px solid #4F46E5', borderRadius: '40px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(79, 70, 229, 0.2)' }}>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your vision..." style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.8rem', minHeight: '140px', background: 'transparent', resize: 'none' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button onClick={() => handleBeginCultivation()} style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '1.2rem 4rem', borderRadius: '20px', fontWeight: '900', fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                BEGIN CULTIVATION <ArrowRight size={32} />
              </button>
            </div>
          </div>
        </main>

        {/* BILLING TOGGLE */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ background: '#F3F4F6', display: 'inline-flex', padding: '6px', borderRadius: '14px', border: '1px solid #E5E7EB' }}>
            <button onClick={() => setBilling('monthly')} style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'monthly' ? '#4F46E5' : 'transparent', color: billing === 'monthly' ? 'white' : '#6B7280' }}>Monthly</button>
            <button onClick={() => setBilling('yearly')} style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'yearly' ? '#4F46E5' : 'transparent', color: billing === 'yearly' ? 'white' : '#6B7280' }}>Yearly (-15%)</button>
          </div>
        </div>

        {/* PRICING CARDS */}
        <div style={{ padding: '0 2rem 6rem', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {plans.map((plan, idx) => (
            <div key={idx} onClick={() => setSelectedPlan(plan.n)} style={{ padding: '2.5rem 1.5rem', borderRadius: '35px', width: '210px', textAlign: 'center', cursor: 'pointer', position: 'relative', border: selectedPlan === plan.n ? '4px solid #4F46E5' : '2px solid #eee', background: plan.n === 'SOVEREIGN' ? '#111827' : 'white', color: plan.n === 'SOVEREIGN' ? 'white' : '#111827', transform: selectedPlan === plan.n ? 'translateY(-10px)' : 'none', transition: '0.3s' }}>
              {selectedPlan === plan.n && <CheckCircle2 size={24} style={{ position: 'absolute', top: '15px', right: '15px', color: '#4F46E5' }} />}
              <div style={{ color: '#4F46E5', marginBottom: '10px' }}>{plan.i}</div>
              <div style={{ fontWeight: '900', fontSize: '1.1rem', marginBottom: '8px' }}>{plan.n}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: '900' }}>{calculatePrice(plan.p)}</div>
              <div style={{ marginTop: '15px', background: '#EEF2FF', color: '#4F46E5', padding: '5px 12px', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                <Zap size={14} fill="#4F46E5" /> {plan.c} Credits
              </div>
            </div>
          ))}
          
          {/* REFUEL CARD */}
          <div onClick={() => setSelectedPlan('REFUEL')} style={{ padding: '2.5rem 1.5rem', borderRadius: '35px', width: '210px', textAlign: 'center', cursor: 'pointer', border: selectedPlan === 'REFUEL' ? '4px solid #4F46E5' : '3px dashed #4F46E5', background: '#F8FAFF', transform: selectedPlan === 'REFUEL' ? 'translateY(-10px)' : 'none', transition: '0.3s' }}>
             <Database color="#4F46E5" size={32} style={{ marginBottom: '10px' }} />
             <div style={{ fontWeight: '900', fontSize: '1.1rem', marginBottom: '8px' }}>REFUEL</div>
             <div style={{ fontSize: '2.2rem', fontWeight: '900' }}>$19.99</div>
             <div style={{ marginTop: '15px', background: '#4F46E5', color: 'white', padding: '5px 12px', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                <Zap size={14} fill="white" /> 200 Credits
             </div>
          </div>
        </div>
      </div>
    );
  }

  // FORGE VIEW
  return (
    <div style={{ height: '100vh', width: '100vw', background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      <nav style={{ height: '80px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', padding: '0 3rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <RefreshCw size={32} className={isBuilding ? "animate-spin" : ""} color="#818CF8" />
          <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>FORGE MODE</span>
        </div>
        <button onClick={() => setView("garden")} style={{ background: '#1E293B', color: 'white', border: '1px solid #334155', padding: '0.8rem 1.5rem', borderRadius: '10px', cursor: 'pointer' }}>EXIT</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* LEFT PANEL: CONSOLE & INPUT */}
        <div style={{ width: '450px', borderRight: '1px solid #1E293B', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
            <h3 style={{ color: '#818CF8', borderBottom: '1px solid #1E293B', paddingBottom: '1rem' }}>SOVEREIGN CONSOLE</h3>
            <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', lineHeight: '1.7' }}>
              {consoleLogs.map((log, i) => <p key={i} style={{ color: log.includes('COMPLETE') ? '#10B981' : '#94A3B8' }}>{log}</p>)}
            </div>
          </div>
          
          {/* THE NEW AI INPUT PANEL */}
          <div style={{ padding: '1.5rem', background: '#0F172A', borderTop: '1px solid #1E293B' }}>
             <div style={{ background: '#1E293B', borderRadius: '15px', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  value={prompt} 
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleBeginCultivation()}
                  placeholder="Refine your vision..." 
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '1rem' }} 
                />
                <button onClick={() => handleBeginCultivation()} style={{ background: '#4F46E5', color: 'white', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer' }}>
                   <Send size={18} />
                </button>
             </div>
          </div>
        </div>
        
        {/* RIGHT PANEL: PREVIEW */}
        <div style={{ flex: 1, background: '#F1F5F9', padding: '1.5rem' }}>
          <div style={{ width: '100%', height: '100%', background: 'white', borderRadius: '30px', overflow: 'hidden' }}>
            <iframe srcDoc={generatedCode || `<html><body style="display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; color:#94a3b8;"><h2>Architectural Blueprint Pending...</h2></body></html>`} style={{ width: '100%', height: '100%', border: 'none' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
