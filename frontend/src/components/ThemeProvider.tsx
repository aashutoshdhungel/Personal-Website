"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Palette = "pokedex" | "gameboy" | "dark"

type ThemeContextValue = {
  palette: Palette
  setPalette: (p: Palette) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "pokedex-palette"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<Palette>("pokedex")

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Palette | null
    if (stored) setPaletteState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-palette", palette)
    window.localStorage.setItem(STORAGE_KEY, palette)
  }, [palette])

  const setPalette = (p: Palette) => setPaletteState(p)

  return (
    <ThemeContext.Provider value={{ palette, setPalette }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function usePalette() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("usePalette must be used inside ThemeProvider")
  return ctx
}
