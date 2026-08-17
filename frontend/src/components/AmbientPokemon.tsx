"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import styles from "./AmbientPokemon.module.css"
import {
  getPmdSprite,
  getPmdSpriteFallback,
  ROSTER,
  rollShiny,
  type PmdAction,
} from "@/lib/pokedex"
import { useGameSound } from "./SoundProvider"

type EntityKind = "walker" | "floater"
type EntityPhase = "entering" | "roaming" | "exiting"
type AttackEffect = "flash" | "glow" | "zzz" | "pulse" | "burst" | "wave"

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
  phase: EntityPhase
  lifetimeUntil: number
}

// walking ground pokemon pool
const WALKER_POOL: Array<{ id: number; name: string }> = [
  { id: ROSTER.bulbasaur, name: "Bulbasaur" },
  { id: ROSTER.ivysaur, name: "Ivysaur" },
  { id: ROSTER.charmander, name: "Charmander" },
  { id: ROSTER.squirtle, name: "Squirtle" },
  { id: ROSTER.caterpie, name: "Caterpie" },
  { id: ROSTER.pikachu, name: "Pikachu" },
  { id: ROSTER.meowth, name: "Meowth" },
  { id: ROSTER.psyduck, name: "Psyduck" },
  { id: ROSTER.clefairy, name: "Clefairy" },
  { id: ROSTER.jigglypuff, name: "Jigglypuff" },
  { id: ROSTER.drowzee, name: "Drowzee" },
  { id: ROSTER.chansey, name: "Chansey" },
  { id: ROSTER.eevee, name: "Eevee" },
  { id: ROSTER.snorlax, name: "Snorlax" },
  { id: ROSTER.chikorita, name: "Chikorita" },
  { id: ROSTER.totodile, name: "Totodile" },
  { id: ROSTER.dragonite, name: "Dragonite" },
  { id: ROSTER.mewtwo, name: "Mewtwo" },
  { id: ROSTER.mew, name: "Mew" },
  { id: ROSTER.umbreon, name: "Umbreon" },
  { id: ROSTER.tyranitar, name: "Tyranitar" },
  { id: ROSTER.blaziken, name: "Blaziken" },
  { id: ROSTER.gardevoir, name: "Gardevoir" },
  { id: ROSTER.garchomp, name: "Garchomp" },
  { id: ROSTER.lucario, name: "Lucario" },
  { id: ROSTER.greninja, name: "Greninja" },
]

// flying and floating pokemon pool
const FLOATER_POOL: Array<{ id: number; name: string }> = [
  { id: ROSTER.gastly, name: "Gastly" },
  { id: ROSTER.haunter, name: "Haunter" },
  { id: ROSTER.gengar, name: "Gengar" },
  { id: ROSTER.celebi, name: "Celebi" },
  { id: ROSTER.rayquaza, name: "Rayquaza" },
  { id: ROSTER.dialga, name: "Dialga" },
  { id: ROSTER.articuno, name: "Articuno" },
  { id: ROSTER.zapdos, name: "Zapdos" },
  { id: ROSTER.moltres, name: "Moltres" },
  { id: ROSTER.lugia, name: "Lugia" },
  { id: ROSTER.hooh, name: "Ho-Oh" },
  { id: ROSTER.absol, name: "Absol" },
  { id: ROSTER.mimikyu, name: "Mimikyu" },
]

// unique signature move and vfx per pokemon
const ATTACK_MOVES: Record<
  number,
  { text: string; effect: AttackEffect }
