import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight, Sparkles, Undo2, Github, Trash2, Save, Send, ShoppingCart, Share2, Database, CreditCard } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState("landing");
  const [prompt, setPrompt] = useState("");

  const LotusLogo = () => (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5C53.75 20.75 62.5 31.25 76.25 36.25C90 41.25 96.25 50 93.75 62.5C91.25 75 80 83.75 66.25 88.75C52.5 93.75 50 96.25 50 96.25C50 96.25 47.5 93.75 33.75 88.75C20 83.75 8.75 75 6.25 62.5C3.75 50 10 41.25 23.75 36.25C37.5 31.25 46.25 20.75 50 5Z" fill="#2563EB" stroke="#1E40AF" strokeWidth="2"/>
    </svg>
  );

  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: 'white', fontFamily: 'sans-serif' }}>
      <AnimatePresence mode="wait">
        {stage === "landing" ? (
          <motion.div key="landing" exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            
            {/* NAVIGATION BAR */}
            <nav style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '2rem 3rem',
              borderBottom: '1px solid #f3f4f6' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <LotusLogo />
                <h1 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '900', 
                  fontStyle: 'italic', 
                  textTransform: 'uppercase', 
                  margin: 0,
                  background: 'linear-gradient(135deg, #2563EB 0%, #9ca3af 50%, #6b7280 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Blue Lotus
                </h1>
              </div>
              <button style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                backgroundColor: '#f9fafb', 
                padding: '0.75rem 2rem', 
                borderRadius: '9999px', 
                border: '1px solid #e5e7eb',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                <User size={18} /> Sign In
              </button>
            </nav>

            {/* HERO SECTION */}
            <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5rem 2rem' }}>
              <div style={{ width: '100%', maxWidth: '1200px', textAlign: 'center', marginBottom: '8rem' }}>
                <h2 style={{ fontSize: '4rem', fontWeight: '300', color: '#d1d5db', marginBottom: '3rem', fontStyle: 'italic' }}>
                  What are we building today?
                </h2>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: '#f9fafb', 
                  padding: '1.5rem', 
                  borderRadius: '2.5rem', 
                  border: '1px solid #f3f4f6',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.05)'
                }}>
                  <input 
                    type="text"
                    placeholder="Describe your vision..."
                    style={{ flex: 1, background: 'transparent', border: 'none', padding: '1rem 2rem', fontSize: '2rem', outline: 'none' }}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <button 
                    onClick={() => setStage("workspace")}
                    style={{ backgroundColor: '#2563EB', color: 'white', padding: '1.5rem 4rem', borderRadius: '1.5rem', border: 'none', fontSize: '1.5rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}
                  >
                    GENERATE <ArrowRight size={24} />
                  </button>
                </div>
              </div>

              {/* PRICING GRID */}
              <div style={{ display: 'flex', gap: '2rem', width: '100%', maxWidth: '1200px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { name: 'Explorer', price: 'Free', bg: '#ecfdf5', color: '#065f46' },
                  { name: 'Sovereign', price: '$29/mo', bg: '#2563EB', color: 'white', scale: 1.1 },
                  { name: 'Refuel', price: '$5/pack', bg: '#f5f3ff', color: '#5b21b6' }
                ].map((tier, i) => (
                  <div key={i} style={{ 
                    flex: 1, 
                    minWidth: '300px', 
                    padding: '3rem', 
                    borderRadius: '2.5rem', 
                    backgroundColor: tier.bg, 
                    color: tier.color,
                    transform: tier.scale ? `scale(${tier.scale})` : 'none',
                    boxShadow: tier.scale ? '0 25px 50px -12px rgba(37, 99, 235, 0.25)' : 'none',
                    textAlign: 'left'
                  }}>
                    <h3 style={{ fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>{tier.name}</h3>
                    <div style={{ fontSize: '3.5rem', fontWeight: '900', fontStyle: 'italic', marginBottom: '2rem' }}>{tier.price}</div>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', fontWeight: 'bold' }}>
                      <li style={{ marginBottom: '0.5rem' }}>✓ Full Forge Access</li>
                      <li style={{ marginBottom: '0.5rem' }}>✓ Neural Memory</li>
                    </ul>
                  </div>
                ))}
              </div>
            </main>
          </motion.div>
        ) : (
          /* WORKSPACE */
          <div style={{ backgroundColor: '#f3f4f6', height: '100vh', width: '100%' }}>
            {/* Workspace elements go here */}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
