import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import blogs from '../blogs/index.js'
import { IconCalendar, IconClock, IconArrowRight, IconBook } from '../components/Icons.jsx'
import { useReveal } from '../hooks/useReveal.js'
import './Blog.css'

const categories = ['All', ...new Set(blogs.map(b => b.category))]

function BlogCard({ post, featured = false, delay = 0 }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`blog-card reveal${featured ? ' blog-card--featured' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="blog-card__top">
        <span className="blog-card__cat">{post.category}</span>
        <div className="blog-card__meta">
          <IconCalendar />
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          <IconClock />
          <span>{post.readTime}</span>
        </div>
      </div>
      <h2 className="blog-card__title">{post.title}</h2>
      <p className="blog-card__excerpt">{post.excerpt}</p>
      <div className="blog-card__divider" aria-hidden="true" />
      <div className="blog-card__cta">
        <span>Read article</span>
        <IconArrowRight />
      </div>
    </Link>
  )
}

function Blog() {
  const [active, setActive] = useState('All')
  const ref = useReveal()

  const filtered = active === 'All' ? blogs : blogs.filter(b => b.category === active)
  const featured = active === 'All' ? filtered.slice(0, 2) : []
  const rest = active === 'All' ? filtered.slice(2) : filtered

  return (
    <main className="page-wrapper" ref={ref}>
      <SEO
        title="Blog"
        description="Reflections on medicine, biology, poetry, and the human story by Aashutosh Dhungel, a medical aspirant from Nepal."
      />

      <section className="blog-hero">
        <div className="container">
          <p className="label-tag anim-up">Writing</p>
          <h1 className="section-heading blog-hero__title anim-up anim-up-1">
            Thoughts on Medicine,<br />
            <em>Life, and Words</em>
          </h1>
          <p className="blog-hero__sub anim-up anim-up-2">
            Reflections from a medical aspirant navigating science, poetry, and the human story.
          </p>
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          <div className="blog-filters" role="group" aria-label="Filter by category">
            {categories.map(cat => (
              <button
                key={cat}
                className={`blog-filter-btn ${active === cat ? 'blog-filter-btn--active' : ''}`}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {featured.length > 0 && (
            <div className="blog-featured-row">
              {featured.map((post, i) => (
                <BlogCard key={post.slug} post={post} featured delay={i * 80} />
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <div className="blog-grid">
              {rest.map((post, i) => (
                <BlogCard key={post.slug} post={post} delay={(i + featured.length) * 60} />
              ))}
            </div>
          )}

          {active !== 'All' && filtered.length === 0 && (
            <div className="blog-empty" role="status">
              <IconBook />
              <p>No posts in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Blog