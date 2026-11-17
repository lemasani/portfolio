import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

interface BellSceneProps {
  ring: number
  active: boolean
  reduced: boolean
  onRing: () => void
}

const RINGS = 3

function Bell({ ring, reduced, onRing }: Omit<BellSceneProps, 'active'>) {
  const dome = useRef<THREE.Group>(null)
  const plunger = useRef<THREE.Group>(null)
  const rig = useRef<THREE.Group>(null)
  const waves = useRef<(THREE.Mesh | null)[]>([])
  const strike = useRef(0)
  const waveT = useRef<number[]>(Array(RINGS).fill(-1))
  const { pointer } = useThree()

  useEffect(() => {
    if (ring === 0) return
    strike.current = 1
    waveT.current = waveT.current.map((_, i) => -i * 0.16)
  }, [ring])

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 20)
    strike.current *= Math.pow(0.03, delta)
    const s = strike.current

    if (plunger.current) {
      // Plunger snaps down, then springs back up.
      plunger.current.position.y = 1.32 - Math.min(1, s * 3) * 0.16
    }
    if (dome.current) {
      const shake = reduced ? 0 : Math.sin(state.clock.elapsedTime * 46) * 0.06 * s
      dome.current.rotation.z = shake
      dome.current.rotation.x = shake * 0.6
    }
    if (rig.current && !reduced) {
      rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, pointer.x * 0.35, 0.05)
      rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -pointer.y * 0.12, 0.05)
    }

    waveT.current = waveT.current.map((t, i) => {
      const mesh = waves.current[i]
      if (t < -0.99 || reduced) {
        if (mesh) mesh.visible = false
        return t
      }
      const next = t + delta
      if (mesh) {
        const k = Math.max(0, next) / 1.1
        mesh.visible = next > 0 && k < 1
        mesh.scale.setScalar(1 + k * 1.15)
        const material = mesh.material as THREE.MeshBasicMaterial
        material.opacity = (1 - k) * 0.7
      }
      return next > 1.1 ? -1 : next
    })
  })

  return (
    <group ref={rig} position={[0, -0.55, 0]}>
      <group
        onClick={(event) => {
          event.stopPropagation()
          onRing()
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = ''
        }}
      >
        {/* Base */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[1.35, 1.45, 0.24, 64]} />
          <meshStandardMaterial color="#16181d" roughness={0.45} />
        </mesh>
        {/* Dome */}
        <group ref={dome} position={[0, 0.24, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[1.08, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#ff5a1f" roughness={0.28} metalness={0.15} side={THREE.DoubleSide} />
          </mesh>
        </group>
        {/* Plunger */}
        <group ref={plunger} position={[0, 1.32, 0]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.3, 16]} />
            <meshStandardMaterial color="#d9dbe0" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.2, 0]} castShadow>
            <sphereGeometry args={[0.17, 32, 16]} />
            <meshStandardMaterial color="#d9dbe0" roughness={0.25} metalness={0.6} />
          </mesh>
        </group>
      </group>

      {/* Sound rings */}
      {Array.from({ length: RINGS }).map((_, i) => (
        <mesh
          key={i}
          ref={(mesh) => {
            waves.current[i] = mesh
          }}
          position={[0, 1.0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          visible={false}
        >
          <torusGeometry args={[1.1, 0.025, 8, 96]} />
          <meshBasicMaterial color="#16181d" transparent opacity={0} />
        </mesh>
      ))}

      <ContactShadows position={[0, 0, 0]} scale={6} blur={2.2} far={2} opacity={0.4} color="#16181d" />
    </group>
  )
}

export default function BellScene(props: BellSceneProps) {
  return (
    <Canvas
      frameloop={props.active ? 'always' : 'demand'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 3.6, 7.6], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, 0.45, 0)}
      fallback={
        <p className="absolute inset-x-6 top-1/2 max-w-[34ch] -translate-y-1/2 text-[1rem] text-ink-soft">
          The bell is a 3D model, and your browser has WebGL turned off. The button below still copies my email.
        </p>
      }
      aria-hidden
    >
      <hemisphereLight args={['#ffffff', '#c9b48f', 1.2]} />
      <directionalLight position={[3, 6, 4]} intensity={2} />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} />
      <Bell ring={props.ring} reduced={props.reduced} onRing={props.onRing} />
    </Canvas>
  )
}
