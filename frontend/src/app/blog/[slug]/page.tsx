import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllBlogs, getBlogBySlug, getAdjacentBlogs } from "@/lib/blogs"
import { getBlogContent } from "@/lib/blogContent.server"
import BlogPostClient from "./BlogPostClient"

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllBlogs().map(post => ({ slug: post.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date
    }
  }
}

export default function Page({ params }: Props) {
  const post = getBlogBySlug(params.slug)
  if (!post) notFound()

  const content = getBlogContent(post.slug)
  const { prev, next } = getAdjacentBlogs(post.slug)

  return <BlogPostClient post={post} content={content} prev={prev} next={next} />
}
