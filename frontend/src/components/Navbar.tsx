"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Volume2, VolumeX } from "lucide-react"
import styles from "./Navbar.module.css"
import { usePalette, type Palette } from "./ThemeProvider"
import { useGameSound } from "./SoundProvider"
import WhosThatPokemon from "./WhosThatPokemon"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Trainer" },
  { href: "/blog", label: "Pokedex" },
  { href: "/notes", label: "Item Bag" },
  { href: "/contact", label: "PC" }
]

const palettes: { key: Palette; color: string; label: string }[] = [
  { key: "pokedex", color: "#d62d20", label: "Pokedex Red" },
  { key: "gameboy", color: "#8fac3f", label: "Game Boy" },
  { key: "dark", color: "#1e2338", label: "Dark Mode" }
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null) // Fixed typings
  const { palette, setPalette } = usePalette()
  const { muted, toggleMuted, playClick } = useGameSound()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  // Extracted Palette Switcher component for DRYness
  const PaletteSelector = () => (
    <>
      {palettes.map(p => (
        <button
          key={p.key}
          className={styles.paletteDot}
          style={{
            background: p.color,
            outline: palette === p.key ? "3px solid var(--accent-2)" : "none"
          }}
          onClick={() => {
            setPalette(p.key)
            playClick()
          }}
          aria-label={p.label}
          aria-pressed={palette === p.key}
        />
      ))}
    </>
  )

  return (
    <header className={styles.navbar} ref={navRef}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={playClick}>
          <span className={styles.pokeball} aria-hidden="true" />
          <span>Aashutosh Dhungel</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Main navigation">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={playClick}
              className={`${styles.link} ${isActive(link.href) ? styles.linkActive : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          <div className={styles.paletteGroup} role="group" aria-label="Choose palette">
            <PaletteSelector />
          </div>

          <WhosThatPokemon />

          <button
            className={styles.iconBtn}
            onClick={toggleMuted}
            aria-label={muted ? "Unmute sound" : "Mute sound"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Mobile Menu Wrapper */}
          <div className={styles.mobileWrapper}>
            <button
              className={styles.burger}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {menuOpen && (
              <div className={styles.dropdown}>
                <nav aria-label="Mobile navigation">
                  {links.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={playClick}
                      className={`${styles.dropdownLink} ${
                        isActive(link.href) ? styles.linkActive : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div
                  className={styles.dropdownPalettes}
                  role="group"
                  aria-label="Choose palette"
                >
                  <PaletteSelector />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}