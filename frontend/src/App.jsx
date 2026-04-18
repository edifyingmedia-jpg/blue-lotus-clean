import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight, Sparkles, Zap, ShieldCheck, Coins } from 'lucide-react';

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
    <div style={{ height: '100vh', width: '100%', backgroundColor: 'white', fontFamily: 'Inter, sans-serif', color: '#111827', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* HEADER */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', width: '100%', boxSizing: 'border-box', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <LotusLogo />
          <h1 style={{ fontSize: '1.1rem', fontWeight: '900', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1E3A8A', margin: 0 }}>Blue Lotus</h1>
        </div>
        <button style={{ background: 'none', border: '1px solid #E5E7EB', padding: '0.5rem 1.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>SIGN IN</button>
      </nav>

      {/* CENTERED CONTENT - This is what moves the box down */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem' }}>
        
        <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: '800', letterSpacing: '-0.05em', color: '#111827', marginBottom: '2.5rem' }}>
            What shall we build today?
          </h2>
          
          {/* THE OUTLINED BOX */}
          <div style={{ 
            border: '2px solid #D1D5DB', // THE BORDER
            borderRadius: '12px', 
            padding: '1.5rem', 
            backgroundColor: '#FFFFFF', 
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <textarea 
              ref={textareaRef}
              rows="1"
              placeholder="Describe your vision..." 
              style={{ 
                width: '100%', 
                border: 'none', 
                fontSize: '1.5rem', 
                outline: 'none', 
                color: '#374151', 
                fontWeight: '300', 
                resize: 'none', 
                minHeight: '120px',
                lineHeight: '1.5'
              }} 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button 
                onClick={() => setStage("workspace")} 
                style={{ backgroundColor: '#2563EB', color: 'white', padding: '1rem 3.5rem', borderRadius: '4px', border: 'none', fontWeight: '800', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                Build <ArrowRight size={20} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '3rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>Monthly</span>
            <div onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')} style={{ width: '44px', height: '22px', background: '#F3F4F6', borderRadius: '20px', cursor: 'pointer', position: 'relative', border: '1px solid #E5E7EB' }}>
              <div style={{ position: 'absolute', width: '16px', height: '16px', background: '#2563EB', borderRadius: '50%', top: '2px', left: billing === 'monthly' ? '3px' : '23px', transition: '0.2s' }} />
            </div>
            <span style={{ fontSize: '0.85rem' }}>Yearly <span style={{ color: '#10B981' }}>(Save 10%)</span></span>
          </div>
        </div>
      </main>

      {/* LOWER THIRD - Fixed to bottom */}
      <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '2rem 4rem 4rem' }}>
        {[
          { name: 'Explore', price: 'Free', credits: '10 Credits' },
          { name: 'Pro', price: calculatePrice(9.99), credits: '100 Credits', featured: true },
          { name: 'Elite', price: calculatePrice(19.99), credits: '200 Credits' },
          { name: 'Sovereign', price: calculatePrice(29.99), credits: '300 Credits' },
          { name: 'Refuel', price: '$19.99', credits: '200 Credits' }
        ].map((tier, i) => (
          <div key={i} style={{ 
            flex: 1, padding: '1.5rem', border: tier.featured ? '2px solid #2563EB' : '1px solid #F3F4F6', borderRadius: '4px', textAlign: 'left',
            backgroundColor: tier.featured ? '#F9FAFB' : 'white'
          }}>
            <h3 style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', color: tier.featured ? '#2563EB' : '#9CA3AF' }}>{tier.name}</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{tier.price}</div>
            <div style={{ fontSize: '0.85rem', color: '#4B5563' }}>{tier.credits}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
