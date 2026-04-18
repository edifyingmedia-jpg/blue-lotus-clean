import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

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
    const discounted = (base * 12 * 0.9).toFixed(0);
    return `$${discounted}/yr`;
  };

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      backgroundColor: '#F8F9FF', // Subtle blue-tint background
      margin: 0,
      padding: 0,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* 1. HEADER */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem 4rem', 
        background: 'rgba(255,255,255,0.9)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="32" height="32" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
            <path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" stroke="url(#g)" strokeWidth="4" fill="none"/>
            <circle cx="50" cy="50" r="8" fill="url(#g)" />
          </svg>
          <span style={{ 
            fontSize: '1.2rem', 
            fontWeight: '900', 
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.05em'
          }}>BLUE LOTUS</span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button style={{ background: 'none', border: '1px solid #DDD', padding: '0.5rem 1.2rem', borderRadius: '5px', fontWeight: '600', cursor: 'pointer' }}>Sign In</button>
          <button style={{ background: '#2563EB', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '5px', fontWeight: '600', cursor: 'pointer' }}>Sign Up</button>
        </div>
      </nav>

      {/* 2. CENTER PIECE */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ 
          fontSize: '3.8rem', 
          fontWeight: '900', 
          marginBottom: '2rem', 
          background: 'linear-gradient(180deg, #111827, #6B7280)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}>
          What shall we build today?
        </h2>
        
        <div style={{ 
          width: '100%', 
          maxWidth: '800px', 
          backgroundColor: 'white', 
          border: '1.5px solid #D1D5DB', 
          borderRadius: '15px', 
          padding: '1.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          <textarea 
            ref={textareaRef}
            placeholder="Describe your vision..."
            style={{ 
              width: '100%', 
              border: 'none', 
              outline: 'none', 
              fontSize: '1.4rem', 
              minHeight: '80px', 
              resize: 'none',
              lineHeight: '1.5',
              fontFamily: 'inherit'
            }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button style={{ background: '#2563EB', color: 'white', border: 'none', padding: '0.8rem 2.5rem', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              BUILD <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>

      {/* 3. PRICING FOOTER */}
      <div style={{ padding: '0 4rem 3rem' }}>
        <div style={{ display: 'flex', gap: '12px', maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { name: 'EXPLORE', price: 'Free', credits: '10 Credits', toggle: false },
            { name: 'PRO', price: calculatePrice(9.99), credits: '100 Credits', toggle: true, feat: true },
            { name: 'ELITE', price: calculatePrice(19.99), credits: '200 Credits', toggle: true },
            { name: 'SOVEREIGN', price: calculatePrice(29.99), credits: '300 Credits', toggle: true },
            { name: 'REFUEL', price: '$19.99', credits: '200 Credits', toggle: false, dash: true }
          ].map((plan, i) => (
            <div key={i} style={{ 
              flex: 1, 
              padding: '1.5rem', 
              background: 'white', 
              borderRadius: '12px', 
              border: plan.feat ? '2px solid #2563EB' : plan.dash ? '1px dashed #7C3AED' : '1px solid #EEE',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
            }}>
              <div style={{ fontSize: '0.65rem', fontWeight: '900', color: plan.feat ? '#2563EB' : '#999', marginBottom: '5px' }}>{plan.name}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>{plan.price}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#666' }}>{plan.credits}</div>
              
              {plan.toggle && (
                <div onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')} style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <div style={{ width: '30px', height: '16px', background: billing === 'yearly' ? '#DCFCE7' : '#EEE', borderRadius: '10px', position: 'relative', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ position: 'absolute', width: '12px', height: '12px', background: billing === 'yearly' ? '#10B981' : '#2563EB', borderRadius: '50%', top: '1.5px', left: billing === 'monthly' ? '2px' : '15px', transition: '0.2s' }} />
                  </div>
                  <span style={{ fontSize: '0.6rem', fontWeight: '900', color: billing === 'yearly' ? '#10B981' : '#999' }}>{billing.toUpperCase()}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.6rem', color: '#BBB', letterSpacing: '0.5em', fontWeight: '900' }}>
          BLUE LOTUS SOVEREIGN // 2026
        </div>
      </div>
    </div>
  );
};

export default App;
