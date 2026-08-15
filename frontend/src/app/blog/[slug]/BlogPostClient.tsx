"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ArrowLeft, ArrowRight, Calendar, Clock, Facebook, Linkedin } from "lucide-react"
import styles from "./BlogPost.module.css"
import TypeBadge from "@/components/TypeBadge"
import type { BlogMeta } from "@/lib/blogs"

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className={styles.progress} aria-hidden="true">
      <div className={styles.progressBar} style={{ width: `${progress}%` }} />
    </div>
  )
}

type Props = {
  post: BlogMeta
  content: string
  prev: BlogMeta | null
  next: BlogMeta | null
}

export default function BlogPostClient({ post, content, prev, next }: Props) {
  const dateLabel = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  return (
    <main className="page-wrapper">
      <ReadingProgress />

      <div className={styles.hero}>
        <div className="container">
          <Link href="/blog" className={styles.back}>
            <ArrowLeft size={14} /> All Entries
          </Link>
          <div className={styles.metaRow}>
            <TypeBadge type={post.type} />
            <div className={styles.postMeta}>
              <Calendar size={13} />
              <time dateTime={post.date}>{dateLabel}</time>
              <Clock size={13} />
              <span>{post.readTime} read</span>
            </div>
          </div>
          <h1 className={`section-heading ${styles.title}`}>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>
        </div>
      </div>

      <div className={`container ${styles.layout}`}>
        <article className={styles.body}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>

        <aside className={styles.sidebar}>
          <div className={styles.author}>
            <div className={styles.avatar}>
              <Image src="/pfp.jpeg" alt="Aashutosh Dhungel" width={44} height={44} />
            </div>
            <div>
              <span className={styles.authorName}>Aashutosh Dhungel</span>
              <span className={styles.authorRole}>Medical Aspirant</span>
            </div>
          </div>
          <div className={styles.sidebarLinks}>
            <a href="https://www.facebook.com/dhungelaashutosh" target="_blank" rel="noreferrer">
              <Facebook size={15} /> Facebook
            </a>
            <a href="https://www.linkedin.com/in/aashutosh-dhungel-01b5bb393/" target="_blank" rel="noreferrer">
              <Linkedin size={15} /> LinkedIn
            </a>
          </div>
        </aside>
      </div>

      <div className={`container ${styles.nav}`}>
        {prev ? (
          <Link href={`/blog/${prev.slug}`} className={styles.navItem}>
            <span className={styles.navLabel}>
              <ArrowLeft size={12} /> Previous
            </span>
            <span className={styles.navTitle}>{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link href={`/blog/${next.slug}`} className={`${styles.navItem} ${styles.navItemNext}`}>
            <span className={styles.navLabel}>
              Next <ArrowRight size={12} />
            </span>
            <span className={styles.navTitle}>{next.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </main>
  )
}
