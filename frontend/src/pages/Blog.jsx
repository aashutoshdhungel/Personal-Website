import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import blogs from '../blogs/index.js'
import { IconCalendar, IconClock, IconArrowRight, IconBook } from '../components/Icons.jsx'
import './Blog.css'

const categories = ['All', ...new Set(blogs.map(b => b.category))]

function Blog() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? blogs : blogs.filter(b => b.category === active)

  return (
    <main className="page-wrapper">
      <SEO
        title="Blog"
        description="Reflections on medicine, biology, poetry, and the human story by Aashutosh Dhungel, a medical aspirant from Nepal."
      />

      <section className="blog-hero">
        <div className="blog-hero__glow" />
        <div className="container">
          <p className="section-label fade-in">Writing</p>
          <h1 className="section-title blog-hero__title fade-in fade-in-delay-1">
            Thoughts on Medicine,<br />
            <em>Life, and Words</em>
          </h1>
          <p className="blog-hero__sub fade-in fade-in-delay-2">
            Reflections from a medical aspirant navigating science, poetry, and the human story.
          </p>
        </div>
      </section>

      <section className="blog-content section-pad">
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

          <div className="blog-grid">
            {filtered.map((post, i) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.slug}
                className={`blog-card ${i === 0 && active === 'All' ? 'blog-card--featured' : ''}`}
              >
                <div className="blog-card__top">
                  <span className="blog-card__cat">{post.category}</span>
                  <div className="blog-card__meta">
                    <IconCalendar />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <IconClock />
                    <span>{post.readTime} read</span>
                  </div>
                </div>
                <h2 className="blog-card__title">{post.title}</h2>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <div className="blog-card__cta">
                  <span>Read article</span>
                  <IconArrowRight />
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
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