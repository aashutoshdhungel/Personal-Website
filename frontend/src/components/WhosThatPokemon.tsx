"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./WhosThatPokemon.module.css"
import { officialArtUrl, getRandomPokemon, type MysteryPokemon } from "@/lib/pokedex"
import { useGameSound } from "./SoundProvider"

const BEST_SCORE_KEY = "whos-that-pokemon-best-score"

function normalizeName(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export default function WhosThatPokemon() {
  const [choice, setChoice] = useState<MysteryPokemon | null>(null)
  const [nextChoice, setNextChoice] = useState<MysteryPokemon | null>(null)
  const [guess, setGuess] = useState("")
  const [result, setResult] = useState<"idle" | "wrong" | "correct" | "failed">("idle")

  const [attempts, setAttempts] = useState(0)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  const [scoreAnimation, setScoreAnimation] = useState(false)
  const [bestAnimation, setBestAnimation] = useState(false)
  const [shakeFrame, setShakeFrame] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMountedRef = useRef(true)

  const { playSuccess } = useGameSound()

  useEffect(() => {
    isMountedRef.current = true

    const initialChoice = getRandomPokemon()
    setChoice(initialChoice)
    setNextChoice(getRandomPokemon(initialChoice.id))

    const savedBest = Number(localStorage.getItem(BEST_SCORE_KEY)) || 0
    setBestScore(savedBest)

    requestAnimationFrame(() => {
      inputRef.current?.focus()
    })

    return () => {
      isMountedRef.current = false
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !nextChoice) return

    const preload = new window.Image()
    preload.src = officialArtUrl(nextChoice.id)
  }, [nextChoice])

  function refreshCard() {
    if (!isMountedRef.current || !nextChoice) return

    setChoice(nextChoice)
    setNextChoice(getRandomPokemon(nextChoice.id))
    setGuess("")
    setResult("idle")
    setAttempts(0)
    setScoreAnimation(false)
    setBestAnimation(false)

    requestAnimationFrame(() => {
      if (isMountedRef.current) {
        inputRef.current?.focus()
      }
    })
  }

  function submitGuess(event: React.FormEvent) {
    event.preventDefault()

    if (!guess.trim() || !choice || result === "correct" || result === "failed") {
      return
    }

    const nextAttempts = attempts + 1
    setAttempts(nextAttempts)

    const normalizedInput = normalizeName(guess)
    const normalizedTarget = normalizeName(choice.name)

    const isCorrect = normalizedInput === normalizedTarget

    if (isCorrect) {
      const nextScore = score + 1

      setScore(nextScore)
      setResult("correct")
      setScoreAnimation(true)

      playSuccess()

      if (nextScore > bestScore) {
        setBestScore(nextScore)
        setBestAnimation(true)
        localStorage.setItem(BEST_SCORE_KEY, String(nextScore))
      }

      refreshTimerRef.current = setTimeout(refreshCard, 2000)
      return
    }

    setShakeFrame(true)
    setTimeout(() => {
      if (isMountedRef.current) setShakeFrame(false)
    }, 300)

    if (nextAttempts >= 2) {
      setResult("failed")
      setScore(0)
      refreshTimerRef.current = setTimeout(refreshCard, 2000)
      return
    }

    setResult("wrong")
    setGuess("")

    requestAnimationFrame(() => {
      if (isMountedRef.current) {
        inputRef.current?.focus()
      }
    })
  }

  const isResolved = result === "correct" || result === "failed"

  if (!choice || !nextChoice) {
    return <section className={styles.container} aria-label="Who's That Pokémon" />
  }

  return (
    <section className={styles.container} aria-label="Who's That Pokémon">
      <div className={`${styles.card} ${result === "correct" ? styles.correctCard : ""}`}>
        <div className={styles.contentWrapper}>
          <div className={`${styles.frame} ${shakeFrame ? styles.shakeFrame : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={officialArtUrl(choice.id)}
              alt=""
              width={64}
              height={64}
              loading="eager"
              decoding="async"
              className={`${styles.sprite} ${isResolved ? styles.revealed : styles.silhouette}`}
            />
          </div>

          <div className={styles.sidePanel}>
            <div className={styles.header}>
              <span className={styles.label}>Who&apos;s That Pokémon?</span>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span>Score</span>
                  <strong>{score}</strong>
                </div>

                <div className={`${styles.stat} ${bestAnimation ? styles.recordStat : ""}`}>
                  <span>Best</span>
                  <strong>{bestScore}</strong>
                </div>
              </div>
            </div>

            <div className={styles.actionArea}>
              {scoreAnimation && result === "correct" && (
                <span className={styles.scorePop}>+1</span>
              )}

              {result === "correct" && (
                <div className={`${styles.answer} ${styles.correctAnswer}`}>
                  <span>Correct!</span>
                  <strong>It&apos;s {choice.name}</strong>
                </div>
              )}
              {result === "failed" && (
                <div className={styles.answer}>
                  <span>Out of chances!</span>
                  <strong>It&apos;s {choice.name}</strong>
                </div>
              )}

              <form
                className={`${styles.form} ${isResolved ? styles.hiddenForm : ""}`}
                onSubmit={submitGuess}
              >
                <input
                  ref={inputRef}
                  value={guess}
                  onChange={(event) => setGuess(event.target.value)}
                  placeholder="Your guess..."
                  aria-label="Guess the Pokémon"
                  autoComplete="off"
                  readOnly={isResolved}
                />

                <button type="submit" tabIndex={isResolved ? -1 : 0}>Go</button>

                {result === "wrong" && (
                  <span className={styles.wrong}>Not quite. {2 - attempts} chance left.</span>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}