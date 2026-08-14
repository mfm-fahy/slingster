'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '@/lib/use-reveal'
import {
  ArrowRight,
  Check,
  Code2,
  LineChart,
  MessageSquare,
  MousePointer2,
  Search,
  Target,
} from 'lucide-react'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

type StageVariant = 'idea' | 'discover' | 'propose' | 'design' | 'build' | 'review' | 'launch' | 'grow'

type Stage = {
  number: string
  label: string
  title: string
  description: string
  variant: StageVariant
  module: string
  status: string
}

const stages: Stage[] = [
  {
    number: '01',
    label: 'IDEA',
    title: 'EVERYTHING STARTS\nWITH A CONVERSATION.',
    description: 'We start by understanding what you are building, who it is for and what success looks like.',
    variant: 'idea',
    module: 'ORIGIN',
    status: 'SIGNAL / ACTIVE',
  },
  {
    number: '02',
    label: 'DISCOVER',
    title: 'UNDERSTAND\nBEFORE WE BUILD.',
    description: 'We explore your goals, audience, requirements and the problem we need to solve.',
    variant: 'discover',
    module: 'RESEARCH',
    status: 'PROCESS / ACTIVE',
  },
  {
    number: '03',
    label: 'PROPOSE',
    title: 'A CLEAR PLAN.\nNO SURPRISES.',
    description: 'We define the scope, features, timeline and direction before development begins.',
    variant: 'propose',
    module: 'BLUEPRINT',
    status: 'PLAN / LOCKED',
  },
  {
    number: '04',
    label: 'DESIGN',
    title: 'TURNING IDEAS\nINTO EXPERIENCE.',
    description: 'We create the visual direction, structure and user experience before bringing the product to life.',
    variant: 'design',
    module: 'DESIGN',
    status: 'MODULE / DESIGN',
  },
  {
    number: '05',
    label: 'BUILD',
    title: 'WHERE THE IDEA\nBECOMES REAL.',
    description: 'We develop clean, scalable and secure systems with performance and maintainability in mind.',
    variant: 'build',
    module: 'DEVELOPMENT',
    status: 'BUILD PIPELINE',
  },
  {
    number: '06',
    label: 'REVIEW',
    title: 'BUILD. TEST.\nREFINE.',
    description: 'We test the experience, fix issues and refine the details before launch.',
    variant: 'review',
    module: 'QUALITY',
    status: 'STATUS / IN PROGRESS',
  },
  {
    number: '07',
    label: 'LAUNCH',
    title: 'READY FOR\nTHE REAL WORLD.',
    description: 'We deploy your project and make sure everything is ready for users.',
    variant: 'launch',
    module: 'DEPLOYMENT',
    status: 'DEPLOYMENT / READY',
  },
  {
    number: '08',
    label: 'GROW',
    title: 'LAUNCH IS\nJUST THE START.',
    description: 'From marketing and SEO to chatbots and ongoing support, we help your business keep moving forward.',
    variant: 'grow',
    module: 'GROWTH',
    status: 'SYSTEM / 08',
  },
]

const PATH_D =
  'M 280 110 C 330 132, 348 168, 360 215 C 368 244, 358 282, 300 320 C 268 342, 330 382, 400 425 C 424 440, 380 470, 330 530 C 306 558, 372 592, 420 635 C 438 656, 396 690, 360 740 C 344 766, 404 824, 470 860'

const NODES: [number, number][] = [
  [280, 110],
  [360, 215],
  [300, 320],
  [400, 425],
  [330, 530],
  [420, 635],
  [360, 740],
  [470, 860],
]

const VIEW_W = 640
const VIEW_H = 1000

const ROBOT_MODS: { s: number; r: number }[] = [
  { s: 0.5, r: 0 },
  { s: 0.55, r: 2 },
  { s: 0.58, r: -2 },
  { s: 0.62, r: 3 },
  { s: 0.68, r: -3 },
  { s: 0.62, r: 4 },
  { s: 0.8, r: -9 },
  { s: 0.66, r: 0 },
]

function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
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

