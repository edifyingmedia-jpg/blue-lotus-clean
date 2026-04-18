import React, { useState, useRef } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, Activity, Loader2, Code, Eye, RefreshCw, CheckCircle2 } from 'lucide-react';

const App = () => {
  const [view, setView] = useState("garden"); 
  const [prompt, setPrompt] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);

  const handleBeginCultivation = () => {
    if (!prompt) return;
    setIsBuilding(true);
    setTimeout(() => {
      setView("forge");
      setIsBuilding(false);
    }, 1500);
  };

  if (view === "garden") {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'white', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'sans-serif' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 4rem', borderBottom: '1px solid #eee' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#4F46E5', letterSpacing: '2px' }}>BLUE LOTUS</span>
          <button style={{ background: '#111827', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>GET STARTED</button>
        </nav>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#111827', margin: '0 0 2rem 0' }}>
              Plant a <span style={{ color: '#4F46E5' }}>new idea.</span>
            </h2>
            <div style={{ background: '#f8faff', border: '2px solid #4F46E5', borderRadius: '32px', padding: '2rem', boxShadow: '0 20px 40px rgba(79, 70, 229, 0.1)' }}>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the app you want to build..."
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.5rem', minHeight: '120px', background: 'transparent', resize: 'none', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button 
                  onClick={handleBeginCultivation} 
                  style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '1.2rem 3rem', borderRadius: '16px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  {isBuilding ? <Loader2 size={20} className="animate-spin" /> : 'BEGIN CULTIVATION'} <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </main>

        <div style={{ padding: '0 4rem 3rem', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          {[{ n: 'SPROUT', i: <Leaf size={16}/> }, { n: 'SAPLING', i: <Sprout size={16}/> }, { n: 'OAK', i: <Trees size={16}/> }, { n: 'SOVEREIGN', i: <Crown size={16}/> }].map((p, idx) => (
            <div key={idx} style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid #eee', width: '180px', textAlign: 'center' }}>
              <div style={{ color: '#4F46E5', marginBottom: '8px' }}>{p.i}</div>
              <div style={{ fontWeight: '900', fontSize: '0.7rem', color: '#6B7280' }}>{p.n}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      <nav style={{ height: '60px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <RefreshCw size={20} className="animate-spin" color="#818CF8" />
          <span style={{ fontWeight: 'bold' }}>FORGE: {prompt.substring(0, 20)}...</span>
        </div>
        <button onClick={() => setView("garden")} style={{ background: '#1E293B', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>EXIT FORGE</button>
      </nav>
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ width: '400px', borderRight: '1px solid #1E293B', padding: '2rem', background: '#020617' }}>
          <h3 style={{ color: '#818CF8', borderBottom: '1px solid #1E293B', paddingBottom: '1rem' }}>SOVEREIGN CONSOLE</h3>
          <div style={{ marginTop: '1rem', color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <p style={{ color: '#10B981' }}>> Initializing Blue Lotus V.1.07</p>
            <p>> Loading TWIN Advocate Logic...</p>
            <p>> Throttling architectural generation...</p>
            <p style={{ marginTop: '2rem', color: 'white' }}>[TWIN SUGGESTION]:</p>
            <p>"I have structured the primary UI for maximum accessibility. Shall I now bridge the secure database?"</p>
          </div>
        </div>
        <div style={{ flex: 1, background: '#F1F5F9', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ width: '90%', height: '85%', background: 'white', borderRadius: '24px', boxShadow: '0 40px 60px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ height: '60px', background: '#4F46E5', width: '100%' }}></div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#94A3B8' }}>
              <div style={{ textAlign: 'center' }}>
                <Eye size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                <p style={{ fontWeight: 'bold' }}>GENERATING FACE...</p>
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '30px', right: '30px', background: 'white', padding: '1rem 2rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px', color: '#10B981', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', border: '1px solid #10B981' }}>
            <CheckCircle2 size={20} /> <span style={{ fontWeight: '900', fontSize: '0.8rem' }}>HEALING COMPLETE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
