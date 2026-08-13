import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Slingster — Modern Websites. Powerful Brands. Real Results.',
  description: 'Slingster is an independent digital studio building modern websites, powerful brands, and digital products for people building something worth noticing.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-icon.png',
  },
  openGraph: { title: 'Slingster — Modern Websites. Powerful Brands. Real Results.', description: 'A small studio for big digital ambitions.', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Slingster — Modern Websites. Powerful Brands. Real Results.', description: 'Modern websites, powerful brands, and digital products.' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#ffffff', width: 'device-width', initialScale: 1, userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
''
