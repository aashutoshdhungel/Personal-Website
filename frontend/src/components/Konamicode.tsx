"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./Konamicode.module.css"
import { useGameSound } from "./SoundProvider"

const sequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA"
]

export default function KonamiCode() {
  const [active, setActive] = useState(false)
  const progressRef = useRef(0)
  const { playSuccess } = useGameSound()

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const expected = sequence[progressRef.current]
      if (e.code === expected) {
        progressRef.current += 1
        if (progressRef.current === sequence.length) {
          progressRef.current = 0
          setActive(true)
          playSuccess()
          window.setTimeout(() => setActive(false), 2200)
        }
      } else {
        progressRef.current = e.code === sequence[0] ? 1 : 0
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [playSuccess])

  if (!active) return null

  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.flash} />
      <div className={styles.confetti} aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className={styles.bit}
            style={{ animationDelay: `${i * 40}ms`, left: `${(i * 37) % 100}%` }}
          />
        ))}
      </div>
      <p className={styles.message}>Wild Encounter Star Flash</p>
    </div>
  )
}