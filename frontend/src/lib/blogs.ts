import type { ElementType } from "./pokedex"

export type BlogMeta = {
  slug: string
  title: string
  date: string
  readTime: string
  category: string
  type: ElementType
  excerpt: string
  dexNumber: string
}

// Static metadata kept alongside the markdown body
// Dex number is just a fun display index like a real Pokedex entry
const META: Omit<BlogMeta, "dexNumber">[] = [
  {
    slug: "why-i-want-to-be-a-doctor",
    title: "Why I Want to Be a Doctor",
    date: "2025-11-10",
    readTime: "4 min",
    category: "Medicine",
    type: "water",
    excerpt:
      "Growing up in Jhapa, I saw what lack of access to care can do to a family. This is the story of why I chose medicine."
  },
  {
    slug: "total-darkness",
    title: "Total Darkness",
    date: "2026-07-10",
    readTime: "2 min",
    category: "Poetry",
    type: "fairy",
    excerpt:
      "With trembling hands, after hours of rush, a heartbeat was heard. A poem reflecting on exhaustion and triumph after saving a young soul."
  },
  {
    slug: "lub-dub-lub-dub",
    title: "Lub-dub, lub-dub",
    date: "2026-05-20",
    readTime: "2 min",
    category: "Poetry",
    type: "fairy",
    excerpt:
      "Lub-dub, lub-dub, the cardiac valves closing. A poem on facing the primary trial of the first incision."
  },
  {
    slug: "the-color-of-happiness",
    title: "The Color of Happiness",
    date: "2026-04-05",
    readTime: "2 min",
    category: "Poetry",
    type: "fairy",
    excerpt:
      "The color of happiness is white, or so I choose to believe. A poem on the weight, passion, and calling to heal."
  },
  {
    slug: "the-human-heart",
    title: "The Human Heart, More Than a Pump",
    date: "2025-10-22",
    readTime: "5 min",
    category: "Biology",
    type: "grass",
    excerpt:
      "A deep dive into the anatomy and poetry hidden inside the most vital organ in the human body."
  },
  {
    slug: "poetry-and-medicine",
    title: "On Writing Poetry and Studying Medicine",
    date: "2025-09-14",
    readTime: "3 min",
    category: "Writing",
    type: "psychic",
    excerpt:
      "Two disciplines that seem apart but are rooted in the same need, to understand the human condition."
  }
]

export function getAllBlogs(): BlogMeta[] {
  return META.map((m, i) => ({
    ...m,
    dexNumber: String(i + 1).padStart(3, "0")
  }))
}

export function getBlogBySlug(slug: string): BlogMeta | undefined {
  return getAllBlogs().find(b => b.slug === slug)
}

export function getAdjacentBlogs(slug: string) {
  const all = getAllBlogs()
  const index = all.findIndex(b => b.slug === slug)
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null
  }
}
