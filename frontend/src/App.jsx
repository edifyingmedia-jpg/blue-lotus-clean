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
      <defs>
        <linearGradient id="lotusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" stroke="url(#lotusGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M50 40C52 45 55 48 60 50C55 52 52 55 50 60C48 55 45 52 40 50C45 48 48 45 50 40Z" fill="url(#lotusGradient)"/>
    </svg>
  );

  return (
    <div style={{ 
      height: '100vh', 
      width: '100%', 
      backgroundColor: '#FBFBFE', // The subtle off-white background tint
      fontFamily: 'Inter, sans-serif', 
      color: '#111827', 
      overflow: 'hidden', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      
      {/* HEADER */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 4rem', width: '100%', boxSizing: 'border-box', borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <LotusLogo />
          <h1 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '900', 
            letterSpacing: '0.05em', 
            textTransform: 'uppercase', 
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)', // BRAND GRADIENT
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0 
          }}>Blue Lotus</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ background: 'none', border: '1px solid #E5E7EB', padding: '0.5rem 1.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', color: '#4B5563' }}>SIGN IN</button>
          <button style={{ background: 'linear-gradient(135deg, #2563EB, #1E40AF)', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>SIGN UP</button>
        </div>
      </nav>

      {/* CENTER AREA */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem' }}>
        <div style={{ width: '100%', maxWidth: '850px', textAlign: 'center', transform: 'translateY(-8%)' }}>
          <h2 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '900', 
            letterSpacing: '-0.04em', 
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            background: 'linear-gradient(180deg, #111827 0%, #6B7280 100%)', // SOFT HEADLINE GRADIENT
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            What shall we build today?
          </h2>
          
          <div style={{ 
            border: '1px solid rgba(0,0,0,0.1)', 
            borderRadius: '16px', 
            padding: '1.25rem', 
            backgroundColor: '#FFFFFF', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease'
          }}>
            <textarea 
              ref={textareaRef}
              rows="1"
              placeholder="Describe your vision..." 
              style={{ width: '100%', border: 'none', fontSize: '1.35rem', outline: 'none', color: '#1F2937', fontWeight: '400', resize: 'none', minHeight: '80px', lineHeight: '1.5' }} 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button onClick={() => setStage("workspace")} style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: 'white', padding: '0.7rem 2.8rem', borderRadius: '6px', border: 'none', fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 10px rgba(37, 99, 235, 0.15)' }}>
                Build <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* BOTTOM AREA */}
      <div style={{ width: '100%', padding: '0 4rem 2.5rem', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: '0.8rem', maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { name: 'Explore', price: 'Free', credits: '10 Credits', hasToggle: false },
            { name: 'Pro', price: calculatePrice(9.99), credits: '100 Credits', featured: true, hasToggle: true },
            { name: 'Elite', price: calculatePrice(19.99), credits: '200 Credits', hasToggle: true },
            { name: 'Sovereign', price: calculatePrice(29.99), credits: '300 Credits', hasToggle: true },
            { name: 'Refuel', price: '$19.99', credits: '200 Credits', hasToggle: false, isBundle: true }
          ].map((tier, i) => (
            <div key={i} style={{ 
              flex: 1, padding: '1.5rem', 
              border: tier.featured ? '2px solid #2563EB' : tier.isBundle ? '1px dashed #7C3AED' : '1px solid rgba(0,0,0,0.05)', 
              borderRadius: '12px', textAlign: 'left',
              backgroundColor: tier.featured ? '#FFFFFF' : tier.isBundle ? 'rgba(124, 58, 237, 0.02)' : '#FFFFFF',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '145px',
              boxShadow: tier.featured ? '0 10px 25px rgba(37, 99, 235, 0.08)' : '0 4px 6px rgba(0,0,0,0.01)',
              transition: 'transform 0.2s ease'
            }}>
              <div>
                <h3 style={{ fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', color: tier.featured ? '#2563EB' : tier.isBundle ? '#7C3AED' : '#9CA3AF', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>{tier.name}</h3>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-0.02em' }}>{tier.price}</div>
                <div style={{ fontSize: '0.85rem', color: '#4B5563', fontWeight: '700' }}>{tier.credits}</div>
              </div>

              {tier.hasToggle && (
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div 
                    onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')} 
                    style={{ width: '32px', height: '16px', background: billing === 'yearly' ? '#DCFCE7' : '#F3F4F6', borderRadius: '12px', cursor: 'pointer', position: 'relative', border: '1px solid rgba(0,0,0,0.05)' }}
                  >
                    <div style={{ position: 'absolute', width: '12px', height: '12px', background: billing === 'yearly' ? '#10B981' : '#2563EB', borderRadius: '50%', top: '1px', left: billing === 'monthly' ? '2px' : '16px', transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: '900', color: billing === 'yearly' ? '#10B981' : '#9CA3AF' }}>{billing === 'yearly' ? 'YEARLY' : 'MONTHLY'}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.6rem', color: '#9CA3AF', letterSpacing: '0.45em', fontWeight: '900', opacity: 0.6 }}>
          BLUE LOTUS SOVEREIGN // VERSION 1.0.4
        </div>
      </div>
    </div>
  );
};

export default App;
