import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, Zap, Activity } from 'lucide-react';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Blue Lotus Logo */}
          <div style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', padding: '5px', borderRadius: '6px' }}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 120 120"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(79,70,229,0.6)) drop-shadow(0 0 12px rgba(124,58,237,0.4))'
              }}
            >
              <defs>
                <radialGradient id="lotusGradient" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#A5B4FC" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </radialGradient>
              </defs>
              <path
                d="M60 15C65 30 75 45 90 55C75 60 65 75 60 95C55 75 45 60 30 55C45 45 55 30 60 15Z"
                fill="url(#lotusGradient)"
                stroke="#E0E7FF"
                strokeWidth="2"
              />
              <path
                d="M60 35C63 45 70 55 80 60C70 65 63 75 60 85C57 75 50 65 40 60C50 55 57 45 60 35Z"
                fill="url(#lotusGradient)"
                opacity="0.8"
              />
              <circle cx="60" cy="60" r="6" fill="#F9FAFB" />
            </svg>
          </div>

          <span style={{ fontSize: '1rem', fontWeight: '900', letterSpacing: '0.1em', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            BLUE LOTUS
          </span>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>Sign In</button>
          <button style={{ background: '#111827', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>Sign Up</button>
        </div>
      </nav>

      {/* 2. HERO */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem' }}>
        <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center', transform: 'translateY(-12%)' }}>
          <h2 style={{ marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: '300', color: '#6B7280' }}>What shall we </span>
            <span style={{ fontSize: '3rem', fontWeight: '900', color: '#111827', background: 'linear-gradient(180deg, #111827, #4B5563)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>build today?</span>
          </h2>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.8)', 
            border: '1px solid rgba(0,0,0,0.08)', borderRadius: '20px', padding: '1.25rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.04)', backdropFilter: 'blur(10px)'
          }}>
            <textarea 
              ref={textareaRef}
              placeholder="Describe your vision..."
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.25rem', minHeight: '60px', resize: 'none', background: 'transparent', color: '#111827', fontFamily: 'inherit' }}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
              <button style={{ background: 'linear-gradient(135deg, #4F46E5, #3730A3)', color: 'white', border: 'none', padding: '0.6rem 2.2rem', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                BUILD <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. PRICING & HEALING FEATURES */}
      <div style={{ padding: '0 4rem 2rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '10px', maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { name: 'SPROUT', icon: <Leaf size={14}/>, price: 'Free', credits: '10 Credits' },
            { name: 'SAPLING', icon: <Sprout size={14}/>, price: calculatePrice(9.99), credits: '100 Credits', toggle: true, healing: true },
            { name: 'OAK', icon: <Trees size={14}/>, price: calculatePrice(19.99), credits: '200 Credits', toggle: true, feat: true, healing: true },
            { name: 'SOVEREIGN', icon: <Crown size={14}/>, price: calculatePrice(29.99), credits: '300 Credits', toggle: true, premium: true, healing: true },
            { name: 'REFUEL', icon: <Zap size={14}/>, price: '$19', credits: '200 Credits', isAddon: true, subtext: "Refuel anytime" }
          ].map((plan, i) => (
            <div key={i} 
              style={{ 
                flex: 1, padding: '1.25rem 1rem', borderRadius: '14px', textAlign: 'left',
                background: plan.premium ? '#111827' : 'white', color: plan.p
