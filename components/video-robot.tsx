'use client'

import { useEffect, useRef, useState } from 'react'

export default function VideoRobot() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [blend, setBlend] = useState<'multiply' | 'screen' | 'normal'>('multiply')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const sampleBackground = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = 8
        canvas.height = 8
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.drawImage(video, 0, 0, 8, 8)
        const data = ctx.getImageData(0, 0, 8, 8).data
        let r = 0, g = 0, b = 0
        for (let i = 0; i < data.length; i += 4) {
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
        }
        const count = data.length / 4
        const luminance = (r + g + b) / (count * 3)
        if (luminance > 200) setBlend('multiply')
        else if (luminance < 60) setBlend('screen')
        else setBlend('normal')
      } catch {
        setBlend('multiply')
      }
    }

    if (video.readyState >= 1) {
      sampleBackground()
    } else {
      video.addEventListener('loadeddata', sampleBackground, { once: true })
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className="video-robot"
      src="/FFFFFF_—_White_change_the_bac.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Slingster mascot animation"
      style={{ mixBlendMode: blend }}
    />
  )
}