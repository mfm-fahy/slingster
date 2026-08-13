'use client'

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion'
import { ArrowRight, Code2, PenTool, Rocket, TrendingUp, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '@/lib/use-reveal'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

type Stage = {
  index: string
  name: string
  image: string
  desc: string
  icon: typeof PenTool
}

const stages: Stage[] = [
  {
    index: '01',
    name: 'DESIGN',
    image: '/section-2/design.png',
    icon: PenTool,
    desc: 'We craft modern, conversion-focused designs that represent your brand and connect with your audience.',
  },
  {
    index: '02',
    name: 'BUILD',
    image: '/section-2/build.png',
    icon: Code2,
    desc: 'Clean, secure and scalable development with performance in mind. Built to grow with your business.',
  },
  {
    index: '03',
    name: 'LAUNCH',
    image: '/section-2/launch.png',
    icon: Rocket,
    desc: 'We test, refine and launch your project so it performs flawlessly from day one.',
  },
  {
    index: '04',
    name: 'GROW',
    image: '/section-2/grow.png',
    icon: TrendingUp,
    desc: 'From marketing to chatbots and SEO — we help you attract more customers and scale faster.',
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

function SectionIntro() {
  const { ref, inView } = useReveal<HTMLDivElement>()

  return (
    <div className="bs-intro">
      <motion.div ref={ref} className="bs-intro-copy" initial={inView ? 'show' : 'hidden'} animate={inView ? 'show' : 'hidden'} variants={stagger}>
        <motion.p className="bs-eyebrow" variants={fadeUp}>
          02 | ABOUT SLINGSTER
          <span className="bs-circuit" aria-hidden="true" />
        </motion.p>
        <motion.h2 className="bs-title" variants={fadeUp}>
          THIS IS NOT
          <br />
          AN AGENCY.
          <br />
          <span>IT&apos;S A BUILD SYSTEM.</span>
        </motion.h2>
        <motion.p className="bs-desc" variants={fadeUp}>
          Slingster brings design, development, branding and growth together under one roof — so you don&apos;t have to
          manage five different vendors.
        </motion.p>
      </motion.div>
      <motion.div
        className="bs-intro-media"
        initial={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <RobotVisual />
      </motion.div>
    </div>
  )
}

function StatementCard() {
  return (
    <div className="bs-statement" role="note">
      <span className="bs-statement-icon" aria-hidden="true">
        <Zap />
      </span>
      <p>
        ONE TEAM.
        <br />
        ONE PROCESS.
        <br />
        <em>REAL RESULTS.</em>
      </p>
    </div>
  )
}

function RobotVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 110, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 110, damping: 18 })

  return (
    <div className="bs-robot-wrap">
      <div className="bs-robot">
        <motion.div
          className="bs-robot-zone"
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
          <span className="bs-robot-glow" aria-hidden="true" />
          <img className="bs-robot-img" src="/section-2/robo.png" alt="Slingster robot" draggable={false} loading="lazy" />
        </motion.div>
      </div>
      <StatementCard />
    </div>
  )
}

function ProcessTimeline({ active }: { active: number }) {
  const progress = (active / (stages.length - 1)) * 100
  return (
    <div className="bs-timeline" aria-label="Our process">
      <p className="bs-timeline-label">HOW WE WORK</p>
      <div className="bs-steps" style={{ '--bs-progress': `${progress}%` } as CSSProperties}>
        {stages.map((s, i) => (
          <div
            key={s.name}
            className={`bs-step ${i <= active ? 'is-done' : ''} ${i === active ? 'is-active' : ''}`}
            aria-current={i === active ? 'step' : undefined}
          >
            <span className="bs-step-dot" />
            <span className="bs-step-name">{s.name}</span>
            {i < stages.length - 1 && (
              <span className="bs-step-arrow" aria-hidden="true">
                <ArrowRight />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProcessCards({ active }: { active: number }) {
  return (
    <div className="bs-track">
      <div className="bs-cards">
        {stages.map((s, i) => (
          <article key={s.name} className={`bs-card ${i === active ? 'is-active' : ''}`} data-index={i}>
            <div className="bs-card-media">
              <img src={s.image} alt={`${s.name} stage`} loading="lazy" />
              <span className="bs-card-icon" aria-hidden="true">
                <s.icon />
              </span>
            </div>
            <div className="bs-card-body">
              <div className="bs-card-head">
                <span className="bs-card-no">{s.index}</span>
                <h3>{s.name}</h3>
              </div>
              <span className="bs-card-accent" aria-hidden="true" />
              <p>{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default function Section02BuildSystem() {
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
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined' || reduced || !isDesktop) return
    gsap.registerPlugin(ScrollTrigger)

    const refresh = () => ScrollTrigger.refresh()
    const images = rootRef.current?.querySelectorAll<HTMLImageElement>('.bs-card img') ?? []
    images.forEach((img) => img.addEventListener('load', refresh))
    window.addEventListener('load', refresh)

    const ctx = gsap.context(() => {
      const cardsEl = rootRef.current?.querySelector<HTMLElement>('.bs-cards')
      const firstCard = rootRef.current?.querySelector<HTMLElement>('.bs-card')
      if (!cardsEl || !firstCard) return
      let last = -1

      const gap = parseFloat(getComputedStyle(cardsEl).gap) || 0
      const step = Math.max(firstCard.offsetWidth + gap, 1)
      const total = step * (stages.length - 1)
      const lastIndex = stages.length - 1

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.bs-trigger',
          start: 'top top',
          end: 'bottom bottom',
          pin: '.bs-pin',
          scrub: true,
          anticipatePin: 1,
          onUpdate(self) {
            const x = -self.progress * total
            gsap.set(cardsEl, { x })
            const idx = Math.min(lastIndex, Math.max(0, Math.round(-x / step)))
            if (idx !== last) {
              last = idx
              setActive(idx)
            }
          },
        },
      })

      tl.fromTo('.bs-timeline', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0)
      tl.to('.bs-cards', { opacity: 0.94, scale: 0.88, yPercent: -3, duration: 0.06 }, 0.9)
    }, rootRef)

    return () => {
      images.forEach((img) => img.removeEventListener('load', refresh))
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [reduced, isDesktop])

  useEffect(() => {
    if (isDesktop && !reduced) return
    const cards = rootRef.current?.querySelectorAll('.bs-card')
    if (!cards?.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
      },
      { rootMargin: '-38% 0px -38% 0px', threshold: 0 },
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [isDesktop, reduced])

  return (
    <section className={`build-system ${reduced ? 'is-reduced' : ''}`} id="build-system" ref={rootRef}>
      <SectionIntro />
      <div className="bs-trigger">
        <div className="bs-pin">
          <ProcessTimeline active={active} />
          <div className="bs-track">
            <ProcessCards active={active} />
          </div>
        </div>
      </div>
    </section>
  )
}
