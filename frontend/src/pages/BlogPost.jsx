import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import blogs from '../blogs/index.js'
import Icon from '../components/Icon.jsx'
import './BlogPost.css'

function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  const post = blogs.find(b => b.slug === slug)

  useEffect(() => {
    if (!post) {
      navigate('/blog')
      return
    }
    setLoading(true)
    post.file().then(mod => {
      setContent(mod.default)
      setLoading(false)
    })
  }, [slug, post, navigate])

  if (!post) return null

  const postIndex = blogs.findIndex(b => b.slug === slug)
  const prev = blogs[postIndex + 1] || null
  const next = blogs[postIndex - 1] || null

  return (
    <main className="page-wrapper">
      <div className="post-hero">
        <div className="post-hero__glow" />
        <div className="container">
          <Link to="/blog" className="post-back">
            <svg className="icon icon-sm" style={{transform:'rotate(180deg)'}}>
              <use href="/icons.svg#icon-arrow-right" />
            </svg>
            All Posts
          </Link>
          <div className="post-hero__meta">
            <span className="post-cat">{post.category}</span>
            <div className="post-meta-row">
              <Icon id="calendar" className="icon icon-sm" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</span>
              <Icon id="clock" className="icon icon-sm" />
              <span>{post.readTime} read</span>
            </div>
          </div>
          <h1 className="post-hero__title fade-in">{post.title}</h1>
          <p className="post-hero__excerpt fade-in fade-in-delay-1">{post.excerpt}</p>
        </div>
      </div>

      <div className="container post-layout">
        <article className="post-article">
          {loading ? (
            <div className="post-loading">
              <div className="post-loading__spinner" />
              <span>Loading article</span>
            </div>
          ) : (
            <div className="post-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          )}
        </article>

        <aside className="post-sidebar">
          <div className="post-author">
            <div className="post-author__avatar">
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
              <Icon id="github" className="icon icon-sm" />
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Icon id="linkedin" className="icon icon-sm" />
              LinkedIn
            </a>
          </div>
        </aside>
      </div>

      <div className="container post-nav">
        {next ? (
          <Link to={`/blog/${next.slug}`} className="post-nav__item post-nav__item--prev">
            <span className="post-nav__label">
              <svg className="icon icon-sm" style={{transform:'rotate(180deg)'}}>
                <use href="/icons.svg#icon-arrow-right" />
              </svg>
              Previous
            </span>
            <span className="post-nav__title">{next.title}</span>
          </Link>
        ) : <div />}
        {prev ? (
          <Link to={`/blog/${prev.slug}`} className="post-nav__item post-nav__item--next">
            <span className="post-nav__label">
              Next
              <Icon id="arrow-right" className="icon icon-sm" />
            </span>
            <span className="post-nav__title">{prev.title}</span>
          </Link>
        ) : <div />}
      </div>
    </main>
  )
}

export default BlogPost