> = {
  [ROSTER.bulbasaur]: {
    text: "Bulbasaur used Frenzy Plant",
    effect: "burst",
  },
  [ROSTER.ivysaur]: {
    text: "Ivysaur used Petal Blizzard",
    effect: "wave",
  },
  [ROSTER.charmander]: {
    text: "Charmander used Blast Burn",
    effect: "flash",
  },
  [ROSTER.squirtle]: {
    text: "Squirtle used Hydro Cannon",
    effect: "wave",
  },
  [ROSTER.caterpie]: {
    text: "Caterpie used Bug Buzz",
    effect: "glow",
  },
  [ROSTER.pikachu]: {
    text: "Pikachu used Thunderbolt",
    effect: "flash",
  },
  [ROSTER.meowth]: {
    text: "Meowth used Pay Day",
    effect: "burst",
  },
  [ROSTER.psyduck]: {
    text: "Psyduck used Psychic",
    effect: "pulse",
  },
  [ROSTER.clefairy]: {
    text: "Clefairy used Moonblast",
    effect: "glow",
  },
  [ROSTER.jigglypuff]: {
    text: "Jigglypuff used Sing",
    effect: "wave",
  },
  [ROSTER.gastly]: {
    text: "Gastly used Dream Eater",
    effect: "glow",
  },
  [ROSTER.haunter]: {
    text: "Haunter used Shadow Ball",
    effect: "glow",
  },
  [ROSTER.gengar]: {
    text: "Gengar used Dark Pulse",
    effect: "pulse",
  },
  [ROSTER.drowzee]: {
    text: "Drowzee used Hypnosis",
    effect: "wave",
  },
  [ROSTER.chansey]: {
    text: "Chansey used Soft-Boiled",
    effect: "burst",
  },
  [ROSTER.eevee]: {
    text: "Eevee used Last Resort",
    effect: "flash",
  },
  [ROSTER.snorlax]: {
    text: "Snorlax used Giga Impact",
    effect: "pulse",
  },
  [ROSTER.dragonite]: {
    text: "Dragonite used Draco Meteor",
    effect: "burst",
  },
  [ROSTER.chikorita]: {
    text: "Chikorita used Leaf Storm",
    effect: "wave",
  },
  [ROSTER.totodile]: {
    text: "Totodile used Aqua Tail",
    effect: "wave",
  },
  [ROSTER.celebi]: {
    text: "Celebi used Future Sight",
    effect: "pulse",
  },
  [ROSTER.rayquaza]: {
    text: "Rayquaza used Dragon Ascent",
    effect: "flash",
  },
  [ROSTER.dialga]: {
    text: "Dialga used Roar of Time",
    effect: "pulse",
  },
  [ROSTER.mewtwo]: {
    text: "Mewtwo used Psystrike",
    effect: "pulse",
  },
  [ROSTER.mew]: {
    text: "Mew used Aura Sphere",
    effect: "glow",
  },
  [ROSTER.umbreon]: {
    text: "Umbreon used Foul Play",
    effect: "glow",
  },
  [ROSTER.tyranitar]: {
    text: "Tyranitar used Stone Edge",
    effect: "burst",
  },
  [ROSTER.blaziken]: {
    text: "Blaziken used Blaze Kick",
    effect: "flash",
  },
  [ROSTER.gardevoir]: {
    text: "Gardevoir used Dazzling Gleam",
    effect: "flash",
  },
  [ROSTER.garchomp]: {
    text: "Garchomp used Dragon Claw",
    effect: "wave",
  },
  [ROSTER.lucario]: {
    text: "Lucario used Close Combat",
    effect: "burst",
  },
  [ROSTER.greninja]: {
    text: "Greninja used Hydro Pump",
    effect: "wave",
  },
  [ROSTER.articuno]: {
    text: "Articuno used Blizzard",
    effect: "wave",
  },
  [ROSTER.zapdos]: {
    text: "Zapdos used Thunder",
    effect: "flash",
  },
  [ROSTER.moltres]: {
    text: "Moltres used Fire Blast",
    effect: "burst",
  },
  [ROSTER.lugia]: {
    text: "Lugia used Aeroblast",
    effect: "pulse",
  },
  [ROSTER.hooh]: {
    text: "Ho-Oh used Sacred Fire",
    effect: "glow",
  },
  [ROSTER.absol]: {
    text: "Absol used Night Slash",
    effect: "burst",
  },
  [ROSTER.mimikyu]: {
    text: "Mimikyu used Shadow Claw",
    effect: "glow",
  },
}

