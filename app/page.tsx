'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import TravelChatbot from '@/components/travel-chatbot'
import Section02BuildSystem from '@/components/section-02-build-system'
import Section03Services from '@/components/section-03-services'
import Section04Pricing from '@/components/section-04-pricing'
import Section05HowWeBuild from '@/components/section-05-how-we-build'
import Section06WhySlingster from '@/components/section-06-why-slingster'
import Section07Guarantee from '@/components/section-07-guarantee'
import Section09BuiltFor from '@/components/section-09-built-for'
import Section10Contact from '@/components/section-10-contact'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const heroY = useTransform(progress, [0, 0.16], [0, -70])
  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24))
  useEffect(() => { document.body.classList.toggle('menu-open', menuOpen); return () => document.body.classList.remove('menu-open') }, [menuOpen])

  return <main className="site-shell" id="top">
    <TravelChatbot />
    <motion.div className="scroll-progress" style={{ scaleX: progress }} />
    <header className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="wordmark brand-mark" href="#top" aria-label="Slingster home">
        <img src="/newlogo.png" alt="Slingster logo" className="brand-logo" />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">{[{ label: 'Services', href: '#services' }, { label: 'Work', href: '#build-system' }, { label: 'Process', href: '#how-we-build' }, { label: 'Pricing', href: '#pricing' }, { label: 'About', href: '#why-slingster' }].map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}</nav>
      <a className="nav-cta" href="#project-form">Start a Project <span className="cta-arrow"><ArrowUpRight /></span></a>
      <button className="menu-trigger" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    {menuOpen && <motion.nav className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-label="Mobile navigation">{[{ label: 'Services', href: '#services' }, { label: 'Work', href: '#build-system' }, { label: 'Process', href: '#how-we-build' }, { label: 'Pricing', href: '#pricing' }, { label: 'About', href: '#why-slingster' }, { label: 'Contact', href: '#contact' }].map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight /></a>)}</motion.nav>}

      <section className="hero" style={{ position: 'relative', overflow: 'hidden', marginTop: '84px', height: 'calc(100vh - 84px)' }}>
        <video className="hero-video hero-video-desktop" src="/heronew.mp4" autoPlay muted loop playsInline />
        <video className="hero-video hero-video-mobile" src="/vertical-video_v2.mp4" autoPlay muted loop playsInline />
        <div className="hero-copy-wrap">
          <motion.div className="hero-copy" style={{ y: heroY }}>
            <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Digital studio / Design × Technology</p>
            <h1>We Build.<br /><em>You Grow.</em></h1>
            <div className="hero-rule" aria-hidden="true" />
            <p className="hero-intro">Modern websites, powerful brands and digital products built to move your business forward.</p>
            <div className="button-row">
              <a className="button button-primary" href="#project-form">Start a Project <ArrowRight /></a>
              <a className="button button-ghost" href="#services">Our Services</a>
            </div>
          </motion.div>
        </div>
      </section>

    <Section02BuildSystem />

    <Section03Services />

    <Section04Pricing />

    <Section05HowWeBuild />

    <Section06WhySlingster />

    <Section07Guarantee />

    <Section09BuiltFor />

    <Section10Contact />
  </main>
}

export default App
