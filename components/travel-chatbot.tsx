'use client'

import { useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TravelChatbot() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const send = () => {
    const clean = message.trim()
    if (!clean) return
    setMessages((current) => [...current, clean])
    setMessage('')
  }

  return <>
    <div className={`chatbot ${open ? 'is-open' : ''}`}>
      {open && <motion.div className="chat-panel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="chat-head"><div><strong>Slingster bot</strong><span>Usually replies instantly</span></div><button onClick={() => setOpen(false)} aria-label="Close chatbot"><X /></button></div>
        <div className="chat-messages"><p className="bot-message">Hi. I can help you find the right starting point for your idea.</p>{messages.map((item, i) => <p className="user-message" key={`${item}-${i}`}>{item}</p>)}</div>
        <div className="chat-quick"><button onClick={() => setMessage('I need a website')}>Website</button><button onClick={() => setMessage('I need an app')}>App</button><button onClick={() => setMessage('I need a quote')}>Quote</button></div>
        <form className="chat-input" onSubmit={(event) => { event.preventDefault(); send() }}><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask Slingster..." aria-label="Chat message" /><button aria-label="Send message"><Send /></button></form>
      </motion.div>}
      <button className="chat-launcher" onClick={() => setOpen(!open)} aria-label={open ? 'Close chatbot' : 'Open chatbot'}><MessageCircle />{!open && <span>Chat with us</span>}</button>
    </div>
  </>
}
