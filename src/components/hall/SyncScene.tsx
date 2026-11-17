import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, QuadraticBezierLine } from '@react-three/drei'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

/*
 * Exhibit 01: offline-first sync, dramatized.
 * Blocks are "episodes marked watched". They are written on the device first.
 * Online: each one arcs up to the cloud shelf. Offline: they stack into a
 * queue on the device. Back online: the queue drains to the cloud.
 */

export interface SyncStats {
  queued: number
  synced: number
}

interface SyncSceneProps {
  online: boolean
  active: boolean
  reduced: boolean
  jolt: number
  onStats: (stats: SyncStats) => void
}

type Phase = 'spawn' | 'queued' | 'fly' | 'landed' | 'leaving'

interface BlockState {
  id: number
  color: string
  phase: Phase
  t: number
  delay: number
  from: THREE.Vector3
  ctrl: THREE.Vector3
  to: THREE.Vector3
  pos: THREE.Vector3
  scale: number
  spin: number
  wobble: number
  queueIndex: number
  slot: number
}

const COLORS = ['#ff5a1f', '#2f9e5b', '#f2c230', '#f7f7f5']
const BLOCK = 0.42
const PHONE = new THREE.Vector3(-1.85, 0, 0.55)
const PHONE_TOP = 0.11
const SHELF = new THREE.Vector3(1.85, 2.05, -0.9)
const SHELF_TOP = SHELF.y + 0.11
const SHELF_COLS = 5
const SHELF_ROWS = 3
const MAX_QUEUE = 14
const MAX_LANDED = SHELF_COLS * SHELF_ROWS

const geometry = new RoundedBoxGeometry(BLOCK, BLOCK, BLOCK, 3, 0.07)

function easeOutExpo(x: number) {
  return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)
}
function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

function queuePosition(index: number, out: THREE.Vector3) {
  const column = index % 2
  const layer = Math.floor(index / 2)
  return out.set(PHONE.x + (column === 0 ? -0.24 : 0.24), PHONE_TOP + BLOCK / 2 + layer * (BLOCK + 0.02), PHONE.z - 0.35)
}

function slotPosition(slot: number, out: THREE.Vector3) {
  const col = slot % SHELF_COLS
  const row = Math.floor(slot / SHELF_COLS) % SHELF_ROWS
  return out.set(SHELF.x - 1.0 + col * 0.5, SHELF_TOP + BLOCK / 2, SHELF.z - 0.5 + row * 0.5)
}

