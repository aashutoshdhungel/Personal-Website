import { useState, useEffect, Suspense } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SEO from '../components/SEO.jsx'
import blogs from '../blogs/index.js'
import { IconArrowRight, IconArrowLeft, IconCalendar, IconClock, IconGithub, IconLinkedin } from '../components/Icons.jsx'
import './BlogPost.css'

function PostBody({ content }) {
  return (
    <div className="post-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}

function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const post = blogs.find(b => b.slug === slug)

  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true })
      return
    }
    setLoading(true)
    setError(false)
    post.file()
      .then(mod => {
        setContent(mod.default)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [slug, post, navigate])

  if (!post) return null

  const postIndex = blogs.findIndex(b => b.slug === slug)
  const prev = blogs[postIndex - 1] || null
  const next = blogs[postIndex + 1] || null

  return (
    <main className="page-wrapper">
      <SEO
        title={post.title}
        description={post.excerpt}
        type="article"
        article={{ date: post.date, category: post.category }}
      />

      <div className="post-hero">
        <div className="post-hero__glow" />
        <div className="container">
          <Link to="/blog" className="post-back">
            <IconArrowLeft />
            All Posts
          </Link>
          <div className="post-hero__meta">
            <span className="post-cat">{post.category}</span>
            <div className="post-meta-row">
              <IconCalendar />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <IconClock />
              <span>{post.readTime} read</span>
            </div>
          </div>
          <h1 className="post-hero__title fade-in">{post.title}</h1>
          <p className="post-hero__excerpt fade-in fade-in-delay-1">{post.excerpt}</p>
        </div>
      </div>

      <div className="container post-layout">
        <article className="post-article">
          {loading && (
            <div className="post-loading" aria-live="polite">
              <div className="post-loading__spinner" aria-hidden="true" />
              <span>Loading article</span>
            </div>
          )}
          {error && (
            <div className="post-error" role="alert">
              <p>Could not load this article. Please try refreshing the page.</p>
              <button className="btn-outline" onClick={() => window.location.reload()}>
                Retry
              </button>
            </div>
          )}
          {!loading && !error && (
            <Suspense fallback={null}>
              <PostBody content={content} />
            </Suspense>
          )}
        </article>

        <aside className="post-sidebar">
          <div className="post-author">
            <div className="post-author__avatar" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="20" fill="var(--bg-card)"/>
                <rect x="17" y="8" width="6" height="24" rx="2" fill="#3dd6b5" opacity="0.9"/>
                <rect x="8" y="17" width="24" height="6" rx="2" fill="#3dd6b5" opacity="0.9"/>
              </svg>
            </div>
            <div>
              <span className="post-author__name">Aashutosh Dhungel</span>
              <span className="post-author__role">Medical Aspirant, Writer</span>
            </div>
          </div>
          <div className="post-sidebar__links">
            <a href="https://github.com/aashutoshdhungel" target="_blank" rel="noreferrer">
              <IconGithub />
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <IconLinkedin />
              LinkedIn
            </a>
          </div>
        </aside>
      </div>

      <div className="container post-nav">
        {prev ? (
          <Link to={`/blog/${prev.slug}`} className="post-nav__item post-nav__item--prev">
            <span className="post-nav__label">
              <IconArrowLeft />
              Previous
            </span>
            <span className="post-nav__title">{prev.title}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/blog/${next.slug}`} className="post-nav__item post-nav__item--next">
            <span className="post-nav__label">
              Next
              <IconArrowRight />
            </span>
            <span className="post-nav__title">{next.title}</span>
          </Link>
        ) : <div />}
      </div>
    </main>
  )
}

export default BlogPost