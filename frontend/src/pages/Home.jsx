import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import {
  IconArrowRight,
  IconCross,
  IconBook,
  IconMap,
  IconStethoscope,
  IconPen,
  IconDna,
} from '../components/Icons.jsx'
import heroImg from '../assets/pfp.jpeg'
import './Home.css'

const stats = [
  { value: 'MBBS', label: 'Goal' },
  { value: '2+', label: 'Years Writing' },
  { value: 'Nepal', label: 'Based In' },
]

const interests = [
  { Icon: IconStethoscope, title: 'Medicine', desc: 'Passionate about human anatomy, clinical sciences, and the art of healing.' },
  { Icon: IconPen, title: 'Poetry', desc: 'Writing verses that capture the human condition and the beauty of existence.' },
  { Icon: IconBook, title: 'Stories', desc: 'Crafting narratives that blend imagination with lived experience.' },
  { Icon: IconDna, title: 'Biology', desc: 'Fascinated by life at the molecular and cellular level.' },
]

function Home() {
  return (
    <main className="page-wrapper">
      <SEO />

      <section className="hero">
        <div className="hero__bg">
          <div className="hero__grid" />
          <div className="hero__glow hero__glow--1" />
          <div className="hero__glow hero__glow--2" />
        </div>
        <div className="container hero__inner">
          <div className="hero__content fade-in">
            <span className="hero__badge">
              <IconCross />
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
                <IconArrowRight />
              </Link>
              <Link to="/blog" className="btn-outline">
                Read My Blog
              </Link>
            </div>
          </div>
          <div className="hero__visual fade-in fade-in-delay-3">
            <div className="hero__image-wrap">
              <div className="hero__pulse" />
              <img
                src={heroImg}
                alt="Aashutosh Dhungel, medical aspirant and writer from Jhapa, Nepal"
                className="hero__photo"
                width="350"
                height="350"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
              <div className="hero__stat-pill hero__stat-pill--1">
                <IconBook />
                <span>Active Writer</span>
              </div>
              <div className="hero__stat-pill hero__stat-pill--2">
                <IconMap />
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
                  <item.Icon />
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
              <IconArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home