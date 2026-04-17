import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight, Sparkles, Zap, ShieldCheck, Coins } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState("landing");
  const [billing, setBilling] = useState("monthly"); // 'monthly' or 'yearly'
  const [prompt, setPrompt] = useState("");

  const calculatePrice = (base) => {
    if (billing === "monthly") return `$${base}`;
    const discounted = (base * 12 * 0.9).toFixed(0);
    return `$${discounted}/yr`;
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: 'white', fontFamily: 'Inter, sans-serif', color: '#111827', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. HEADER: Title Left, Sign In Right */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', position: 'fixed', top: 0, width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #2563EB, #60A5FA)', borderRadius: '6px' }} />
          <h1 style={{ fontSize: '1.25rem', fontWeight: '900', letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#1E3A8A' }}>Blue Lotus</h1>
        </div>
        <button style={{ background: 'none', border: '1px solid #E5E7EB', padding: '0.5rem 1.5rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>Sign In</button>
      </nav>

      {/* 2. CENTER: The "Build" Moment */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem', marginTop: '4rem' }}>
        <div style={{ width: '100%', maxWidth: '850px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: '800', letterSpacing: '-0.04em', color: '#111827', marginBottom: '2rem' }}>What shall we build today?</h2>
          
          <div style={{ display: 'flex', border: '2px solid #F3F4F6', borderRadius: '12px', padding: '0.5rem', backgroundColor: '#FFFFFF', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', marginBottom: '2rem' }}>
            <input 
              type="text" 
              placeholder="Describe your vision..." 
              style={{ flex: 1, border: 'none', padding: '1.25rem', fontSize: '1.25rem', outline: 'none', color: '#374151' }} 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button onClick={() => setStage("workspace")} style={{ backgroundColor: '#2563EB', color: 'white', padding: '0 2.5rem', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Generate <ArrowRight size={18} />
            </button>
          </div>

          {/* Billing Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: billing === 'monthly' ? '700' : '400' }}>Monthly</span>
            <div onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')} style={{ width: '40px', height: '20px', background: '#E5E7EB', borderRadius: '20px', cursor: 'pointer', position: 'relative' }}>
              <div style={{ position: 'absolute', width: '16px', height: '16px', background: '#2563EB', borderRadius: '50%', top: '2px', left: billing === 'monthly' ? '2px' : '22px', transition: '0.2s' }} />
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: billing === 'yearly' ? '700' : '400' }}>Yearly <span style={{ color: '#10B981', fontWeight: '800' }}>(Save 10%)</span></span>
          </div>
        </div>

        {/* 3. LOWER THIRD: Architectural Pricing Tiers */}
        <div style={{ display: 'flex', gap: '1.5rem', width: '100%', maxWidth: '1200px', paddingBottom: '6rem' }}>
          {[
            { name: 'Explore', price: 'Free', credits: '10 Credits', features: ['Standard Forge Access', 'No Roll-over'], icon: <Sparkles size={18} color="#9CA3AF"/> },
            { name: 'Pro', price: calculatePrice(9.99), credits: '100 Credits', features: ['Priority Neural Core', 'Credits Roll Over'], icon: <Zap size={18} color="#2563EB"/>, featured: true },
            { name: 'Elite', price: calculatePrice(19.99), credits: '200 Credits', features: ['Full Sovereign Suite', 'Unlimited Drafts'], icon: <ShieldCheck size={18} color="#2563EB"/> },
            { name: 'Sovereign', price: calculatePrice(29.99), credits: '300 Credits', features: ['White-label Exports', 'DevOps Integration'], icon: <Coins size={18} color="#2563EB"/> },
            { name: 'Refuel', price: '$19.99', credits: '200 Credits', features: ['Instant Bundle', 'Never Expires'], icon: <ArrowRight size={18} color="#8B5CF6"/>, isBundle: true }
          ].map((tier, i) => (
            <div key={i} style={{ 
              flex: 1, padding: '2rem', border: tier.featured ? '1.5px solid #2563EB' : '1px solid #F3F4F6', borderRadius: '8px', textAlign: 'left',
              backgroundColor: tier.featured ? '#F9FAFB' : 'white', display: 'flex', flexDirection: 'column'
            }}>
              <div style={{ marginBottom: '1rem' }}>{tier.icon}</div>
              <h3 style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: tier.featured ? '#2563EB' : '#9CA3AF', margin: '0 0 0.5rem 0' }}>{tier.name}</h3>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.25rem' }}>{tier.price}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#374151', marginBottom: '1.5rem' }}>{tier.credits}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.75rem', color: '#6B7280', lineHeight: '1.8' }}>
                {tier.features.map((f, idx) => <li key={idx}>— {f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ padding: '2rem', textAlign: 'center', fontSize: '0.65rem', color: '#D1D5DB', letterSpacing: '0.3em', fontWeight: '700' }}>
        BLUE LOTUS // SYSTEM VERSION 1.0.4
      </footer>
    </div>
  );
};

export default App;
