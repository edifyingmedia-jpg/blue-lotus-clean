import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, Zap, Activity } from 'lucide-react';
// We are now bringing in your new pulsing heart!
import { LotusIcon } from './components'; 

const App = () => {
  const [billing, setBilling] = useState("monthly");
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const calculatePrice = (base) => {
    if (billing === "monthly") return `$${base}`;
    const discounted = (base * 12 * 0.85).toFixed(0);
    return `$${discounted}/yr`;
  };

  return (
    <div style={{ 
      height: '100vh', width: '100vw', 
      background: 'radial-gradient(circle at top right, #F0F4FF 0%, #FFFFFF 50%, #FDF2FF 100%)',
      margin: 0, padding: 0, fontFamily: '"Inter", sans-serif',
      display: 'flex', flexDirection: 'column', overflow: 'hidden'
    }}>
      
      {/* 1. HEADER */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '0.75rem 4rem', background: 'rgba(255, 255, 255, 0.7)', 
        backdropFilter: 'blur(15px)', borderBottom: '1px solid rgba(0,0,0,0.03)', zIndex: 10, flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* We replaced the old tiny SVG with our pulsing LotusIcon */}
          <LotusIcon size={35} />
          <span style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '0.1em', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            BLUE LOTUS
          </span>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer' }}>Sign In</button>
          <button style={{ background: '#111827', color: 'white', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' }}>Sign Up</button>
        </div>
      </nav>

      {/* 2. HERO - THE MAIN FOCUS */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem' }}>
        
        {/* BIG PULSING LOTUS FOR VISIBILITY */}
        <div className="logo-container" style={{ marginBottom: '2rem' }}>
           <LotusIcon size={180} />
        </div>

        <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '2rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            <span style={{ fontSize: '3.5rem', fontWeight: '300', color: '#6B7280' }}>What shall we </span>
            <span style={{ fontSize: '3.8rem', fontWeight: '900', color: '#111827', background: 'linear-gradient(180deg, #111827, #4B5563)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>build today?</span>
          </h2>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.9)', 
            border: '2px solid rgba(79, 70, 229, 0.1)', borderRadius: '24px', padding: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)', backdropFilter: 'blur(10px)'
          }}>
            <textarea 
              ref={textareaRef}
              placeholder="Describe your vision..."
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.5rem', minHeight: '80px', resize: 'none', background: 'transparent', color: '#111827', fontFamily: 'inherit' }}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button style={{ background: 'linear-gradient(135deg, #4F46E5, #3730A3)', color: 'white', border: 'none', padding: '0.8rem 2.5rem', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.4)' }}>
                BUILD FORGE <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. FOOTER TAG */}
      <div style={{ textAlign: 'center', paddingBottom: '2rem', fontSize: '0.7rem', color: '#9CA3AF', letterSpacing: '0.5em', fontWeight: '900', opacity: 0.6 }}>
        BLUE LOTUS SOVEREIGN // V.1.07
      </div>
    </div>
  );
};

export default App;
