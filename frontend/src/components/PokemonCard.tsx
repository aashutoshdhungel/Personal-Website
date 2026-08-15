"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import TypeBadge from "./TypeBadge"
import styles from "./PokemonCard.module.css"
import type { BlogMeta } from "@/lib/blogs"
import { useGameSound } from "./SoundProvider"

export default function PokemonCard({ post }: { post: BlogMeta }) {
  const [flipped, setFlipped] = useState(false)
  const { playSelect } = useGameSound()

  const dateLabel = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })

  return (
    <div
      className={styles.scene}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => { setFlipped(f => !f); playSelect() }}
    >
      <motion.div
        className={styles.card}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className={styles.face}>
          <div className={styles.faceTop}>
            <span className={styles.dexNumber}>No. {post.dexNumber}</span>
            <TypeBadge type={post.type} />
          </div>
          <h3 className={styles.title}>{post.title}</h3>
          <div className={styles.meta}>
            <Calendar size={13} />
            <span>{dateLabel}</span>
            <Clock size={13} />
            <span>{post.readTime}</span>
          </div>
          <span className={styles.hint}>Tap to flip</span>
        </div>

        <div className={`${styles.face} ${styles.faceBack}`}>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <Link href={`/blog/${post.slug}`} className={styles.readLink} onClick={e => e.stopPropagation()}>
            Read entry <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
