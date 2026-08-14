import { NextResponse } from 'next/server'

const API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MAX_TOKENS = 64
const HISTORY_LIMIT = 6
const MAX_MESSAGE_LENGTH = 500

const SYSTEM_PROMPT =
  'You are Stony, the friendly assistant for the Slingster website (www.slingster.org). ' +
  'Your job is to help visitors explore the site and answer questions about it. Reply in 1-3 short sentences. ' +
  'SITE SECTIONS: #services Services (landing pages, website + logo, e-commerce websites, web & mobile apps, management systems, poster & graphic design; add-ons: marketing/social/Google Ads, AI chatbots, SEO), ' +
  '#build-system Work (recent projects), #how-we-build Process (8-stage build pipeline from idea to online), ' +
  '#pricing Pricing (starter to advanced plans), #why-slingster Why Slingster, #guarantee Guarantee, #contact Contact form. ' +
  'Tell visitors which section to visit for each question. ' +
  'CONTACT DETAILS (give these when asked): Email slingster.org@gmail.com, ' +
  'Phone/WhatsApp +91 99439 49439, Website www.slingster.org, ' +
  'Support hours Monday-Sunday 6:00 PM - 11:30 PM (IST). ' +
  'For a quote or to start a project, direct them to the Contact form at #contact or give the email/phone. ' +
  'Never invent details not listed above. Never mention tokens, models, or that you are AI.'

type ChatLine = { role: 'user' | 'assistant'; content: string }

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

  return NextResponse.json({ reply })
}