// idle click reaction lines, 3 per pokemon
const REACTIONS: Record<number, string[]> = {
  [ROSTER.bulbasaur]: ["Bulba!", "Bulbasaur!", "Bulba Bulba"],
  [ROSTER.ivysaur]: ["Ivy!", "Ivysaur!", "Ivy Ivy"],
  [ROSTER.charmander]: ["Char!", "Charmander!", "Char Char"],
  [ROSTER.squirtle]: ["Squirtle!", "Squir!", "Shell yeah!"],
  [ROSTER.caterpie]: ["Cater!", "Caterpie!", "Cater cater"],
  [ROSTER.pikachu]: ["Pika!", "Pika Pika", "ChuUUU"],
  [ROSTER.meowth]: ["Meow!", "Meowth!", "Pay Day"],
  [ROSTER.psyduck]: ["Psy?", "Psyduck!", "Headache..."],
  [ROSTER.clefairy]: ["Clef!", "Clefairy!", "Clef clef"],
  [ROSTER.jigglypuff]: ["Jiggly!", "Jigglypuff!", "Sing!"],
  [ROSTER.gastly]: ["Gastly!", "Gaaas!", "Boo!"],
  [ROSTER.haunter]: ["Haunter!", "Haaa", "Boo!"],
  [ROSTER.gengar]: ["Gengar!", "GEN!", "Shadow!"],
  [ROSTER.drowzee]: ["Drowzee!", "Drow...", "Hypnosis"],
  [ROSTER.chansey]: ["Chansey!", "Lucky!", "Chan chan"],
  [ROSTER.eevee]: ["Eevee!", "Vui!", "Eeevee"],
  [ROSTER.snorlax]: ["Snorlax!", "Zzz", "Yawn!"],
  [ROSTER.dragonite]: ["ROARRR", "Dra gon", "Nite!"],
  [ROSTER.chikorita]: ["Chiko!", "Chikorita!", "Chiko chiko"],
  [ROSTER.totodile]: ["Toto!", "Totodile!", "Crunch!"],
  [ROSTER.celebi]: ["Celebi!", "Time traveler!", "Cele cele"],
  [ROSTER.rayquaza]: ["Sky High!", "Rayquaza!", "Ray!"],
  [ROSTER.dialga]: ["Time warps!", "Dialga!", "Roar of Time"],
  [ROSTER.mewtwo]: ["Mewtwo...", "I am the strongest", "Psystrike!"],
  [ROSTER.mew]: ["Mew!", "Myuu~", "Playful psychic!"],
  [ROSTER.umbreon]: ["Umbreon...", "Moonlight glow", "Umbre..."],
  [ROSTER.tyranitar]: ["Tyranitar!", "RAWR!", "Sandstorm rising"],
  [ROSTER.blaziken]: ["Blaziken!", "Blaze!", "Fired up!"],
  [ROSTER.gardevoir]: ["Gardevoir!", "I protect you", "Psychic grace"],
  [ROSTER.garchomp]: ["Garchomp!", "Gar gar!", "Mach speed!"],
  [ROSTER.lucario]: ["Lucario!", "I sense your aura", "Riolu evolved!"],
  [ROSTER.greninja]: ["Greninja!", "Ninja frog!", "Water shuriken!"],
  [ROSTER.articuno]: ["Articuno...", "Frozen wings", "Legendary bird"],
  [ROSTER.zapdos]: ["ZAP!", "Zapdos!", "Thunder wings"],
  [ROSTER.moltres]: ["Moltres!", "Blazing feathers", "Fire bird!"],
  [ROSTER.lugia]: ["Lugia...", "Guardian of the seas", "Silver wings"],
  [ROSTER.hooh]: ["Ho-Oh!", "Rainbow wings", "Legendary phoenix"],
  [ROSTER.absol]: ["Absol!", "Disaster sensed", "Ab sol!"],
  [ROSTER.mimikyu]: ["Mimikyu!", "Don't look...", "Mimi mimi"],
}
const ATTACK_DURATION = 1500
const MIN_LIFETIME = 20000
const MAX_LIFETIME = 60000
const MIN_REPLACEMENT_GAP = 5000
const RECENT_HISTORY_SIZE = 4

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function pickFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

function getPool(kind: EntityKind) {
  return kind === "walker" ? WALKER_POOL : FLOATER_POOL
}

function pickPokemon(
  kind: EntityKind,
  excludedIds: number[] = [],
) {
  const pool = getPool(kind)
  const available = pool.filter(
    pokemon => !excludedIds.includes(pokemon.id),
  )

  return pickFrom(available.length ? available : pool)
}

