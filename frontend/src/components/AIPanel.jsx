import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import LotusIcon from './LotusIcon'

export default function AIPanel({ onGenerate, isGenerating, governanceMode }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Presence Initialized. I am TWIN. How shall we shape the platform today?" }
  ])
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = () => {
    if (!input.trim() || isGenerating) return
    setMessages([...messages, { role: 'user', content: input }])
    onGenerate({ id: Date.now(), name: input }, `Generating ${input}...`)
    setInput('')
  }

  return (
    <div className="flex flex-col h-full bg-[#0d0e1a] border-r border-white/5">
      <div className="flex items-center gap-3 px-4 h-14 bg-[#0a0b14] border-b border-white/5">
        <LotusIcon className={governanceMode ? "text-purple-400" : "text-blue-400"} size={24} />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-200">{governanceMode ? 'TWIN Prime' : 'TWIN'}</span>
          <span className="text-[10px] uppercase tracking-widest text-blue-500/80 font-bold">
            {governanceMode ? 'Governess' : 'Master Builder'}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' ? 'bg-blue-600/20 text-blue-50 border border-blue-500/20' : 'bg-white/5 text-gray-300 border border-white/10'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-[#0a0b14]">
        <div className="relative border border-white/10 rounded-xl bg-white/5 focus-within:border-blue-500/50 transition-all">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
            placeholder="Direct the Presence..."
            className="w-full bg-transparent p-3 pr-12 text-sm text-gray-200 outline-none resize-none"
            rows={2}
          />
          <button onClick={send} className="absolute bottom-2 right-2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
