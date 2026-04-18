import React, { useState, useRef } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, Activity, Loader2, Code, Eye, RefreshCw, CheckCircle2, Github, Twitter, Mail } from 'lucide-react';

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
      <div style={{ minHeight: '100vh', width: '100vw', background: 'white', display: 'flex', flexDirection: 'column', overflowX: 'hidden', fontFamily: 'sans-serif' }}>
        
        {/* HEADER WITH LOGO */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', borderBottom: '1px solid #eee', flexShrink: 0, background: 'white', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#4F46E5', padding: '6px', borderRadius: '8px' }}>
               <svg width="24" height="24" viewBox="0 0 100 100" fill="white"><path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" /></svg>
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#111827', letterSpacing: '2px' }}>BLUE LOTUS</span>
          </div>
          <button style={{ background: '#111827', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>GET STARTED</button>
        </nav>

        {/* MAIN GARDEN AREA */}
        <main style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem' }}>
          <div style={{ width: '100%', maxWidth: '850px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: '900', color: '#111827', margin: '0 0 2rem 0', lineHeight: '1.1' }}>
              Plant a <span style={{ color: '#4F46E5' }}>new idea.</span>
            </h2>
            <div style={{ background: '#f8faff', border: '2px solid #4F46E5', borderRadius: '32px', padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.15)' }}>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the app you want to build..."
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.6rem', minHeight: '120px', background: 'transparent', resize: 'none', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button 
                  onClick={handleBeginCultivation} 
                  style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '1.2rem 3.5rem', borderRadius: '18px', fontWeight: '900', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.4)' }}
                >
                  {isBuilding ? <Loader2 size={28} className="animate-spin" /> : 'BEGIN CULTIVATION'} <ArrowRight size={28} />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* PRICING TIERS */}
        <div style={{ padding: '2rem 4rem 6rem', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', background: '#fafafa' }}>
          {[
            { n: 'SPROUT', i: <Leaf size={24}/>, p: 'Free' }, 
            { n: 'SAPLING', i: <Sprout size={24}/>, p: '$9.99' }, 
            { n: 'OAK', i: <Trees size={24}/>, p: '$19.99' }, 
            { n: 'SOVEREIGN', i: <Crown size={24}/>, p: '$29.99' }
          ].map((plan, idx) => (
            <div key={idx} style={{ padding: '2rem', borderRadius: '24px', border: '2px solid #eee', width: '220px', textAlign: 'center', background: plan.n === 'SOVEREIGN' ? '#111827' : 'white', color: plan.n === 'SOVEREIGN' ? 'white' : '#111827', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ color: '#4F46E5', marginBottom: '12px' }}>{plan.i}</div>
              <div style={{ fontWeight: '900', fontSize: '0.9rem', letterSpacing: '1.5px', marginBottom: '8px' }}>{plan.n}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900' }}>{plan.p}</div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <footer style={{ background: '#020617', color: 'white', padding: '4rem 4rem 2rem', flexShrink: 0 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px' }}>
            <div style={{ maxWidth: '300px' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '1rem' }}>BLUE LOTUS</div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6' }}>The world's first Sovereign App Builder. Plant your ideas and watch your digital reality sprout.</p>
            </div>
            <div style={{ display: 'flex', gap: '60px' }}>
              <div>
                <h4 style={{ fontSize: '0.8rem', fontWeight: '900', color: '#4F46E5', marginBottom: '1rem', letterSpacing: '1px' }}>RESOURCES</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#94A3B8' }}>
                  <span>Documentation</span>
                  <span>Community</span>
                  <span>Support</span>
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '0.8rem', fontWeight: '900', color: '#4F46E5', marginBottom: '1rem', letterSpacing: '1px' }}>LEGAL</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#94A3B8' }}>
                  <span>Privacy Policy</span>
                  <span>Terms of Service</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: '1200px', margin: '3rem auto 0', paddingTop: '2rem', borderTop: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', fontSize: '0.75rem' }}>
            <span>© 2026 BLUE LOTUS SOVEREIGN. ALL RIGHTS RESERVED.</span>
            <span style={{ letterSpacing: '2px', fontWeight: 'bold' }}>V.1.07 // PRODUCTION</span>
          </div>
        </footer>
      </div>
    );
  }

  // FORGE VIEW REMAINS THE SAME
  return (
    <div style={{ height: '100vh', width: '100vw', background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      <nav style={{ height: '70px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <RefreshCw size={28} className="animate-spin" color="#818CF8" />
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>FORGE: {prompt.substring(0, 20)}...</span>
        </div>
        <button onClick={() => setView("garden")} style={{ background: '#1E293B', color: 'white', border: '1px solid #334155', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>EXIT FORGE</button>
      </nav>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: '420px', borderRight: '1px solid #1E293B', padding: '2.5rem', background: '#020617', overflowY: 'auto' }}>
          <h3 style={{ color: '#818CF8', borderBottom: '1px solid #1E293B', paddingBottom: '1.5rem', letterSpacing: '2px', fontSize: '1.1rem' }}>SOVEREIGN CONSOLE</h3>
          <div style={{ marginTop: '1.5rem', color: '#94A3B8', fontSize: '1.1rem', lineHeight: '1.8' }}>
            <p style={{ color: '#10B981' }}>> Initializing Blue Lotus V.1.07</p>
            <p>> Loading TWIN Advocate Logic...</p>
            <p>> Throttling architectural generation...</p>
            <p style={{ marginTop: '2.5rem', color: 'white', fontWeight: 'bold' }}>[TWIN SUGGESTION]:</p>
            <p>"I have structured the primary UI for maximum accessibility. Shall I now bridge the secure database?"</p>
          </div>
        </div>
        <div style={{ flex: 1, background: '#F1F5F9', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ width: '92%', height: '88%', background: 'white', borderRadius: '28px', boxShadow: '0 40px 60px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ height: '70px', background: '#4F46E5', width: '100%' }}></div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#94A3B8' }}>
              <div style={{ textAlign: 'center' }}>
                <Eye size={80} style={{ marginBottom: '2rem', opacity: 0.2 }} />
                <p style={{ fontWeight: '900', fontSize: '1.5rem', color: '#1e293b' }}>GENERATING FACE...</p>
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '40px', right: '40px', background: 'white', padding: '1.2rem 2.5rem', borderRadius: '60px', display: 'flex', alignItems: 'center', gap: '15px', color: '#10B981', boxShadow: '0 15px 30px rgba(0,0,0,0.1)', border: '2px solid #10B981' }}>
            <CheckCircle2 size={28} /> <span style={{ fontWeight: '900', fontSize: '1.1rem' }}>HEALING COMPLETE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
