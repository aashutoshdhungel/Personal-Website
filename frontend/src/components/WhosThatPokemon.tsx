"use client"

import { useState } from "react"
import Image from "next/image"
import styles from "./WhosThatPokemon.module.css"
import { officialArtUrl, ROSTER } from "@/lib/pokedex"
import { useGameSound } from "./SoundProvider"

const mystery = [
  { id: ROSTER.pikachu, name: "Pikachu" },
  { id: ROSTER.chikorita, name: "Chikorita" },
  { id: ROSTER.eevee, name: "Eevee" },
  { id: ROSTER.gengar, name: "Gengar" },
  { id: ROSTER.dragonite, name: "Dragonite" }
]

export default function WhosThatPokemon() {
  const [choice] = useState(() => mystery[Math.floor(Math.random() * mystery.length)])
  const [revealed, setRevealed] = useState(false)
  const { playSuccess } = useGameSound()

  function reveal() {
    if (!revealed) playSuccess()
    setRevealed(true)
  }

  return (
    <button
      type="button"
      className={styles.badge}
      onMouseEnter={reveal}
      onFocus={reveal}
      onClick={reveal}
      aria-label="Whos that pokemon, hover or tap to reveal"
    >
      <span className={styles.label}>Whos That Pokemon</span>
      <span className={styles.frame}>
        <Image
          src={officialArtUrl(choice.id)}
          alt=""
          width={44}
          height={44}
          unoptimized
          className={`${styles.sprite} ${revealed ? styles.revealed : styles.silhouette}`}
        />
      </span>
      {revealed && <span className={styles.callout}>Its {choice.name}</span>}
    </button>
  )
}