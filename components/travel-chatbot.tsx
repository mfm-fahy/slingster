'use client'

import { useRef, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { motion } from 'framer-motion'

type ChatMessage = { role: 'user' | 'bot'; text: string }

const GREETING: ChatMessage = {
  role: 'bot',
  text: "Hi, I'm Stony. I can help you explore the site — services, pricing, process and contact details. Ask me anything.",
}

export default function TravelChatbot() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const send = async () => {
    const clean = message.trim()
    if (!clean || busy) return
    const history = messages
      .slice(1)
      .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }))
    setMessages((current) => [...current, { role: 'user', text: clean }])
    setMessage('')
    setBusy(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: clean, history }),
      })
      const data = await res.json().catch(() => null)
      const reply =
        typeof data?.reply === 'string' ? data.reply : 'Sorry, Stony is busy right now. Please try again in a moment.'
      setMessages((current) => [...current, { role: 'bot', text: reply }])
    } catch {
      setMessages((current) => [...current, { role: 'bot', text: 'Sorry, Stony had a hiccup. Please try again.' }])
    } finally {
      setBusy(false)
      inputRef.current?.focus()
    }
  }

  return <>
    <div className={`chatbot ${open ? 'is-open' : ''}`}>
      {open && <motion.div className="chat-panel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="chat-head"><div><strong>Stony</strong><span>Usually replies instantly</span></div><button onClick={() => setOpen(false)} aria-label="Close chatbot"><X /></button></div>
        <div className="chat-messages">{messages.map((item, i) => <p className={item.role === 'user' ? 'user-message' : 'bot-message'} key={`${i}-${item.text}`}>{item.text}</p>)}{busy && <p className="bot-message chat-typing">Stony is typing…</p>}</div>
        <div className="chat-quick"><button onClick={() => setMessage('What services do you offer?')}>Services</button><button onClick={() => setMessage('How much does a project cost?')}>Pricing</button><button onClick={() => setMessage('How does the build process work?')}>Process</button><button onClick={() => setMessage('What are your contact details?')}>Contact</button></div>
        <form className="chat-input" onSubmit={(event) => { event.preventDefault(); void send() }}><input ref={inputRef} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask Stony..." aria-label="Chat message" /><button aria-label="Send message" disabled={busy}><Send /></button></form>
      </motion.div>}
      <button className="chat-launcher" onClick={() => setOpen(!open)} aria-label={open ? 'Close chatbot' : 'Open chatbot'}><MessageCircle />{!open && <span>Chat with us</span>}</button>
    </div>
  </>
}