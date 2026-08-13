'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Headset, Monitor, Shield, Zap } from 'lucide-react'
import { useReveal } from '@/lib/use-reveal'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

type PillarId = 'design' | 'speed' | 'security' | 'support'

type Pillar = {
  id: PillarId
  number: string
  title: string
  tag: string
  description: string
  angle: number
  Icon: typeof Monitor
}

const pillars: Pillar[] = [
  {
    id: 'design',
    number: '01',
    title: 'MODERN DESIGN',
    tag: 'DESIGN',
    angle: 0,
    description:
      'Contemporary, conversion-focused visual design that helps your brand stand out and connect with its audience.',
    Icon: Monitor,
  },
  {
    id: 'speed',
    number: '02',
    title: 'FAST & RESPONSIVE',
    tag: 'SPEED',
    angle: 90,
    description: 'Quick turnaround and mobile-first builds designed to perform smoothly across devices.',
    Icon: Zap,
  },
  {
    id: 'security',
    number: '03',
    title: 'SECURE & RELIABLE',
    tag: 'RELIABILITY',
    angle: 180,
    description: 'Dependable infrastructure and clean development built with reliability and security in mind.',
    Icon: Shield,
  },
  {
    id: 'support',
    number: '04',
    title: 'DEDICATED SUPPORT',
    tag: 'SUPPORT',
    angle: 270,
    description: 'Direct, responsive communication and support before, during and after delivery.',
    Icon: Headset,
  },
]

const ORBIT_R = 0.46

function DesignVisual() {
  return (
    <div className="hws-visual hws-v-design" aria-hidden="true">
      <div className="hws-browser">
        <span className="hws-browser-bar">
          <i />
          <i />
          <i />
        </span>
        <span className="hws-browser-line hws-bl-1" />
        <span className="hws-browser-line hws-bl-2" />
        <span className="hws-browser-block" />
        <span className="hws-browser-btn" />
      </div>
    </div>
  )
}

function SpeedVisual() {
  return (
    <div className="hws-visual hws-v-speed" aria-hidden="true">
      <span className="hws-device hws-dev-desktop">
        <i className="hws-dev-screen" />
        <b className="hws-dev-stand" />
      </span>
      <span className="hws-device hws-dev-tablet">
        <i className="hws-dev-screen" />
      </span>
      <span className="hws-device hws-dev-mobile">
        <i className="hws-dev-screen" />
      </span>
      <span className="hws-signal">
        <i />
      </span>
    </div>
  )
}

function SecurityVisual() {
  return (
    <div className="hws-visual hws-v-security" aria-hidden="true">
      <Shield className="hws-shield" />
      <span className="hws-chip hws-chip-a">SECURE</span>
      <span className="hws-chip hws-chip-b">STABLE</span>
      <span className="hws-chip hws-chip-c">READY</span>
      <span className="hws-core" />
    </div>
  )
}

function SupportVisual() {
  return (
    <div className="hws-visual hws-v-support" aria-hidden="true">
      <span className="hws-party hws-party-a">SLINGSTER</span>
      <span className="hws-sigline">
        <i />
      </span>
      <span className="hws-party hws-party-b">CLIENT</span>
    </div>
  )
}

const visuals: Record<PillarId, () => ReactNode> = {
  design: () => <DesignVisual />,
  speed: () => <SpeedVisual />,
  security: () => <SecurityVisual />,
  support: () => <SupportVisual />,
}

function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
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

function SectionHeader({ reduced }: { reduced: boolean }) {
  return (
    <Reveal className="hws-header" disabled={reduced}>
      <p className="hws-eyebrow">
        06 | WHY SLINGSTER? <span className="hws-circuit" aria-hidden="true" />
      </p>
      <h2 className="hws-title">
        <span className="hws-title-line">WHY</span>
        <span className="hws-title-line hws-title-purple">SLINGSTER?</span>
      </h2>
      <p className="hws-sub">&ldquo;More than a service provider. A focused team built around your goals.&rdquo;</p>
    </Reveal>
  )
}

function TechnicalInfo({ active, reduced }: { active: number; reduced: boolean }) {
  return (
    <Reveal className="hws-info" delay={0.1} disabled={reduced}>
      <p className="hws-info-sys">SYSTEM / 06</p>
      <h4 className="hws-info-name">WHY SLINGSTER</h4>
      <p className="hws-info-core">04 CORE PRINCIPLES</p>
      <ol className="hws-info-list">
        {pillars.map((p, i) => (
          <li key={p.id} className={i === active ? 'is-active' : ''}>
            <span>{p.number}</span>
            <b>{p.tag}</b>
          </li>
        ))}
      </ol>
      <p className="hws-info-foot">STATUS / {pillars[active].tag} ONLINE</p>
    </Reveal>
  )
}

