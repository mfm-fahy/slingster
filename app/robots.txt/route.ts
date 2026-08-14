import { NextResponse } from 'next/server'

export function GET(request: Request) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || `https://${new URL(request.url).host}`
  const body = `User-Agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
  return new NextResponse(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}