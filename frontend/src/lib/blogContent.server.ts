import fs from "fs"
import path from "path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content", "blogs")

export function getBlogContent(slug: string): string {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  const raw = fs.readFileSync(filePath, "utf8")
  const { content } = matter(raw)
  return content
}
