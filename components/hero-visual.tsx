'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { MotionConfig, motion } from 'framer-motion'

const VideoRobot = dynamic(() => import('./video-robot'), {
  ssr: false,
  loading: () => <div className="robot-loading">Rendering Stony…</div>,
})

export default function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="visual-glow" aria-hidden="true" />
      <div className="visual-rings" aria-hidden="true"><i /><i /><i /></div>
      <MotionConfig reducedMotion="user">
        <motion.div className="visual-canvas" initial={{ opacity: 0, y: 46 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
          <Suspense fallback={<div className="robot-loading">Rendering Stony…</div>}>
            <VideoRobot />
          </Suspense>
        </motion.div>
      </MotionConfig>
      <div className="float-label label-design">DESIGN</div>
      <div className="float-label label-code">CODE</div>
      <div className="float-label label-brand">BRAND</div>
      <div className="float-label label-growth">GROWTH</div>
      <div className="robot-note note-idea">Yep. That&apos;s the one.</div>
    </div>
  )
}