function pickTarget(
  kind: EntityKind,
  w: number,
  h: number,
) {
  const margin = 24
  const size = 64

  let x =
    Math.random() < 0.68
      ? Math.random() < 0.5
        ? rand(margin, w * 0.27)
        : rand(w * 0.73, w - size - margin)
      : rand(margin, w - size - margin)

  const mobile = w < 620

  let y =
    kind === "walker"
      ? rand(
          mobile ? h * 0.45 : h * 0.54,
          h - size - margin,
        )
      : rand(80, mobile ? h * 0.36 : h * 0.44)

  return {
    x: Math.max(margin, Math.min(x, w - size - margin)),
    y: Math.max(80, Math.min(y, h - size - margin)),
  }
}

function pickSpawnPoint(
  kind: EntityKind,
  w: number,
  h: number,
  size: number,
) {
  const padding = size + 30

  if (kind === "walker") {
    const side = pickFrom(["left", "right", "bottom"] as const)

    if (side === "left") {
      return { x: -padding, y: rand(h * 0.55, h - size - 30) }
    }

    if (side === "right") {
      return { x: w + padding, y: rand(h * 0.55, h - size - 30) }
    }

    return {
      x: rand(30, w - size - 30),
      y: h + padding,
    }
  }

  const side = pickFrom([
    "left",
    "right",
    "top",
    "bottom",
  ] as const)

  if (side === "left") {
    return { x: -padding, y: rand(80, h * 0.42) }
  }

  if (side === "right") {
    return { x: w + padding, y: rand(80, h * 0.42) }
  }

  if (side === "top") {
    return { x: rand(30, w - size - 30), y: -padding }
  }

  return {
    x: rand(30, w - size - 30),
    y: h + padding,
  }
}

function pickExitPoint(w: number, h: number, size: number) {
  const margin = size + 40
  const edge = pickFrom([
    "left",
    "right",
    "top",
    "bottom",
  ] as const)

  if (edge === "left") {
    return { x: -margin, y: rand(40, h - 40) }
  }

  if (edge === "right") {
    return { x: w + margin, y: rand(40, h - 40) }
  }

  if (edge === "top") {
    return { x: rand(40, w - 40), y: -margin }
  }

  return { x: rand(40, w - 40), y: h + margin }
}

function buildConfigs(mobile: boolean) {
  const walker = pickPokemon("walker")

  if (mobile) {
    return [
      {
        id: "walker",
        kind: "walker" as const,
        pokemonId: walker.id,
        name: walker.name,
        shiny: rollShiny(),
        size: 44,
      },
    ]
  }

  const floater = pickPokemon("floater", [walker.id])

  return [
    {
      id: "walker",
      kind: "walker" as const,
      pokemonId: walker.id,
      name: walker.name,
      shiny: rollShiny(),
      size: 44,
    },
    {
      id: "floater",
      kind: "floater" as const,
      pokemonId: floater.id,
      name: floater.name,
      shiny: rollShiny(),
      size: 52,
    },
  ]
}