function StageVisual({ variant }: { variant: StageVariant }) {
  if (variant === 'idea') {
    return (
      <div className="hwb-visual hbv-idea" aria-hidden="true">
        <span className="hbv-core" />
        <span className="hbv-ring hbv-ring-a" />
        <span className="hbv-ring hbv-ring-b" />
        <span className="hbv-pulse" />
        <span className="hbv-stub hbv-stub-a" />
        <span className="hbv-stub hbv-stub-b" />
      </div>
    )
  }
  if (variant === 'discover') {
    return (
      <div className="hwb-visual hbv-discover" aria-hidden="true">
        <div className="hbv-wire hbv-wf-a">
          <i />
          <i />
          <i />
          <b />
        </div>
        <div className="hbv-wire hbv-wf-b">
          <i />
          <i />
          <b />
        </div>
        <Target className="hbv-target" />
        <MousePointer2 className="hbv-cursor" />
      </div>
    )
  }
  if (variant === 'propose') {
    return (
      <div className="hwb-visual hbv-propose" aria-hidden="true">
        <svg className="hbv-bp-lines" viewBox="0 0 300 200" preserveAspectRatio="none">
          <path d="M18 30 H150 V170 H282" />
          <path d="M150 170 V96 H58" />
        </svg>
        <span className="hbv-node hbv-n1">SCOPE</span>
        <span className="hbv-node hbv-n2">FEATURES</span>
        <span className="hbv-node hbv-n3">TIMELINE</span>
        <span className="hbv-node hbv-n4">DELIVERY</span>
      </div>
    )
  }
  if (variant === 'design') {
    return (
      <div className="hwb-visual hbv-design" aria-hidden="true">
        <div className="hbv-frame">
          <span className="hbv-frame-bar">
            <i />
            <i />
            <i />
          </span>
          <div className="hbv-grid" />
          <em className="hbv-type">Aa</em>
          <span className="hbv-type-line hbv-tl1" />
          <span className="hbv-type-line hbv-tl2" />
        </div>
        <MousePointer2 className="hbv-cursor" />
        <span className="hbv-guide hbv-gv-a" />
        <span className="hbv-guide hbv-gv-b" />
      </div>
    )
  }
  if (variant === 'build') {
    return (
      <div className="hwb-visual hbv-build" aria-hidden="true">
        <div className="hbv-code">
          <i className="hbv-code-row hbv-c1" />
          <i className="hbv-code-row hbv-c2" />
          <i className="hbv-code-row hbv-c3" />
          <i className="hbv-code-row hbv-c4" />
          <i className="hbv-code-row hbv-c5" />
        </div>
        <div className="hbv-term">
          <span>$</span>
          <b />
        </div>
        <span className="hbv-db" />
        <span className="hbv-api" />
        <Code2 className="hbv-code-icon" />
      </div>
    )
  }
  if (variant === 'review') {
    return (
      <div className="hwb-visual hbv-review" aria-hidden="true">
        <div className="hbv-site">
          <span className="hbv-site-bar">
            <i />
            <i />
            <i />
          </span>
          <div className="hbv-site-body" />
        </div>
        <span className="hbv-scan" />
        <ul className="hbv-checks">
          <li>
            <Check /> PASS
          </li>
          <li>
            <Check /> RESPONSIVE
          </li>
          <li>
            <Check /> SECURE
          </li>
          <li>
            <Check /> PERFORMANCE
          </li>
        </ul>
      </div>
    )
  }
  if (variant === 'launch') {
    return (
      <div className="hwb-visual hbv-launch" aria-hidden="true">
        <span className="hbv-live">
          <i /> LIVE
        </span>
        <span className="hbv-ring hbv-ring-a" />
        <span className="hbv-ring hbv-ring-b" />
        <span className="hbv-ring hbv-ring-c" />
        <span className="hbv-particle hbv-p1" />
        <span className="hbv-particle hbv-p2" />
        <span className="hbv-particle hbv-p3" />
      </div>
    )
  }
  return (
    <div className="hwb-visual hbv-grow" aria-hidden="true">
      <svg className="hbv-graph" viewBox="0 0 260 160" preserveAspectRatio="none">
        <polyline points="0,140 50,120 100,90 150,70 210,30 260,10" />
      </svg>
      <span className="hbv-gnode hbv-gn1" />
      <span className="hbv-gnode hbv-gn2" />
      <span className="hbv-gnode hbv-gn3" />
      <Search className="hbv-signal hbv-sig-seo" />
      <MessageSquare className="hbv-signal hbv-sig-chat" />
      <LineChart className="hbv-signal hbv-sig-chart" />
    </div>
  )
}

function SectionIntro({ disabled }: { disabled: boolean }) {
  return (
    <div className="hwb-intro">
      <Reveal className="hwb-intro-copy" disabled={disabled}>
        <p className="hwb-eyebrow">
          05 | HOW WE BUILD <span className="hwb-circuit" aria-hidden="true" />
        </p>
        <h2 className="hwb-title">
          <span className="hwb-title-line">FROM IDEA</span>
          <span className="hwb-title-line hwb-title-line-purple">TO ONLINE.</span>
        </h2>
        <p className="hwb-title-em">WITHOUT THE CHAOS.</p>
        <p className="hwb-sub">
          &ldquo;From the first conversation to launch and beyond, we keep the entire process clear, focused and moving
          forward.&rdquo;
        </p>
      </Reveal>
      <Reveal className="hwb-intro-side" delay={0.15} disabled={disabled}>
        <div className="hwb-intro-robot">
          <img
            src="/section-3/robot.png"
            alt="Stony the robot guiding the build process"
            width={1391}
            height={1131}
            loading="lazy"
            draggable={false}
          />
        </div>
        <div className="hwb-intro-notes">
          <p>PROCESS / 8 STAGES</p>
          <p>PIPELINE / ACTIVE</p>
        </div>
      </Reveal>
    </div>
  )
}

