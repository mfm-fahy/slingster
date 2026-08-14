'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '@/lib/use-reveal'
import {
  ArrowUpRight,
  Bot,
  Check,
  Clock,
  Headset,
  Megaphone,
  Monitor,
  PenTool,
  RefreshCcw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Zap,
} from 'lucide-react'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const easeOut = [0.22, 1, 0.36, 1] as const

type Plan = {
  number: string
  category: string
  title: string
  description: string
  priceLabel: string
  priceINR: string
  currencies: { code: string; value: string }[]
  note: string
  icon: typeof Monitor
  featured?: boolean
}

const plans: Plan[] = [
  {
    number: '01',
    category: 'STARTER',
    title: 'LANDING PAGE',
    description: 'A single, high-converting page to showcase your business and drive action.',
    priceLabel: 'STARTING AT',
    priceINR: '₹5,000+',
    currencies: [
      { code: 'USD', value: '$60' },
      { code: 'EUR', value: '€55' },
      { code: 'AED', value: '250' },
    ],
    note: 'Great for launching fast and getting leads.',
    icon: Monitor,
  },
  {
    number: '02',
    category: 'BUILDER',
    title: 'WEBSITE + LOGO DESIGN',
    description: 'Multi-page website with custom logo, brand identity and everything you need.',
    priceLabel: 'STARTING AT',
    priceINR: '₹15,000+',
    currencies: [
      { code: 'USD', value: '$180' },
      { code: 'EUR', value: '€165' },
      { code: 'AED', value: '750' },
    ],
    note: 'Best for growing brands that want a strong online presence.',
    icon: PenTool,
    featured: true,
  },
  {
    number: '03',
    category: 'COMMERCE',
    title: 'E-COMMERCE WEBSITE',
    description: 'Launch and scale your store with cart, payments and order management.',
    priceLabel: 'STARTING AT',
    priceINR: '₹25,000+',
    currencies: [
      { code: 'USD', value: '$300' },
      { code: 'EUR', value: '€275' },
      { code: 'AED', value: '1,250' },
    ],
    note: 'Built for businesses ready to sell online.',
    icon: ShoppingCart,
  },
]

const addons = [
  {
    title: 'MARKETING',
    description: 'Boost your reach, traffic & sales with data-driven marketing strategies.',
    icon: Megaphone,
    items: ['Social Media Marketing', 'Google Ads', 'SEO & Content Marketing'],
  },
  {
    title: 'CHATBOTS',
    description: 'Automate conversations and improve customer support with smart chatbots.',
    icon: Bot,
    items: ['AI-Powered Chatbots', 'Lead Generation', '24/7 Customer Support'],
  },
  {
    title: 'SEO',
    description: 'Rank higher with on-page, technical and content optimization.',
    icon: Search,
    items: ['On-page SEO', 'Technical SEO', 'Content optimization'],
  },
]

const guarantees = [
  { title: '100% SATISFACTION GUARANTEED', icon: ShieldCheck },
  { title: 'ON-TIME DELIVERY', icon: Clock },
  { title: 'UNLIMITED REVISIONS*', icon: RefreshCcw },
  { title: 'DEDICATED SUPPORT', icon: Headset },
]

const revealUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

const revealStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  disabled,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  disabled?: boolean
}) {
  const { ref, inView } = useReveal<HTMLDivElement>()
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={disabled ? false : inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      animate={disabled || inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

function PricingHeader({ disabled }: { disabled: boolean }) {
  const { ref, inView } = useReveal<HTMLDivElement>()
  const state = disabled ? 'show' : inView ? 'show' : 'hidden'

  return (
    <div className="pr-head" ref={ref}>
      <motion.div initial={disabled ? false : inView ? 'show' : 'hidden'} animate={state} variants={revealStagger}>
        <motion.p className="pr-eyebrow" variants={revealUp}>
          04 | PRICING
          <span className="pr-circuit" aria-hidden="true" />
        </motion.p>
        <h2 className="pr-title">
          <motion.span className="pr-title-line" variants={revealUp}>
            CHOOSE YOUR
          </motion.span>
          <motion.span className="pr-title-line" variants={revealUp}>
            STARTING POINT
          </motion.span>
        </h2>
        <motion.p className="pr-sub" variants={revealUp}>
          Transparent starting prices. Final pricing depends on project scope, complexity, timeline and add-ons.
        </motion.p>
      </motion.div>
    </div>
  )
}

function PricingRobot({ disabled }: { disabled: boolean }) {
  const { ref, inView } = useReveal<HTMLDivElement>()
  const shown = disabled || inView

  return (
    <div className="pr-robot" ref={ref}>
      <svg className="pr-circuit-svg" viewBox="0 0 420 320" fill="none" aria-hidden="true">
        <path d="M20 300 H132 L164 268 H288" stroke="#23168F" strokeOpacity=".22" />
        <path d="M288 128 V64 H376" stroke="#3D7CFF" strokeOpacity=".2" />
        <path d="M48 36 H116 M116 36 V104" stroke="#23168F" strokeOpacity=".18" />
        <circle cx="164" cy="268" r="4" fill="#23168F" fillOpacity=".45" />
        <circle cx="288" cy="128" r="4" fill="#3D7CFF" fillOpacity=".45" />
        <circle cx="116" cy="36" r="3" fill="#23168F" fillOpacity=".45" />
        <circle cx="20" cy="300" r="3" fill="#23168F" fillOpacity=".3" />
        <path d="M288 268 h44 M332 268 v36" stroke="#23168F" strokeOpacity=".14" />
      </svg>
      <motion.div
        className="pr-robot-enter"
        initial={disabled ? false : shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
        animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
        transition={{ duration: 0.85, ease: easeOut }}
      >
        <div className="pr-robot-float">
          <img
            className="pr-robot-img"
            src="/section-4/robo.png"
            alt="Stony the robot floating beside the pricing plans"
            width={1536}
            height={1024}
            draggable={false}
            loading="lazy"
          />
        </div>
      </motion.div>
      <motion.div
        className="pr-info-card"
        role="note"
        initial={disabled ? false : shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
        animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
        transition={{ duration: 0.75, delay: 0.22, ease: easeOut }}
      >
        <span className="pr-info-icon" aria-hidden="true">
          <Zap />
        </span>
        <p>
          Every project is
          <br />
          unique. Let&rsquo;s build
          <br />
          exactly what you need.
        </p>
      </motion.div>
    </div>
  )
}

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <article className={`pr-card${plan.featured ? ' is-featured' : ''}`}>
      {plan.featured && <span className="pr-badge">MOST POPULAR</span>}
      <div className="pr-card-head">
        <span className="pr-card-no">{plan.number}</span>
        <span className="pr-card-cat">{plan.category}</span>
      </div>
      <div className="pr-card-icon" aria-hidden="true">
        <plan.icon />
      </div>
      <h3>{plan.title}</h3>
      <p className="pr-card-desc">{plan.description}</p>
      <span className="pr-card-divider" aria-hidden="true" />
      <div className="pr-card-price">
        <span className="pr-price-label">{plan.priceLabel}</span>
        <strong className="pr-price-inr">{plan.priceINR}</strong>
        <ul className="pr-price-intl">
          {plan.currencies.map((c) => (
            <li key={c.code}>
              <span className="pr-ccy">{c.code}</span>
              <span className="pr-ccy-val">{c.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="pr-card-bottom">
        <p className="pr-card-note">{plan.note}</p>
        <a className="pr-card-arrow" href="#contact" aria-label={`Start a ${plan.category} project — ${plan.title}`}>
          <ArrowUpRight />
        </a>
      </div>
    </article>
  )
}

function PricingGrid() {
  return (
    <div className="pr-cards-trigger">
      <div className="pr-cards-pin">
        <div className="pr-cards">
          {plans.map((p) => (
            <PricingCard plan={p} key={p.number} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AddOnServices({ disabled }: { disabled: boolean }) {
  return (
    <div className="pr-addons">
      <Reveal className="pr-addons-head" disabled={disabled}>
        <p className="pr-addons-kicker">GROWTH LAYERS</p>
        <h3 className="pr-addons-title">
          ADD-ON <span>SERVICES</span>
        </h3>
        <span className="pr-addons-rule" aria-hidden="true" />
      </Reveal>
      <div className="pr-addons-grid">
        {addons.map((a, i) => (
          <Reveal className="pr-addon" key={a.title} delay={0.08 + i * 0.12} disabled={disabled}>
            <span className="pr-addon-icon" aria-hidden="true">
              <a.icon />
            </span>
            <h4>{a.title}</h4>
            <p>{a.description}</p>
            <ul>
              {a.items.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

function GuaranteeStrip({ disabled }: { disabled: boolean }) {
  return (
    <div className="pr-guarantee-wrap">
      <div className="pr-guarantee">
        {guarantees.map((g, i) => (
          <Reveal className="pr-guar-item" key={g.title} delay={i * 0.1} y={22} disabled={disabled}>
            <span className="pr-guar-icon" aria-hidden="true">
              <g.icon />
            </span>
            <strong>{g.title}</strong>
          </Reveal>
        ))}
      </div>
      <p className="pr-guarantee-note">*Within agreed project scope.</p>
    </div>
  )
}

function PricingCTA({ disabled }: { disabled: boolean }) {
  return (
    <div className="pr-cta">
      <Reveal disabled={disabled}>
        <h3 className="pr-cta-title">
          LET&rsquo;S BUILD SOMETHING
          <br />
          <span>AMAZING TOGETHER!</span>
        </h3>
        <div className="pr-cta-info">
          <div className="pr-cta-links">
            <a href="https://www.slingster.org" target="_blank" rel="noreferrer">
              www.slingster.org
            </a>
            <a href="mailto:slingster.org@gmail.com">slingster.org@gmail.com</a>
            <a href="tel:+919943949439">+91 99439 49439</a>
            <span>Monday – Sunday | 6pm to 11:30pm</span>
          </div>
          <a className="pr-cta-btn" href="#contact">
            START A PROJECT <ArrowUpRight />
          </a>
        </div>
      </Reveal>
    </div>
  )
}

export default function Section04Pricing() {
  const rootRef = useRef<HTMLElement>(null)
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
    if (typeof window === 'undefined' || reduced) return
    gsap.registerPlugin(ScrollTrigger)

    const refresh = () => ScrollTrigger.refresh()
    const imgs = rootRef.current?.querySelectorAll<HTMLImageElement>('img') ?? []
    imgs.forEach((img) => img.addEventListener('load', refresh))
    window.addEventListener('load', refresh)

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.pr-card')

      if (isDesktop) {
        gsap.set(cards, { opacity: 0, y: 90, scale: 0.96 })
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.pr-cards-trigger',
            start: 'top top',
            end: 'bottom bottom',
            pin: '.pr-cards-pin',
            scrub: true,
            anticipatePin: 1,
          },
        })
        cards.forEach((card, i) => tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }, i * 0.18))
        tl.fromTo('.pr-badge', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.32, ease: 'back.out(1.8)' }, 0.22)
      } else {
        gsap.set(cards, { opacity: 0, y: 56 })
        cards.forEach((card, i) =>
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: (i % 3) * 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          }),
        )
      }

      gsap.to('.pr-robot-float', {
        y: -34,
        ease: 'none',
        scrollTrigger: { trigger: '.pr-robot', start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, rootRef)

    return () => {
      imgs.forEach((img) => img.removeEventListener('load', refresh))
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [reduced, isDesktop])

  return (
    <section id="pricing" className={`pricing-section${reduced ? ' is-reduced' : ''}`} ref={rootRef}>
      <span className="pr-dots" aria-hidden="true" />
      <div className="pr-header">
        <PricingHeader disabled={reduced} />
        <PricingRobot disabled={reduced} />
      </div>
      <PricingGrid />
      <AddOnServices disabled={reduced} />
      <GuaranteeStrip disabled={reduced} />
      <PricingCTA disabled={reduced} />
    </section>
  )
}
