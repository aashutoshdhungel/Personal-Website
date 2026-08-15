"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import styles from "./AmbientPokemon.module.css"
import { getPmdSprite, getPmdSpriteFallback, ROSTER, rollShiny, type PmdAction } from "@/lib/pokedex"
import { useGameSound } from "./SoundProvider"

type EntityKind = "walker" | "floater" | "sleeper"

type AttackEffect = "flash" | "glow" | "zzz" | "pulse"

interface EntityConfig {
  id: string
  kind: EntityKind
  pokemonId: number
  name: string
  shiny: boolean
  size: number
}

interface EntityState {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  speed: number
  isMoving: boolean
  pauseUntil: number
  bounceT: number
  isFlipped: boolean
  actionState: PmdAction
  attackUntil: number
  effect: AttackEffect | null
}

const WALKER_POOL: Array<{ id: number; name: string }> = [
  { id: ROSTER.pikachu, name: "Pikachu" },
  { id: ROSTER.eevee, name: "Eevee" },
  { id: ROSTER.dragonite, name: "Dragonite" },
]

const FLOATER_POOL: Array<{ id: number; name: string }> = [
  { id: ROSTER.haunter, name: "Haunter" },
  { id: ROSTER.gengar, name: "Gengar" },
  { id: ROSTER.rayquaza, name: "Rayquaza" },
  { id: ROSTER.dialga, name: "Dialga" },
]

const REACTIONS: Record<number, string[]> = {
  [ROSTER.pikachu]: ["Pika!", "Pika Pika", "ChuUUU"],
  [ROSTER.eevee]: ["Eevee!", "Vui!", "Eeevee"],
  [ROSTER.dragonite]: ["ROARRR", "Dra gon", "Nite!"],
  [ROSTER.haunter]: ["Haunter used Lick", "Haaa", "Boo!"],
  [ROSTER.gengar]: ["Gengar cackles", "GEN!", "Shadow Ball"],
  [ROSTER.rayquaza]: ["Sky High!", "Rayquaza soars", "Ray!"],
  [ROSTER.dialga]: ["Time warps!", "Dialga roars", "Roar of Time"],
  [ROSTER.snorlax]: ["Snorlax is drowsy", "Zzz", "Yawn!"],
}

// Iconic attack move shown per pokemon when clicked
const ATTACK_MOVES: Record<number, { text: string; effect: AttackEffect }> = {
  [ROSTER.pikachu]: { text: "Pikachu used Thunderbolt", effect: "flash" },
  [ROSTER.haunter]: { text: "Haunter used Shadow Ball", effect: "glow" },
  [ROSTER.gengar]: { text: "Gengar used Shadow Ball", effect: "glow" },
  [ROSTER.snorlax]: { text: "Snorlax used Rest", effect: "zzz" },
  [ROSTER.dragonite]: { text: "Dragonite used Hyper Beam", effect: "pulse" },
  [ROSTER.rayquaza]: { text: "Rayquaza used Hyper Beam", effect: "pulse" },
}

const ATTACK_DURATION = 1200

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function pickFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

function pickTarget(kind: EntityKind, w: number, h: number): { x: number; y: number } {
  const margin = 24
  const size = 64

  // Edge-biased X roaming favors left and right thirds to stay off central content
  let x: number
  if (Math.random() < 0.68) {
    x = Math.random() < 0.5
      ? rand(margin, w * 0.27)
      : rand(w * 0.73, w - size - margin)
  } else {
    x = rand(margin, w - size - margin)
  }

  const mobile = w < 620
  let y: number
  if (kind === "walker") {
    const yMin = mobile ? h * 0.45 : h * 0.54
    y = rand(yMin, h - size - margin)
  } else if (kind === "floater") {
    const yMax = mobile ? h * 0.36 : h * 0.44
    y = rand(80, yMax)
  } else {
    // sleeper anchors to a bottom corner
    x = Math.random() < 0.5 ? margin : w - size - margin
    y = h - size - margin
  }

  return {
    x: Math.max(margin, Math.min(x, w - size - margin)),
    y: Math.max(80, Math.min(y, h - size - margin)),
  }
}

function buildConfigs(mobile: boolean): EntityConfig[] {
  const walker = pickFrom(WALKER_POOL)

  // Max 1 Pokemon on mobile screens
  if (mobile) {
    return [
      { id: "walker", kind: "walker", pokemonId: walker.id, name: walker.name, shiny: rollShiny(), size: 44 },
    ]
  }

  // Max 2 Pokemon on desktop/large screens
  const floater = pickFrom(FLOATER_POOL)
  return [
    { id: "walker", kind: "walker", pokemonId: walker.id, name: walker.name, shiny: rollShiny(), size: 44 },
    { id: "floater", kind: "floater", pokemonId: floater.id, name: floater.name, shiny: rollShiny(), size: 52 },
  ]
}

