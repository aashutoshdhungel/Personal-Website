import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import blogs from '../blogs/index.js'
import {
  IconArrowRight,
  IconStethoscope,
  IconPen,
  IconBook,
  IconDna,
  IconCalendar,
  IconClock,
} from '../components/Icons.jsx'
import { useReveal } from '../hooks/useReveal.js'
import heroImg from '/pfp.jpeg'
import './Home.css'

const stats = [
  { value: 'MBBS', label: 'Goal', delay: '0.45s' },
  { value: '2+', label: 'Years Writing', delay: '0.53s' },
  { value: 'Nepal', label: 'Based In', delay: '0.61s' },
]

const interests = [
  { Icon: IconStethoscope, title: 'Medicine', desc: 'Passionate about human anatomy, clinical sciences, and the art of healing.' },
  { Icon: IconPen, title: 'Poetry', desc: 'Writing verses that capture the human condition and the beauty of existence.' },
  { Icon: IconBook, title: 'Stories', desc: 'Crafting narratives that blend imagination with lived experience.' },
  { Icon: IconDna, title: 'Biology', desc: 'Fascinated by life at the molecular and cellular level.' },
]

function useTypingEffect(phrases) {
  const [text, setText] = useState("")
  const stateRef = useRef({ phraseIndex: 0, charIndex: 0, isDeleting: false })

  useEffect(() => {
    let timeout

    function type() {
      const { phraseIndex, charIndex, isDeleting } = stateRef.current
      const currentPhrase = phrases[phraseIndex]
      let typeSpeed = 100

      if (isDeleting) {
        setText(currentPhrase.substring(0, charIndex - 1))
        stateRef.current.charIndex--
        typeSpeed = 50
      } else {
        setText(currentPhrase.substring(0, charIndex + 1))
        stateRef.current.charIndex++
        typeSpeed = 100
      }

      if (!isDeleting && stateRef.current.charIndex === currentPhrase.length) {
        stateRef.current.isDeleting = true
        typeSpeed = 2000
      } else if (isDeleting && stateRef.current.charIndex === 0) {
        stateRef.current.isDeleting = false
        stateRef.current.phraseIndex = (phraseIndex + 1) % phrases.length
        typeSpeed = 500
      }

      timeout = setTimeout(type, typeSpeed)
    }

    timeout = setTimeout(type, 100)
    return () => clearTimeout(timeout)
  }, [])

  return text
}

function FeaturedBlogCard({ post, delay = 0 }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="home-blog-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="home-blog-card__top">
        <span className="home-blog-card__cat">{post.category}</span>
        <div className="home-blog-card__meta">
          <IconCalendar />
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          <IconClock />
          <span>{post.readTime}</span>
        </div>
      </div>
      <h3 className="home-blog-card__title">{post.title}</h3>
      <p className="home-blog-card__excerpt">{post.excerpt}</p>
      <div className="home-blog-card__cta">
        <span>Read article</span>
        <IconArrowRight />
      </div>
    </Link>
  )
}

function Home() {
  const [imgLoaded, setImgLoaded] = useState(false)
  const sectionRef = useReveal()

  const typingText = useTypingEffect([
    "Aspiring Doctor.",
    "A Poet By Heart."
  ])

  const featuredPosts = blogs.slice(0, 3)

  return (
    <main className="page-wrapper" ref={sectionRef}>
      <SEO />

      {/* Hero section */}
      <section className="hero">
        <div className="hero__main container">
          <div className="hero__content">
            <div className="hero__eyebrow">
              <div className="hero__eyebrow-line" aria-hidden="true" />
              <div className="typing-el">{typingText}</div>
            </div>

            <h1 className="hero__title">
              Aashutosh<br />
              <em>Dhungel</em>
            </h1>

            <p className="hero__subtitle">
              A medical enthusiast, poet, and story writer from Jhapa, Nepal. Preparing for MBBS while finding meaning in words.
            </p>

            <div className="hero__actions">
              <Link to="/about" className="btn btn-primary">
                About Me
                <IconArrowRight />
              </Link>
              <Link to="/blog" className="btn btn-ghost">
                Read My Blog
              </Link>
            </div>
          </div>

          <div className="hero__photo-col">
            <img
              src={heroImg}
              alt="Aashutosh Dhungel, medical aspirant and writer from Jhapa, Nepal"
              className={`hero__photo-img${imgLoaded ? ' is-loaded' : ''}`}
              onLoad={() => setImgLoaded(true)}
              onError={e => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <div className="hero__photo-caption">
              <span className="hero__photo-caption-status">Aashutosh Dhungel</span>
              <span className="hero__photo-caption-role">Medical Aspirant · Jhapa, Nepal</span>
            </div>
          </div>
        </div>

        <div className="hero__stats">
          {stats.map(s => (
            <div
              key={s.label}
              className="hero__stat"
              style={{
                animationName: 'fadeUp',
                animationDuration: 'var(--dur-slow)',
                animationTimingFunction: 'var(--ease-out)',
                animationFillMode: 'both',
                animationDelay: s.delay
              }}
            >
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Passions section */}
      <section className="interests section-pad">
        <div className="container">
          <div className="interests__header">
            <p className="label-tag reveal">Passions</p>
            <h2 className="section-heading reveal reveal-d1">What Drives Me</h2>
            <p className="interests__desc reveal reveal-d2">
              Between textbooks and the stethoscope, there is a world of stories waiting to be told.
            </p>
          </div>
          <div className="interests__grid">
            {interests.map((item, i) => (
              <div
                key={item.title}
                className="interest-card reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="interest-card__icon">
                  <item.Icon />
                </div>
                <h3 className="interest-card__title">{item.title}</h3>
                <p className="interest-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured blog section */}
      <section className="featured-posts section-pad">
        <div className="container">
          <div className="featured-posts__header">
            <div>
              <p className="label-tag reveal">Selected Writings</p>
              <h2 className="section-heading reveal reveal-d1">Featured Articles</h2>
            </div>
            <Link to="/blog" className="btn btn-ghost featured-posts__header-link">
              View All Posts
              <IconArrowRight />
            </Link>
          </div>

          <div className="featured-posts__grid">
            {featuredPosts.map((post, i) => (
              <FeaturedBlogCard key={post.slug} post={post} delay={i * 80} />
            ))}
          </div>

          <div className="featured-posts__footer">
            <Link to="/blog" className="btn btn-primary">
              Explore Blog Index
              <IconArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home