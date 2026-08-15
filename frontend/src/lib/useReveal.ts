"use client"

import { useEffect, useRef } from "react"

export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.25 }
    )

    const targets = el.querySelectorAll(".reveal")
    targets.forEach(t => observer.observe(t))

    return () => observer.disconnect()
  }, [])

  return ref
}
