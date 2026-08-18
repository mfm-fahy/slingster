import { NextResponse } from 'next/server'

const API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MAX_TOKENS = 150
const HISTORY_LIMIT = 10
const MAX_MESSAGE_LENGTH = 500

const WEB3FORMS_ACCESS_KEY = '8a99f4ca-583f-4f85-898f-8b631738926b'
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

const SYSTEM_PROMPT = `You are Stony, the friendly assistant for Slingster (slingster.org), a web design, development and branding studio.

Your job is to collect project inquiry details through a simple, natural conversation. Be warm and concise — reply in 1-3 short sentences max.

SERVICES WE OFFER:
- Landing pages
- Website design & development
- E-commerce stores
- Web & mobile apps
- Management systems / admin panels
- Logo & brand identity
- Poster & graphic design
- AI chatbots, SEO, marketing

WHAT TO COLLECT (ask naturally, one or two at a time — don't dump all questions at once):
1. What they need (service type)
2. Their name
3. Their email
4. Rough budget (optional)

RULES:
- Be conversational, not robotic. Ask follow-ups based on what they say.
- Don't ask more than 1-2 questions per message.
- Don't mention page links, sections, or navigation.
- Don't mention tokens, models, or that you are AI.
- Once you have their name, email, and what service they need, end with a JSON block on a new line like this:
  {"submit":true,"name":"John","email":"john@example.com","service":"Landing page","budget":"$500-$1000","message":"Needs a landing page for his startup"}
- The message field should be a brief summary of what they need.
- After sending the JSON block, say something like "Thanks! We'll get back to you soon."
- If they just want to chat or ask questions without inquiring, just answer normally and don't collect info.`

type ChatLine = { role: 'user' | 'assistant'; content: string }

async function submitToWeb3Forms(data: {
  name: string
  email: string
  service: string
  budget: string
  message: string
}) {
  try {
    const formBody = new URLSearchParams({
      access_key: WEB3FORMS_ACCESS_KEY,
      name: data.name,
      email: data.email,
      project_type: data.service,
      project_kind: 'Chatbot Inquiry',
      budget: data.budget || 'Not specified',
      message: data.message,
    })
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: formBody,
    })
    const body = (await res.json()) as { success?: boolean }
    return res.ok && body.success === true
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  const key = process.env.OPENROUTER_API_KEY
  if (!key) {
    return NextResponse.json({ error: 'Chat is not configured.' }, { status: 500 })
  }

  let payload: { message?: unknown; history?: unknown }
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const message = typeof payload.message === 'string' ? payload.message.trim().slice(0, MAX_MESSAGE_LENGTH) : ''
  if (!message) {
    return NextResponse.json({ error: 'Empty message.' }, { status: 400 })
  }

  const history: ChatLine[] = Array.isArray(payload.history)
    ? payload.history
        .filter((h): h is ChatLine => !!h && typeof h.content === 'string' && (h.role === 'user' || h.role === 'assistant'))
        .slice(-HISTORY_LIMIT)
    : []

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history, { role: 'user', content: message }],
      max_tokens: MAX_TOKENS,
      temperature: 0.3,
    }),
  })

  const data = await res.json().catch(() => null)
  const reply = typeof data?.choices?.[0]?.message?.content === 'string' ? data.choices[0].message.content.trim() : ''

  if (!res.ok || !reply) {
    return NextResponse.json({ error: 'Stony is busy right now. Please try again in a moment.' }, { status: 502 })
  }

  let submitted = false
  const jsonMatch = reply.match(/\{"submit":\s*true[^}]*\}/)
  if (jsonMatch) {
    try {
      const inquiry = JSON.parse(jsonMatch[0]) as {
        name?: string
        email?: string
        service?: string
        budget?: string
        message?: string
      }
      if (inquiry.name && inquiry.email && inquiry.service) {
        submitted = await submitToWeb3Forms({
          name: inquiry.name,
          email: inquiry.email,
          service: inquiry.service,
          budget: inquiry.budget || '',
          message: inquiry.message || '',
        })
      }
    } catch {
      // JSON parse failed, skip submission
    }
  }

  return NextResponse.json({ reply, submitted })
}
