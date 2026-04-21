import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import './Home.css'

const stats = [
  { value: 'MBBS', label: 'Goal' },
  { value: '2+', label: 'Years Writing' },
  { value: 'Nepal', label: 'Based In' },
]

const interests = [
  { icon: 'stethoscope', title: 'Medicine', desc: 'Passionate about human anatomy, clinical sciences, and the art of healing.' },
  { icon: 'pen', title: 'Poetry', desc: 'Writing verses that capture the human condition and the beauty of existence.' },
  { icon: 'book', title: 'Stories', desc: 'Crafting narratives that blend imagination with lived experience.' },
  { icon: 'dna', title: 'Biology', desc: 'Fascinated by life at the molecular and cellular level.' },
]

function Home() {
  return (
    <main className="page-wrapper">
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__grid" />
          <div className="hero__glow hero__glow--1" />
          <div className="hero__glow hero__glow--2" />
        </div>
        <div className="container hero__inner">
          <div className="hero__content fade-in">
            <span className="hero__badge">
              <Icon id="cross" className="icon icon-sm" />
              Aspiring Doctor
            </span>
            <h1 className="hero__title">
              Aashutosh<br />
              <em>Dhungel</em>
            </h1>
            <p className="hero__subtitle">
              A medical enthusiast, poet, and story writer from the hills of Jhapa, Nepal.
              Chasing the dream of becoming a doctor while finding meaning in words.
            </p>
            <div className="hero__actions fade-in fade-in-delay-2">
              <Link to="/about" className="btn-primary">
                About Me
                <Icon id="arrow-right" className="icon icon-sm" />
              </Link>
              <Link to="/blog" className="btn-outline">
                Read My Blog
              </Link>
            </div>
          </div>
          <div className="hero__visual fade-in fade-in-delay-3">
            <div className="hero__card-wrap">
              <div className="hero__pulse" />
              <div className="hero__card">
                <svg width="80" height="80" viewBox="0 0 80 80" className="hero__emblem">
                  <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(61,214,181,0.2)" strokeWidth="1" strokeDasharray="4 4"/>
                  <rect x="34" y="16" width="12" height="48" rx="4" fill="#3dd6b5" opacity="0.9"/>
                  <rect x="16" y="34" width="48" height="12" rx="4" fill="#3dd6b5" opacity="0.9"/>
                </svg>
                <div className="hero__card-text">
                  <span className="hero__card-label">Primary Goal</span>
                  <span className="hero__card-value">Doctor of Medicine</span>
                </div>
              </div>
              <div className="hero__stat-pill hero__stat-pill--1">
                <Icon id="book" className="icon icon-sm" />
                <span>Active Writer</span>
              </div>
              <div className="hero__stat-pill hero__stat-pill--2">
                <Icon id="map" className="icon icon-sm" />
                <span>Jhapa, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container hero__stats fade-in fade-in-delay-4">
          {stats.map(s => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="interests section-pad">
        <div className="container">
          <p className="section-label">Passions</p>
          <h2 className="section-title interests__title">What Drives Me</h2>
          <p className="interests__sub">
            Between the textbooks and the stethoscope, there is a world of stories waiting to be told.
          </p>
          <div className="interests__grid">
            {interests.map(item => (
              <div key={item.title} className="interest-card">
                <div className="interest-card__icon">
                  <Icon id={item.icon} className="icon icon-lg" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-box__deco" />
            <p className="section-label">Writing</p>
            <h2 className="cta-box__title">
              Thoughts from a Medical Mind
            </h2>
            <p className="cta-box__desc">
              Explore reflections on medicine, science, poetry, and the quiet wonders of everyday life in Nepal.
            </p>
            <Link to="/blog" className="btn-primary">
              Read the Blog
              <Icon id="arrow-right" className="icon icon-sm" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