function WhyDial({
  active,
  onActivate,
  reduced,
  dragging,
  dialProps,
}: {
  active: number
  onActivate: (i: number) => void
  reduced: boolean
  dragging: boolean
  dialProps: React.HTMLAttributes<HTMLDivElement>
}) {
  return (
    <div className={`hws-dial${dragging ? ' is-dragging' : ''}`} {...dialProps}>
      <div className="hws-rings" aria-hidden="true">
        <svg className="hws-rings-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle className="hws-ring hws-ring-outer" cx="50" cy="50" r="47" />
          <circle className="hws-ring hws-ring-mid" cx="50" cy="50" r="42" />
          <circle className="hws-ring hws-ring-inner" cx="50" cy="50" r="34" />
          <circle className="hws-dot hws-dot-a" cx="50" cy="3" r="0.7" />
          <circle className="hws-dot hws-dot-b" cx="97" cy="50" r="0.7" />
          <circle className="hws-dot hws-dot-c" cx="50" cy="97" r="0.7" />
          <circle className="hws-dot hws-dot-d" cx="3" cy="50" r="0.7" />
          <circle className="hws-dot hws-dot-e" cx="80" cy="13.5" r="0.5" />
          <circle className="hws-dot hws-dot-f" cx="86.5" cy="80" r="0.5" />
          <circle className="hws-dot hws-dot-g" cx="20" cy="86.5" r="0.5" />
          <circle className="hws-dot hws-dot-h" cx="13.5" cy="20" r="0.5" />
          <g className="hws-travel-g hws-tg-1">
            <circle className="hws-tdot" cx="50" cy="8" r="0.8" />
            <circle className="hws-tdot" cx="50" cy="92" r="0.8" />
          </g>
          <g className="hws-travel-g hws-tg-2">
            <circle className="hws-tdot hws-tdot-blue" cx="50" cy="3.5" r="0.9" />
            <circle className="hws-tdot hws-tdot-blue" cx="50" cy="96.5" r="0.9" />
          </g>
        </svg>
      </div>

      {pillars.map((p, i) => {
        const isActive = i === active
        return (
          <span key={p.id} className={`hws-rotor${isActive ? ' is-active' : ''}`}>
            <span className="hws-rotor-inner">
              <button
                type="button"
                className={`hws-pillarbtn${isActive ? ' is-active' : ''}`}
                aria-label={`View ${p.title} benefit`}
                aria-pressed={isActive}
                onClick={() => onActivate(i)}
              >
                <span className="hws-pill-no">{p.number}</span>
                <span className="hws-pill-title">{p.title}</span>
                {isActive && <span className="hws-active-chip">ACTIVE</span>}
              </button>
            </span>
          </span>
        )
      })}

      <div className="hws-center" aria-hidden="true">
        <span className="hws-glow" key={`g${active}`} />
        <span className="hws-smark">
          <img src="/logo.png" alt="" className="hws-smark-img" loading="lazy" />
        </span>
        <p className="hws-center-name">SLINGSTER</p>
        <p className="hws-center-tag">
          WE BUILD.
          <br />
          YOU GROW.
        </p>
      </div>

      <div className="hws-center-visual" aria-hidden="true">
        <motion.div
          key={`v${active}`}
          className="hws-cv-inner"
          initial={reduced ? false : { opacity: 0, scale: 0.94, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          {visuals[pillars[active].id]()}
        </motion.div>
      </div>

      <div className="hws-robot-orbit" aria-hidden="true">
        <div className="hws-robot-spinner">
          <img src="/section-3/robot.png" alt="" width={1391} height={1131} loading="lazy" draggable={false} />
        </div>
      </div>
    </div>
  )
}

function ActivePillarContent({ active, reduced }: { active: number; reduced: boolean }) {
  const p = pillars[active]
  const Icon = p.Icon
  return (
    <motion.article
      key={`${p.id}-${active}`}
      className="hws-active"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      <p className="hws-active-kicker">
        ACTIVE VALUE / {p.number} <span className="hws-active-dot" />
      </p>
      <div className="hws-active-icon">
        <Icon />
      </div>
      <h3 className="hws-active-title">{p.title}</h3>
      <p className="hws-active-desc">{p.description}</p>
      <span className="hws-active-tag">SLINGSTER CORE / {p.tag}</span>
    </motion.article>
  )
}

function MobilePillarList({ active, onActivate, reduced }: { active: number; onActivate: (i: number) => void; reduced: boolean }) {
  return (
    <nav className="hws-pillarlist" aria-label="Slingster value pillars">
      {pillars.map((p, i) => {
        const Icon = p.Icon
        const isActive = i === active
        return (
          <button
            key={p.id}
            type="button"
            className={`hws-pl-btn${isActive ? ' is-active' : ''}`}
            aria-label={`View ${p.title} benefit`}
            aria-pressed={isActive}
            onClick={() => onActivate(i)}
          >
            <span className="hws-pl-no">{p.number}</span>
            <Icon className="hws-pl-icon" />
            <span className="hws-pl-title">{p.title}</span>
            <span className="hws-pl-state">{isActive ? 'ACTIVE' : 'SELECT'}</span>
          </button>
        )
      })}
    </nav>
  )
}

function FinalStatement({ reduced }: { reduced: boolean }) {
  return (
    <div className="hws-final">
      <Reveal disabled={reduced}>
        <p className="hws-final-one">
          WE DON&rsquo;T JUST
          <br />
          BUILD WEBSITES.
        </p>
        <p className="hws-final-two">
          WE BUILD SYSTEMS THAT <span>MOVE YOUR BUSINESS FORWARD.</span>
        </p>
        <a className="hws-cta" href="#contact">
          LET&rsquo;S BUILD <ArrowRight />
        </a>
      </Reveal>
    </div>
  )
}

export default function Section06WhySlingster() {
  const rootRef = useRef<HTMLElement>(null)
  const dialWrapRef = useRef<HTMLDivElement>(null)
  const ringsRef = useRef<HTMLElement | null>(null)
  const rotorsRef = useRef<(HTMLElement | null)[]>([])
  const innersRef = useRef<(HTMLElement | null)[]>([])
  const [reduced, setReduced] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)

  const rotRef = useRef(0)
  const radiusRef = useRef(0)
  const activeRef = useRef(0)
  const draggingRef = useRef(false)
  const gsapReadyRef = useRef(false)
  const rotProxy = useRef({ r: 0 })

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

  const applyRot = (r: number) => {
    rotRef.current = r
    const R = radiusRef.current
    if (ringsRef.current) gsap.set(ringsRef.current, { rotation: r })
    rotorsRef.current.forEach((rotor, i) => {
      if (!rotor) return
      const a = ((pillars[i].angle + r) * Math.PI) / 180
      gsap.set(rotor, { x: Math.cos(a) * R, y: -Math.sin(a) * R })
    })
    innersRef.current.forEach((inner, i) => {
      if (!inner) return
      gsap.set(inner, { rotation: -(pillars[i].angle + rotRef.current) })
    })
  }

  const activate = (i: number, animate = true) => {
    const idx = Math.max(0, Math.min(pillars.length - 1, i))
    setActive(idx)
    activeRef.current = idx
    if (gsapReadyRef.current && !reduced) {
      gsap.killTweensOf(rotProxy.current)
      gsap.to(rotProxy.current, {
        r: -90 * idx,
        duration: 0.9,
        ease: 'power3.inOut',
        overwrite: true,
        onUpdate: () => applyRot(rotProxy.current.r),
      })
    } else {
      applyRot(-90 * idx)
    }
  }

  const onDialPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced) return
    if ((e.target as HTMLElement).closest('button')) return
    const dial = dialWrapRef.current
    if (!dial) return
    const rect = dial.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    dragStartRef.current = {
      angle: (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI,
      rot: rotRef.current,
    }
    draggingRef.current = true
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onDialPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || reduced) return
    const dial = dialWrapRef.current
    const start = dragStartRef.current
    if (!dial || !start) return
    const rect = dial.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const a = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI
    let delta = a - start.angle
    delta = ((delta + 180) % 360 + 360) % 360 - 180
    applyRot(start.rot + delta)
  }

  const endDrag = () => {
    if (!draggingRef.current) return
    draggingRef.current = false
    setDragging(false)
    const target = Math.round(rotRef.current / -90) * -90
    activate(Math.round(-target / 90))
  }

  const dragStartRef = useRef<{ angle: number; rot: number } | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined' || reduced || !isDesktop) return
    gsap.registerPlugin(ScrollTrigger)

    const refresh = () => ScrollTrigger.refresh()
    const imgs = rootRef.current?.querySelectorAll<HTMLImageElement>('img') ?? []
    imgs.forEach((img) => img.addEventListener('load', refresh))
    window.addEventListener('load', refresh)

    const ctx = gsap.context(() => {
      const dial = rootRef.current?.querySelector<HTMLElement>('.hws-journey .hws-dial') ?? null
      const rings = rootRef.current?.querySelector<HTMLElement>('.hws-journey .hws-rings') ?? null
      const wrap = rootRef.current?.querySelector<HTMLElement>('.hws-journey .hws-dial-wrap') ?? null
      if (!dial) return
      ringsRef.current = rings
      dialWrapRef.current = dial as HTMLDivElement
      rotorsRef.current = Array.from(rootRef.current?.querySelectorAll<HTMLElement>('.hws-journey .hws-rotor') ?? [])
      innersRef.current = Array.from(rootRef.current?.querySelectorAll<HTMLElement>('.hws-journey .hws-rotor-inner') ?? [])
      gsapReadyRef.current = true

      const recomputeRadius = () => {
        radiusRef.current = dial.getBoundingClientRect().width * ORBIT_R
      }
      recomputeRadius()

      let lastP = 0

      const update = (p: number) => {
        lastP = p
        const idx = Math.min(pillars.length - 1, Math.floor(p * pillars.length))
        if (idx !== activeRef.current) {
          activeRef.current = idx
          setActive(idx)
        }
        gsap.killTweensOf(rotProxy.current)
        applyRot(-90 * Math.min(pillars.length - 1, p * pillars.length))
        if (wrap) {
          const enter = Math.min(1, p / 0.07)
          gsap.set(wrap, { scale: 0.9 + 0.1 * enter, opacity: 0.05 + 0.95 * enter })
        }
      }

      const st = ScrollTrigger.create({
        trigger: '.hws-trigger',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.hws-pin',
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => update(self.progress),
        onRefresh: (self) => {
          recomputeRadius()
          update(self.progress)
        },
      })
      update(0)

      return () => {
        st.kill()
      }
    }, rootRef)

    return () => {
      imgs.forEach((img) => img.removeEventListener('load', refresh))
      window.removeEventListener('load', refresh)
      ctx.revert()
      gsapReadyRef.current = false
      rotorsRef.current = []
      innersRef.current = []
      ringsRef.current = null
    }
  }, [reduced, isDesktop])

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined' || reduced || !isDesktop) return
    const section = rootRef.current
    if (!section) return
    const dial = section.querySelector<HTMLElement>('.hws-journey .hws-dial-wrap')
    if (!dial) return
    const xTo = gsap.quickTo(dial, 'x', { duration: 0.7, ease: 'power3.out' })
    const yTo = gsap.quickTo(dial, 'y', { duration: 0.7, ease: 'power3.out' })
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      xTo(nx * 14)
      yTo(ny * 10)
    }
    section.addEventListener('mousemove', onMove)
    return () => {
      section.removeEventListener('mousemove', onMove)
      gsap.killTweensOf(dial)
    }
  }, [reduced, isDesktop])

  const dialProps: React.HTMLAttributes<HTMLDivElement> = {
    onPointerDown: onDialPointerDown,
    onPointerMove: onDialPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  }

  return (
    <section id="why-slingster" className={`hws-section${reduced ? ' is-reduced' : ''}`} ref={rootRef}>
      <SectionHeader reduced={reduced} />

      <div className="hws-journey">
        <div className="hws-trigger">
          <div className="hws-pin">
            <div className="hws-layout">
              <TechnicalInfo active={active} reduced={reduced} />
              <div className="hws-dial-wrap">
                <WhyDial
                  active={active}
                  onActivate={activate}
                  reduced={reduced}
                  dragging={dragging}
                  dialProps={dialProps}
                />
              </div>
              <div className="hws-active-col">
                <ActivePillarContent active={active} reduced={reduced} />
              </div>
            </div>
          </div>
        </div>
        <MobilePillarList active={active} onActivate={activate} reduced={reduced} />
      </div>

      <div className="hws-stacked">
        <div className="hws-stacked-dial">
          <span className="hws-smark">
            <img src="/logo.png" alt="" className="hws-smark-img" loading="lazy" />
          </span>
          <p className="hws-center-name">SLINGSTER</p>
          <p className="hws-center-tag">
            WE BUILD.
            <br />
            YOU GROW.
          </p>
        </div>
        <ol className="hws-stacked-list">
          {pillars.map((p, i) => {
            const Icon = p.Icon
            const isActive = i === active
            return (
              <li key={p.id} className={isActive ? 'is-active' : ''}>
                <button
                  type="button"
                  className="hws-stacked-btn"
                  aria-label={`View ${p.title} benefit`}
                  aria-pressed={isActive}
                  onClick={() => activate(i, false)}
                >
                  <span className="hws-stacked-no">{p.number}</span>
                  <Icon className="hws-stacked-icon" />
                  <span className="hws-stacked-body">
                    <b>{p.title}</b>
                    <span>{p.description}</span>
                  </span>
                  <span className="hws-stacked-state">{isActive ? 'ACTIVE' : ''}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      <FinalStatement reduced={reduced} />
    </section>
  )
}
