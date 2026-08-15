"use client"

import { useEffect, useRef, useState } from "react"

export function useTypingEffect(phrases: string[]) {
  const [text, setText] = useState("")
  const stateRef = useRef({ phraseIndex: 0, charIndex: 0, isDeleting: false })

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    function type() {
      const { phraseIndex, charIndex, isDeleting } = stateRef.current
      const currentPhrase = phrases[phraseIndex]
      let typeSpeed = 100

      if (isDeleting) {
        setText(currentPhrase.substring(0, charIndex - 1))
        stateRef.current.charIndex--
        typeSpeed = 50
      } else {
        setText(currentPhrase.substring(0, charIndex + 1))
        stateRef.current.charIndex++
        typeSpeed = 100
      }

      if (!isDeleting && stateRef.current.charIndex === currentPhrase.length) {
        stateRef.current.isDeleting = true
        typeSpeed = 2000
      } else if (isDeleting && stateRef.current.charIndex === 0) {
        stateRef.current.isDeleting = false
        stateRef.current.phraseIndex = (phraseIndex + 1) % phrases.length
        typeSpeed = 500
      }

      timeout = setTimeout(type, typeSpeed)
    }

    timeout = setTimeout(type, 100)
    return () => clearTimeout(timeout)
  }, [phrases])

  return text
}