function Rig({ online, reduced, jolt, onStats }: Omit<SyncSceneProps, 'active'>) {
  const blocks = useRef<BlockState[]>([])
  const meshes = useRef(new Map<number, THREE.Mesh>())
  const [ids, setIds] = useState<number[]>([])
  const nextId = useRef(1)
  const spawnClock = useRef(0.4)
  const synced = useRef(0)
  const lastStats = useRef('')
  const rig = useRef<THREE.Group>(null)
  const phone = useRef<THREE.Group>(null)
  const antennaTip = useRef<THREE.MeshStandardMaterial>(null)
  const link = useRef<any>(null)
  const bump = useRef(0)
  const freeSlots = useRef<number[]>(Array.from({ length: MAX_LANDED }, (_, i) => i))
  const onlineRef = useRef(online)
  const { viewport, pointer } = useThree()

  const fit = Math.min(1, viewport.width / 7.4)

  // Network toggled: drain the queue when back online.
  useEffect(() => {
    onlineRef.current = online
    if (!online) return
    const queued = blocks.current
      .filter((b) => b.phase === 'queued')
      .sort((a, b) => b.queueIndex - a.queueIndex)
    queued.forEach((block, order) => launch(block, reduced ? 0 : order * 0.14))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online])

  useEffect(() => {
    if (jolt > 0) bump.current = 1
  }, [jolt])

  function takeSlot(): number {
    if (freeSlots.current.length === 0) {
      // Shelf full: retire the oldest landed block to make room.
      const oldest = blocks.current.find((b) => b.phase === 'landed')
      if (oldest) {
        oldest.phase = 'leaving'
        oldest.t = 0
        return oldest.slot
      }
      return 0
    }
    return freeSlots.current.shift() as number
  }

  function launch(block: BlockState, delay: number) {
    block.phase = 'fly'
    block.t = 0
    block.delay = delay
    block.from.copy(block.pos)
    block.slot = takeSlot()
    slotPosition(block.slot, block.to)
    block.ctrl.set((block.from.x + block.to.x) / 2, Math.max(block.from.y, block.to.y) + 2.0, (block.from.z + block.to.z) / 2 + 0.6)
    block.queueIndex = -1
  }

  function spawn() {
    const id = nextId.current++
    const block: BlockState = {
      id,
      color: COLORS[id % COLORS.length],
      phase: 'spawn',
      t: 0,
      delay: 0,
      from: new THREE.Vector3(),
      ctrl: new THREE.Vector3(),
      to: new THREE.Vector3(),
      pos: new THREE.Vector3(PHONE.x + (Math.random() - 0.5) * 0.5, PHONE_TOP + BLOCK / 2, PHONE.z + 0.45),
      scale: 0,
      spin: (Math.random() - 0.5) * 0.6,
      wobble: 0,
      queueIndex: -1,
      slot: -1,
    }
    blocks.current.push(block)
    setIds((current) => [...current, id])
  }

  function remove(block: BlockState) {
    blocks.current = blocks.current.filter((b) => b !== block)
    meshes.current.delete(block.id)
    setIds((current) => current.filter((id) => id !== block.id))
  }

  function queuedCount() {
    return blocks.current.filter((b) => b.phase === 'queued').length
  }

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 20)
    const speed = reduced ? 1000 : 1

    // Spawning: an episode gets marked watched every ~1.5s.
    spawnClock.current -= delta
    if (spawnClock.current <= 0) {
      spawnClock.current = reduced ? 3 : 1.5
      if (onlineRef.current || queuedCount() < MAX_QUEUE) spawn()
    }

    for (const block of [...blocks.current]) {
      block.t += delta * speed
      const mesh = meshes.current.get(block.id)

      if (block.phase === 'spawn') {
        const k = Math.min(1, block.t / 0.4)
        block.scale = easeOutExpo(k)
        if (k >= 1) {
          if (onlineRef.current) {
            launch(block, 0.15)
          } else {
            block.phase = 'queued'
            block.t = 0
            block.queueIndex = queuedCount()
            block.from.copy(block.pos)
            queuePosition(block.queueIndex, block.to)
          }
        }
      } else if (block.phase === 'queued') {
        const k = easeOutExpo(Math.min(1, block.t / 0.45))
        block.pos.lerpVectors(block.from, block.to, k)
      } else if (block.phase === 'fly') {
        const local = block.t - block.delay * speed
        if (local > 0) {
          const k = easeInOutCubic(Math.min(1, local / 0.95))
          const u = 1 - k
          block.pos.set(
            u * u * block.from.x + 2 * u * k * block.ctrl.x + k * k * block.to.x,
            u * u * block.from.y + 2 * u * k * block.ctrl.y + k * k * block.to.y,
            u * u * block.from.z + 2 * u * k * block.ctrl.z + k * k * block.to.z,
          )
          if (k >= 1) {
            block.phase = 'landed'
            block.t = 0
            block.wobble = 0.6
            synced.current += 1
          }
        }
      } else if (block.phase === 'leaving') {
        block.scale = Math.max(0, 1 - block.t / 0.35)
        if (block.scale <= 0) {
          remove(block)
          continue
        }
      }

      block.wobble *= Math.pow(0.04, delta)

      if (mesh) {
        mesh.position.copy(block.pos)
        if (block.phase === 'queued') {
          // The queue tower sways a little more the taller it gets.
          const sway = reduced ? 0 : Math.sin(state.clock.elapsedTime * 2.2 + block.queueIndex * 0.35) * 0.012 * block.queueIndex
          mesh.position.x += sway
        }
        const flight = block.phase === 'fly' ? Math.max(0, block.t - block.delay * speed) : 0
        mesh.rotation.set(
          block.wobble * Math.sin(block.t * 18) * 0.5,
          block.spin + flight * 2.4,
          block.wobble * Math.cos(block.t * 16) * 0.5,
        )
        const squash = block.phase === 'landed' ? 1 - block.wobble * 0.25 * Math.max(0, Math.sin(block.t * 20)) : 1
        mesh.scale.set(block.scale, block.scale * squash, block.scale)
      }
    }

    // Free slots of blocks that have left the shelf.
    const used = new Set(blocks.current.filter((b) => b.slot >= 0 && b.phase !== 'leaving').map((b) => b.slot))
    freeSlots.current = Array.from({ length: MAX_LANDED }, (_, i) => i).filter((slot) => !used.has(slot))

    // Phone bump when the button is pushed.
    bump.current *= Math.pow(0.02, delta)
    if (phone.current) {
      phone.current.position.y = reduced ? 0 : Math.sin(bump.current * Math.PI) * 0.18 * bump.current
      phone.current.rotation.z = reduced ? 0 : Math.sin(state.clock.elapsedTime * 30) * 0.03 * bump.current
    }

    // The whole exhibit leans gently toward the visitor's pointer.
    if (rig.current && !reduced) {
      rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, pointer.x * 0.16, 0.06)
      rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -pointer.y * 0.05, 0.06)
    }

    // Data link: dashes flow toward the cloud while online.
    if (link.current?.material) {
      const material = link.current.material
      if (onlineRef.current && !reduced) material.dashOffset -= delta * 1.4
      material.opacity = THREE.MathUtils.lerp(material.opacity, onlineRef.current ? 0.95 : 0.22, 0.12)
    }
    if (antennaTip.current) {
      antennaTip.current.color.set(onlineRef.current ? '#2f9e5b' : '#ff5a1f')
    }

    const stats = { queued: queuedCount(), synced: synced.current }
    const key = `${stats.queued}:${stats.synced}`
    if (key !== lastStats.current) {
      lastStats.current = key
      onStats(stats)
    }
  })

  return (
    <group ref={rig} scale={fit} position={[0, -0.35, 0]}>
      {/* Device: a phone lying on the plinth */}
      <group ref={phone} position={PHONE.toArray()}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.2, 2.9]} />
          <meshStandardMaterial color="#16181d" roughness={0.55} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.101, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.48, 2.6]} />
          <meshStandardMaterial color="#26324f" roughness={0.3} emissive="#1b2a55" emissiveIntensity={0.35} />
        </mesh>
        {/* Antenna: green when online, orange when cut */}
        <mesh position={[0.62, 0.5, -1.25]}>
          <cylinderGeometry args={[0.035, 0.035, 0.8, 12]} />
          <meshStandardMaterial color="#16181d" />
        </mesh>
        <mesh position={[0.62, 0.95, -1.25]}>
          <sphereGeometry args={[0.13, 24, 16]} />
          <meshStandardMaterial ref={antennaTip} color="#2f9e5b" roughness={0.4} />
        </mesh>
      </group>

      {/* Cloud shelf */}
      <group position={SHELF.toArray()}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.2, 1.9]} />
          <meshStandardMaterial color="#f4f4f2" roughness={0.8} />
        </mesh>
        {[
          [-0.95, 0.42, -0.85, 0.5],
          [-0.25, 0.62, -0.95, 0.66],
          [0.55, 0.5, -0.9, 0.56],
          [1.1, 0.34, -0.8, 0.4],
        ].map(([x, y, z, r]) => (
          <mesh key={`${x}`} position={[x, y, z]} castShadow>
            <sphereGeometry args={[r, 32, 20]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} />
          </mesh>
        ))}
      </group>

      <QuadraticBezierLine
        ref={link}
        start={[PHONE.x + 0.62, 0.95, PHONE.z - 1.25]}
        end={[SHELF.x - 1.2, SHELF.y + 0.1, SHELF.z]}
        mid={[0, 3.6, -0.4]}
        color="#ffffff"
        lineWidth={2.5}
        dashed
        dashScale={6}
        dashSize={0.5}
        gapSize={0.5}
        transparent
        opacity={0.95}
      />

      {ids.map((id) => {
        const block = blocks.current.find((b) => b.id === id)
        if (!block) return null
        return (
          <mesh
            key={id}
            geometry={geometry}
            castShadow
            ref={(mesh) => {
              if (mesh) meshes.current.set(id, mesh)
            }}
            scale={0}
            onClick={(event) => {
              event.stopPropagation()
              block.wobble = 1
            }}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              document.body.style.cursor = ''
            }}
          >
            <meshStandardMaterial color={block.color} roughness={0.45} />
          </mesh>
        )
      })}

      <ContactShadows position={[PHONE.x, -0.1, PHONE.z]} scale={[5, 5]} blur={2.4} far={1.6} opacity={0.45} color="#0b1640" />
    </group>
  )
}

export default function SyncScene(props: SyncSceneProps) {
  const lowPower =
    typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 8) <= 4

  return (
    <Canvas
      frameloop={props.active ? 'always' : 'demand'}
      dpr={lowPower ? 1 : [1, 1.75]}
      camera={{ position: [0, 5.4, 8.4], fov: 34 }}
      gl={{ antialias: !lowPower, alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, 0.85, 0)}
      fallback={
        <p className="absolute inset-x-6 bottom-16 max-w-[34ch] text-[0.95rem] text-placard">
          This exhibit needs WebGL, which your browser has turned off. The placard explains what it shows.
        </p>
      }
      aria-hidden
    >
      <hemisphereLight args={['#ffffff', '#2a3f9e', 1.25]} />
      <directionalLight position={[4, 9, 6]} intensity={1.9} />
      <directionalLight position={[-6, 3, 2]} intensity={0.45} color="#ffd9c4" />
      <Rig online={props.online} reduced={props.reduced} jolt={props.jolt} onStats={props.onStats} />
    </Canvas>
  )
}