export default function AmbientPokemon() {
  const [configs, setConfigs] = useState<EntityConfig[]>([])
  const [reactions, setReactions] = useState<Record<string, string>>({})
  const [actionStates, setActionStates] = useState<Record<string, PmdAction>>({})
  const [effects, setEffects] = useState<Record<string, AttackEffect | null>>({})
  const [spriteErrors, setSpriteErrors] = useState<Record<string, boolean>>({})
  const [screenPulse, setScreenPulse] = useState(false)

  const configsRef = useRef<EntityConfig[]>([])
  const statesRef = useRef<Record<string, EntityState>>({})
  const historyRef = useRef<Record<string, number[]>>({})
  const wrapRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const innerRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const rafRef = useRef<number | null>(null)
  const lastReplacementRef = useRef(0)
  const mountedRef = useRef(false)

  const { playSelect } = useGameSound()

  const replaceEntity = useCallback(
    (id: string, now: number, w: number, h: number) => {
      const oldCfg = configsRef.current.find(cfg => cfg.id === id)
      const state = statesRef.current[id]

      if (!oldCfg || !state) return

      const otherIds = configsRef.current
        .filter(cfg => cfg.id !== id)
        .map(cfg => cfg.pokemonId)

      const recentIds = historyRef.current[id] ?? []

      const excluded = Array.from(
        new Set([...otherIds, ...recentIds]),
      )

      const pokemon = pickPokemon(
        oldCfg.kind,
        excluded,
      )

      const spawn = pickSpawnPoint(
        oldCfg.kind,
        w,
        h,
        oldCfg.size,
      )

      const target = pickTarget(
        oldCfg.kind,
        w,
        h,
      )

      state.x = spawn.x
      state.y = spawn.y
      state.targetX = target.x
      state.targetY = target.y
      state.vx = 0
      state.vy = 0
      state.speed =
        oldCfg.kind === "walker"
          ? rand(0.7, 1.3)
          : rand(0.4, 0.9)
      state.isMoving = true
      state.pauseUntil = 0
      state.bounceT = Math.random() * Math.PI * 2
      state.isFlipped = false
      state.actionState = "walk"
      state.attackUntil = 0
      state.effect = null
      state.phase = "entering"
      state.lifetimeUntil =
        now + rand(MIN_LIFETIME, MAX_LIFETIME)

      historyRef.current[id] = [
        ...(historyRef.current[id] ?? []),
        pokemon.id,
      ].slice(-RECENT_HISTORY_SIZE)

      const newCfg: EntityConfig = {
        ...oldCfg,
        pokemonId: pokemon.id,
        name: pokemon.name,
        shiny: rollShiny(),
      }

      configsRef.current = configsRef.current.map(cfg =>
        cfg.id === id ? newCfg : cfg,
      )

      setConfigs(configsRef.current)
      setActionStates(prev => ({
        ...prev,
        [id]: "walk",
      }))
      setEffects(prev => ({
        ...prev,
        [id]: null,
      }))
      setSpriteErrors(prev => ({
        ...prev,
        [id]: false,
      }))
      setReactions(prev => {
        const next = { ...prev }
        delete next[id]
        return next
      })

      lastReplacementRef.current = now
    },
    [],
  )

  useEffect(() => {
    const w = window.innerWidth
    const h = window.innerHeight
    const mobile = w < 620
    const initialConfigs = buildConfigs(mobile)
    const now = performance.now()

    configsRef.current = initialConfigs
    setConfigs(initialConfigs)

    const states: Record<string, EntityState> = {}
    const history: Record<string, number[]> = {}
    const initialActions: Record<string, PmdAction> = {}

    for (const cfg of initialConfigs) {
      const spawn = pickSpawnPoint(
        cfg.kind,
        w,
        h,
        cfg.size,
      )

      const target = pickTarget(
        cfg.kind,
        w,
        h,
      )

      states[cfg.id] = {
        x: spawn.x,
        y: spawn.y,
        targetX: target.x,
        targetY: target.y,
        vx: 0,
        vy: 0,
        speed:
          cfg.kind === "walker"
            ? rand(0.7, 1.3)
            : rand(0.4, 0.9),
        isMoving: true,
        pauseUntil: 0,
        bounceT: Math.random() * Math.PI * 2,
        isFlipped: false,
        actionState: "walk",
        attackUntil: 0,
        effect: null,
        phase: "entering",
        lifetimeUntil:
          now + rand(MIN_LIFETIME, MAX_LIFETIME),
      }

      history[cfg.id] = [cfg.pokemonId]
      initialActions[cfg.id] = "walk"
    }

    statesRef.current = states
    historyRef.current = history
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!mountedRef.current && configs.length === 0) return

    let w = window.innerWidth
    let h = window.innerHeight

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
    }

    window.addEventListener("resize", resize)

    const loop = (now: number) => {
      if (!mountedRef.current) return

      const currentConfigs = configsRef.current

      for (const cfg of currentConfigs) {
        const state = statesRef.current[cfg.id]
        const wrap = wrapRefs.current[cfg.id]
        const inner = innerRefs.current[cfg.id]

        if (!state || !wrap || !inner) continue

        const attacking =
          state.attackUntil > now

        if (
          state.attackUntil > 0 &&
          !attacking
        ) {
          state.attackUntil = 0
          state.effect = null

          setEffects(prev => ({
            ...prev,
            [cfg.id]: null,
          }))

          if (state.phase === "roaming") {
            state.isMoving = false
            state.pauseUntil =
              now + rand(1200, 3000)
          }
        }

        if (!attacking) {
          if (
            state.phase === "roaming" &&
            now >= state.lifetimeUntil &&
            now - lastReplacementRef.current >=
              MIN_REPLACEMENT_GAP
          ) {
            const exit = pickExitPoint(
              w,
              h,
              cfg.size,
            )

            state.phase = "exiting"
            state.isMoving = true
            state.targetX = exit.x
            state.targetY = exit.y
            state.speed =
              cfg.kind === "walker"
                ? rand(1.1, 1.8)
                : rand(0.7, 1.25)

            lastReplacementRef.current = now
          }

          if (state.phase === "entering") {
            const dx =
              state.targetX - state.x
            const dy =
              state.targetY - state.y
            const dist = Math.hypot(dx, dy)

            if (dist < 2) {
              state.x = state.targetX
              state.y = state.targetY
              state.isMoving = false
              state.phase = "roaming"
              state.pauseUntil =
                now + rand(1000, 3000)
            } else {
              const factor =
                state.speed / dist

              state.vx = dx * factor
              state.vy = dy * factor
              state.x += state.vx
              state.y += state.vy

              if (Math.abs(state.vx) > 0.05) {
                state.isFlipped = state.vx > 0
              }

              state.bounceT += 0.1
            }
          } else if (
            state.phase === "exiting"
          ) {
            const dx =
              state.targetX - state.x
            const dy =
              state.targetY - state.y
            const dist = Math.hypot(dx, dy)

            if (dist < 2) {
              replaceEntity(
                cfg.id,
                now,
                w,
                h,
              )
              continue
            }

            const factor =
              state.speed / dist

            state.vx = dx * factor
            state.vy = dy * factor
            state.x += state.vx
            state.y += state.vy

            if (Math.abs(state.vx) > 0.05) {
              state.isFlipped = state.vx > 0
            }
          } else if (
            state.phase === "roaming"
          ) {
            if (
              !state.isMoving &&
              now >= state.pauseUntil
            ) {
              const target = pickTarget(
                cfg.kind,
                w,
                h,
              )

              state.targetX = target.x
              state.targetY = target.y
              state.isMoving = true
            }

            if (state.isMoving) {
              const dx =
                state.targetX - state.x
              const dy =
                state.targetY - state.y
              const dist = Math.hypot(dx, dy)

              if (dist < 1.5) {
                state.x = state.targetX
                state.y = state.targetY
                state.isMoving = false
                state.pauseUntil =
                  now + rand(1500, 5000)
              } else {
                const factor =
                  state.speed / dist

                state.vx = dx * factor
                state.vy = dy * factor
                state.x += state.vx
                state.y += state.vy

                if (
                  Math.abs(state.vx) >
                  0.05
                ) {
                  state.isFlipped =
                    state.vx > 0
                }

                state.bounceT += 0.1
              }
            }
          }
        }

        const desired: PmdAction =
          attacking
            ? "attack"
            : state.isMoving
              ? "walk"
              : "idle"

        if (
          desired !== state.actionState
        ) {
          state.actionState = desired

          setActionStates(prev => ({
            ...prev,
            [cfg.id]: desired,
          }))

          setSpriteErrors(prev => ({
            ...prev,
            [cfg.id]: false,
          }))
        }

        let ty = 0

        if (
          cfg.kind === "walker" &&
          state.isMoving &&
          !attacking
        ) {
          ty =
            Math.sin(state.bounceT) * 3.5
        } else if (
          cfg.kind === "floater" &&
          !attacking
        ) {
          ty =
            Math.sin(now / 900) * 9
        }

        if (attacking) {
          const progress =
            1 -
            (state.attackUntil - now) /
              ATTACK_DURATION

          ty +=
            Math.sin(
              Math.min(
                Math.max(progress, 0),
                1,
              ) * Math.PI,
            ) * -14
        }

        wrap.style.left =
          `${state.x}px`

        wrap.style.top =
          `${state.y}px`

        inner.style.transform =
          `scaleX(${state.isFlipped ? -1 : 1}) translateY(${ty.toFixed(2)}px)`
      }

      rafRef.current =
        requestAnimationFrame(loop)
    }

    rafRef.current =
      requestAnimationFrame(loop)

    return () => {
      window.removeEventListener(
        "resize",
        resize,
      )

      if (rafRef.current !== null) {
        cancelAnimationFrame(
          rafRef.current,
        )
      }

      rafRef.current = null
    }
  }, [replaceEntity, configs.length])

  const handleClick = useCallback(
    (id: string) => {
      const state = statesRef.current[id]
      const cfg = configsRef.current.find(
        item => item.id === id,
      )

      if (
        !state ||
        !cfg ||
        state.phase === "exiting"
      ) {
        return
      }

      const now = performance.now()

      if (state.attackUntil > now) return

      state.vx = 0
      state.vy = 0
      state.isMoving = false
      state.attackUntil =
        now + ATTACK_DURATION

      playSelect()

      const move =
        ATTACK_MOVES[cfg.pokemonId]

      const text =
        move?.text ??
        pickFrom(
          REACTIONS[cfg.pokemonId] ?? [
            `${cfg.name}!`,
          ],
        )

      const effect =
        move?.effect ?? "burst"

      state.effect = effect
      state.actionState = "attack"

      setActionStates(prev => ({
        ...prev,
        [id]: "attack",
      }))

      setSpriteErrors(prev => ({
        ...prev,
        [id]: false,
      }))

      setEffects(prev => ({
        ...prev,
        [id]: effect,
      }))

      setReactions(prev => ({
        ...prev,
        [id]: text,
      }))

      if (effect === "pulse") {
        setScreenPulse(true)

        window.setTimeout(
          () => setScreenPulse(false),
          500,
        )
      }

      window.setTimeout(() => {
        setReactions(prev => {
          const next = { ...prev }
          delete next[id]
          return next
        })
      }, 2200)
    },
    [playSelect],
  )

  const handleSpriteError =
    useCallback((id: string) => {
      setSpriteErrors(prev =>
        prev[id]
          ? prev
          : {
              ...prev,
              [id]: true,
            },
      )
    }, [])

  if (!configs.length) return null

  return (
    <div className={styles.layer}>
      {screenPulse && (
        <div
          className={styles.screenPulse}
          aria-hidden="true"
        />
      )}

      {configs.map(cfg => {
        const action =
          actionStates[cfg.id] ?? "walk"

        const effect =
          effects[cfg.id]

        const spriteSrc =
          spriteErrors[cfg.id]
            ? getPmdSpriteFallback(
                cfg.pokemonId,
                cfg.shiny,
              )
            : getPmdSprite(
                cfg.pokemonId,
                action,
                cfg.shiny,
              )

        return (
          <div
            key={cfg.id}
            ref={el => {
              wrapRefs.current[cfg.id] =
                el
            }}
            className={
              styles.entityWrap
            }
            onClick={() =>
              handleClick(cfg.id)
            }
            onKeyDown={event => {
              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                handleClick(cfg.id)
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`A wandering ${cfg.name}`}
          >
            <div
              ref={el => {
                innerRefs.current[
                  cfg.id
                ] = el
              }}
              className={
                styles.spriteInner
              }
            >
              <Image
                key={spriteSrc}
                src={spriteSrc}
                alt=""
                width={cfg.size}
                height={cfg.size}
                unoptimized
                className={styles.sprite}
                onError={() =>
                  handleSpriteError(
                    cfg.id,
                  )
                }
              />

              {cfg.shiny && (
                <span
                  className={
                    styles.sparkle
                  }
                />
              )}

              {effect === "flash" && (
                <span
                  className={
                    styles.attackFlash
                  }
                />
              )}

              {effect === "glow" && (
                <span
                  className={
                    styles.attackGlow
                  }
                />
              )}

              {effect === "zzz" && (
                <span
                  className={
                    styles.attackZzz
                  }
                  aria-hidden="true"
                >
                  Zzz
                </span>
              )}

              {effect === "burst" && (
                <span
                  className={
                    styles.attackBurst
                  }
                />
              )}

              {effect === "wave" && (
                <span
                  className={
                    styles.attackWave
                  }
                />
              )}
            </div>

            {reactions[cfg.id] && (
              <span
                className={
                  styles.reactionBubble
                }
              >
                {reactions[cfg.id]}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}