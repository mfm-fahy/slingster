'use client'

import { FormEvent, useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, Plus, X } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import TravelChatbot from '@/components/travel-chatbot'
import Section02BuildSystem from '@/components/section-02-build-system'
import Section03Services from '@/components/section-03-services'

const pillars = [['Modern Design', 'A clear point of view, without the visual noise.'], ['Fast & Responsive', 'Quick to load, smooth to use, ready for every screen.'], ['Secure & Reliable', 'Solid foundations that keep working after launch.'], ['Dedicated Support', 'A real partner on the other side of the inbox.']]
const process = ['Discover', 'Plan', 'Design', 'Build', 'Review', 'Launch', 'Grow']
const growth = ['SEO', 'Marketing', 'AI Chatbots', 'Google Ads', 'Content Marketing', 'Social Media Marketing']

function ProductVisual({ type }: { type: string }) {
  return <div className={`product-visual visual-${type}`} aria-hidden="true"><div className="window-bar"><i /><i /><i /></div>{type === 'browser' && <><div className="visual-line line-wide" /><div className="visual-line" /><div className="visual-button" /></>}{type === 'windows' && <><div className="mini-window" /><div className="mini-window mini-two" /><span className="visual-s-mark">S</span></>}{type === 'shop' && <><div className="product-card" /><div className="product-card product-two" /><div className="cart-pill">CART +</div></>}{type === 'app' && <><div className="phone-frame"><div className="phone-notch" /><div className="phone-block" /><div className="phone-block short" /></div><div className="dashboard-card" /></>}{type === 'data' && <><div className="chart-bars"><i /><i /><i /><i /><i /></div><div className="data-line" /></>}{type === 'canvas' && <><div className="canvas-shape shape-one" /><div className="canvas-shape shape-two" /><span className="canvas-word">MAKE<br />NOISE</span></>}</div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const heroY = useTransform(progress, [0, 0.16], [0, -70])
  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24))
  useEffect(() => { document.body.classList.toggle('menu-open', menuOpen); return () => document.body.classList.remove('menu-open') }, [menuOpen])
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true) }

  return <main className="site-shell" id="top">
    <TravelChatbot />
    <motion.div className="scroll-progress" style={{ scaleX: progress }} />
    <header className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}><a className="wordmark" href="#top">SLINGSTER<span>.</span></a><nav className="desktop-nav" aria-label="Primary navigation">{['Services', 'Work', 'Process', 'Pricing', 'About'].map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav><a className="nav-cta" href="#contact">Start a Project <span className="cta-arrow"><ArrowUpRight /></span></a><button className="menu-trigger" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></header>
    {menuOpen && <motion.nav className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-label="Mobile navigation">{['Services', 'Work', 'Process', 'Pricing', 'About', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}<ArrowUpRight /></a>)}</motion.nav>}

      <section className="hero" style={{ position: 'relative', overflow: 'hidden', marginTop: '84px', height: 'calc(100vh - 84px)' }}>
        <video src="/hero.mp4" autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '2rem', color: '#fff' }}>
          <motion.div className="hero-copy" style={{ y: heroY, maxWidth: '520px', marginRight: '10vw' }}>
            <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Digital studio / Design × Technology</p>
            <h1>We Build.<br /><em>You Grow.</em></h1>
            <div className="hero-rule" aria-hidden="true" />
            <p className="hero-intro">Modern websites, powerful brands and digital products built to move your business forward.</p>
            <div className="button-row">
              <a className="button button-primary" href="#work">Explore Our Work <ArrowRight /></a>
              <a className="button button-ghost" href="#services">Our Services</a>
            </div>
          </motion.div>
        </div>
      </section>

    <Section02BuildSystem />

    <Section03Services />

    <section className="scrollytelling"><div className="section-grid"><p className="eyebrow">03 / The Slingster way</p><div><p className="stage-kicker">IDEA → DESIGN → BUILD → LAUNCH → GROW</p><h2>From a spark<br /><span>to momentum.</span></h2><div className="stage-track">{['IDEA', 'DESIGN', 'BUILD', 'LAUNCH', 'GROW'].map((stage, i) => <div className="stage-item" key={stage}><span>0{i + 1}</span><h3>{stage}</h3><p>{['One small glowing idea is enough.', 'Shapes, language and direction come together.', 'The useful, responsive thing takes form.', 'Your work goes live in the world.', 'The system keeps getting better.'][i]}</p></div>)}</div></div></div></section>

    <section className="pillars section-grid"><p className="eyebrow">04 / Explain</p><div><h2>Built<br /><span>differently.</span></h2><div className="pillar-list">{pillars.map(([title, desc], i) => <div className="pillar" key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight /></div>)}</div></div></section>

    <section id="work" className="work"><div className="work-header section-grid"><p className="eyebrow">05 / Prove</p><div><h2>Work that moves<br /><span>businesses forward.</span></h2><p className="body-copy">A growing library of thoughtful digital work. No invented case studies — just room for the next one.</p></div></div><div className="work-feature"><ProductVisual type="windows" /><div className="work-meta"><p>Selected project placeholder</p><a href="#contact" className="text-link">Be the next one <ArrowUpRight /></a></div></div></section>

    <section id="process" className="process section-grid"><p className="eyebrow">06 / The journey</p><div><h2>Clear steps.<br /><span>No black boxes.</span></h2><div className="process-list">{process.map((step, i) => <div className="process-step" key={step}><span>0{i + 1}</span><h3>{step}</h3><div className="process-line" /></div>)}</div></div></section>

    <section id="pricing" className="pricing section-grid"><p className="eyebrow">07 / Starting points</p><div><h2>Start small.<br /><span>Build big.</span></h2><div className="price-grid">{[['Landing Page', '₹5,000+'], ['Website + Logo', '₹15,000+'], ['E-commerce', '₹25,000+']].map(([name, price], i) => <div className={`price-card ${i === 1 ? 'featured' : ''}`} key={name}><p>{i === 1 ? 'Most popular' : 'Starting from'}</p><h3>{name}</h3><strong>{price}</strong><a href="#contact">Get a custom quote <ArrowUpRight /></a></div>)}</div><p className="fine-print">Starting prices. Final pricing depends on requirements and scope. USD / EUR / AED available for international projects.</p></div></section>

    <section className="growth section-grid"><p className="eyebrow">08 / Keep growing</p><div><h2>And when you&apos;re<br /><span>ready to grow...</span></h2><div className="growth-list">{growth.map((item, i) => <div key={item}><span>0{i + 1}</span><h3>{item}</h3><Plus /></div>)}</div></div></section>

    <section className="guarantee"><p className="eyebrow">09 / Trust</p><h2>Built with<br /><em>confidence.</em></h2><div className="guarantee-grid">{['100% Satisfaction', 'On-Time Delivery', 'Unlimited Revisions*', 'Dedicated Support'].map((item) => <span key={item}><Check />{item}</span>)}</div><small>*Within the agreed project scope.</small></section>

    <section id="about" className="about section-grid"><p className="eyebrow">10 / About</p><div><h2>Small studio.<br /><span>Big digital ambitions.</span></h2><p className="body-copy">Slingster operates as a freelance digital studio, assembling designers, developers and marketers around the needs of each project. Small team, thoughtful work, no generic handoffs.</p><div className="signature">S<span>.</span></div></div></section>

    <section id="contact" className="contact section-grid"><div><p className="eyebrow">11 / Convert</p><h2>Got an idea?<br /><em>Let&apos;s build it.</em></h2><p className="body-copy">Tell us what you&apos;re working on.</p><a className="contact-email" href="mailto:striper.org@gmail.com">striper.org@gmail.com <ArrowUpRight /></a><p className="contact-detail">+91 99439 49439<br />Monday – Sunday, 6:00 PM – 11:30 PM</p></div>{sent ? <div className="success"><Check /><h3>Let&apos;s build something great.</h3><p>Thanks — we&apos;ll be in touch soon.</p></div> : <form onSubmit={submit} className="contact-form"><div className="form-grid"><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@company.com" /></label><label>Phone<input name="phone" placeholder="+91" /></label><label>Company<input name="company" placeholder="Company name" /></label></div><label>What do you want to build?<input required name="build" placeholder="A website, store, app..." /></label><label>Budget<input name="budget" placeholder="₹5,000+" /></label><label>Message<textarea required name="message" rows={4} placeholder="Tell us a little about the idea." /></label><button className="button button-primary" type="submit">Let&apos;s Build <ArrowUpRight /></button></form>}</section>

    <footer><div><a href="#top" className="wordmark">SLINGSTER<span>.</span></a><p>We Build. You Grow.</p></div><nav><a href="#services">Services</a><a href="#work">Work</a><a href="#process">Process</a><a href="#pricing">Pricing</a><a href="#about">About</a><a href="#contact">Contact</a></nav><div className="footer-contact"><a href="mailto:striper.org@gmail.com">striper.org@gmail.com</a><a href="tel:+919943949439">+91 99439 49439</a><span>Monday – Sunday, 6:00 PM – 11:30 PM</span></div><small>© 2026 Slingster Studio. Made with intent.</small></footer>
  </main>
}

export default App
