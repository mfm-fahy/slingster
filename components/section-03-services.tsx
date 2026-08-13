'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  LayoutDashboard,
  Megaphone,
  Monitor,
  Palette,
  PenTool,
  Search,
  ShoppingCart,
  Smartphone,
  Zap,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

type Service = {
  no: string
  title: string
  desc: string
  priceLabel: string
  price: string
  icon: typeof Monitor
  contact?: boolean
}

const services: Service[] = [
  {
    no: '01',
    title: 'LANDING PAGE',
    desc: 'A single, high-converting page to showcase your business and drive action.',
    priceLabel: 'STARTING AT',
    price: '₹5,000+',
    icon: Monitor,
  },
  {
    no: '02',
    title: 'WEBSITE + LOGO DESIGN',
    desc: 'Multi-page website with custom logo, brand identity and everything you need.',
    priceLabel: 'STARTING AT',
    price: '₹15,000+',
    icon: PenTool,
  },
  {
    no: '03',
    title: 'E-COMMERCE WEBSITE',
    desc: 'Launch and scale your store with cart, payments, and order management.',
    priceLabel: 'STARTING AT',
    price: '₹25,000+',
    icon: ShoppingCart,
  },
  {
    no: '04',
    title: 'WEB & MOBILE APPS',
    desc: 'Custom web and mobile applications built for your unique business needs.',
    priceLabel: '',
    price: 'CUSTOM',
    icon: Smartphone,
    contact: true,
  },
  {
    no: '05',
    title: 'MANAGEMENT SYSTEMS',
    desc: 'Powerful admin panels and systems to manage your business efficiently.',
    priceLabel: '',
    price: 'CUSTOM',
    icon: LayoutDashboard,
    contact: true,
  },
  {
    no: '06',
    title: 'POSTER & GRAPHIC DESIGN',
    desc: 'Stunning posters, social creatives and brand assets that stand out.',
    priceLabel: '',
    price: 'CUSTOM',
    icon: Palette,
    contact: true,
  },
]

const addons = [
  { title: 'MARKETING', desc: 'Social Media, Google Ads, Content & more to boost your reach.', icon: Megaphone },
  { title: 'AI CHATBOTS', desc: 'Smart chatbots for lead generation and 24/7 customer support.', icon: Bot },
  { title: 'SEO', desc: 'On-page SEO, technical optimization and content strategy to rank higher.', icon: Search },
]

const included = ['Modern & Responsive Design', 'Clean & Secure Code', 'On-Time Delivery', 'Unlimited Revisions*', 'Dedicated Support']

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

function ServicesIntro() {
  return (
    <motion.div className="svc-intro" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} variants={stagger}>
      <motion.p className="svc-eyebrow" variants={fadeUp}>
        03 | OUR SERVICES
        <span className="svc-circuit" aria-hidden="true" />
      </motion.p>
      <motion.h2 className="svc-heading" variants={fadeUp}>
        WHAT ARE WE
        <br />
        <span>BUILDING?</span>
      </motion.h2>
      <motion.p className="svc-sub" variants={fadeUp}>
        &ldquo;From your first landing page to custom systems and growth solutions — we build it all.&rdquo;
      </motion.p>
    </motion.div>
  )
}

function RobotVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 110, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 110, damping: 18 })

  return (
    <div className="svc-robot-visual">
      <div className="svc-robot-platform" aria-hidden="true">
        <span className="svc-platform-ring r1" />
        <span className="svc-platform-ring r2" />
        <span className="svc-platform-core" />
      </div>
      <span className="svc-robot-glow" aria-hidden="true" />
      <span className="svc-robot-deco deco-a" aria-hidden="true" />
      <span className="svc-robot-deco deco-b" aria-hidden="true" />
      <motion.div
        className="svc-robot-zone"
        ref={ref}
        style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect()
          if (!r) return
          mx.set((e.clientX - r.left) / r.width - 0.5)
          my.set((e.clientY - r.top) / r.height - 0.5)
        }}
        onMouseLeave={() => {
          mx.set(0)
          my.set(0)
        }}
      >
        <img className="svc-robot-img" src="/section-3/robot.png" alt="Slingster robot" draggable={false} loading="lazy" />
      </motion.div>
    </div>
  )
}

