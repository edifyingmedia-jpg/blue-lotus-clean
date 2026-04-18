import React, { useState } from 'react';
// Adding specific imports to ensure Vite finds everything
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
    setConsoleLogs([
      { sender: "TWIN", msg: `Prime, initiating architectural scan: "${activePrompt.substring(0, 40)}..."` },
      { sender: "PRIME", msg: "Scanning patterns. Applying Sovereign Healing. Final authority engaged." }
    ]);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: activePrompt }),
      });
      const data = await response.json();
      if (data.code) {
        setConsoleLogs(prev => [...prev, 
          { sender: "PRIME", msg: "Architecture validated. Healing complete. Build authorized." },
          { sender: "TWIN", msg: "The Master Builder has finished. Sprout stabilized." }
        ]);
        setGeneratedCode(data.code);
      }
    } catch (err) {
      setConsoleLogs(prev => [...prev, { sender: "PRIME", msg: "CRITICAL: Cultivation halted by Prime Authority." }]);
    } finally {
      setIsBuilding(false);
    }
  };

  if (view === "garden") {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', background: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif', color: '#111827' }}>
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

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ background: '#F3F4F6', display: 'inline-flex', padding: '6px', borderRadius: '14px', border: '1px solid #E5E7EB' }}>
            <button onClick={() => setBilling('monthly')} style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'monthly' ? '#4F46E5' : 'transparent', color: billing === 'monthly' ? 'white' : '#6B7280' }}>Monthly</button>
            <button onClick={() => setBilling('yearly')} style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'yearly' ? '#4F46E5' : 'transparent', color: billing === 'yearly' ? 'white' : '#6B7280' }}>Yearly (-15%)</button>
          </div>
        </div>

        <div style={{ padding: '0 2rem 6rem', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {plans.map((plan, idx) => (
            <div key={idx} onClick={() => setSelectedPlan(plan.n)} style={{ padding: '2.5rem 1.5rem', borderRadius: '35px', width: '210px', textAlign: 'center', cursor: 'pointer', border: selectedPlan === plan.n ? '4px solid #4F46E5' : '2px solid #eee', background: plan.n === 'SOVEREIGN' ? '#111827' : 'white', color: plan.n === 'SOVEREIGN' ? 'white' : '#111827', position: 'relative', transition: '0.3s' }}>
              {selectedPlan === plan.n && <Sparkles size={20} style={{ position: 'absolute', top: '15px', right: '15px', color: '#4F46E5' }} />}
              <div style={{ color: '#4F46E5', marginBottom: '10px' }}>{plan.i}</div>
              <div style={{ fontWeight: '900', fontSize: '1.1rem' }}>{plan.n}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: '900' }}>{calculatePrice(plan.p)}</div>
              <p style={{ fontSize: '0.75rem', opacity: 0.7, margin: '10px 0' }}>{plan.d}</p>
              <div style={{ background: '#EEF2FF', color: '#4F46E5', padding: '5px 12px', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.8rem' }}>
                <Zap size={14} fill="#4F46E5" /> {plan.c} Credits
              </div>
            </div>
          ))}
          <div onClick={() => setSelectedPlan('REFUEL')} style={{ padding: '2.5rem 1.5rem', borderRadius: '35px', width: '210px', textAlign: 'center', cursor: 'pointer', border: selectedPlan === 'REFUEL' ? '4px solid #4F46E5' : '3px dashed #4F46E5', background: '#F8FAFF' }}>
             <Database color="#4F46E5" size={32} style={{ marginBottom: '10px' }} />
             <div style={{ fontWeight: '900', fontSize: '1.1rem' }}>REFUEL</div>
             <div style={{ fontSize: '2.2rem', fontWeight: '900' }}>$19.99</div>
             <div style={{ marginTop: '15px', background: '#4F46E5', color: 'white', padding: '5px 12px', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.8rem' }}>
                <Zap size={14} fill="white" /> 200 Credits
             </div>
          </div>
        </div>

        <footer style={{ background: '#020617', color: 'white', padding: '4rem', textAlign: 'center', marginTop: 'auto' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '3px', marginBottom: '1rem' }}>BLUE LOTUS</div>
          <p style={{ color: '#334155', fontSize: '0.8rem' }}>© 2026 SOVEREIGN APP BUILDER // VERSION 1.07</p>
        </footer>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      <nav style={{ height: '80px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', padding: '0 3rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <RefreshCw size={32} className={isBuilding ? "animate-spin" : ""} color="#818CF8" />
          <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>FORGE MODE</span>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
           <button title="Undo" style={{ background: '#1E293B', color: '#94A3B8', border: '1px solid #334155', padding: '10px', borderRadius: '10px' }}><Undo2 size={18}/></button>
           <button title="Delete" style={{ background: '#1E293B', color: '#EF4444', border: '1px solid #334155', padding: '10px', borderRadius: '10px' }}><Trash2 size={18}/></button>
           <button title="Save" style={{ background: '#1E293B', color: '#10B981', border: '1px solid #334155', padding: '10px', borderRadius: '10px' }}><Save size={18}/></button>
           <div style={{ width: '1px', background: '#334155', height: '30px' }}></div>
           <button title="Github" style={{ background: '#1E293B', color: 'white', border: '1px solid #334155', padding: '10px', borderRadius: '10px' }}><Github size={18}/></button>
           <button style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Rocket size={18} /> DEPLOY
           </button>
           <button onClick={() => setView("garden")} style={{ background: 'transparent', color: '#94A3B8', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>EXIT</button>
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: '450px', borderRight: '1px solid #1E293B', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
            <h3 style={{ color: '#818CF8', borderBottom: '1px solid #1E293B', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} /> TWIN INTERFACE
            </h3>
            <div style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
              {consoleLogs.map((log, i) => (
                <div key={i} style={{ marginBottom: '1rem', paddingLeft: '10px', borderLeft: log.sender === 'PRIME' ? '2px solid #4F46E5' : '2px solid #818CF8' }}>
                  <span style={{ fontWeight: 'bold', color: log.sender === 'PRIME' ? '#4F46E5' : '#818CF8', fontSize: '0.7rem', display: 'block' }}>{log.sender}</span>
                  <p style={{ color: log.msg.includes('Healing') || log.msg.includes('validated') ? '#10B981' : '#94A3B8' }}>{log.msg}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '1.5rem', borderTop: '1px solid #1E293B', background: '#0F172A' }}>
             <div style={{ background: '#1E293B', borderRadius: '15px', padding: '12px', display: 'flex', gap: '10px' }}>
                <input value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleBeginCultivation()} placeholder="Message TWIN Prime..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white' }} />
                <button onClick={() => handleBeginCultivation()} style={{ background: '#4F46E5', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}><Send size={18} color="white"/></button>
             </div>
          </div>
        </div>
        
        <div style={{ flex: 1, background: '#F1F5F9', padding: '1.5rem' }}>
          <div style={{ width: '100%', height: '100%', background: 'white', borderRadius: '30px', overflow: 'hidden' }}>
            <iframe srcDoc={generatedCode || `<html><body style="display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; color:#cbd5e1;"><h2>Waiting for Prime Authorization...</h2></body></html>`} style={{ width: '100%', height: '100%', border: 'none' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
