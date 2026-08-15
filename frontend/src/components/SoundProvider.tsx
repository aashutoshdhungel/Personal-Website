"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import useSound from "use-sound"

type SoundContextValue = {
  muted: boolean
  toggleMuted: () => void
  playClick: () => void
  playSelect: () => void
  playSuccess: () => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

const STORAGE_KEY = "pokedex-muted"

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) setMuted(stored === "true")
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(muted))
  }, [muted])

  const [playClick] = useSound("/sounds/click.wav", { volume: 0.5 })
  const [playSelect] = useSound("/sounds/select.wav", { volume: 0.5 })
  const [playSuccess] = useSound("/sounds/success.wav", { volume: 0.6 })

  const value: SoundContextValue = {
    muted,
    toggleMuted: () => setMuted(m => !m),
    playClick: () => { if (!muted) playClick() },
    playSelect: () => { if (!muted) playSelect() },
    playSuccess: () => { if (!muted) playSuccess() }
  }

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useGameSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error("useGameSound must be used inside SoundProvider")
  return ctx
}
