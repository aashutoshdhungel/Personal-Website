import type { MetadataRoute } from "next"
import { getAllBlogs } from "@/lib/blogs"

const SITE_URL = "https://aashutoshdhungel.com.np"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/blog", "/notes", "/contact"].map(route => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7
  }))

  const blogRoutes = getAllBlogs().map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.5
  }))

  return [...staticRoutes, ...blogRoutes]
}
