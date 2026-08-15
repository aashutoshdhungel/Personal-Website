"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import styles from "./TeamRocketBalloon.module.css"
import { animatedSpriteUrl, ROSTER } from "@/lib/pokedex"

export default function TeamRocketBalloon() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setVisible(true)
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.balloon} ${visible ? styles.wiggle : ""}`}
      aria-hidden="true"
      title="Looks like Team Rocket is blasting off nearby"
    >
      <span className={styles.envelope} />
      <span className={styles.basket}>
        <Image
          src={animatedSpriteUrl(ROSTER.meowth)}
          alt=""
          width={26}
          height={26}
          unoptimized
          className={styles.sprite}
        />
      </span>
    </div>
  )
}