export default function AmbientPokemon() {
  const [configs, setConfigs] = useState<EntityConfig[]>([])
  const [reactions, setReactions] = useState<Record<string, string>>({})
  const [actionStates, setActionStates] = useState<Record<string, PmdAction>>({})
  const [effects, setEffects] = useState<Record<string, AttackEffect | null>>({})
  const [spriteErrors, setSpriteErrors] = useState<Record<string, boolean>>({})
  const [screenPulse, setScreenPulse] = useState(false)

  const statesRef = useRef<Record<string, EntityState>>({})
  const wrapRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const innerRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const zzzRefs = useRef<Record<string, HTMLSpanElement | null>>({})
  const rafRef = useRef<number>(0)

  const { playSelect } = useGameSound()

  // Initialize entity configs and mutable animation state on mount
  useEffect(() => {
    const w = window.innerWidth
    const h = window.innerHeight
    const mobile = w < 620
    const cfgs = buildConfigs(mobile)

    const states: Record<string, EntityState> = {}
    const initialActions: Record<string, PmdAction> = {}

    for (const cfg of cfgs) {
      const pos = pickTarget(cfg.kind, w, h)
      const tgt = pickTarget(cfg.kind, w, h)
      const isMoving = cfg.kind !== "sleeper"
      const actionState: PmdAction = cfg.kind === "sleeper" ? "sleep" : "walk"

      states[cfg.id] = {
        x: pos.x,
        y: pos.y,
        targetX: tgt.x,
        targetY: tgt.y,
        vx: 0,
        vy: 0,
        speed: cfg.kind === "walker" ? rand(0.7, 1.3) : cfg.kind === "floater" ? rand(0.4, 0.9) : 0.25,
        isMoving,
        pauseUntil: cfg.kind === "sleeper" ? performance.now() + rand(3000, 8000) : 0,
        bounceT: Math.random() * Math.PI * 2,
        isFlipped: false,
        actionState,
        attackUntil: 0,
        effect: null,
      }
      initialActions[cfg.id] = actionState
    }

    statesRef.current = states
    setConfigs(cfgs)
    setActionStates(initialActions)
  }, [])

  // RAF movement loop starts once configs are set
  useEffect(() => {
    if (configs.length === 0) return

    const w = window.innerWidth
    const h = window.innerHeight

    function loop(now: number) {
      for (const cfg of configs) {
        const s = statesRef.current[cfg.id]
        const wrapEl = wrapRefs.current[cfg.id]
        const innerEl = innerRefs.current[cfg.id]
        const zzzEl = zzzRefs.current[cfg.id]

        if (!s || !wrapEl || !innerEl) continue

        const isAttacking = s.attackUntil > 0 && now < s.attackUntil

        // Attack window just ended so movement and sprite state resume
        if (s.attackUntil > 0 && now >= s.attackUntil) {
          s.attackUntil = 0
          if (s.effect !== null) {
            s.effect = null
            setEffects(prev => (prev[cfg.id] == null ? prev : { ...prev, [cfg.id]: null }))
          }
          if (cfg.kind === "sleeper") {
            s.isMoving = false
            s.pauseUntil = now + rand(3000, 8000)
          } else {
            const tgt = pickTarget(cfg.kind, w, h)
            s.targetX = tgt.x
            s.targetY = tgt.y
            s.isMoving = true
          }
        }

        if (!isAttacking) {
          // Resume movement after a pause window expires
          if (!s.isMoving && now >= s.pauseUntil) {
            const tgt = pickTarget(cfg.kind, w, h)
            s.targetX = tgt.x
            s.targetY = tgt.y
            // Snorlax re-sleeps 65% of the time rather than walking
            if (cfg.kind === "sleeper" && Math.random() < 0.65) {
              s.pauseUntil = now + rand(8000, 18000)
            } else {
              s.isMoving = true
            }
          }

          // Advance position toward current target
          if (s.isMoving) {
            const dx = s.targetX - s.x
            const dy = s.targetY - s.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < 1.5) {
              s.x = s.targetX
              s.y = s.targetY
              s.vx = 0
              s.vy = 0
              s.isMoving = false
              s.pauseUntil = now + rand(2000, 5000)
            } else {
              const inv = s.speed / dist
              s.vx = dx * inv
              s.vy = dy * inv
              s.x += s.vx
              s.y += s.vy
              // Corrected flip logic: flip horizontally when moving left (vx < 0) vs right
              if (Math.abs(s.vx) > 0.05) s.isFlipped = s.vx > 0
              s.bounceT += 0.1
            }
          }
        }

        // Work out the action state driven sprite for this frame
        let desired: PmdAction
        if (isAttacking) {
          desired = "attack"
        } else if (cfg.kind === "sleeper") {
          desired = s.isMoving ? "walk" : "sleep"
        } else {
          desired = s.isMoving ? "walk" : "idle"
        }

        if (desired !== s.actionState) {
          s.actionState = desired
          // Reset sprite error on action state transition to allow attempting missing PMD state links again
          setSpriteErrors(prev => ({ ...prev, [cfg.id]: false }))
          setActionStates(prev => (prev[cfg.id] === desired ? prev : { ...prev, [cfg.id]: desired }))
        }

        // Archetype-specific vertical overlay
        const flipX = s.isFlipped ? -1 : 1
        let ty = 0

        if (cfg.kind === "walker" && s.isMoving && !isAttacking) {
          // Foot-sync walk bounce active only during movement
          ty = Math.sin(s.bounceT) * 3.5
        } else if (cfg.kind === "floater" && !isAttacking) {
          // Continuous sine-wave drift independent of moving state
          ty = Math.sin(now / 900) * 9
        } else if (cfg.kind === "sleeper" && !isAttacking) {
          // Gentle breathing oscillation while resting
          ty = Math.sin(now / 1300) * 1.8
        }

        // Attack bump arc overlaid on the base vertical transform
        if (isAttacking) {
          const t = 1 - (s.attackUntil - now) / ATTACK_DURATION
          ty += Math.sin(Math.min(Math.max(t, 0), 1) * Math.PI) * -14
        }

        wrapEl.style.left = s.x + "px"
        wrapEl.style.top = s.y + "px"
        innerEl.style.transform = `scaleX(${flipX}) translateY(${ty.toFixed(2)}px)`

        // Zzz particle visible only when resting and not attacking
        if (zzzEl) zzzEl.style.visibility = s.isMoving || isAttacking ? "hidden" : "visible"
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [configs])

  const handleClick = useCallback(
    (id: string) => {
      const s = statesRef.current[id]
      const cfg = configs.find(c => c.id === id)
      if (!s || !cfg) return

      const now = performance.now()
      if (s.attackUntil > now) return

      playSelect()

      // Pause movement immediately so the attack plays in place
      s.vx = 0
      s.vy = 0
      s.isMoving = false
      s.attackUntil = now + ATTACK_DURATION
      s.actionState = "attack"
      setSpriteErrors(prev => ({ ...prev, [id]: false }))
      setActionStates(prev => ({ ...prev, [id]: "attack" }))

      const move = ATTACK_MOVES[cfg.pokemonId]
      const text = move ? move.text : pickFrom(REACTIONS[cfg.pokemonId] ?? ["!"])
      const effect = move ? move.effect : null

      s.effect = effect
      setEffects(prev => ({ ...prev, [id]: effect }))

      if (effect === "pulse") {
        setScreenPulse(true)
        window.setTimeout(() => setScreenPulse(false), 500)
      }

      setReactions(prev => ({ ...prev, [id]: text }))
      window.setTimeout(() => {
        setReactions(prev => {
          const next = { ...prev }
          delete next[id]
          return next
        })
      }, 2200)
    },
    [configs, playSelect]
  )

  const handleSpriteError = useCallback((id: string) => {
    setSpriteErrors(prev => (prev[id] ? prev : { ...prev, [id]: true }))
  }, [])

  if (configs.length === 0) return null

  return (
    <div className={styles.layer}>
      {screenPulse && <div className={styles.screenPulse} aria-hidden="true" />}

      {configs.map(cfg => {
        const reaction = reactions[cfg.id]
        const action = actionStates[cfg.id] ?? (cfg.kind === "sleeper" ? "sleep" : "walk")
        const effect = effects[cfg.id]
        const spriteSrc = spriteErrors[cfg.id]
          ? getPmdSpriteFallback(cfg.pokemonId, cfg.shiny)
          : getPmdSprite(cfg.pokemonId, action, cfg.shiny)

        return (
          <div
            key={cfg.id}
            ref={el => { wrapRefs.current[cfg.id] = el }}
            className={styles.entityWrap}
            onClick={() => handleClick(cfg.id)}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") handleClick(cfg.id) }}
            role="button"
            tabIndex={0}
            aria-label={`A wandering ${cfg.name}`}
          >
            <div
              ref={el => { innerRefs.current[cfg.id] = el }}
              className={styles.spriteInner}
            >
              <Image
                key={spriteSrc}
                src={spriteSrc}
                alt=""
                width={cfg.size}
                height={cfg.size}
                unoptimized
                className={styles.sprite}
                onError={() => handleSpriteError(cfg.id)}
              />
              {cfg.shiny && <span className={styles.sparkle} />}

              {effect === "flash" && <span className={styles.attackFlash} />}
              {effect === "glow" && <span className={styles.attackGlow} />}
              {effect === "zzz" && (
                <span className={styles.attackZzz} aria-hidden="true">Zzz</span>
              )}
            </div>

            {reaction != null && (
              <span className={styles.reactionBubble}>{reaction}</span>
            )}

            {cfg.kind === "sleeper" && (
              <span
                ref={el => { zzzRefs.current[cfg.id] = el }}
                className={styles.zzz}
              >
                Zzz
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}