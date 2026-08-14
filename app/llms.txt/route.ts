import { NextResponse } from 'next/server'

export function GET() {
  const body = `# Slingster

> Independent digital studio building modern websites, powerful brands and digital products.

## Services
- Web Design & Development (landing pages, websites, e-commerce, web apps)
- Branding & Logo Design
- AI Chatbot Development
- SEO Services

## Contact
- Website: https://slingster.org
`
  return new NextResponse(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