function IncludedFeatures() {
  return (
    <div className="svc-included">
      <div className="svc-included-head">
        <span className="svc-included-mark" aria-hidden="true">
          <Zap />
        </span>
        <h4>EVERY SOLUTION INCLUDES</h4>
      </div>
      <ul>
        {included.map((f) => (
          <li key={f}>
            <Check aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <p className="svc-included-note">*Within agreed project scope.</p>
    </div>
  )
}

function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="svc-card">
      <span className="svc-card-no">{s.no}</span>
      <div className="svc-card-icon">
        <s.icon />
      </div>
      <h3>{s.title}</h3>
      <p className="svc-card-desc">{s.desc}</p>
      <div className="svc-card-foot">
        <div className="svc-price">
          {s.priceLabel && <span className="svc-price-label">{s.priceLabel}</span>}
          <strong className="svc-price-amount">{s.price}</strong>
          {s.contact && (
            <a className="svc-price-contact" href="#contact">
              Contact us
            </a>
          )}
        </div>
        <button className="svc-card-arrow" type="button" aria-label={`${s.title} details`}>
          <ArrowRight />
        </button>
      </div>
    </article>
  )
}

function ServicesTimeline({ active }: { active: number }) {
  return (
    <div className="svc-timeline">
      <div className="svc-nums" aria-hidden="true">
        <span className="svc-line" />
        <span className="svc-line-fill" />
        {services.map((s, i) => (
          <span key={s.no} className={`svc-num ${i < active ? 'is-done' : ''} ${i === active ? 'is-active' : ''}`}>
            {s.no}
          </span>
        ))}
      </div>
      <div className="svc-stage">
        {services.map((s, i) => (
          <div key={s.no} className={`svc-card-slot ${i === active ? 'is-active' : ''}`} data-index={i}>
            <ServiceCard s={s} />
          </div>
        ))}
      </div>
    </div>
  )
}

function AddOns() {
  return (
    <div className="svc-addons">
      <h3 className="svc-addons-title">
        GROW FASTER WITH
        <br />
        <span>OUR ADD-ONS</span>
      </h3>
      <div className="svc-addon-list">
        {addons.map((a) => (
          <div className="svc-addon" key={a.title}>
            <span className="svc-addon-icon" aria-hidden="true">
              <a.icon />
            </span>
            <div>
              <h4>{a.title}</h4>
              <p>{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CustomCTA() {
  return (
    <div className="svc-cta">
      <span className="svc-cta-icon" aria-hidden="true">
        <Zap />
      </span>
      <p>
        Need something
        <br />
        <em>custom?</em>
      </p>
      <a className="svc-cta-btn" href="#contact">
        LET&rsquo;S BUILD IT <ArrowUpRight />
      </a>
    </div>
  )
}

export default function Section03Services() {
  const rootRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined' || reduced || !isDesktop) return
    gsap.registerPlugin(ScrollTrigger)

    const refresh = () => ScrollTrigger.refresh()
    const img = rootRef.current?.querySelector<HTMLImageElement>('.svc-robot-img')
    img?.addEventListener('load', refresh)
    window.addEventListener('load', refresh)

    const ctx = gsap.context(() => {
      const lineFill = rootRef.current?.querySelector<HTMLElement>('.svc-line-fill')
      const robot = rootRef.current?.querySelector<HTMLElement>('.svc-robot-visual')
      const addons = rootRef.current?.querySelector<HTMLElement>('.svc-addons')
      let last = -1

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.svc-trigger',
          start: 'top top',
          end: 'bottom bottom',
          pin: '.svc-pin',
          scrub: true,
          anticipatePin: 1,
          onUpdate(self) {
            const p = self.progress
            const idx = Math.min(services.length - 1, Math.max(0, Math.floor(p * services.length)))
            if (idx !== last) {
              last = idx
              setActive(idx)
            }
            if (lineFill) gsap.set(lineFill, { xPercent: -50, scaleY: p })
            if (addons) gsap.set(addons, { opacity: 0.35 + 0.65 * Math.min(1, p / 0.85), y: 26 * (1 - Math.min(1, p / 0.85)) })
          },
        },
      })

      if (robot) tl.fromTo(robot, { y: 26 }, { y: -28, duration: 1 }, 0)
      tl.fromTo('.svc-cta', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.16, ease: 'power2.out' }, 0.82)
    }, rootRef)

    return () => {
      img?.removeEventListener('load', refresh)
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [reduced, isDesktop])

  useEffect(() => {
    if (isDesktop && !reduced) return
    const slots = rootRef.current?.querySelectorAll('.svc-card-slot')
    if (!slots?.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
      },
      { rootMargin: '-38% 0px -38% 0px', threshold: 0 },
    )
    slots.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [isDesktop, reduced])

  return (
    <section id="services" className={`services-section ${reduced ? 'is-reduced' : ''}`} ref={rootRef}>
      <span className="svc-dots" aria-hidden="true" />
      <span className="svc-corner corner-tl" aria-hidden="true" />
      <span className="svc-corner corner-br" aria-hidden="true" />
      <div className="svc-trigger">
        <div className="svc-pin">
          <div className="svc-left">
            <ServicesIntro />
            <RobotVisual />
            <IncludedFeatures />
          </div>
          <ServicesTimeline active={active} />
          <div className="svc-right">
            <AddOns />
            <CustomCTA />
          </div>
        </div>
      </div>
    </section>
  )
}
