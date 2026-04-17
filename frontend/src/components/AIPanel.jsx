import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'
import LotusIcon from './LotusIcon'

export default function AIPanel({ onGenerate, isGenerating, governanceMode }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Presence Initialized. I am TWIN. How shall we shape the platform today?" }
  ])
  const endRef = useRef(null)

  useEffect(() => { 
    endRef.current?.scrollIntoView({ behavior: 'smooth' }) 
  }, [messages])

  const send = () => {
    if (!input.trim() || isGenerating) return
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    
    // Trigger the build logic
    onGenerate({ id: Date.now(), name: input }, `Generating ${input}...`)
    setInput('')
  }

  return (
    <div className="bl-panel-split bg-[#0d0e1a] border-r border-white/5">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 h-14 bg-[#0a0b14] border-b border-white/5">
        <LotusIcon 
          className={governanceMode ? "text-purple-400" : "text-blue-400"} 
          size={24} 
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-gray-200">
            {governanceMode ? 'TWIN Prime' : 'TWIN'}
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-blue-500/80 font-black">
            {governanceMode ? 'Governess Mode' : 'Master Builder'}
          </span>
        </div>
        
        <div className="ml-auto flex items-center gap-2 px-2 py-1 rounded-full bg-green-500/5 border border-green-500/10">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[8px] text-green-500 font-bold uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600/10 text-blue-50 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.05)]' 
                : 'bg-white/5 text-gray-300 border border-white/5'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isGenerating && (
          <div className="flex gap-1 p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 animate-dot" style={{ animationDelay: '0s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 animate-dot" style={{ animationDelay: '0.2s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 animate-dot" style={{ animationDelay: '0.4s' }} />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-6 bg-[#0a0b14]/50 backdrop-blur-xl">
        <div className="relative border border-white/10 rounded-2xl bg-white/5 focus-within:border-blue-500/40 transition-all duration-500 group">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
            placeholder="Command the Presence..."
            className="w-full bg-transparent p-4 pr-14 text-sm text-gray-200 outline-none resize-none placeholder:text-gray-600"
            rows={2}
          />
          <button 
            onClick={send} 
            className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/20 transition-all active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
