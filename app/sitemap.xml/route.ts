import { NextResponse } from 'next/server'

export function GET(request: Request) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || `https://${new URL(request.url).host}`
  const lastmod = new Date().toISOString().slice(0, 10)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}