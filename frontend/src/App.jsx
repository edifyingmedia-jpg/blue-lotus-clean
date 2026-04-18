import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Coins } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState("landing");
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

  const LotusLogo = () => (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M50 40C52 45 55 48 60 50C55 52 52 55 50 60C48 55 45 52 40 50C45 48 48 45 50 40Z" fill="#2563EB"/>
    </svg>
  );

  return (
    <div style={{ height: '100vh', width: '100%', backgroundColor: 'white', fontFamily: 'Inter, sans-serif', color: '#111827', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 4rem', width: '100%', boxSizing: 'border-box', borderBottom: '1px solid #F3F4F6', background: 'white', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <LotusLogo />
          <h1 style={{ fontSize: '1.1rem', fontWeight: '900', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1E3A8A', margin: 0 }}>Blue Lotus</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ background: 'none', border: '1px solid #E5E7EB', padding: '0.5rem 1.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>SIGN IN</button>
          <button style={{ background: '#2563EB', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>SIGN UP</button>
        </div>
      </nav>

      {/* CENTER AREA */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem' }}>
        <div style={{ width: '100%', maxWidth: '850px', textAlign: 'center', transform: 'translateY(-10%)' }}>
          <h2 style={{ fontSize: '3.2rem', fontWeight: '800', letterSpacing: '-0.05em', color: '#111827', marginBottom: '1.5rem' }}>
            What shall we build today?
          </h2>
          
          <div style={{ border: '1.5px solid #D1D5DB', borderRadius: '12px', padding: '1rem', backgroundColor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <textarea 
              ref={textareaRef}
              rows="1"
              placeholder="Describe your vision..." 
              style={{ width: '100%', border: 'none', fontSize: '1.3rem', outline: 'none', color: '#374151', fontWeight: '300', resize: 'none', minHeight: '80px', lineHeight: '1.4' }} 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button onClick={() => setStage("workspace")} style={{ backgroundColor: '#2563EB', color: 'white', padding: '0.6rem 2.5rem', borderRadius: '4px', border: 'none', fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer', textTransform: 'uppercase' }}>
                Build <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* BOTTOM AREA */}
      <div style={{ width: '100%', padding: '0 4rem 3rem', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { name: 'Explore', price: 'Free', credits: '10 Credits', hasToggle: false },
            { name: 'Pro', price: calculatePrice(9.99), credits: '100 Credits', featured: true, hasToggle: true },
            { name: 'Elite', price: calculatePrice(19.99), credits: '200 Credits', hasToggle: true },
            { name: 'Sovereign', price: calculatePrice(29.99), credits: '300 Credits', hasToggle: true },
            { name: 'Refuel', price: '$19.99', credits: '200 Credits', hasToggle: false }
          ].map((tier, i) => (
            <div key={i} style={{ 
              flex: 1, padding: '1.25rem', border: tier.featured ? '2px solid #2563EB' : '1px solid #F3F4F6', borderRadius: '6px', textAlign: 'left',
              backgroundColor: tier.featured ? '#F9FAFB' : 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'default'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div>
                <h3 style={{ fontSize: '0.6rem', fontWeight: '900', textTransform: 'uppercase', color: tier.featured ? '#2563EB' : '#9CA3AF', marginBottom: '0.25rem' }}>{tier.name}</h3>
                <div style={{ fontSize: '1.25rem', fontWeight: '900' }}>{tier.price}</div>
                <div style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: '700' }}>{tier.credits}</div>
              </div>

              {tier.hasToggle && (
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div 
                    onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')} 
                    style={{ width: '28px', height: '14px', background: billing === 'yearly' ? '#DCFCE7' : '#E5E7EB', borderRadius: '10px', cursor: 'pointer', position: 'relative', border: billing === 'yearly' ? '1px solid #10B981' : '1px solid transparent' }}
                  >
                    <div style={{ position: 'absolute', width: '10px', height: '10px', background: billing === 'yearly' ? '#10B981' : '#2563EB', borderRadius: '50%', top: '1px', left: billing === 'monthly' ? '2px' : '14px', transition: '0.2s' }} />
                  </div>
                  <span style={{ fontSize: '0.6rem', fontWeight: '900', color: billing === 'yearly' ? '#10B981' : '#9CA3AF' }}>
                    {billing === 'yearly' ? 'YEARLY' : 'MONTHLY'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.55rem', color: '#D1D5DB', letterSpacing: '0.4em', fontWeight: '800' }}>
          BLUE LOTUS SOVEREIGN // 2026
        </div>
      </div>
    </div>
  );
};

export default App;
