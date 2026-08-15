"use client"

import { useState } from "react"
import { BookOpen } from "lucide-react"
import styles from "./Blog.module.css"
import { getAllBlogs } from "@/lib/blogs"
import PokemonCard from "@/components/PokemonCard"
import { useReveal } from "@/lib/useReveal"

const blogs = getAllBlogs()
const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category)))]

export default function BlogClient() {
  const [active, setActive] = useState("All")
  const ref = useReveal<HTMLDivElement>()

  const filtered =
    active === "All" ? blogs : blogs.filter(b => b.category.toLowerCase() === active.toLowerCase())

  return (
    <main className="page-wrapper" ref={ref}>
      <section className={styles.hero}>
        <div className="container">
          <p className="label-tag anim-up">The Pokedex</p>
          <h1 className={`section-heading ${styles.heroTitle}`}>
            Thoughts on Medicine,
            <br />
            <em>Life, and Words</em>
          </h1>
          <p className={styles.heroSub}>
            Reflections from a medical aspirant navigating science, poetry, and the human story.
            Every entry caught here comes from a real moment.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.filters} role="group" aria-label="Filter by type">
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${active === cat ? styles.filterBtnActive : ""}`}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map(post => (
                <PokemonCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className={styles.empty} role="status">
              <BookOpen size={28} />
              <p>No entries caught in this type yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