function MobileStageBlock({ stage, disabled }: { stage: Stage; disabled: boolean }) {
  return (
    <Reveal className="hwb-mob-stage" disabled={disabled}>
      <div className="hwb-mob-head">
        <span className="hwb-mob-no">{stage.number}</span>
        <span className="hwb-mob-label">{stage.label}</span>
        <span className="hwb-mob-status">{stage.status}</span>
      </div>
      <div className="hwb-mob-media">
        <div className="hwb-mob-robot">
          <img
            src="/section-3/robot.png"
            alt={`Stony the robot at the ${stage.label} stage`}
            width={1391}
            height={1131}
            loading="lazy"
            draggable={false}
          />
        </div>
        <div className="hwb-mob-visual">
          <StageVisual variant={stage.variant} />
        </div>
      </div>
      <h3 className="hwb-mob-title">{stage.title}</h3>
      <p className="hwb-mob-desc">{stage.description}</p>
      <span className="hwb-mob-rule" aria-hidden="true" />
    </Reveal>
  )
}

function FinalCTA({ disabled }: { disabled: boolean }) {
  return (
    <div className="hwb-final">
      <span className="hwb-final-line" aria-hidden="true" />
      <Reveal disabled={disabled}>
        <h3 className="hwb-final-title">
          BUILT.
          <br />
          LAUNCHED.
          <br />
          <span>READY TO GROW.</span>
        </h3>
        <p className="hwb-final-tag">We Build. You Grow.</p>
        <a className="hwb-final-cta" href="#contact">
          START YOUR PROJECT <ArrowRight />
        </a>
      </Reveal>
    </div>
  )
}

