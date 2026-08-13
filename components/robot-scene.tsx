'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, RoundedBox, Sparkles, useTexture } from '@react-three/drei'

function useReducedMotionPref() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function ScrollMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    if (!ref.current) return
    const sy = window.scrollY || 0
    ref.current.position.y = THREE.MathUtils.clamp(-sy * 0.002, -1.2, 0)
  })
  return <group ref={ref}>{children}</group>
}

function Robot({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const chest = useRef<THREE.Mesh>(null)
  const eyes = useRef<THREE.Group>(null)
  const leftArm = useRef<THREE.Group>(null)
  const logo = useTexture('/logo.png')

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.28, 0.06)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.12, 0.06)
    }
    if (reduced) return
    if (chest.current) chest.current.scale.y = 1 + Math.sin(t * 1.6) * 0.015
    if (leftArm.current) leftArm.current.rotation.z = 0.4 + Math.sin(t * 1.2) * 0.06
    if (eyes.current) {
      const phase = t % 4.4
      const blink = phase > 4.15 ? 0.12 : 1
      eyes.current.scale.y = THREE.MathUtils.lerp(eyes.current.scale.y, blink, 0.5)
    }
  })

  return (
    <group ref={group}>
      <group position={[0, 1.32, 0]}>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.02, 0.03, 0.26, 12]} />
          <meshStandardMaterial color="#c9c9d6" />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#70d7ff" emissive="#70d7ff" emissiveIntensity={1.8} />
        </mesh>
      </group>

      <RoundedBox args={[1.18, 0.88, 0.98]} radius={0.3} smoothness={6} position={[0, 0.9, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.32} metalness={0.08} />
      </RoundedBox>

      <RoundedBox args={[0.74, 0.44, 0.06]} radius={0.12} smoothness={4} position={[0, 0.9, 0.5]}>
        <meshStandardMaterial color="#11111b" roughness={0.4} metalness={0.2} />
      </RoundedBox>

      <group ref={eyes} position={[0, 0.94, 0.55]}>
        <mesh position={[-0.17, 0, 0]}>
          <sphereGeometry args={[0.065, 20, 20]} />
          <meshStandardMaterial color="#70d7ff" emissive="#70d7ff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0.17, 0, 0]}>
          <sphereGeometry args={[0.065, 20, 20]} />
          <meshStandardMaterial color="#70d7ff" emissive="#70d7ff" emissiveIntensity={2} />
        </mesh>
      </group>

      <mesh position={[-0.42, 0.8, 0.52]}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshStandardMaterial color="#8fdfff" emissive="#8fdfff" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0.42, 0.8, 0.52]}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshStandardMaterial color="#8fdfff" emissive="#8fdfff" emissiveIntensity={0.7} />
      </mesh>

      <RoundedBox args={[1.2, 1.05, 0.72]} radius={0.28} smoothness={6} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.32} metalness={0.08} />
      </RoundedBox>

      <mesh position={[0, 0.02, 0.362]}>
        <planeGeometry args={[0.62, 0.633]} />
        <meshBasicMaterial map={logo} transparent depthWrite={false} />
      </mesh>

      <mesh position={[0, -0.42, 0.362]}>
        <boxGeometry args={[0.28, 0.045, 0.02]} />
        <meshStandardMaterial color="#72d8ff" emissive="#72d8ff" emissiveIntensity={1.4} />
      </mesh>

      <group ref={leftArm} position={[-0.68, -0.02, 0]} rotation={[0, 0, 0.4]}>
        <mesh position={[0, -0.32, 0]}>
          <capsuleGeometry args={[0.13, 0.5, 6, 16]} />
          <meshStandardMaterial color="#f4f4fb" roughness={0.42} />
        </mesh>
        <mesh position={[0, -0.6, 0]}>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshStandardMaterial color="#ffffff" roughness={0.35} />
        </mesh>
      </group>

      <group position={[0.68, -0.02, 0]} rotation={[0, 0, -0.4]}>
        <mesh position={[0, -0.32, 0]}>
          <capsuleGeometry args={[0.13, 0.5, 6, 16]} />
          <meshStandardMaterial color="#f4f4fb" roughness={0.42} />
        </mesh>
        <mesh position={[0, -0.6, 0]}>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshStandardMaterial color="#ffffff" roughness={0.35} />
        </mesh>
      </group>

      <mesh position={[-0.3, -0.66, 0]}>
        <capsuleGeometry args={[0.15, 0.4, 6, 16]} />
        <meshStandardMaterial color="#f4f4fb" roughness={0.42} />
      </mesh>
      <mesh position={[0.3, -0.66, 0]}>
        <capsuleGeometry args={[0.15, 0.4, 6, 16]} />
        <meshStandardMaterial color="#f4f4fb" roughness={0.42} />
      </mesh>

      <RoundedBox args={[0.36, 0.13, 0.44]} radius={0.05} smoothness={4} position={[-0.3, -0.95, 0.03]}>
        <meshStandardMaterial color="#ffffff" roughness={0.32} />
      </RoundedBox>
      <RoundedBox args={[0.36, 0.13, 0.44]} radius={0.05} smoothness={4} position={[0.3, -0.95, 0.03]}>
        <meshStandardMaterial color="#ffffff" roughness={0.32} />
      </RoundedBox>
    </group>
  )
}

export default function RobotScene() {
  const reduced = useReducedMotionPref()

  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.15, 5.2], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      resize={{ scroll: false }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} />
      <pointLight position={[-4, 1, -3]} intensity={0.9} color="#6d63d9" />
      <pointLight position={[0, -1, 3]} intensity={0.7} color="#70d7ff" />

      <ScrollMotion>
        <Float speed={reduced ? 0 : 1.5} rotationIntensity={reduced ? 0 : 0.14} floatIntensity={reduced ? 0 : 0.55}>
          <Robot reduced={reduced} />
        </Float>
      </ScrollMotion>

      {!reduced && <Sparkles count={32} scale={[6, 4, 3]} size={1.8} speed={0.4} opacity={0.4} color="#6d63d9" />}

      <mesh position={[0, -1.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshStandardMaterial color="#f5f4fc" roughness={0.9} />
      </mesh>
      <mesh position={[0, -1.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.56, 64]} />
        <meshBasicMaterial color="#c9c2ee" />
      </mesh>
      <ContactShadows position={[0, -1.1, 0]} opacity={0.3} scale={5.5} blur={2.6} far={1.6} color="#23168F" />
    </Canvas>
  )
}
