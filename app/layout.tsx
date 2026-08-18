import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://slingster.org'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Slingster — Web Design, Development & Branding Studio',
  description:
    'Slingster is a web design & development studio for landing pages, websites, e-commerce stores, web apps, branding, AI chatbots and SEO. Modern, responsive websites built to convert.',
  keywords: [
    'web design',
    'web development',
    'landing page design',
    'landing page development',
    'website design',
    'website development',
    'custom website',
    'responsive web design',
    'e-commerce website development',
    'ecommerce store',
    'web app development',
    'mobile app development',
    'logo design',
    'brand identity',
    'branding agency',
    'management system development',
    'admin panel development',
    'AI chatbot development',
    'chatbot development',
    'SEO services',
    'on-page SEO',
    'digital marketing agency',
    'graphic design services',
    'poster design',
    'freelance web developer',
    'web design agency',
    'web development company',
    'small business website',
    'professional web design',
    'web design india',
    'web development india',
    'freelance web designer india',
  ],
  category: 'technology',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Slingster — Web Design, Development & Branding Studio',
    description:
      'Landing pages, e-commerce, web apps, branding, AI chatbots and SEO — modern websites built to convert.',
    type: 'website',
    siteName: 'Slingster',
    url: siteUrl,
    images: [
      {
        url: '/newlogo.png',
        width: 800,
        height: 800,
        alt: 'Slingster Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Slingster — Web Design, Development & Branding Studio',
    description: 'Landing pages, e-commerce, web apps, branding, AI chatbots and SEO.',
    images: ['/newlogo.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  other: {
    author: 'Slingster',
    'geo.region': 'IN',
    'geo.placename': 'India',
    'theme-color': '#ffffff',
  },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: 'any' }],
    apple: '/apple-icon.png',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Slingster',
      url: siteUrl,
      logo: `${siteUrl}/newlogo.png`,
      description:
        'Independent digital studio building modern websites, powerful brands and digital products — landing pages, e-commerce, web apps, branding, AI chatbots and SEO.',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        areaServed: 'Worldwide',
      },
    },
    {
      '@type': 'WebSite',
      name: 'Slingster',
      url: siteUrl,
      description: 'Web design, development & branding studio.',
      inLanguage: 'en',
    },
  ],
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#ffffff', width: 'device-width', initialScale: 1, userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