export default function Section05HowWeBuild() {
  const rootRef = useRef<HTMLElement>(null)
  const [reduced, setReduced] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [active, setActive] = useState(0)

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
    if (typeof window === 'undefined' || reduced) return
    gsap.registerPlugin(ScrollTrigger)

    const refresh = () => ScrollTrigger.refresh()
    const imgs = rootRef.current?.querySelectorAll<HTMLImageElement>('img') ?? []
    imgs.forEach((img) => img.addEventListener('load', refresh))
    window.addEventListener('load', refresh)

    let last = -1
    let cachedLen = 0

    const ctx = gsap.context(() => {
      const path = rootRef.current?.querySelector<SVGPathElement>('.hwb-path-track')
      const draw = rootRef.current?.querySelector<SVGPathElement>('.hwb-path-draw')
      const robot = rootRef.current?.querySelector<HTMLElement>('.hwb-robot')
      const lineFill = rootRef.current?.querySelector<HTMLElement>('.hwb-progress-fill')
      const center = rootRef.current?.querySelector<HTMLElement>('.hwb-center')
      if (!path || !robot || !center) return
      cachedLen = path.getTotalLength()

      const getPos = (x: number, y: number) => {
        const m = path.ownerSVGElement?.getScreenCTM()
        const r = center.getBoundingClientRect()
        if (!m) return { x: (x / VIEW_W) * r.width, y: (y / VIEW_H) * r.height }
        return { x: x * m.a + y * m.c + m.e - r.left, y: x * m.b + y * m.d + m.f - r.top }
      }

      const update = (progress: number) => {
        const idx = Math.min(stages.length - 1, Math.max(0, Math.floor(progress * stages.length)))
        if (idx !== last) {
          last = idx
          setActive(idx)
        }
        const len = cachedLen || path.getTotalLength()
        const l = progress * len
        const pt = path.getPointAtLength(Math.max(0, l))
        const pt2 = path.getPointAtLength(Math.min(len - 1, l + 2))
        const angle = (Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180) / Math.PI
        const pos = getPos(pt.x, pt.y)
        const t = progress * (stages.length - 1)
        const i0 = Math.min(stages.length - 1, Math.floor(t))
        const f = Math.min(1, t - i0)
        const m0 = ROBOT_MODS[i0]
        const m1 = ROBOT_MODS[Math.min(stages.length - 1, i0 + 1)]
        const scale = m0.s + (m1.s - m0.s) * f
        const tilt = m0.r + (m1.r - m0.r) * f
        const rot = Math.max(-18, Math.min(18, angle * 0.12 + tilt))
        gsap.set(robot, { x: pos.x, y: pos.y, xPercent: -50, yPercent: -50, rotation: rot, scale, opacity: 1 })
        if (draw) gsap.set(draw, { strokeDashoffset: 1 - progress })
        if (lineFill) gsap.set(lineFill, { scaleY: progress })
      }

      const st = ScrollTrigger.create({
        trigger: '.hwb-trigger',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.hwb-pin',
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => update(self.progress),
        onRefresh: (self) => update(self.progress),
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
    }
  }, [reduced, isDesktop])

  const activeStage = stages[active]

  return (
    <section id="how-we-build" className={`how-section${reduced ? ' is-reduced' : ''}`} ref={rootRef}>
      <SectionIntro disabled={reduced} />

      {/* Desktop pinned journey */}
      <div className="hwb-journey">
        <div className="hwb-trigger">
          <div className="hwb-pin">
            <div className="hwb-stage-grid">
              <div className="hwb-left">
                {stages.map((s, i) => (
                  <article key={s.number} className={`hwb-stage-panel${i === active ? ' is-active' : ''}`}>
                    <div className="hwb-stage-head">
                      <span className="hwb-stage-no">{s.number}</span>
                      <span className="hwb-stage-chip">{s.label}</span>
                    </div>
                    <h3 className="hwb-stage-title">{s.title}</h3>
                    <p className="hwb-stage-desc">{s.description}</p>
                    <span className="hwb-stage-rule" aria-hidden="true" />
                  </article>
                ))}
              </div>

              <div className="hwb-center">
                <span className="hwb-center-tag">BUILD PIPELINE / 8 MODULES</span>
                <div className="hwb-path">
                  <svg
                    className="hwb-path-svg"
                    viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path className="hwb-path-track" d={PATH_D} pathLength={1} />
                    <path className="hwb-path-draw" d={PATH_D} pathLength={1} />
                  </svg>
                  {NODES.map(([x, y], i) => (
                    <span
                      key={i}
                      className={`hwb-node-dot${i === 0 ? ' hwb-node-start' : ''}${
                        i === NODES.length - 1 ? ' hwb-node-end' : ''
                      }`}
                      style={{ left: `${(x / VIEW_W) * 100}%`, top: `${(y / VIEW_H) * 100}%` }}
                    />
                  ))}
                  <span
                    className="hwb-origin-pulse"
                    style={{ left: `${(NODES[0][0] / VIEW_W) * 100}%`, top: `${(NODES[0][1] / VIEW_H) * 100}%` }}
                  />
                </div>
                <div className="hwb-visuals">
                  {stages.map((s, i) => (
                    <div key={s.number} className={`hwb-visual-slot${i === active ? ' is-active' : ''}`}>
                      <StageVisual variant={s.variant} />
                    </div>
                  ))}
                </div>
                <div className="hwb-robot">
                  <img
                    src="/section-3/robot.png"
                    alt="Stony the robot travelling through the build pipeline"
                    width={1391}
                    height={1131}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </div>

              <aside className="hwb-right">
                <p key={`d${active}`} className="hwb-mob-desc">
                  {activeStage.description}
                </p>
                <div className="hwb-anno">
                  <p key={`m${active}`} className="hwb-anno-row">
                    MODULE / {activeStage.module}
                  </p>
                  <p key={`s${active}`} className="hwb-anno-row">
                    {activeStage.status}
                  </p>
                  <p key={`p${active}`} className="hwb-anno-row">
                    PIPELINE / {activeStage.number}/08
                  </p>
                </div>
                <div className="hwb-progress">
                  <div className="hwb-progress-num" key={active}>
                    <strong>{activeStage.number}</strong>
                    <span>/ 08</span>
                  </div>
                  <p className="hwb-progress-label">{activeStage.label}</p>
                  <div className="hwb-progress-track">
                    <span className="hwb-progress-fill" />
                  </div>
                </div>
                <div className="hwb-mini">
                  <div className="hwb-mini-track">
                    {stages.map((s, i) => (
                      <span key={s.number} className={`hwb-mini-dot${i <= active ? ' is-on' : ''}`} />
                    ))}
                  </div>
                  <p className="hwb-mini-caption">PROGRESS</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / reduced-motion stacked stages */}
      <div className="hwb-mobile-stages">
        {stages.map((s) => (
          <MobileStageBlock key={s.number} stage={s} disabled={reduced} />
        ))}
      </div>

      <FinalCTA disabled={reduced} />
    </section>
  )
}
