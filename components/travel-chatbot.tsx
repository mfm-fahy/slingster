'use client'

import { useRef, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { motion } from 'framer-motion'

type ChatMessage = { role: 'user' | 'bot'; text: string }

const GREETING: ChatMessage = {
  role: 'bot',
  text: "Hey! I'm Stony from Slingster. Need a website, landing page, or branding? Tell me what you're looking for and I'll get you a quick quote.",
}

export default function TravelChatbot() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const [busy, setBusy] = useState(false)
  const [submitted, setSubmitted] = useState(false)
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
      if (data?.submitted) setSubmitted(true)
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

  return (
    <div className={`chatbot ${open ? 'is-open' : ''}`}>
      {open && (
        <motion.div className="chat-panel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="chat-head">
            <img src="/section-3/robot.png" alt="Stony" className="chat-avatar" />
            <div>
              <strong>Stony</strong>
              <span>Usually replies instantly</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chatbot">
              <X />
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((item, i) => (
              <div key={`${i}-${item.text}`} className={`chat-bubble ${item.role === 'user' ? 'user-message' : 'bot-message'}`}>
                {item.role === 'bot' && <img src="/section-3/robot.png" alt="" className="chat-msg-avatar" />}
                <p>{item.text}</p>
              </div>
            ))}
            {busy && (
              <div className="chat-bubble bot-message">
                <img src="/section-3/robot.png" alt="" className="chat-msg-avatar" />
                <p className="chat-typing">Stony is typing…</p>
              </div>
            )}
          </div>
          {submitted ? (
            <div className="chat-submitted">
              <p>Thanks! We'll get back to you soon.</p>
            </div>
          ) : (
            <form className="chat-input" onSubmit={(event) => { event.preventDefault(); void send() }}>
              <input ref={inputRef} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell me about your project..." aria-label="Chat message" />
              <button aria-label="Send message" disabled={busy}>
                <Send />
              </button>
            </form>
          )}
        </motion.div>
      )}
      <button className="chat-launcher" onClick={() => setOpen(!open)} aria-label={open ? 'Close chatbot' : 'Open chatbot'}>
        <MessageCircle />
        {!open && <span>Chat with us</span>}
      </button>
    </div>
  )
}
